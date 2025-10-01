import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'dev-secret-change-in-production';

function isUuid(v: string): boolean { 
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v); 
}

async function callCanvasPaged(baseUrl: string, cookieValue: string, path: string) {
  const tryNames = ['_legacy_normandy_session', 'canvas_session'];
  const out: any[] = [];
  let url = `${baseUrl}${path}`;
  
  for (let page = 0; page < 50 && url; page++) {
    let resp;
    for (const name of tryNames) {
      resp = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Cookie': `${name}=${cookieValue}`,
          'User-Agent': 'DuNorth-Server/1.0'
        },
        redirect: 'follow'
      });
      if (resp.ok) break;
      if (![401, 403].includes(resp.status)) break;
    }
    
    if (!resp?.ok) {
      const txt = await resp.text().catch(() => '');
      throw new Error(`Canvas error ${resp?.status}: ${txt.slice(0, 300)}`);
    }
    
    const data = await resp.json();
    if (Array.isArray(data)) out.push(...data);
    
    const link = resp.headers.get('Link') || '';
    const m = /<([^>]+)>;\s*rel="next"/.exec(link);
    url = m ? m[1] : null;
  }
  return out;
}

async function callCanvasJson(baseUrl: string, cookieValue: string, path: string, preferredName?: string) {
  const tryNames = preferredName 
    ? [preferredName, '_legacy_normandy_session', 'canvas_session'] 
    : ['canvas_session', '_legacy_normandy_session'];
    
  for (const name of tryNames) {
    const r = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Accept': 'application/json',
        'Cookie': `${name}=${cookieValue}`,
        'User-Agent': 'DuNorth-Server/1.0'
      },
      redirect: 'follow'
    });
    
    const ct = r.headers.get('content-type') || '';
    if (r.ok && ct.includes('application/json')) return await r.json();
    
    if (![401, 403].includes(r.status)) {
      const t = await r.text().catch(() => '');
      throw new Error(`Canvas error ${r.status}: ${t.slice(0, 300)}`);
    }
  }
  throw new Error('Unauthorized');
}

export async function POST(request: NextRequest) {
  try {
    // Extract userId from JWT token
    let tokenUserId = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.slice(7);
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        tokenUserId = decoded.userId;
      } catch (e) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }
    
    if (!tokenUserId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Ensure we have a real users.id UUID to reference
    let userId = tokenUserId;
    if (!isUuid(userId)) {
      const email = `${String(tokenUserId).replace(/[^a-zA-Z0-9._-]/g, '_')}@local.test`;
      const up = await query(
        `INSERT INTO users(email, name) VALUES($1,$2)
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`,
        [email, 'Cookie Test User']
      );
      userId = up.rows[0].id;
    }
    
    const body = await request.json();
    const { baseUrl, sessionCookie, cookieName, cookieDomain } = body || {};
    
    if (!baseUrl || !sessionCookie) {
      return NextResponse.json({ error: 'baseUrl and sessionCookie required' }, { status: 400 });
    }
    
    // Fetch Canvas user profile (server-side) to confirm auth and capture name/email
    let canvasSelf = null;
    try {
      canvasSelf = await callCanvasJson(baseUrl, sessionCookie, '/api/v1/users/self', cookieName);
    } catch (e) {
      // continue; we still store the session (but mark name as null so UI can't confuse sources)
      canvasSelf = null;
    }

    // Create user_canvas_sessions table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS user_canvas_sessions (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        base_url TEXT NOT NULL,
        session_cookie TEXT NOT NULL,
        canvas_user_id INTEGER,
        canvas_name TEXT,
        canvas_email TEXT,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (user_id, base_url)
      )
    `);

    // Store/update session and canvas identity fields
    await query(`
      INSERT INTO user_canvas_sessions(user_id, base_url, session_cookie, canvas_user_id, canvas_name, canvas_email, expires_at, created_at) 
      VALUES($1, $2, $3, $4, $5, $6, $7, NOW()) 
      ON CONFLICT (user_id, base_url) 
      DO UPDATE SET 
        session_cookie = EXCLUDED.session_cookie,
        canvas_user_id = EXCLUDED.canvas_user_id,
        canvas_name = EXCLUDED.canvas_name,
        canvas_email = EXCLUDED.canvas_email,
        expires_at = EXCLUDED.expires_at,
        updated_at = NOW()
    `, [
      userId, 
      baseUrl, 
      sessionCookie,
      canvasSelf?.id || null,
      canvasSelf?.name || null,
      canvasSelf?.login_id || null,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    ]);

    // Also persist the user's name in users table for chat lookup
    if (canvasSelf?.name) {
      await query(`UPDATE users SET name = $1 WHERE id = $2`, [canvasSelf.name, userId]);
    }

    // Immediately import courses (server-side)
    let imported = 0;
    try {
      const courses = await callCanvasPaged(baseUrl, sessionCookie, '/api/v1/courses?enrollment_state=active&per_page=100');
      
      // Create courses table if it doesn't exist
      await query(`
        CREATE TABLE IF NOT EXISTS courses (
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          id INTEGER NOT NULL,
          name TEXT,
          course_code TEXT,
          term TEXT,
          raw_json JSONB,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          PRIMARY KEY (user_id, id)
        )
      `);
      
      for (const c of courses) {
        await query(
          `INSERT INTO courses(user_id, id, name, course_code, term, raw_json, created_at, updated_at)
           VALUES($1,$2,$3,$4,$5,$6, NOW(), NOW())
           ON CONFLICT (user_id, id) DO UPDATE
             SET name = EXCLUDED.name,
                 course_code = EXCLUDED.course_code,
                 term = EXCLUDED.term,
                 raw_json = EXCLUDED.raw_json,
                 updated_at = NOW()`,
          [userId, c.id, c.name || null, c.course_code || null, c.term?.name || null, c]
        );
        imported++;
      }
    } catch (e: any) {
      return NextResponse.json({ 
        ok: true, 
        baseUrl, 
        name: canvasSelf?.name || null, 
        imported: 0, 
        importError: String(e.message || e) 
      });
    }
    
    return NextResponse.json({ 
      ok: true, 
      baseUrl, 
      name: canvasSelf?.name || null, 
      imported 
    });
    
  } catch (error: any) {
    console.error('[Store Session] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to store session', 
      detail: String(error.message || error) 
    }, { status: 500 });
  }
}
