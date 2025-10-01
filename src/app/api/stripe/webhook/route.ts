import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { pool } from '@/lib/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Ensure subscription columns exist in users table
async function ensureSubscriptionColumns(client: any) {
  try {
    // Add subscription-related columns if they don't exist
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'inactive',
      ADD COLUMN IF NOT EXISTS subscription_current_period_start TIMESTAMP,
      ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMP,
      ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(50) DEFAULT 'monthly'
    `);
    console.log('✅ Subscription columns ensured in users table');
  } catch (error) {
    console.log('Subscription columns may already exist:', error);
  }
}

export async function POST(request: NextRequest) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Request URL:', request.url);
  console.log('Request method:', request.method);
  
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  console.log('Body length:', body.length);
  console.log('Signature present:', !!signature);

  if (!signature) {
    console.error('No Stripe signature found');
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log('✅ Webhook event verified:', event.type, event.id);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(failedInvoice);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('=== CHECKOUT COMPLETED ===');
  console.log('Session ID:', session.id);
  console.log('Client Reference ID:', session.client_reference_id);
  console.log('Session Metadata:', session.metadata);
  console.log('Customer:', session.customer);
  
  const userId = session.client_reference_id || session.metadata?.userId;
  const referralCode = session.metadata?.referralCode;
  
  if (!userId) {
    console.error('❌ No userId found in checkout session:', session.id);
    console.log('Available data:', {
      client_reference_id: session.client_reference_id,
      metadata: session.metadata,
      customer: session.customer
    });
    return;
  }

  console.log(`✅ Checkout completed for user ${userId}, customer: ${session.customer}`);
  
  const client = await pool.connect();
  try {
    // First, check if the subscription columns exist, if not add them
    await ensureSubscriptionColumns(client);
    
    // Update user subscription status using PostgreSQL
    const result = await client.query(
      `UPDATE users SET 
        stripe_customer_id = $1,
        subscription_status = $2
       WHERE id = $3`,
      [session.customer, 'active', userId]
    );

    if (result.rowCount === 0) {
      console.error(`No user found with ID: ${userId}`);
      return;
    }

    // Handle referral reward if there's a referral code
    if (referralCode) {
      await handleReferralReward(referralCode, userId);
    }

    console.log(`✅ Updated user ${userId} after checkout completion`);
  } catch (error) {
    console.error('Error updating user after checkout:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  const referralCode = subscription.metadata?.referralCode;
  
  if (!userId) {
    console.log('No userId found in subscription metadata:', subscription.id);
    // Try to find user by customer ID
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id FROM users WHERE stripe_customer_id = $1',
        [subscription.customer]
      );

      if (result.rows.length === 0) {
        console.log('No user found for customer:', subscription.customer);
        return;
      }

      const foundUserId = result.rows[0].id;
      console.log(`Found user ${foundUserId} by customer ID ${subscription.customer}`);
      await updateSubscriptionForUser(foundUserId, subscription, referralCode);
    } catch (error) {
      console.error('Error finding user by customer ID:', error);
    } finally {
      client.release();
    }
    return;
  }

  console.log(`Subscription created for user ${userId}`);
  await updateSubscriptionForUser(userId, subscription, referralCode);
}

async function updateSubscriptionForUser(userId: string, subscription: Stripe.Subscription, referralCode?: string) {
  const client = await pool.connect();
  try {
    // Ensure subscription columns exist
    await ensureSubscriptionColumns(client);
    
    // Detect plan type based on price ID
    const planType = detectPlanType(subscription);
    
    const result = await client.query(
      `UPDATE users SET 
        stripe_subscription_id = $1,
        subscription_status = $2,
        subscription_current_period_start = $3,
        subscription_current_period_end = $4,
        subscription_plan = $5
       WHERE id = $6`,
      [
        subscription.id,
        subscription.status,
        new Date(subscription.current_period_start * 1000).toISOString(),
        new Date(subscription.current_period_end * 1000).toISOString(),
        planType,
        userId
      ]
    );

    if (result.rowCount === 0) {
      console.error(`No user found with ID: ${userId}`);
      return;
    }

    // Handle referral reward
    if (referralCode) {
      await handleReferralReward(referralCode, userId);
    }

    console.log(`✅ Updated subscription for user ${userId} (Plan: ${planType})`);
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function handleReferralReward(referralCode: string, newUserId: string) {
  try {
    // Find the referrer by referral code (you'll need to implement referral code tracking)
    // For now, we'll create a simple referrals table entry
    console.log(`Processing referral reward for code: ${referralCode}, new user: ${newUserId}`);
    
    // You can implement referral tracking here
    // This might involve:
    // 1. Finding the referrer user
    // 2. Creating a referral record
    // 3. Adding $10 credit to referrer's account
    // 4. Sending notification emails
    
  } catch (error) {
    console.error('Error handling referral reward:', error);
  }
}

// Helper function to detect plan type from subscription
function detectPlanType(subscription: Stripe.Subscription): string {
  const monthlyPriceId = process.env.STRIPE_PRICE_ID || 'price_1SAUF6JNEBy2XO81lOaEdanC';
  const yearlyPriceId = process.env.STRIPE_YEARLY_PRICE_ID || 'price_1SAniEJNEBy2XO81aLxBAb3Z';
  
  // Check the subscription items for price ID
  if (subscription.items && subscription.items.data && subscription.items.data.length > 0) {
    const priceId = subscription.items.data[0].price.id;
    console.log(`Detected price ID: ${priceId}`);
    
    if (priceId === yearlyPriceId) {
      return 'yearly';
    } else if (priceId === monthlyPriceId) {
      return 'monthly';
    }
  }
  
  // Fallback: check interval from subscription
  if (subscription.items && subscription.items.data && subscription.items.data.length > 0) {
    const interval = subscription.items.data[0].price.recurring?.interval;
    if (interval === 'year') {
      return 'yearly';
    } else if (interval === 'month') {
      return 'monthly';
    }
  }
  
  // Default fallback
  console.log('Could not detect plan type, defaulting to monthly');
  return 'monthly';
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  console.log(`Subscription updated for user ${userId}`);
  
  const client = await pool.connect();
  try {
    // Detect plan type for updates too
    const planType = detectPlanType(subscription);
    
    const result = await client.query(
      `UPDATE users SET 
        subscription_status = $1,
        subscription_current_period_start = $2,
        subscription_current_period_end = $3,
        subscription_plan = $4
       WHERE stripe_subscription_id = $5`,
      [
        subscription.status,
        new Date(subscription.current_period_start * 1000).toISOString(),
        new Date(subscription.current_period_end * 1000).toISOString(),
        planType,
        subscription.id
      ]
    );

    if (result.rowCount === 0) {
      console.error(`No user found with subscription ID: ${subscription.id}`);
    } else {
      console.log(`✅ Updated subscription with plan: ${planType}`);
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
  } finally {
    client.release();
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`Subscription deleted: ${subscription.id}`);
  
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE users SET subscription_status = $1 WHERE stripe_subscription_id = $2',
      ['cancelled', subscription.id]
    );

    if (result.rowCount === 0) {
      console.error(`No user found with subscription ID: ${subscription.id}`);
    } else {
      console.log(`✅ Cancelled subscription: ${subscription.id}`);
    }
  } catch (error) {
    console.error('Error updating cancelled subscription:', error);
  } finally {
    client.release();
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription;
  if (!subscriptionId) return;

  console.log(`Payment succeeded for subscription ${subscriptionId}`);
  
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE users SET subscription_status = $1 WHERE stripe_subscription_id = $2',
      ['active', subscriptionId]
    );

    if (result.rowCount === 0) {
      console.error(`No user found with subscription ID: ${subscriptionId}`);
    } else {
      console.log(`✅ Payment succeeded for subscription: ${subscriptionId}`);
    }
  } catch (error) {
    console.error('Error updating payment succeeded:', error);
  } finally {
    client.release();
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription;
  if (!subscriptionId) return;

  console.log(`Payment failed for subscription ${subscriptionId}`);
  
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE users SET subscription_status = $1 WHERE stripe_subscription_id = $2',
      ['past_due', subscriptionId]
    );

    if (result.rowCount === 0) {
      console.error(`No user found with subscription ID: ${subscriptionId}`);
    } else {
      console.log(`✅ Payment failed for subscription: ${subscriptionId}`);
    }
  } catch (error) {
    console.error('Error updating payment failed:', error);
  } finally {
    client.release();
  }
}
