'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/lib/site';

export function WhatsAppFab() {
  const t = useTranslations('Contact');
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="fixed bottom-6 end-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <MessageCircle className="size-7" />
      <span className="sr-only">{t('whatsapp')}</span>
    </a>
  );
}
