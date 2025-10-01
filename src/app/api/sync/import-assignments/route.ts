import { NextRequest } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import { createDocumentsFromText, saveToPinecone, cleanText } from '@/lib/saveToPinecone';
import { authenticateRequest, resolveUserId, getCanvasSession } from '../utils/auth';
import { callCanvasPaged } from '../utils/canvas-api';
import { upsertAssignment, getUserCourses } from '../utils/database';
import { handleSyncError, createSyncResponse } from '../utils/response';

/**
 * Import assignments from planner and per-course endpoints
 */
async function importAssignments(userId: string, baseUrl: string, cookieValue: string): Promise<any> {
  let totalImported = 0;
  const details: any[] = [];

  // Get user courses for per-course import
  const courses = await getUserCourses(userId);
  console.log(`Found ${courses.length} courses for user ${userId}`);

  // 1) Fast path: Planner items (captures upcoming assignments quickly)
  try {
    const now = new Date();
    const startISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).toISOString();
    const endISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 120).toISOString();
    
    const plannerItems = await callCanvasPaged(
      baseUrl, 
      cookieValue, 
      `/api/v1/planner/items?per_page=100&start_date=${encodeURIComponent(startISO)}&end_date=${encodeURIComponent(endISO)}`
    );
    
    let plannerProcessed = 0;
    for (const item of plannerItems) {
      if (!item || String(item.plannable_type).toLowerCase() !== 'assignment') continue;
      
      const assignment = item.plannable || {};
      const courseId = item.course_id || item.context_code?.replace('course_', '') || null;
      
      if (!assignment.id || !courseId) continue;
      
      // Convert planner item to assignment format
      const assignmentData = {
        id: assignment.id,
        name: assignment.name || item.title || null,
        due_at: assignment.due_at || item.plannable_date,
        description: assignment.description || item.details || null,
        updated_at: assignment.updated_at,
        points_possible: assignment.points_possible || null,
        submission_types: Array.isArray(assignment.submission_types) ? assignment.submission_types : (assignment.submission_types ? [assignment.submission_types] : []),
        html_url: assignment.html_url || item.html_url || null,
        published: assignment.published === true,
        raw_json: item
      };
      
      await upsertAssignment(userId, assignmentData, Number(courseId));
      
      const text = cleanText(
        [assignmentData.name, assignmentData.description].filter(Boolean).join('\n\n')
      );

      if (text) {
        const docs = await createDocumentsFromText(text, {
          type: 'assignment',
          course_id: Number(courseId),
          name: assignmentData.name,
          due_at: assignmentData.due_at || null,
          points_possible: assignmentData.points_possible,
          html_url: assignmentData.html_url,
          userId,
          courseId: Number(courseId),
          docId: assignmentData.id,
        });

        await saveToPinecone(userId, Number(courseId), docs);
      }

      plannerProcessed++;
    }
    
    totalImported += plannerProcessed;
    details.push({ source: 'planner', count: plannerProcessed });
  } catch (error: any) {
    details.push({ source: 'planner', error: String(error.message || error) });
  }

  // 2) Per-course assignments (authoritative)
  for (const course of courses) {
    const courseId = course.id;
    try {
      const assignments = await callCanvasPaged(
        baseUrl, 
        cookieValue, 
        `/api/v1/courses/${courseId}/assignments?per_page=100&include[]=all_dates&include[]=submission_types&include[]=rubric`
      );
      
      let perCourseProcessed = 0;
      for (const assignment of assignments) {
        await upsertAssignment(userId, assignment, courseId);
      
        const text = cleanText(
          [assignment.name, assignment.description].filter(Boolean).join('\n\n')
        );
        
        if (text) {
          const docs = await createDocumentsFromText(text, {
            type: 'assignment',
            course_id: courseId,
            name: assignment.name,
            due_at: assignment.due_at || null,
            points_possible: assignment.points_possible,
            html_url: assignment.html_url,
            userId,
            courseId,
            docId: assignment.id,
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
    details: details
  };
}

/**
 * POST /api/sync/import-assignments
 * Import assignments from Canvas LMS
 */
export async function POST(req: NextRequest) {
  try {
    // Ensure database schema is up to date
    await initializeDatabase();
    
    // Authenticate and get session
    const rawUserId = await authenticateRequest(req);
    const userId = await resolveUserId(rawUserId);
    const { baseUrl, cookieValue } = await getCanvasSession(userId);

    // Import assignments
    const result = await importAssignments(userId, baseUrl, cookieValue);

    return createSyncResponse(baseUrl, result);

  } catch (error: any) {
    return handleSyncError(error);
  }
}