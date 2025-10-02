/**
 * Course Query Handler
 * Handles course-related chat queries
 */

import { pool } from '@/lib/database';
import { formatCourseList } from '../utils/text-formatting';

interface CourseResponse {
  role: 'assistant';
  text: string;
}

interface Course {
  id: number;
  name: string;
  course_code: string | null;
}

/**
 * Handle course listing queries
 */
export async function handleCourseQuery(userId: string): Promise<CourseResponse> {
  const { rows } = await pool.query(
    `SELECT id, name, course_code FROM courses WHERE user_id = $1 ORDER BY name ASC LIMIT 100`,
    [userId]
  );

  return {
    role: 'assistant',
    text: formatCourseList(rows as Course[])
  };
}
