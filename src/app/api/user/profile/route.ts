import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile, getUserByEmail } from '@/lib/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    let userId: string | null = null;

    // First, try to get user from NextAuth session
    try {
      const session = await getServerSession(authOptions);
      console.log('NextAuth session:', session);
      if (session?.user?.email) {
        console.log('Found session user email:', session.user.email);
        const user = await getUserByEmail(session.user.email);
        console.log('Database user found:', user);
        if (user) {
          userId = user.id;
          console.log('Using NextAuth user ID:', userId);
        }
      }
    } catch (error) {
      console.log('NextAuth session error:', error);
      console.log('No NextAuth session found, trying JWT token...');
    }

    // If no NextAuth session, try JWT token
    if (!userId) {
      console.log('No NextAuth user found, checking JWT token...');
      const authToken = request.cookies.get('auth-token')?.value;
      console.log('JWT token found:', !!authToken);
      if (!authToken) {
        console.log('No authentication token found');
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      try {
        const decoded = jwt.verify(authToken, process.env.AUTH_SECRET!) as any;
        userId = decoded.userId;
        console.log('Using JWT user ID:', userId);
      } catch (error) {
        console.log('JWT verification error:', error);
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

    // Get user profile
    const profile = await getUserProfile(userId);

    return NextResponse.json({
      profile: profile
    });

  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}
