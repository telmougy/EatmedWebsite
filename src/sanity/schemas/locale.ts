import { defineType, defineField } from 'sanity';

/**
 * Field-level localization primitives mirroring the app's `Bilingual = {ar,en}`
 * shape (src/content/types.ts). Using object types (rather than a localization
 * plugin) keeps the Studio simple, the GROQ trivial, and the one-time import a
 * near-mechanical copy of the existing TypeScript data.
 *
 * Both languages are required so an editor can't half-translate an entity and
 * ship a blank string to one locale.
 */

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized text',
  type: 'object',
  // Arabic first to match the site's default locale (defaultLocale: 'ar').
  fields: [
    defineField({
      name: 'ar',
      title: 'العربية (Arabic)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized paragraph',
  type: 'object',
  fields: [
    defineField({
      name: 'ar',
      title: 'العربية (Arabic)',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});
