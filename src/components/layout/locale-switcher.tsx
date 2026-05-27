'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const other = locale === 'ar' ? 'en' : 'ar';

  const switchLocale = () => {
    // Replace the locale prefix in the current pathname
    const segments = pathname.split('/');
    if (routing.locales.includes(segments[1] as (typeof routing.locales)[number])) {
      segments[1] = other;
    } else {
      segments.splice(1, 0, other);
    }
    router.replace(segments.join('/') || `/${other}`);
  };

  // params used for type-narrowing only
  void params;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="gap-1.5"
      aria-label={t('label')}
    >
      <Globe className="size-4" />
      <span className="font-medium">{t(other as 'ar' | 'en')}</span>
    </Button>
  );
}
