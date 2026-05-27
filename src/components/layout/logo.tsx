import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

import markLight from '../../../public/logo/mark.png';
import markDark from '../../../public/logo/mark-dark.png';
import wordmarkEn from '../../../public/logo/wordmark-en.png';
import wordmarkAr from '../../../public/logo/wordmark-ar.png';

/**
 * Eatmed brand mark — the official PNG provided by the user.
 * Two static-imported variants: `mark.png` (navy + green, for light bg)
 * and `mark-dark.png` (off-white + green, for dark bg). The wrong one
 * is hidden via `dark:hidden` / `hidden dark:block`.
 */
export function EatmedMark({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn('relative inline-block shrink-0', className)}
      style={{ width: size, height: size }}
      aria-label="Eatmed"
      role="img"
    >
      <Image
        src={markLight}
        alt=""
        width={size}
        height={size}
        priority
        className="dark:hidden"
      />
      <Image
        src={markDark}
        alt=""
        width={size}
        height={size}
        priority
        className="hidden dark:block"
      />
    </span>
  );
}

/**
 * Full lockup: mark + locale-aware wordmark.
 * Both assets are the official PNGs from /public/logo. Mark uses
 * paired light/dark variants; wordmark flips dark navy → white in
 * dark mode via a CSS filter.
 */
export function Logo({
  className,
  size = 'default',
  variant = 'horizontal',
}: {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'horizontal' | 'mark' | 'stacked';
}) {
  const locale = useLocale() as 'ar' | 'en';
  const dim = size === 'sm' ? 30 : size === 'lg' ? 48 : 38;
  const wordmarkHeight = size === 'sm' ? 18 : size === 'lg' ? 28 : 22;

  const wordmark = locale === 'ar' ? wordmarkAr : wordmarkEn;
  const wordmarkAspect = wordmark.width / wordmark.height;

  return (
    <Link
      href="/"
      className={cn(
        'group focus-visible:ring-ring inline-flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2',
        variant === 'stacked' && 'flex-col items-center gap-3',
        className,
      )}
      aria-label="Eatmed"
    >
      <EatmedMark size={dim} />
      {variant !== 'mark' && (
        <Image
          src={wordmark}
          alt={locale === 'ar' ? 'اعتمد' : 'Eatmed'}
          height={wordmarkHeight}
          width={Math.round(wordmarkHeight * wordmarkAspect)}
          priority
          className="dark:brightness-0 dark:invert"
        />
      )}
    </Link>
  );
}
