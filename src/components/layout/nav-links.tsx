'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { NavLink } from './nav-link';

export function NavLinks({ links }: { links: NavLink[] }) {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {links.map((link) => {
        // Boundary-aware: a plain startsWith would light up /app on /approvals.
        const active =
          link.href === '/'
            ? pathname === '/'
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'text-primary'
                : 'text-foreground/70 hover:text-foreground',
            )}
          >
            {t(link.key)}
            {active ? (
              <span className="bg-primary absolute inset-x-3 -bottom-1 h-0.5 rounded-full" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
