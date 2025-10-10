import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getUserByEmail } from '@/lib/database';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    let userEmail: string | null = null;
    let userId: string | null = null;

    // Try NextAuth session first
    const session = await getServerSession(authOptions);
    
    if (session?.user?.email) {
      userEmail = session.user.email;
      console.log('Found NextAuth session for:', userEmail);
    } else {
      // Try custom JWT token from cookies
      const cookies = request.headers.get('cookie');
      console.log('No NextAuth session, checking JWT token in cookies');
      
      if (cookies) {
        const authTokenMatch = cookies.match(/auth-token=([^;]+)/);
        if (authTokenMatch) {
          try {
            const token = authTokenMatch[1];
            const decoded = jwt.verify(token, process.env.AUTH_SECRET || 'dev-secret-change-in-production') as any;
            userEmail = decoded.email;
            userId = decoded.userId;
            console.log('Found JWT token for:', userEmail, 'userId:', userId);
          } catch (jwtError) {
            console.error('JWT verification failed:', jwtError);
          }
        }
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Not authenticated - please sign in again' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(userEmail);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    console.log('User found:', user.id, user.email);

    const { plan = 'monthly', referralCode } = await request.json();
    
    // Define price IDs for different plans
    const priceIds = {
      monthly: process.env.STRIPE_PRICE_ID!, // Current monthly price
      yearly: process.env.STRIPE_YEARLY_PRICE_ID || 'price_1SAniEJNEBy2XO81aLxBAb3Z' // Yearly price
    };

    const selectedPriceId = priceIds[plan as keyof typeof priceIds];
    if (!selectedPriceId) {
      return NextResponse.json(
        { error: 'Invalid plan type. Use "monthly" or "yearly"' },
        { status: 400 }
      );
    }

    console.log(`Creating checkout for ${plan} plan with price ID: ${selectedPriceId}`);

    // Prepare checkout session data
    const sessionData: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/install-extension?upgrade=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/invite-friends?upgrade=cancelled`,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        referralCode: referralCode || '',
      },
      subscription_data: {
        trial_period_days: 3,
        metadata: {
          userId: user.id,
          referralCode: referralCode || '',
        },
      },
    };

    // Apply discount if there's a referral code
    if (referralCode) {
      // Create a discount coupon for $10 off
      try {
        const coupon = await stripe.coupons.create({
          amount_off: 1000, // $10.00 in cents
          currency: 'usd',
          duration: 'once',
          name: 'Referral Discount',
        });

        sessionData.discounts = [{ coupon: coupon.id }];
        console.log(`Applied referral discount: ${coupon.id}`);
      } catch (couponError) {
        console.error('Error creating referral coupon:', couponError);
        // Continue without discount if coupon creation fails
      }
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create(sessionData);

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    });

  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
