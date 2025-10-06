import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { pool } from '@/lib/database';
import { getUserByEmail } from '@/lib/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
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
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      try {
        const decoded = jwt.verify(authToken, process.env.AUTH_SECRET!) as any;
        userId = decoded.userId;
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Invalid authentication token' },
          { status: 401 }
        );
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's Stripe customer ID and subscription ID from database
    const userQuery = `
      SELECT stripe_customer_id, stripe_subscription_id 
      FROM users 
      WHERE id = $1
    `;
    
    const userResult = await pool.query(userQuery, [userId]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const { stripe_customer_id, stripe_subscription_id } = userResult.rows[0];

    if (!stripe_subscription_id) {
      return NextResponse.json(
        { success: false, error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Cancel the subscription in Stripe
    const cancelledSubscription = await stripe.subscriptions.cancel(stripe_subscription_id);

    // Update user's subscription status in database
    const updateQuery = `
      UPDATE users 
      SET 
        subscription_status = 'cancelled',
        stripe_subscription_id = NULL
      WHERE id = $1
    `;
    
    await pool.query(updateQuery, [userId]);

    console.log(`Subscription cancelled for user ${userId}:`, {
      subscriptionId: stripe_subscription_id,
      customerId: stripe_customer_id,
      cancelledAt: cancelledSubscription.canceled_at
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: {
        id: cancelledSubscription.id,
        status: cancelledSubscription.status,
        canceled_at: cancelledSubscription.canceled_at
      }
    });

  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
