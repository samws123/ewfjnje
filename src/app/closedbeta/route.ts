import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function iframeSrc(req: NextRequest): string {
  const u = new URL(req.url)
  // Preserve search params, but point to upstream root unless a passthrough path is desired
  const search = u.search ? `${u.search}&` : '?'
  return `/api/nectir-proxy${search}url=` + encodeURIComponent('https://ai.nectir.io/')
}

export async function GET(req: NextRequest) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DuNorth Closed Beta</title>
    <style>
      html, body { height: 100%; margin: 0; }
      iframe { position: fixed; inset: 0; width: 100%; height: 100%; border: 0; }
    </style>
  </head>
  <body>
    <iframe src="${iframeSrc(req)}"
            title="DuNorth Closed Beta"
            allow="clipboard-read; clipboard-write; microphone; camera; fullscreen *"
            referrerpolicy="no-referrer"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-downloads allow-modals"></iframe>
  </body>
  </html>`

  const res = new NextResponse(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } })
  res.headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0')
  return res
}


