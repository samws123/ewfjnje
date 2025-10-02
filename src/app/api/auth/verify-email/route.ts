import { NextRequest, NextResponse } from 'next/server';
import { verifyCode, getUserByEmail, createUser, updateUserEmailVerified } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, code, name, isSignup = true } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Verify the code
    const isValidCode = await verifyCode(email, code);
    if (!isValidCode) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    let user;
    let actuallyIsSignup = false;

    // First check if user already exists
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      // User exists - this is a signin
      user = existingUser;
      actuallyIsSignup = false;
      
      // Mark email as verified
      await updateUserEmailVerified(email, true);
      user.email_verified = true;
    } else {
      // User doesn't exist - this is a signup
      actuallyIsSignup = true;
      
      try {
        user = await createUser(email, name); // No password needed
      } catch (error: any) {
        console.error('Error creating user:', error);
        return NextResponse.json(
          { error: `Failed to create user account: ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        emailVerified: user.email_verified 
      },
      process.env.AUTH_SECRET!,
      { expiresIn: '7d' }
    );

    // Create response with secure cookie
    const response = NextResponse.json({
      message: actuallyIsSignup ? 'Account created successfully' : 'Successfully signed in',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified
      }
    });

    // Set secure HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}
