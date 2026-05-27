import { site } from '@/lib/site';
import type { Locale, Product } from '@/content/types';

const PRODUCT_CATEGORY_LABEL: Record<Product['category'], string> = {
  rolling: 'Rolling doors',
  shutter: 'Shutter doors',
  gate: 'Gates',
  glass: 'Automatic glass doors',
  safety: 'Fire & emergency doors',
  barrier: 'Parking barriers',
};

function jsonLdScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/logo/mark.png`,
    image: `${site.url}/logo/mark.png`,
    email: site.email,
    telephone: site.phones[0],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        locale === 'ar' ? 'شارع عبدالله بن مسعود' : 'Abdullah Bin Masoud Street',
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.6087,
      longitude: 46.6443,
    },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'CR', value: site.cr },
      { '@type': 'PropertyValue', propertyID: 'VAT', value: site.vat },
    ],
    vatID: site.vat,
    contactPoint: site.phones.map((tel, i) => ({
      '@type': 'ContactPoint',
      telephone: tel,
      contactType: i === 0 ? 'customer support' : 'sales',
      areaServed: 'SA',
      availableLanguage: ['Arabic', 'English'],
    })),
    sameAs: [],
    inLanguage: locale,
  };

  return jsonLdScript(data);
}

export function ProductJsonLd({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const image = product.hero
    ? `${site.url}${product.hero.startsWith('/') ? '' : '/'}${product.hero}`
    : undefined;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale],
    description: product.description[locale],
    ...(image ? { image } : {}),
    category: PRODUCT_CATEGORY_LABEL[product.category],
    brand: {
      '@type': 'Brand',
      name: site.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.url,
    },
    inLanguage: locale,
  };

  return jsonLdScript(data);
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return jsonLdScript(data);
}
