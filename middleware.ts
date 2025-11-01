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

  // Explicitly rewrite /closedbeta(/**) to our proxy so edge runs and logs
  {
    const u = new URL(req.url)
    if (u.pathname.startsWith('/closedbeta')) {
      const upstreamPath = u.pathname.replace(/^\/closedbeta/, '') || '/'
      const proxied = new URL('/api/nectir-proxy', u)
      proxied.searchParams.set('url', `https://ai.nectir.io${upstreamPath}${u.search || ''}`)
      try { console.log(`[MW] rewrite /closedbeta -> ${proxied.href}`) } catch {}
      const res = NextResponse.rewrite(proxied)
      res.headers.set('x-debug-mw', 'rewrite-closedbeta')
      res.headers.set('x-debug-mw-proxied', proxied.href)
      return res
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
