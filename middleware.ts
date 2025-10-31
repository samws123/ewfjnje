import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
'https://www.dunorth.io/',
]

export function middleware(req: NextRequest) {
  // Force apex to www for all paths
  const host = req.headers.get('host') || ''
  if (host === 'dunorth.io') {
    const url = new URL(req.url)
    url.host = 'www.dunorth.io'
    return NextResponse.redirect(url, 307)
  }

  // Redirect /closedbeta(/**) straight to external target to bypass app auth entirely
  {
    const url = new URL(req.url)
    if (url.pathname.startsWith('/closedbeta')) {
      const upstreamPath = url.pathname.replace(/^\/closedbeta/, '') || '/'
      const dest = new URL(`https://ai.nectir.io${upstreamPath}${url.search || ''}`)
      return NextResponse.redirect(dest, 307)
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
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    })
  }

  return response
}

export const config = {
  // run on everything so apex → www redirect always applies
  matcher: ['/(.*)'],
}
