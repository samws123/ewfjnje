import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { getUserByEmail } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    let user = null;

    // First, try to get user from NextAuth session
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        user = await getUserByEmail(session.user.email);
      }
    } catch (error) {
      console.log('No NextAuth session found, trying request body...');
    }

    // If no NextAuth session, try to get user from request body (for testing)
    if (!user) {
      try {
        const body = await request.json();
        if (body.userId) {
          // For testing purposes, allow creating tokens with userId
          // In production, you might want to remove this
          const jwtSecret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
          const token = jwt.sign(
            { 
              userId: body.userId,
              email: `${body.userId}@test.local`,
              emailVerified: false 
            },
            jwtSecret!,
            { expiresIn: '7d' }
          );
          
          return NextResponse.json({ token });
        }
      } catch (error) {
        // Continue to check cookies
      }
    }

    // If still no user, try JWT token from cookies
    if (!user) {
      const authToken = request.cookies.get('auth-token')?.value;
      
      if (authToken) {
        try {
          const jwtSecret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
          const decoded = jwt.verify(authToken, jwtSecret!) as any;
          user = await getUserByEmail(decoded.email);
        } catch (error) {
          return NextResponse.json(
            { error: 'Invalid existing token' },
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

    // Generate JWT token for the authenticated user
    const jwtSecret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        emailVerified: user.email_verified 
      },
      jwtSecret!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ 
      token,
      userId: user.id,
      email: user.email
    });

  } catch (error: any) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: error.message },
      { status: 500 }
    );
  }
}
