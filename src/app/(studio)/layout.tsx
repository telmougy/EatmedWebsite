import type { Metadata } from 'next';

/**
 * Dedicated root layout for the embedded Sanity Studio. The public site's root
 * layout lives under `[locale]`; the Studio is locale-agnostic, so it gets its
 * own minimal `<html>` shell via this route group. Always noindex.
 */
export const metadata: Metadata = {
  title: 'Eatmed Studio',
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
