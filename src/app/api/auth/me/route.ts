import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    console.log('ME endpoint - All cookies:', request.cookies.getAll());
    let user = null;

    // First, try to get user from NextAuth session
    try {
      const session = await getServerSession(authOptions);
      console.log('ME endpoint - NextAuth session:', session);
      if (session?.user?.email) {
        console.log('ME endpoint - Found session user email:', session.user.email);
        user = await getUserByEmail(session.user.email);
        console.log('ME endpoint - Database user found:', user);
      }
    } catch (error) {
      console.log('ME endpoint - NextAuth session error:', error);
      console.log('ME endpoint - No NextAuth session found, trying JWT token...');
    }

    // If no NextAuth session, try JWT token
    if (!user) {
      console.log('ME endpoint - No NextAuth user found, checking JWT token...');
      const authToken = request.cookies.get('auth-token')?.value;
      console.log('ME endpoint - JWT token found:', !!authToken);
      if (!authToken) {
        console.log('ME endpoint - No authentication token found');
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }

      let decoded: any;
      try {
        decoded = jwt.verify(authToken, process.env.AUTH_SECRET!);
        console.log('ME endpoint - JWT decoded:', decoded);
      } catch (error) {
        console.log('ME endpoint - JWT verification error:', error);
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      // Get user details from database
      user = await getUserByEmail(decoded.email);
      console.log('ME endpoint - JWT user found:', user);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified
      }
    });

  } catch (error: any) {
    console.error('Error getting user info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
