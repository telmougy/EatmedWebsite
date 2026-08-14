import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import {
  LayoutGrid,
  SlidersHorizontal,
  ShoppingCart,
  CalendarClock,
  Wrench,
  Cog,
  UserCheck,
  Smartphone,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StoreButtons } from '@/components/ui/store-badges';
import { MobileApplicationJsonLd } from '@/components/seo/json-ld';
import { EatmedMark } from '@/components/layout/logo';
import { Link } from '@/i18n/navigation';
import { getSiteSettings } from '@/content/site-settings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'App' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettings();

  return (
    <>
      <MobileApplicationJsonLd
        locale={locale}
        appStoreUrl={settings.appStoreUrl}
        googlePlayUrl={settings.googlePlayUrl}
      />
      <AppContent
        appStoreUrl={settings.appStoreUrl}
        googlePlayUrl={settings.googlePlayUrl}
      />
    </>
  );
}

const FEATURES = [
  { key: 'feature1', icon: LayoutGrid },
  { key: 'feature2', icon: SlidersHorizontal },
  { key: 'feature3', icon: ShoppingCart },
  { key: 'feature4', icon: CalendarClock },
  { key: 'feature5', icon: Wrench },
  { key: 'feature6', icon: Cog },
  { key: 'feature7', icon: UserCheck },
] as const;

const STEPS = ['step1', 'step2', 'step3'] as const;

function AppContent({
  appStoreUrl,
  googlePlayUrl,
}: {
  appStoreUrl: string;
  googlePlayUrl: string;
}) {
  const t = useTranslations('App');

  const storeButtons = (className: string) => (
    <StoreButtons
      appStoreUrl={appStoreUrl}
      googlePlayUrl={googlePlayUrl}
      appStoreEyebrow={t('appStoreEyebrow')}
      appStoreLabel={t('appStoreLabel')}
      googlePlayEyebrow={t('googlePlayEyebrow')}
      googlePlayLabel={t('googlePlayLabel')}
      className={className}
    />
  );

  return (
    <>
      <Section className="border-b" size="default">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
                {t('eyebrow')}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {t('title')}
              </h1>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {t('subtitle')}
              </p>
              <Badge variant="secondary" className="mt-6 gap-1.5">
                <Smartphone className="size-3.5" />
                {t('availability')}
              </Badge>
              {storeButtons('mt-8')}
            </div>

            <div className="flex justify-center lg:justify-end">
              <PhoneMockup caption={t('mockupCaption')} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            title={t('featuresTitle')}
            subtitle={t('featuresSubtitle')}
            align="center"
          />
          {/* Wrap rather than grid so an odd card count still centres its last row. */}
          <div className="flex flex-wrap justify-center gap-4">
            {FEATURES.map(({ key, icon: Icon }) => (
              <Card
                key={key}
                className="flex w-full flex-col gap-3 p-6 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
              >
                <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base leading-tight font-semibold">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`${key}Body`)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/30 border-y" size="sm">
        <Container>
          <SectionHeader title={t('howTitle')} align="center" />
          <ol className="grid gap-8 md:grid-cols-3">
            {STEPS.map((key, i) => (
              <li key={key} className="flex flex-col gap-3">
                <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="text-base leading-tight font-semibold">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`${key}Body`)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              {t('ctaBody')}
            </p>
            {storeButtons('mt-8 justify-center')}
            <p className="text-muted-foreground mt-8 text-sm">
              {t('ctaContactLead')}{' '}
              <Link
                href="/contact"
                className="text-primary font-medium hover:underline"
              >
                {t('ctaContactLink')}
              </Link>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * CSS-only phone frame showing the brand mark as a splash screen, standing in
 * for real app screenshots. Swap the inner panel for an <Image> once store
 * screenshots are available — the frame stays.
 */
function PhoneMockup({ caption }: { caption: string }) {
  return (
    <div
      aria-hidden="true"
      className="border-border bg-background relative h-[520px] w-[260px] rounded-[2.5rem] border-8 shadow-xl"
    >
      <span className="bg-border absolute top-3 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full" />
      <div className="from-primary/15 via-primary/5 flex h-full w-full flex-col items-center justify-center gap-5 rounded-[2rem] bg-gradient-to-b to-transparent">
        <EatmedMark size={96} />
        <span className="text-muted-foreground text-sm font-medium">
          {caption}
        </span>
      </div>
    </div>
  );
}
