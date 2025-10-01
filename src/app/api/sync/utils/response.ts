import { NextResponse } from 'next/server';

/**
 * Handle sync API errors with consistent error responses
 */
export function handleSyncError(error: any) {
  console.error('Sync API error:', error);
  
  // Handle specific error types
  if (error.message === 'Missing token' || error.message === 'Invalid token') {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  
  if (error.message === 'No stored Canvas session') {
    return NextResponse.json({ error: 'No stored session' }, { status: 404 });
  }
  
  return NextResponse.json({ 
    error: 'internal_error', 
    detail: String(error.message || error) 
  }, { status: 500 });
}

/**
 * Create successful sync response
 */
export function createSyncResponse(baseUrl: string, result: any) {
  return NextResponse.json({ 
    ok: true, 
    baseUrl,
    ...result
  });
}
