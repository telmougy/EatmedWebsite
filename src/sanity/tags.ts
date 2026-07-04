/**
 * Cache tags shared between content fetches and the /api/revalidate webhook.
 * Tag names match the Sanity document `_type` so the webhook can revalidate by
 * the published document's type with no extra mapping.
 */
export const TAGS = {
  product: 'product',
  project: 'project',
  approval: 'approval',
  client: 'client',
  brand: 'brand',
  uiStrings: 'uiStrings',
  siteSettings: 'siteSettings',
} as const;
