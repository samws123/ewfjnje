import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { pool } from '@/lib/database';

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'dev-secret-change-in-production';

/**
 * Check if a string is a valid UUID
 */
export function isUuid(v: string): boolean { 
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v); 
}

/**
 * Resolve user ID from raw input (UUID or username)
 */
export async function resolveUserId(raw: string): Promise<string> {
  if (isUuid(raw)) return raw;
  
  const email = `${String(raw).replace(/[^a-zA-Z0-9._-]/g,'_')}@local.test`;
  
  const result = await pool.query(
    `INSERT INTO users(email, name) VALUES($1,$2)
     ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
    [email, 'Cookie Test User']
  );
  
  return result.rows[0].id;
}

/**
 * Authenticate request and extract user ID
 */
export async function authenticateRequest(req: NextRequest): Promise<string> {
  const auth = req.headers.get('authorization') || '';
  
  if (!auth.startsWith('Bearer ')) {
    console.error('Missing Authorization header or invalid format');
    throw new Error('Missing token');
  }
  
  try {
    const token = auth.slice(7);
    console.log('Attempting to verify token with JWT_SECRET:', JWT_SECRET ? 'Present' : 'Missing');
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log('Token decoded successfully, userId:', decoded.userId);
    return decoded.userId;
  } catch (error: any) {
    console.error('Token verification failed:', error.message);
    throw new Error('Invalid token');
  }
}

/**
 * Get the latest Canvas session for a user
 */
export async function getCanvasSession(userId: string): Promise<{ baseUrl: string; cookieValue: string }> {
  console.log('Getting Canvas session for user:', userId);
  
  const { rows } = await pool.query(
    `SELECT base_url, session_cookie, created_at, updated_at
     FROM user_canvas_sessions
     WHERE user_id = $1
     ORDER BY updated_at DESC NULLS LAST, created_at DESC
     LIMIT 1`,
    [userId]
  );
  
  if (!rows.length) {
    console.error('No Canvas session found for user:', userId);
    throw new Error('No stored Canvas session');
  }
  
  const session = rows[0];
  console.log('Found Canvas session:', {
    baseUrl: session.base_url,
    cookieLength: session.session_cookie?.length || 0,
    createdAt: session.created_at,
    updatedAt: session.updated_at
  });
  
  return {
    baseUrl: session.base_url,
    cookieValue: session.session_cookie
  };
}
