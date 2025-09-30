import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, generateVerificationCode, getVerificationEmailTemplate } from '@/lib/email';
import { createVerificationCode, getUserByEmail } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email, isSignup = true } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user exists to determine the email template
    const existingUser = await getUserByEmail(email);
    const actuallyIsSignup = !existingUser;

    // Generate verification code
    const code = generateVerificationCode();
    
    // Store verification code in database
    await createVerificationCode(email, code);

    // Send verification email
    const emailTemplate = getVerificationEmailTemplate(code, actuallyIsSignup);
    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });

    return NextResponse.json({
      message: 'Verification code sent successfully',
      email
    });

  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
