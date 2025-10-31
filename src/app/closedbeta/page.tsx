'use client';

import { useMemo } from 'react';

export default function ClosedBeta() {
  const src = useMemo(() => {
    const url = new URL('/api/nectir-proxy', window.location.origin);
    url.searchParams.set('url', 'https://ai.nectir.io/');
    return url.toString();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <iframe
        src={src}
        title="DuNorth Closed Beta"
        style={{ border: '0', width: '100%', height: '100%' }}
        allow="clipboard-read; clipboard-write; microphone; camera; fullscreen *"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-downloads allow-modals"
      />
    </div>
  );
}


