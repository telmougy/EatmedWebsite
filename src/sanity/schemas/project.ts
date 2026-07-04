import { defineType, defineField } from 'sanity';

/** Mirrors the `Project` type in src/content/types.ts. */
export const project = defineType({
  name: 'project',
  title: 'Reference project',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Project name', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'owner', title: 'Owner / client', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'contractor', title: 'Contractor', type: 'localeString' }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: { list: ['defense', 'guard', 'commercial', 'government', 'utility'] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'A single year (e.g. 2025) or a range (e.g. 2023–ongoing).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['completed', 'ongoing'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'scale', title: 'Scale (optional)', type: 'localeString' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name.en', subtitle: 'sector' } },
});
