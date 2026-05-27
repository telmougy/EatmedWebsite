'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

type NavLink = { href: string; key: 'home' | 'about' | 'products' | 'projects' | 'approvals' | 'contact' };

export function MobileNav({ links }: { links: NavLink[] }) {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={t('openMenu')}
        >
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content
          className={cn(
            'bg-background fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col gap-6 p-6 shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-left rtl:data-[state=closed]:slide-out-to-left',
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {t('home')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={t('closeMenu')}>
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-medium"
          >
            {t('getQuote')}
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
