import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getUserByEmail, query } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    let user = null;

    // First, try to get user from NextAuth session
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        user = await getUserByEmail(session.user.email);
      }
    } catch (error) {
      console.log('No NextAuth session found, trying JWT token...');
    }

    // If no NextAuth session, try JWT token from cookies
    if (!user) {
      const authToken = request.cookies.get('auth-token')?.value;
      
      if (authToken) {
        try {
          const jwtSecret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
          const decoded = jwt.verify(authToken, jwtSecret!) as any;
          user = await getUserByEmail(decoded.email);
        } catch (error) {
          return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
          );
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user's base URL and LMS from user_profile
    const result = await query(
      'SELECT base_url, lms FROM user_profile WHERE user_id = $1',
      [user.id]
    );

    const baseUrl = result.rows[0]?.base_url || 'https://princeton.instructure.com';
    const lms = result.rows[0]?.lms || 'canvas';

    return NextResponse.json({
      baseUrl,
      lms,
      userId: user.id
    });

  } catch (error: any) {
    console.error('Error getting base URL:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: error.message },
      { status: 500 }
    );
  }
}
