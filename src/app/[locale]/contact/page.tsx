import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/sections/contact-form';
import { site, whatsappLink, telLink } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations('Contact');
  const locale = useLocale() as 'ar' | 'en';

  return (
    <>
      <Section className="border-b" size="default">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <div className="bg-card border-border rounded-2xl border p-6">
              <h2 className="mb-5 text-lg font-semibold tracking-tight">
                {t('infoTitle')}
              </h2>

              <InfoRow icon={MapPin} label={t('infoAddress')}>
                <span className="text-sm leading-relaxed">
                  {site.address[locale]}
                </span>
              </InfoRow>

              <InfoRow icon={Phone} label={t('infoPhones')}>
                <div className="flex flex-col gap-1" dir="ltr">
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={telLink(p)}
                      className="text-sm hover:underline"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </InfoRow>

              <InfoRow icon={Mail} label={t('infoEmails')}>
                <div className="flex flex-col gap-1" dir="ltr">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm hover:underline"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`mailto:${site.emailInfo}`}
                    className="text-sm hover:underline"
                  >
                    {site.emailInfo}
                  </a>
                </div>
              </InfoRow>

              <InfoRow icon={Clock} label={t('infoHours')} last>
                <span className="text-sm">{t('infoHoursValue')}</span>
              </InfoRow>
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-base font-semibold text-white shadow-sm transition-all hover:shadow-md"
            >
              <MessageCircle className="size-5" />
              {t('whatsapp')}
            </a>
          </aside>
        </Container>
      </Section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
  last,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex gap-3 py-3 ${last ? '' : 'border-border border-b'}`}
    >
      <Icon className="text-primary mt-0.5 size-5 shrink-0" />
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}
