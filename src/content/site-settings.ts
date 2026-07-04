import { sanityFetch } from '@/sanity/fetch';
import { TAGS } from '@/sanity/tags';
import { siteSettingsQuery } from '@/sanity/queries';
import { site } from '@/lib/site';
import type { Bilingual } from './types';

/**
 * Editable company facts. Sanity values override the code-resident `site`
 * defaults field-by-field; anything absent in Sanity falls back to `site`, so
 * this is always fully populated. `site.url` stays env-driven and is not
 * editable here. Server-only (async) — client components keep using `site`.
 */
export type SiteSettings = {
  email: string;
  emailInfo: string;
  phones: string[];
  whatsapp: string;
  address: Bilingual;
  city: string;
  postalCode: string;
  cr: string;
  vat: string;
};

type SanitySiteSettings = Partial<SiteSettings>;

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SanitySiteSettings>({
    query: siteSettingsQuery,
    tags: [TAGS.siteSettings],
  });

  return {
    email: data?.email || site.email,
    emailInfo: data?.emailInfo || site.emailInfo,
    phones: data?.phones?.length ? data.phones : [...site.phones],
    whatsapp: data?.whatsapp || site.whatsapp,
    address: data?.address ?? { ...site.address },
    city: data?.city || site.city,
    postalCode: data?.postalCode || site.postalCode,
    cr: data?.cr || site.cr,
    vat: data?.vat || site.vat,
  };
}
