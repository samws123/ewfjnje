'use client';

export default function ClosedBeta() {
  const src = '/api/nectir-proxy?url=https://ai.nectir.io/';

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


