import * as React from 'react';
import { cn } from '@/lib/cn';
import { Container } from './container';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bleed?: boolean;
  size?: 'sm' | 'default' | 'lg';
};

export function Section({
  className,
  bleed = false,
  size = 'default',
  children,
  ...props
}: SectionProps) {
  const padding =
    size === 'sm'
      ? 'py-12 md:py-16'
      : size === 'lg'
        ? 'py-24 md:py-32'
        : 'py-16 md:py-24';

  return (
    <section className={cn(padding, className)} {...props}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-primary mb-2 text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
