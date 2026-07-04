import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Singleton holding overrides for the UI microcopy that otherwise lives in
 * src/i18n/messages/{ar,en}.json. Modeled as a flat, searchable translation
 * table keyed by the full dotted path (e.g. `Home.heroTitle`,
 * `Products.decision.material`).
 *
 * Design intent (defensive — these strings are layout-coupled):
 *  - The JSON files remain the guaranteed source of truth/fallback. Entries here
 *    only *override* matching keys, so a missing/blank entry never blanks the UI
 *    (see src/i18n/request.ts).
 *  - A generic table (vs. one field per key) means new i18n keys added in code
 *    never break this schema, and editors search by path instead of scrolling.
 */
export const uiStrings = defineType({
  name: 'uiStrings',
  title: 'UI text',
  type: 'document',
  fields: [
    defineField({
      name: 'entries',
      title: 'Text entries',
      description:
        'Search by key path (e.g. "Home.heroTitle"). Anything left blank keeps the built-in default text.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'entry',
          fields: [
            defineField({
              name: 'path',
              title: 'Key path',
              type: 'string',
              readOnly: true,
              validation: (r) => r.required(),
            }),
            defineField({ name: 'ar', title: 'العربية (Arabic)', type: 'text', rows: 2 }),
            defineField({ name: 'en', title: 'English', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'path', subtitle: 'en' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'UI text' }) },
});
