import { pool } from '@/lib/database';

/**
 * Get user's courses
 */
export async function getUserCourses(userId: string): Promise<any[]> {
  const result = await pool.query(`SELECT id FROM courses WHERE user_id = $1 LIMIT 1000`, [userId]);
  return result.rows;
}

/**
 * Get user's assignments
 */
export async function getUserAssignments(userId: string): Promise<any[]> {
  const result = await pool.query(`SELECT id, course_id FROM assignments WHERE user_id = $1 LIMIT 1000`, [userId]);
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
export async function upsertGrade(userId: string, submission: any, assignmentId: number | null, courseId: number): Promise<void> {
  await pool.query(
    `INSERT INTO grades(user_id, id, assignment_id, course_id, student_id, score, grade, excused, late, missing, submitted_at, graded_at, workflow_state, submission_type, attempt, raw_json)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     ON CONFLICT (user_id, id) DO UPDATE SET
       assignment_id = EXCLUDED.assignment_id,
       course_id = EXCLUDED.course_id,
       student_id = EXCLUDED.student_id,
       score = EXCLUDED.score,
       grade = EXCLUDED.grade,
       excused = EXCLUDED.excused,
       late = EXCLUDED.late,
       missing = EXCLUDED.missing,
       submitted_at = EXCLUDED.submitted_at,
       graded_at = EXCLUDED.graded_at,
       workflow_state = EXCLUDED.workflow_state,
       submission_type = EXCLUDED.submission_type,
       attempt = EXCLUDED.attempt,
       raw_json = EXCLUDED.raw_json`,
    [
      userId,
      submission.id,
      assignmentId,
      courseId,
      submission.user_id || null,
      submission.score || null,
      submission.grade || null,
      submission.excused || false,
      submission.late || false,
      submission.missing || false,
      submission.submitted_at ? new Date(submission.submitted_at) : null,
      submission.graded_at ? new Date(submission.graded_at) : null,
      submission.workflow_state || null,
      submission.submission_type || null,
      submission.attempt || null,
      submission
    ]
  );
}

/**
 * upsert file to database
 */
export async function upsertFile(userId: string, file: any, courseId: number, publicUrl?: string | null): Promise<void> {
  await pool.query(
          `INSERT INTO files(user_id, id, course_id, filename, content_type, size, download_url, public_download_url, raw_json)
           VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
           ON CONFLICT (user_id, id) DO UPDATE SET 
             filename=EXCLUDED.filename, 
             content_type=EXCLUDED.content_type, 
             size=EXCLUDED.size, 
             download_url=EXCLUDED.download_url, 
             public_download_url=EXCLUDED.public_download_url, 
             raw_json=EXCLUDED.raw_json`,
          [
            userId, 
            file.id, 
            courseId, 
            file.display_name || file.filename || null, 
            file.content_type || null, 
            file.size || null, 
            file.url || null, 
            publicUrl, 
            file
          ]
        );
}
