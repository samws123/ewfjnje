import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    // Use a verified sender email for SendGrid
    const fromEmail = process.env.EMAIL_FROM || 'noreply@dunorth.io';
    
    const msg = {
      to,
      from: {
        email: fromEmail,
        name: 'DuNorth'
      },
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    console.log('Attempting to send email with config:', {
      to,
      from: msg.from,
      subject,
      apiKeyExists: !!process.env.SENDGRID_API_KEY,
      apiKeyPrefix: process.env.SENDGRID_API_KEY?.substring(0, 10) + '...'
    });

    const response = await sgMail.send(msg);
    console.log('Email sent successfully to:', to, 'Response:', response[0].statusCode);
  } catch (error: any) {
    console.error('SendGrid error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.body || error.response
    });
    
    if (error.code === 403) {
      throw new Error('SendGrid API key is invalid or sender email is not verified. Please check your SendGrid configuration.');
    } else if (error.code === 401) {
      throw new Error('SendGrid API key is missing or invalid.');
    } else {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getVerificationEmailTemplate(code: string, isSignup: boolean = true) {
  const action = isSignup ? 'sign up' : 'sign in';
  const title = isSignup ? 'Welcome to DuNorth! Verify your email' : 'DuNorth - Verify your email to sign in';
  
  return {
    subject: title,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .code { background: #fff; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            <p>Hello!</p>
            <p>You're trying to ${action} to your account. Please use the verification code below:</p>
            <div class="code">${code}</div>
            <p>This code will expire in 10 minutes for security reasons.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      ${title}
      
      Hello!
      
      You're trying to ${action} to your account. Please use the verification code below:
      
      ${code}
      
      This code will expire in 10 minutes for security reasons.
      
      If you didn't request this, please ignore this email.
    `
  };
}
