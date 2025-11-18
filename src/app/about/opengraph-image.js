import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'EscStack Leadership Team - Ayaz, Rizwan, Tayyab, Meer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 80, fontWeight: 'bold', margin: 0 }}>EscStack Leadership</h1>
          <p style={{ fontSize: 40, color: '#60a5fa', marginTop: 20 }}>
            Ayaz • Rizwan • Tayyab • Meer
          </p>
          <div style={{ display: 'flex', marginTop: 40 }}>
             {/* You can even load external photos of founders here if you have URLs */}
             <div style={{ background: '#334155', padding: '10px 30px', borderRadius: 50 }}>
                Building the Future
             </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}