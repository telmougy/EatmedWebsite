import { site } from '@/lib/site';

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        locale === 'ar' ? 'شارع عبدالله بن مسعود' : 'Abdullah Bin Masoud Street',
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CR',
      value: site.cr,
    },
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
