import Script from 'next/script';

import { site } from '@/lib/site';

// Kept out of `next dev` and preview deployments so test traffic never reaches
// the Ads account. VERCEL_ENV is absent off-Vercel, which is fine — NODE_ENV
// alone already excludes local development.
const enabled =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview';

/** Google tag (gtag.js) — Google Ads conversion tracking. */
export function GoogleTag() {
  const id = site.googleTagId;
  if (!enabled || !id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
