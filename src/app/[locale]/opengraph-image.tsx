import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Eatmed Automatic Doors';

/**
 * Locale-neutral OG image.
 *
 * Why English-only: @vercel/og (satori) doesn't reliably support Arabic
 * glyph shaping (`lookupType 5 substFormat 3` is unimplemented), so even
 * embedding Noto Arabic faces fails for many strings. Standard practice
 * across multilingual marketing sites (Stripe, Vercel, Linear) is a
 * brand-led, Latin-script social card. The page itself still serves Arabic
 * content; only the social preview thumbnail falls back to the wordmark.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F2A24 100%)',
          color: 'white',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Eatmed 3E mark — inline SVG, white-on-dark for the social card */}
          <svg
            width="96"
            height="96"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="90" y="28" width="32" height="200" fill="#FFFFFF" />
            <rect x="10" y="28" width="112" height="32" fill="#FFFFFF" />
            <rect x="42" y="112" width="80" height="32" fill="#FFFFFF" />
            <rect x="70" y="196" width="52" height="32" fill="#FFFFFF" />
            <path d="M10 196 H70 V228 H50 V252 H10 Z" fill="#3DB87A" />
            <rect x="134" y="28" width="32" height="200" fill="#FFFFFF" />
            <rect x="134" y="28" width="52" height="32" fill="#FFFFFF" />
            <path d="M246 60 H186 V28 H206 V4 H246 Z" fill="#3DB87A" />
            <rect x="134" y="112" width="80" height="32" fill="#FFFFFF" />
            <rect x="134" y="196" width="112" height="32" fill="#FFFFFF" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Eatmed
            </div>
            <div
              style={{
                fontSize: '14px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#94A3B8',
                marginTop: '4px',
              }}
            >
              Automatic Doors
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#4CB07D',
              fontWeight: 600,
            }}
          >
            Saudi Arabia · Riyadh
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '1000px',
            }}
          >
            Industrial-grade automatic door solutions
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#CBD5E1',
              fontWeight: 500,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Supply · Installation · 24-hour maintenance — trusted by Defense,
            Aramco, SEC and SWCC.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '72px',
            fontSize: '20px',
            color: '#94A3B8',
            fontWeight: 500,
          }}
        >
          eatmed.sa
        </div>
      </div>
    ),
    { ...size },
  );
}
