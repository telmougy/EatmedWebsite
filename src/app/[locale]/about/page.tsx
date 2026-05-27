import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Eye, Send, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { OrgChart } from '@/components/sections/org-chart';
import { site } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: t('title'),
    description: t('introBody'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('About');
  const locale = useLocale() as 'ar' | 'en';

  return (
    <>
      <Section className="border-b">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
            {t('subtitle')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
        </div>
      </Section>

      <Section size="default">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              {t('introTitle')}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t('introBody')}
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {t('introBody2')}
            </p>
          </div>
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="bg-primary/10 text-primary mb-4 inline-flex size-12 items-center justify-center rounded-xl">
                <MapPin className="size-6" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {t('officeTitle')}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {site.address[locale]}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8">
            <div className="bg-primary/10 text-primary mb-4 inline-flex size-12 items-center justify-center rounded-xl">
              <Eye className="size-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {t('visionTitle')}
            </h3>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              {t('visionBody')}
            </p>
          </Card>
          <Card className="p-8">
            <div className="bg-primary/10 text-primary mb-4 inline-flex size-12 items-center justify-center rounded-xl">
              <Send className="size-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {t('missionTitle')}
            </h3>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              {t('missionBody')}
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title={t('orgChartTitle')}
          subtitle={t('orgChartSubtitle')}
          align="center"
        />
        <OrgChart />
      </Section>
    </>
  );
}
