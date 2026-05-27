import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Link } from '@/i18n/navigation';
import { whatsappLink } from '@/lib/site';

export function FinalCta() {
  const t = useTranslations('Home');
  const tContact = useTranslations('Contact');

  return (
    <Section id="cta" size="default">
      <div className="from-primary via-primary to-emerald-500 dark:from-primary dark:via-primary dark:to-emerald-600 relative isolate overflow-hidden rounded-3xl bg-gradient-to-br px-6 py-16 text-center shadow-xl sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 0%, transparent 35%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)',
          }}
        />
        <h2 className="text-primary-foreground relative text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t('ctaTitle')}
        </h2>
        <p className="text-primary-foreground/85 relative mx-auto mt-4 max-w-xl text-base sm:text-lg">
          {t('ctaBody')}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="bg-background text-foreground hover:bg-background/90 inline-flex h-12 items-center gap-2 rounded-lg px-6 text-base font-semibold shadow-sm"
          >
            {t('ctaButton')}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 inline-flex h-12 items-center gap-2 rounded-lg border px-6 text-base font-semibold backdrop-blur-sm"
          >
            <MessageCircle className="size-4" />
            {tContact('whatsapp')}
          </a>
        </div>
      </div>
    </Section>
  );
}
