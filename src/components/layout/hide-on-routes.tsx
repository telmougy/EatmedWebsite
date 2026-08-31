'use client';

import { usePathname } from '@/i18n/navigation';

/**
 * Hides layout chrome on specific routes. Paths are locale-agnostic
 * (next-intl's usePathname strips the locale prefix), so '/app' covers
 * both /ar/app and /en/app.
 */
export function HideOnRoutes({
  paths,
  children,
}: {
  paths: readonly string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (paths.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
