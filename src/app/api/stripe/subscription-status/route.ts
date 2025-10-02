import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserByEmail } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    let userEmail: string | null = null;
    let userId: string | null = null;

    // Try NextAuth session first
    const session = await getServerSession(authOptions);
    
    if (session?.user?.email) {
      userEmail = session.user.email;
      console.log('Subscription status - Found NextAuth session for:', userEmail);
    } else {
      // Try custom JWT token from cookies
      const cookies = request.headers.get('cookie');
      console.log('Subscription status - No NextAuth session, checking JWT token');
      
      if (cookies) {
        const authTokenMatch = cookies.match(/auth-token=([^;]+)/);
        if (authTokenMatch) {
          try {
            const token = authTokenMatch[1];
            const decoded = jwt.verify(token, process.env.AUTH_SECRET || 'dev-secret-change-in-production') as any;
            userEmail = decoded.email;
            userId = decoded.userId;
            console.log('Subscription status - Found JWT token for:', userEmail, 'userId:', userId);
          } catch (jwtError) {
            console.error('Subscription status - JWT verification failed:', jwtError);
          }
        }
      }
    }

    if (!userEmail) {
      console.log('Subscription status - No authentication found');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(userEmail);
    if (!user) {
      console.log('User not found in database:', userEmail);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User found for subscription check:', user.id);

    // Type assertion for user with subscription fields
    const userWithSubscription = user as any;

    return NextResponse.json({
      success: true,
      subscription: {
        status: userWithSubscription.subscription_status || 'inactive',
        customerId: userWithSubscription.stripe_customer_id,
        subscriptionId: userWithSubscription.stripe_subscription_id,
        currentPeriodStart: userWithSubscription.subscription_current_period_start,
        currentPeriodEnd: userWithSubscription.subscription_current_period_end,
        plan: userWithSubscription.subscription_plan || 'monthly',
        isActive: userWithSubscription.subscription_status === 'active'
      }
    });

  } catch (error: any) {
    console.error('Get subscription status error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get subscription status',
        detail: error.message
      },
      { status: 500 }
    );
  }
}
