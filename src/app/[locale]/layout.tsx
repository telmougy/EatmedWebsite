import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFab } from '@/components/layout/whatsapp-fab';
import { HideOnRoutes } from '@/components/layout/hide-on-routes';
import { BackgroundShader } from '@/components/ui/background-shader';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import { GoogleTag } from '@/components/seo/google-tag';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import { getSiteSettings } from '@/content/site-settings';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-en',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-ar',
  display: 'swap',
});

/** Routes that render without the footer and the floating WhatsApp button. */
const CHROMELESS_ROUTES = ['/app'];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('defaultTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('defaultDescription'),
    applicationName: t('siteName'),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      url: `${site.url}/${locale}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
        'x-default': '/ar',
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground relative isolate flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          {locale === 'ar' ? 'تخطي إلى المحتوى' : 'Skip to main content'}
        </a>
        <GoogleTag />
        <OrganizationJsonLd locale={locale} />
        <BackgroundShader />
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <HideOnRoutes paths={CHROMELESS_ROUTES}>
              <Footer settings={siteSettings} />
              <WhatsAppFab />
            </HideOnRoutes>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
