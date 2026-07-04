import { defineType, defineField } from 'sanity';

/** Mirrors the `Brand` type in src/content/types.ts. Brand names are not
 * localized (proper nouns), matching the existing data. */
export const brand = defineType({
  name: 'brand',
  title: 'Motor / equipment brand',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Key (stable id)',
      type: 'string',
      description:
        'Lowercase identifier products use to link to this brand, e.g. "came". Set once and do not change.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'country', title: 'Country of origin', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'country' } },
});
