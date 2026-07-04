import { defineType, defineField, defineArrayMember } from 'sanity';

/** Mirrors the `Product` type in src/content/types.ts. */
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    { name: 'decision', title: 'Decision-support (optional)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'localeString', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['rolling', 'shutter', 'gate', 'glass', 'safety', 'barrier'],
        layout: 'dropdown',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'useCases',
      title: 'Use cases',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: ['residential', 'commercial', 'industrial', 'security'] },
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'hero', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({ name: 'drawing', title: 'Technical drawing', type: 'image' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'localeText', validation: (r) => r.required() }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'value', type: 'localeString', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label.en', subtitle: 'value.en' } },
        }),
      ],
    }),
    defineField({
      name: 'motors',
      title: 'Compatible motor brands',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'brand' }] })],
    }),
    defineField({ name: 'featured', title: 'Featured on home page', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 0 }),
    // Decision-support fields
    defineField({ name: 'bestFor', title: 'Best for', type: 'array', fieldset: 'decision', of: [defineArrayMember({ type: 'localeString' })] }),
    defineField({ name: 'material', title: 'Material', type: 'localeString', fieldset: 'decision' }),
    defineField({ name: 'maxDimensions', title: 'Max dimensions', type: 'localeString', fieldset: 'decision' }),
    defineField({ name: 'motorCompatibility', title: 'Motor compatibility', type: 'localeString', fieldset: 'decision' }),
    defineField({ name: 'fireRating', title: 'Fire rating', type: 'localeString', fieldset: 'decision' }),
    defineField({ name: 'warranty', title: 'Warranty', type: 'localeString', fieldset: 'decision' }),
    defineField({ name: 'commonApplications', title: 'Common applications', type: 'array', fieldset: 'decision', of: [defineArrayMember({ type: 'localeString' })] }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name.en', subtitle: 'category', media: 'hero' } },
});
