import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
'https://www.dunorth.io/',
]

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  const response = NextResponse.next()

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

// Apply middleware to API routes only (optional)
export const config = {
  matcher: ['/api/:path*'],
}
