import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
'https://www.dunorth.io/',
]

export function middleware(req: NextRequest) {
  // Debug: log host and URL early
  try {
    // eslint-disable-next-line no-console
    console.log(`[MW] start ${new Date().toISOString()} host=${req.headers.get('host')} url=${req.url}`)
  } catch {}

  // Force apex to www for all paths
  const host = req.headers.get('host') || ''
  if (host === 'dunorth.io') {
    const url = new URL(req.url)
    url.host = 'www.dunorth.io'
    try { console.log(`[MW] apex->www redirect to ${url.href}`) } catch {}
    return NextResponse.redirect(url, 307)
  }

  // No special routing now; the /closedbeta page will iframe the proxy
  {
    const u = new URL(req.url)
    if (u.pathname.startsWith('/closedbeta')) {
      try { console.log(`[MW] /closedbeta pass-through pathname=${u.pathname} search=${u.search}`) } catch {}
    }
  }

  const origin = req.headers.get('origin') || ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  const response = NextResponse.next()

  // Ensure /closedbeta is never cached by browsers/CDN
  const url = new URL(req.url)
  if (url.pathname.startsWith('/closedbeta')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  }

  // Set basic CORS headers
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    try { console.log('[MW] OPTIONS preflight handled') } catch {}
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    })
  }

  try { console.log('[MW] next()') } catch {}
  return response
}

export const config = {
  // run on everything so apex → www redirect always applies
  matcher: ['/(.*)'],
}
