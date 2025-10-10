import { NextRequest } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import { createDocumentsFromText, saveToPinecone, cleanText } from '@/lib/saveToPinecone';
import { authenticateRequest, resolveUserId, getCanvasSession } from '../utils/auth';
import { callCanvasPaged } from '../utils/canvas-api';
import { upsertCourse } from '../utils/database';
import { handleSyncError, createSyncResponse } from '../utils/response';

/**
 * Import courses from Canvas
 */
async function importCourses(userId: string, baseUrl: string, cookieValue: string): Promise<any> {
  // Fetch courses from Canvas
  const courses = await callCanvasPaged(
    baseUrl, 
    cookieValue, 
    '/api/v1/courses?enrollment_state=active&per_page=100'
  );

  // Import courses and save to Pinecone
  let imported = 0;
  for (const course of courses) {
    await upsertCourse(userId, course);

    console.log("course 0001: ", course);

    const text = cleanText(
      [course.name, course.course_code, course.term].filter(Boolean).join(" - ")
    );

    if (text) {
      // Create documents from text and save to Pinecone
      const docs = await createDocumentsFromText(text, {
        type: 'course',
        course_id: course.id,
        name: course.name,
        code: course.course_code,
        term: course.term,
        userId,
        courseId: course.id,
        docId: course.id,
      });

      await saveToPinecone(userId, course.id, docs);
    }

    imported++;
  }

  return {
    imported,
    total: courses.length
  };
}

/**
 * POST /api/sync/import-courses
 * Import courses from Canvas LMS
 */
export async function POST(req: NextRequest) {
  try {
    // Ensure database schema is up to date
    await initializeDatabase();
    
    // Authenticate and get session
    const rawUserId = await authenticateRequest(req);
    const userId = await resolveUserId(rawUserId);
    const { baseUrl, cookieValue } = await getCanvasSession(userId);

    // Import courses
    const result = await importCourses(userId, baseUrl, cookieValue);

    return createSyncResponse(baseUrl, result);

  } catch (error: any) {
    return handleSyncError(error);
  }
}
