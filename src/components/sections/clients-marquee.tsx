import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { clients } from '@/content/clients';

export function ClientsMarquee() {
  const t = useTranslations('Home');
  const locale = useLocale() as 'ar' | 'en';
  // Double the list for seamless looping
  const doubled = [...clients, ...clients];

  return (
    <section className="border-y bg-muted/30 py-10">
      <Container>
        <p className="text-muted-foreground mb-6 text-center text-xs font-semibold tracking-[0.2em] uppercase">
          {t('trustedBy')}
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-12">
            {doubled.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="text-muted-foreground/80 hover:text-foreground flex h-12 shrink-0 items-center justify-center px-4 text-sm font-semibold tracking-tight transition-colors"
              >
                {client.name[locale]}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
