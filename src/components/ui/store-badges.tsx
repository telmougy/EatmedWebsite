import { cn } from '@/lib/cn';

/**
 * Store buttons for the Eatmed mobile app. These are custom buttons rather than
 * Apple/Google's official badge artwork — to ship the official badges, drop the
 * SVGs into `public/` and swap the icons here; the API stays the same.
 */

type StoreButtonProps = {
  href: string;
  /** Small line above the store name, e.g. "Download on the". */
  eyebrow: string;
  /** Store name, e.g. "App Store". */
  label: string;
  className?: string;
};

/** Logos are inline because lucide has neither the Apple wordmark nor the Play glyph. */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"
      />
    </svg>
  );
}

function StoreButton({
  href,
  eyebrow,
  label,
  icon,
  className,
}: StoreButtonProps & { icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${eyebrow} ${label}`}
      className={cn(
        'inline-flex h-14 items-center gap-3 rounded-xl px-5 transition-transform',
        'bg-foreground text-background hover:scale-[1.02] active:scale-100',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex flex-col text-start leading-none">
        <span className="text-[10px] font-medium opacity-80">{eyebrow}</span>
        <span className="mt-1 text-base font-semibold tracking-tight">
          {label}
        </span>
      </span>
    </a>
  );
}

export function AppStoreButton(props: StoreButtonProps) {
  return <StoreButton {...props} icon={<AppleIcon />} />;
}

export function GooglePlayButton(props: StoreButtonProps) {
  return <StoreButton {...props} icon={<GooglePlayIcon />} />;
}

/** Both buttons side by side, wrapping on narrow screens. */
export function StoreButtons({
  appStoreUrl,
  googlePlayUrl,
  appStoreEyebrow,
  appStoreLabel,
  googlePlayEyebrow,
  googlePlayLabel,
  className,
}: {
  appStoreUrl: string;
  googlePlayUrl: string;
  appStoreEyebrow: string;
  appStoreLabel: string;
  googlePlayEyebrow: string;
  googlePlayLabel: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <AppStoreButton
        href={appStoreUrl}
        eyebrow={appStoreEyebrow}
        label={appStoreLabel}
      />
      <GooglePlayButton
        href={googlePlayUrl}
        eyebrow={googlePlayEyebrow}
        label={googlePlayLabel}
      />
    </div>
  );
}
