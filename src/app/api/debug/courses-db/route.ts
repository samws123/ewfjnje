import { NextRequest } from 'next/server';
import { query } from '@/lib/database';

/**
 * GET /api/debug/courses-db
 * Get courses from database for a user
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({ error: 'userId required' }, { status: 400 });
    }

    // Get courses for the user
    const result = await query(
      `SELECT id, name, course_code, term, created_at, updated_at 
       FROM courses 
       WHERE user_id = $1 
       ORDER BY updated_at DESC 
       LIMIT 1000`,
      [userId]
    );

    return Response.json({ 
      ok: true,
      courses: result.rows,
      count: result.rows.length
    });

  } catch (error: any) {
    console.error('Error getting courses:', error);
    return Response.json({ 
      error: 'internal_error', 
      detail: String(error.message || error) 
    }, { status: 500 });
  }
}
