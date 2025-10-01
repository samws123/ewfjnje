import { pool } from '@/lib/database';

/**
 * Get user's courses
 */
export async function getUserCourses(userId: string): Promise<any[]> {
  const result = await pool.query(`SELECT id FROM courses WHERE user_id = $1 LIMIT 1000`, [userId]);
  return result.rows;
}

/**
 * Upsert course to database
 */
export async function upsertCourse(userId: string, course: any): Promise<void> {
   await pool.query(
      `INSERT INTO courses(user_id, id, name, course_code, term, raw_json)
       VALUES($1,$2,$3,$4,$5,$6)
       ON CONFLICT (user_id, id) DO UPDATE
         SET name = EXCLUDED.name,
             course_code = EXCLUDED.course_code,
             term = EXCLUDED.term,
             raw_json = EXCLUDED.raw_json`,
      [userId, course.id, course.name || null, course.course_code || null, course.term || null, course]
    );
}

/**
 * Upsert assignment to database
 */
export async function upsertAssignment(userId: string, assignment: any, courseId: number): Promise<void> {
  await pool.query(
    `INSERT INTO assignments(user_id, id, course_id, name, due_at, description, updated_at, points_possible, submission_types, html_url, workflow_state, raw_json)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     ON CONFLICT (user_id, id) DO UPDATE SET
       name = EXCLUDED.name,
       due_at = EXCLUDED.due_at,
       description = EXCLUDED.description,
       updated_at = EXCLUDED.updated_at,
       points_possible = EXCLUDED.points_possible,
       submission_types = EXCLUDED.submission_types,
       html_url = EXCLUDED.html_url,
       workflow_state = EXCLUDED.workflow_state,
       raw_json = EXCLUDED.raw_json`,
    [
      userId,
      assignment.id,
      courseId,
      assignment.name || null,
      assignment.due_at ? new Date(assignment.due_at) : null,
      assignment.description || null,
      assignment.updated_at ? new Date(assignment.updated_at) : null,
      assignment.points_possible || null,
      Array.isArray(assignment.submission_types) ? assignment.submission_types : (assignment.submission_types ? [assignment.submission_types] : []),
      assignment.html_url || null,
      assignment.published === true ? 'published' : 'unpublished',
      assignment
    ]
  );
}

/**
 * Upsert announcement to database
 */
export async function upsertAnnouncement(userId: string, announcement: any, courseId: number): Promise<void> {
  await pool.query(
      `INSERT INTO announcements(user_id, id, course_id, title, message, posted_at, created_at, last_reply_at, html_url, author_name, author_id, read_state, locked, published, raw_json)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (user_id, id) DO UPDATE SET
         title = EXCLUDED.title,
         message = EXCLUDED.message,
         posted_at = EXCLUDED.posted_at,
         created_at = EXCLUDED.created_at,
         last_reply_at = EXCLUDED.last_reply_at,
         html_url = EXCLUDED.html_url,
         author_name = EXCLUDED.author_name,
         author_id = EXCLUDED.author_id,
         read_state = EXCLUDED.read_state,
         locked = EXCLUDED.locked,
         published = EXCLUDED.published,
         raw_json = EXCLUDED.raw_json`,
      [
        userId,
        announcement.id,
        courseId,
        announcement.title || null,
        announcement.message || null,
        announcement.posted_at ? new Date(announcement.posted_at) : null,
        announcement.created_at ? new Date(announcement.created_at) : null,
        announcement.last_reply_at ? new Date(announcement.last_reply_at) : null,
        announcement.html_url || null,
        announcement.author?.display_name || announcement.user_name || null,
        announcement.author?.id || null,
        announcement.read_state || null,
        announcement.locked || false,
        announcement.published || false,
        announcement
      ]
    );
}
