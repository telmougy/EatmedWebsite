/**
 * Centralized Sanity environment config.
 *
 * The whole CMS layer is *optional*: when `projectId` is absent the site falls
 * back to the bundled static content in `src/content/*`, so local dev and CI
 * builds keep working with zero Sanity setup. `isSanityConfigured` is the single
 * switch every accessor checks before attempting a network fetch.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

/** Server-only read token (drafts/preview). Never exposed to the client. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? '';

/** True only when a real project is wired up. Gates every Sanity fetch. */
export const isSanityConfigured = projectId.length > 0;
