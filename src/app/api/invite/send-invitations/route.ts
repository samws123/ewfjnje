import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getUserByEmail } from '@/lib/database';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    let userEmail: string | null = null;
    let userId: string | null = null;

    // Try NextAuth session first
    const session = await getServerSession(authOptions);
    
    if (session?.user?.email) {
      userEmail = session.user.email;
      console.log('Send invitations - Found NextAuth session for:', userEmail);
    } else {
      // Try custom JWT token from cookies
      const cookies = request.headers.get('cookie');
      console.log('Send invitations - No NextAuth session, checking JWT token');
      
      if (cookies) {
        const authTokenMatch = cookies.match(/auth-token=([^;]+)/);
        if (authTokenMatch) {
          try {
            const token = authTokenMatch[1];
            const decoded = jwt.verify(token, process.env.AUTH_SECRET || 'dev-secret-change-in-production') as any;
            userEmail = decoded.email;
            userId = decoded.userId;
            console.log('Send invitations - Found JWT token for:', userEmail, 'userId:', userId);
          } catch (jwtError) {
            console.error('Send invitations - JWT verification failed:', jwtError);
          }
        }
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(userEmail);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { emails } = await request.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Please provide valid email addresses' },
        { status: 400 }
      );
    }

    // Filter out empty emails and validate format
    const validEmails = emails.filter(email => {
      if (!email || typeof email !== 'string') return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    });

    if (validEmails.length === 0) {
      return NextResponse.json(
        { error: 'No valid email addresses provided' },
        { status: 400 }
      );
    }

    // Generate unique referral code for this user
    const referralCode = generateReferralCode(user.id);
    const inviteLink = `${process.env.NEXTAUTH_URL}/signup?ref=${referralCode}`;

    // Prepare email template
    const emailPromises = validEmails.map(email => {
      const msg = {
        to: email.trim(),
        from: {
          email: process.env.EMAIL_FROM!,
          name: 'Anara'
        },
        subject: `${user.name} invited you to join Anara - Get $10 off!`,
        html: generateInviteEmailTemplate(user.name, inviteLink),
        text: `${user.name} has invited you to join Anara! You'll get $10 off your subscription. Sign up here: ${inviteLink}`
      };

      return sgMail.send(msg);
    });

    // Send all emails
    await Promise.all(emailPromises);

    // Store invitations in database (you might want to create an invitations table)
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: `Successfully sent ${validEmails.length} invitation(s)`,
      invitationsSent: validEmails.length,
      referralCode
    });

  } catch (error: any) {
    console.error('Error sending invitations:', error);
    
    if (error.response?.body?.errors) {
      console.error('SendGrid errors:', error.response.body.errors);
    }

    return NextResponse.json(
      { error: 'Failed to send invitations. Please try again.' },
      { status: 500 }
    );
  }
}

function generateReferralCode(userId: string): string {
  // Generate a unique referral code based on user ID and timestamp
  const timestamp = Date.now().toString(36);
  const userHash = Buffer.from(userId).toString('base64').slice(0, 6);
  return `${userHash}${timestamp}`.toUpperCase();
}

function generateInviteEmailTemplate(inviterName: string, inviteLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You're invited to join Anara!</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #000; font-size: 28px; margin-bottom: 10px;">You're invited to Anara!</h1>
        <p style="font-size: 18px; color: #666; margin: 0;">${inviterName} thinks you'd love Anara</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="color: #000; font-size: 24px; margin-bottom: 15px; text-align: center;">🎉 Special Offer Just for You!</h2>
        <p style="font-size: 16px; text-align: center; margin-bottom: 20px;">
          Get <strong style="color: #000;">$10 off</strong> your first subscription when you join Anara through this invitation.
        </p>
        <p style="font-size: 16px; text-align: center; margin-bottom: 25px;">
          Plus, ${inviterName} will earn $10 cash when you subscribe!
        </p>
        
        <div style="text-align: center;">
          <a href="${inviteLink}" 
             style="display: inline-block; background: #000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Join Anara & Save $10
          </a>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #000; font-size: 20px; margin-bottom: 15px;">What is Anara?</h3>
        <p style="font-size: 16px; margin-bottom: 15px;">
          Anara is the AI-powered study companion that helps students excel in their courses. With Anara, you can:
        </p>
        <ul style="font-size: 16px; padding-left: 20px;">
          <li>Get instant help with assignments and homework</li>
          <li>Access AI tutoring for any subject</li>
          <li>Track your academic progress</li>
          <li>Connect with your learning management system</li>
        </ul>
      </div>
      
      <div style="text-align: center; padding: 20px; background: #f0f0f0; border-radius: 8px; margin-bottom: 20px;">
        <p style="font-size: 14px; color: #666; margin: 0;">
          Join 100k+ students who are already using Anara to improve their grades!
        </p>
      </div>
      
      <div style="text-align: center; font-size: 14px; color: #999;">
        <p>This invitation was sent by ${inviterName}. If you don't want to receive these emails, you can ignore this message.</p>
        <p>© 2024 Anara. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}
