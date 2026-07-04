import { defineType, defineField } from 'sanity';

/** Mirrors the `Approval` type in src/content/types.ts. Certs have expiry dates,
 * the clearest case for non-technical self-service. */
export const approval = defineType({
  name: 'approval',
  title: 'Approval / certification',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'issuer', title: 'Issued by', type: 'localeString', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['commercial', 'tax', 'labor', 'government', 'military', 'supplier', 'completion'],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'number', title: 'Certificate number', type: 'string' }),
    defineField({ name: 'issuedOn', title: 'Issued on', type: 'date', options: { dateFormat: 'YYYY-MM-DD' } }),
    defineField({ name: 'expiresOn', title: 'Expires on', type: 'date', options: { dateFormat: 'YYYY-MM-DD' } }),
    defineField({ name: 'image', title: 'Certificate scan (image)', type: 'image' }),
    defineField({
      name: 'evidenceFile',
      title: 'Evidence document (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'evidenceUrl',
      title: 'External evidence URL',
      type: 'url',
      description: 'Use only when the evidence lives off-site; otherwise upload a file above.',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'title.en', subtitle: 'category', media: 'image' } },
});
