import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TARGET_ORIGIN = 'https://ai.nectir.io';

function targetFrom(req: NextRequest): URL {
  const u = new URL(req.url);
  const urlParam = u.searchParams.get('url');
  if (urlParam) {
    const t = new URL(urlParam);
    if (t.hostname !== new URL(TARGET_ORIGIN).hostname) {
      throw new Error('Blocked host.');
    }
    return t;
  }
  const path = u.searchParams.get('path') || '/';
  return new URL(path, TARGET_ORIGIN);
}

async function proxy(req: NextRequest) {
  let target: URL;
  try {
    target = targetFrom(req);
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }

  const method = req.method.toUpperCase();
  try {
    // eslint-disable-next-line no-console
    console.log(`[Proxy] ${new Date().toISOString()} method=${method} input=${req.url} -> target=${target.href}`)
  } catch {}
  const headers = new Headers(req.headers);
  headers.set('host', new URL(TARGET_ORIGIN).host);
  headers.set('origin', TARGET_ORIGIN);
  headers.set('referer', TARGET_ORIGIN + '/');
  headers.set('accept-encoding', 'identity');

  const hasBody = !['GET', 'HEAD'].includes(method);
  const body = hasBody ? req.body : undefined;

  const upstream = await fetch(target, {
    method,
    headers,
    body,
    redirect: 'manual',
  });

  try { console.log(`[Proxy] upstream status=${upstream.status} content-type=${upstream.headers.get('content-type')}`) } catch {}

  const outHeaders = new Headers(upstream.headers);
  outHeaders.delete('x-frame-options');
  outHeaders.delete('content-security-policy');
  outHeaders.set('referrer-policy', 'no-referrer');

  const blocklist = [
    'x-middleware-rewrite',
    'x-middleware-next',
    'x-nextjs-rewrite',
    'x-nextjs-redirect',
  ];
  blocklist.forEach((header) => outHeaders.delete(header));

  const loc = outHeaders.get('location');
  if (loc) {
    let rewrittenLocation = loc;
    try {
      const targetUrl = new URL(loc, TARGET_ORIGIN);
      const targetHost = new URL(TARGET_ORIGIN).hostname;
      if (targetUrl.hostname === targetHost) {
        const encoded = encodeURIComponent(targetUrl.toString());
        rewrittenLocation = `/api/nectir-proxy?url=${encoded}`;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`[Proxy] Failed to rewrite redirect location "${loc}":`, error);
    }
    outHeaders.set('location', rewrittenLocation);
  }

  const setCookie = upstream.headers.get('set-cookie');
  if (setCookie) {
    outHeaders.set(
      'set-cookie',
      setCookie
        .replace(/Domain=[^;]+/gi, 'Domain=dunorth.io')
        .replace(/SameSite=(Lax|Strict)/gi, 'SameSite=None') + '; Secure'
    );
  }

  const ctype = upstream.headers.get('content-type') || '';
  if (ctype.includes('text/html')) {
    const html = await upstream.text();
    const injected = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${TARGET_ORIGIN}/">`
    );
    return new NextResponse(injected, {
      status: upstream.status,
      headers: outHeaders,
    });
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: outHeaders,
  });
}

export async function GET(req: NextRequest) { return proxy(req); }
export async function HEAD(req: NextRequest) { return proxy(req); }
export async function POST(req: NextRequest) { return proxy(req); }
export async function PUT(req: NextRequest) { return proxy(req); }
export async function PATCH(req: NextRequest) { return proxy(req); }
export async function DELETE(req: NextRequest) { return proxy(req); }
export async function OPTIONS(req: NextRequest) { return proxy(req); }


