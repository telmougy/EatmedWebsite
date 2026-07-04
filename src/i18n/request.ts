import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { deepMerge, getMessageOverrides } from '@/content/ui-strings';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Bundled JSON is the authoritative fallback; non-empty Sanity overrides win.
  const base = (await import(`./messages/${locale}.json`)).default;
  const overrides = await getMessageOverrides(locale);
  const messages = Object.keys(overrides).length
    ? deepMerge(base, overrides)
    : base;

  return { locale, messages };
});
