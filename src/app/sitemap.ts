import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import { products } from '@/content/products';

const staticPaths = ['', '/about', '/products', '/projects', '/approvals', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const base = site.url;
  const now = new Date();

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`]),
          ),
        },
      });
    }
    for (const p of products) {
      entries.push({
        url: `${base}/${locale}/products/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}/products/${p.slug}`]),
          ),
        },
      });
    }
  }
  return entries;
}
