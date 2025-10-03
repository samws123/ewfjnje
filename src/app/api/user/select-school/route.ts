import { NextRequest, NextResponse } from 'next/server';
import { updateUserProfile, getSchoolByName, createSchool, getUserByEmail } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { schoolName, lms = 'canvas', baseUrl } = await request.json();

    if (!schoolName) {
      return NextResponse.json(
        { error: 'School name is required' },
        { status: 400 }
      );
    }

    let userId: string | null = null;

    // First, try to get user from NextAuth session
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        const user = await getUserByEmail(session.user.email);
        if (user) {
          userId = user.id;
        }
      }
    } catch (error) {
      console.log('No NextAuth session found, trying JWT token...');
    }

    // If no NextAuth session, try JWT token
    if (!userId) {
      const authToken = request.cookies.get('auth-token')?.value;
      if (!authToken) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      try {
        const decoded = jwt.verify(authToken, process.env.AUTH_SECRET!) as any;
        userId = decoded.userId;
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid authentication token' },
          { status: 401 }
        );
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if school exists, if not create it
    let school = await getSchoolByName(schoolName);
    if (!school) {
      // Create new school with default Canvas LMS
      const defaultBaseUrl = baseUrl || `https://${schoolName.toLowerCase().replace(/\s+/g, '')}.instructure.com`;
      school = await createSchool(schoolName, lms, defaultBaseUrl);
    }

    // Update user profile with selected school
    const userProfile = await updateUserProfile(
      userId,
      school.id,
      school.lms,
      school.base_url
    );

    return NextResponse.json({
      message: 'School selection saved successfully',
      profile: userProfile,
      school: school
    });

  } catch (error: any) {
    console.error('Error saving school selection:', error);
    return NextResponse.json(
      { error: 'Failed to save school selection' },
      { status: 500 }
    );
  }
}
