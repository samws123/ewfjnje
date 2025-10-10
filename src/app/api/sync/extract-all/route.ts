import { NextRequest } from 'next/server';
import { initializeDatabase, query } from '@/lib/database';
import { authenticateRequest, resolveUserId, getCanvasSession } from '../utils/auth';
import { handleSyncError, createSyncResponse } from '../utils/response';
import { extractTextUniversal } from '@/lib/extractText';

/**
 * Fetch fresh public URL for a file
 */
async function fetchFreshPublicUrl(baseUrl: string, cookieValue: string, fileId: string): Promise<string | null> {
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
  } catch {
    return null;
  }
}

/**
 * Extract text from all files in a course
 */
async function extractAllTexts(userId: string, courseId: string, baseUrl: string, cookieValue: string, limit = 50, force = false): Promise<any> {
  console.log(`Starting text extraction for course ${courseId}, limit: ${limit}, force: ${force}`);
  
  // Get files to process
  const filesResult = await query(
    `SELECT id, filename, content_type, size, public_download_url, extracted_text
     FROM files
     WHERE user_id = $1 AND course_id = $2
     ORDER BY id ASC
     LIMIT $3`,
    [userId, courseId, Math.max(1, Number(limit) || 50)]
  );

  console.log(`Found ${filesResult.rows.length} files for course ${courseId}`);

  let processed = 0;
  let stored = 0;
  const details: any[] = [];

  for (const file of filesResult.rows) {
    processed++;
    console.log(`Processing file ${file.id}: ${file.filename} (${file.content_type})`);
    
    // Skip if already has extracted text and not forcing
    if (file.extracted_text && !force) {
      console.log(`Skipping file ${file.id} - already has extracted text`);
      details.push({ id: file.id, skipped: true });
      continue;
    }

    let url = file.public_download_url;
    console.log(`File ${file.id} public URL: ${url ? 'exists' : 'missing'}`);
    
    // Get fresh public URL if needed
    if (!url) {
      console.log(`Fetching fresh public URL for file ${file.id}`);
      url = await fetchFreshPublicUrl(baseUrl, cookieValue, file.id);
      if (url) {
        console.log(`Got fresh URL for file ${file.id}`);
        await query(`UPDATE files SET public_download_url = $1 WHERE id = $2`, [url, file.id]);
      } else {
        console.log(`Failed to get fresh URL for file ${file.id}`);
      }
    }
    
    if (!url) {
      console.log(`No URL available for file ${file.id}`);
      details.push({ 
        id: file.id, 
        error: 'no_public_url',
        filename: file.filename,
        contentType: file.content_type 
      });
      continue;
    }

    try {
      console.log(`Downloading file ${file.id} from ${url.substring(0, 100)}...`);
      const response = await fetch(url, { 
        headers: { 'User-Agent': 'DuNorth-Server/1.0' } 
      });
      
      if (!response.ok) {
        console.log(`Download failed for file ${file.id}: ${response.status}`);
        details.push({ 
          id: file.id, 
          error: `download_${response.status}`,
          filename: file.filename,
          contentType: file.content_type 
        });
        continue;
      }
      
      const buffer = Buffer.from(await response.arrayBuffer());
      console.log(`Downloaded file ${file.id}: ${buffer.length} bytes`);
      
      // Hard cap 20MB
      if (buffer.length > 20 * 1024 * 1024) {
        console.log(`File ${file.id} too large: ${buffer.length} bytes`);
        details.push({ 
          id: file.id, 
          error: 'too_large',
          filename: file.filename,
          contentType: file.content_type,
          size: buffer.length 
        });
        continue;
      }
      
      console.log(`Extracting text from file ${file.id} (${file.filename}, ${file.content_type})`);
      const text = await extractTextUniversal(buffer, file.filename || '', file.content_type || '');
      
      if (text && text.trim()) {
        console.log(`Successfully extracted ${text.length} characters from file ${file.id}`);
        // Store extracted text (limit to 5MB)
        await query(
          `UPDATE files SET extracted_text = $1 WHERE id = $2`, 
          [text.slice(0, 5_000_000), file.id]
        );
        stored++;
        details.push({ 
          id: file.id, 
          ok: true, 
          len: text.length,
          filename: file.filename,
          contentType: file.content_type 
        });
      } else {
        console.log(`No text extracted from file ${file.id} (${file.filename}, ${file.content_type})`);
        details.push({ 
          id: file.id, 
          error: 'no_text',
          filename: file.filename,
          contentType: file.content_type,
          size: buffer.length 
        });
      }
    } catch (error: any) {
      console.error(`Error processing file ${file.id}:`, error);
      details.push({ 
        id: file.id, 
        error: String(error.message || error),
        filename: file.filename,
        contentType: file.content_type 
      });
    }
  }

  return {
    courseId,
    processed,
    stored,
    details
  };
}

/**
 * POST /api/sync/extract-all
 * Extract text from all files in a course
 */
export async function POST(req: NextRequest) {
  try {
    // Ensure database schema is up to date
    await initializeDatabase();
    
    // Authenticate and get session
    const rawUserId = await authenticateRequest(req);
    const userId = await resolveUserId(rawUserId);
    const { baseUrl, cookieValue } = await getCanvasSession(userId);

    // Get request body
    const body = await req.json();
    const { courseId, force = false, limit = 50 } = body;

    if (!courseId) {
      return Response.json({ error: 'courseId required' }, { status: 400 });
    }

    // Extract texts
    const result = await extractAllTexts(userId, courseId, baseUrl, cookieValue, limit, force);

    return createSyncResponse(baseUrl, { 
      ok: true, 
      ...result 
    });

  } catch (error: any) {
    return handleSyncError(error);
  }
}
