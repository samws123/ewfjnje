import { NextRequest } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import { authenticateRequest, resolveUserId, getCanvasSession } from '../utils/auth';
import { callCanvasPaged } from '../utils/canvas-api';
import { upsertGrade, getUserCourses, getUserAssignments } from '../utils/database';
import { handleSyncError, createSyncResponse } from '../utils/response';

/**
 * Import Stats class for tracking import progress
 */
class ImportStats {
  public totalItems: number = 0;
  public uniqueItemsThisRun: number = 0;
  public seenThisRun: Set<number> = new Set();
  public existingItems: Set<number> = new Set();
  public details: any[] = [];

  async initializeExisting(type: string, userId: string): Promise<void> {
    // This would typically query the database for existing items
    // For now, we'll start with empty sets
    this.existingItems = new Set();
  }

  recordItem(itemId: string | number): boolean {
    const id = Number(itemId);
    this.totalItems++;
    
    if (!this.seenThisRun.has(id)) {
      this.seenThisRun.add(id);
      this.uniqueItemsThisRun++;
      return true;
    }
    return false;
  }

  addDetail(detail: any): void {
    this.details.push(detail);
  }

  getStats() {
    return {
      totalItems: this.totalItems,
      uniqueItemsThisRun: this.uniqueItemsThisRun,
      details: this.details
    };
  }
}

/**
 * Import grades from assignments and course gradebook
 */
async function importGrades(userId: string, baseUrl: string, cookieValue: string): Promise<any> {
  const stats = new ImportStats();
  await stats.initializeExisting('grades', userId);

  // Get user assignments and courses
  const assignments = await getUserAssignments(userId);
  const courses = await getUserCourses(userId);

  console.log(`Found ${assignments.length} assignments and ${courses.length} courses for user ${userId}`);

  // 1) Import grades for each assignment
  for (const assignment of assignments) {
    const assignmentId = assignment.id;
    const courseId = assignment.course_id;
    
    try {
      const submissions = await callCanvasPaged(
        baseUrl, 
        cookieValue, 
        `/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?per_page=100&include[]=submission_history&include[]=submission_comments&include[]=rubric_assessment`
      );
      
      let assignmentProcessed = 0;
      for (const submission of submissions) {
        if (!submission.id) continue;
        
        await upsertGrade(userId, submission, assignmentId, courseId);
        
        if (stats.recordItem(submission.id)) {
          assignmentProcessed++;
        }
      }
      
      if (assignmentProcessed > 0) {
        stats.addDetail({ assignmentId, courseId, count: assignmentProcessed });
      }
    } catch (error: any) {
      stats.addDetail({ assignmentId, courseId, error: String(error.message || error) });
    }
  }

  // 2) Import grades from course gradebook for comprehensive view
  for (const course of courses) {
    const courseId = course.id;
    try {
      const submissions = await callCanvasPaged(
        baseUrl, 
        cookieValue, 
        `/api/v1/courses/${courseId}/students/submissions?per_page=100&include[]=assignment&include[]=submission_history&include[]=submission_comments&include[]=rubric_assessment`
      );
      
      let courseProcessed = 0;
      for (const submission of submissions) {
        if (!submission.id) continue;
        
        // Skip if we already processed this submission
        if (stats.seenThisRun.has(Number(submission.id))) continue;
        
        await upsertGrade(userId, submission, submission.assignment_id || null, courseId);
        
        if (stats.recordItem(submission.id)) {
          courseProcessed++;
        }
      }
      
      if (courseProcessed > 0) {
        stats.addDetail({ source: 'course_gradebook', courseId, count: courseProcessed });
      }
    } catch (error: any) {
      stats.addDetail({ source: 'course_gradebook', courseId, error: String(error.message || error) });
    }
  }

  return {
    imported: stats.uniqueItemsThisRun,
    totalItems: stats.totalItems,
    details: stats.details,
    uniqueGradesThisRun: stats.uniqueItemsThisRun // Backward compatibility
  };
}

/**
 * POST /api/sync/import-grades
 * Import grades from Canvas LMS
 */
export async function POST(req: NextRequest) {
  try {
    // Ensure database schema is up to date
    await initializeDatabase();
    
    // Authenticate and get session
    const rawUserId = await authenticateRequest(req);
    const userId = await resolveUserId(rawUserId);
    const { baseUrl, cookieValue } = await getCanvasSession(userId);

    // Import grades
    const result = await importGrades(userId, baseUrl, cookieValue);

    return createSyncResponse(baseUrl, result);

  } catch (error: any) {
    return handleSyncError(error);
  }
}
