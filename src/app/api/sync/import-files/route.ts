import { NextRequest } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import { authenticateRequest, resolveUserId, getCanvasSession } from '../utils/auth';
import { callCanvasPaged } from '../utils/canvas-api';
import { getUserCourses, upsertFile } from '../utils/database';
import { handleSyncError, createSyncResponse } from '../utils/response';

/**
 * Get public URL for a Canvas file
 */
async function getFilePublicUrl(baseUrl: string, cookieValue: string, fileId: string): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/api/v1/files/${fileId}/public_url`, {
      headers: {
        'Accept': 'application/json',
        'Cookie': `canvas_session=${cookieValue}`,
        'User-Agent': 'DuNorth-Server/1.0'
      },
      redirect: 'follow'
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.public_url || null;
  } catch (error) {
    console.warn(`Failed to get public URL for file ${fileId}:`, error);
    return null;
  }
}

/**
 * Import files from all user courses
 */
async function importFiles(userId: string, baseUrl: string, cookieValue: string): Promise<any> {
  let totalImported = 0;
  const details: any[] = [];

  // Get user courses
  const courses = await getUserCourses(userId);
  console.log(`Found ${courses.length} courses for user ${userId}`);

  for (const course of courses) {
    const courseId = course.id;
    
    try {
      // Get files for this course
      const files = await callCanvasPaged(
        baseUrl, 
        cookieValue, 
        `/api/v1/courses/${courseId}/files?per_page=100`
      );
      
      let courseProcessed = 0;
      
      for (const file of files) {
        try {
          // Get public URL for the file
          const publicUrl = await getFilePublicUrl(baseUrl, cookieValue, file.id);
          
          // Save file metadata to database
          await upsertFile(userId, file, courseId, publicUrl);
          
          courseProcessed++;
          totalImported++;
        } catch (error: any) {
          console.warn(`Failed to import file ${file.id}:`, error.message);
        }
      }
      
      details.push({ courseId, count: courseProcessed, totalFiles: files.length });
      
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
 * POST /api/sync/import-files
 * Import files from Canvas LMS
 */
export async function POST(req: NextRequest) {
  try {
    // Ensure database schema is up to date
    await initializeDatabase();
    
    // Authenticate and get session
    const rawUserId = await authenticateRequest(req);
    const userId = await resolveUserId(rawUserId);
    const { baseUrl, cookieValue } = await getCanvasSession(userId);

    // Import files
    const result = await importFiles(userId, baseUrl, cookieValue);

    return createSyncResponse(baseUrl, result);

  } catch (error: any) {
    return handleSyncError(error);
  }
}
