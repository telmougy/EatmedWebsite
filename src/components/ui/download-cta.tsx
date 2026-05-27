import { Download } from 'lucide-react';
import { cn } from '@/lib/cn';

type DownloadCTAProps = {
  href: string;
  label: string;
  /** Approximate file size in MB to surface to the user. */
  sizeMb?: number;
  variant?: 'primary' | 'outline';
  className?: string;
  download?: boolean | string;
};

export function DownloadCTA({
  href,
  label,
  sizeMb,
  variant = 'primary',
  className,
  download = true,
}: DownloadCTAProps) {
  return (
    <a
      href={href}
      download={download === true ? '' : download || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border-border bg-background text-foreground hover:bg-muted border',
        className,
      )}
    >
      <Download className="size-4 shrink-0" />
      <span>{label}</span>
      {typeof sizeMb === 'number' && (
        <span className="text-xs opacity-70">
          (PDF{sizeMb >= 1 ? `, ${Math.round(sizeMb)} MB` : ''})
        </span>
      )}
    </a>
  );
}
