import { NextRequest } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import { createDocumentsFromText, saveToPinecone, cleanText } from '@/lib/saveToPinecone';
import { authenticateRequest, resolveUserId, getCanvasSession } from '../utils/auth';
import { callCanvasPaged } from '../utils/canvas-api';
import { upsertAnnouncement, getUserCourses } from '../utils/database';
import { handleSyncError, createSyncResponse } from '../utils/response';


/**
 * Import announcements from all user courses
 */
async function importAnnouncements(userId: string, baseUrl: string, cookieValue: string): Promise<any> {
  let totalImported = 0;
  const details: any[] = [];

  // Get user courses
  const courses = await getUserCourses(userId);
  console.log(`Found ${courses.length} courses for user ${userId}`);

  // Import announcements per course
  for (const course of courses) {
    const courseId = course.id;
    try {
      const announcements = await callCanvasPaged(
        baseUrl, 
        cookieValue, 
        `/api/v1/courses/${courseId}/discussion_topics?only_announcements=true&per_page=100&include[]=all_dates&include[]=submission_types&include[]=rubric`
      );
      
      let perCourseProcessed = 0;
      for (const announcement of announcements) {
        // Only process items that are actually announcements
        if (!announcement.is_announcement) continue;
        
        await upsertAnnouncement(userId, announcement, courseId);

        const text = cleanText(
          [announcement.title, announcement.message].filter(Boolean).join('\n\n')
        );
        
        if (text) {
          const docs = await createDocumentsFromText(text, {
            type: 'announcement',
            course_id: courseId,
            title: announcement.title,
            author: announcement.author?.display_name || announcement.user_name || null,
            posted_at: announcement.posted_at || null,
            userId,
            courseId,
            docId: announcement.id,
          });

          await saveToPinecone(userId, courseId, docs);
        }

        perCourseProcessed++;
      }
      
      totalImported += perCourseProcessed;
      details.push({ courseId, count: perCourseProcessed });
    } catch (error: any) {
      details.push({ courseId, error: String(error.message || error) });
    }
  }

  return {
    imported: totalImported,
    details: details,
    uniqueAnnouncementsThisRun: totalImported // Backward compatibility
  };
}

/**
 * POST /api/sync/import-announcements
 * Import announcements from Canvas LMS
 */
export async function POST(req: NextRequest) {
  try {
    // Ensure database schema is up to date
    await initializeDatabase();
    
    // Authenticate and get session
    const rawUserId = await authenticateRequest(req);
    const userId = await resolveUserId(rawUserId);
    const { baseUrl, cookieValue } = await getCanvasSession(userId);

    // Import announcements
    const result = await importAnnouncements(userId, baseUrl, cookieValue);

    return createSyncResponse(baseUrl, result);

  } catch (error: any) {
    return handleSyncError(error);
  }
}