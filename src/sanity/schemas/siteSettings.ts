import { defineType, defineField, defineArrayMember } from 'sanity';

/** Singleton mirroring the company facts in src/lib/site.ts. Read via
 * getSiteSettings(); the code-resident `site` object stays as the fallback. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Company info',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Sales email', type: 'string' }),
    defineField({ name: 'emailInfo', title: 'Info email', type: 'string' }),
    defineField({
      name: 'phones',
      title: 'Phone numbers',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'E.164 format, e.g. +966112380498. First entry is the primary line.',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      description: 'E.164 without the leading +, e.g. 966542606342.',
    }),
    defineField({ name: 'address', title: 'Address', type: 'localeString' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
    defineField({ name: 'cr', title: 'Commercial Registration (CR)', type: 'string' }),
    defineField({ name: 'vat', title: 'VAT number', type: 'string' }),
    defineField({
      name: 'appStoreUrl',
      title: 'App Store link',
      type: 'url',
      description:
        'Apple App Store listing for the Eatmed mobile app. Leave empty to use the built-in link.',
    }),
    defineField({
      name: 'googlePlayUrl',
      title: 'Google Play link',
      type: 'url',
      description:
        'Google Play listing for the Eatmed mobile app. Leave empty to use the built-in link.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Company info' }) },
});
