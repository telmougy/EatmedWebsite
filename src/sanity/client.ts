import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

/**
 * Shared read client. `null` when Sanity isn't configured so callers can cleanly
 * fall back to static content instead of constructing a useless client.
 *
 * `useCdn: false` because content is fetched at build time / during on-demand
 * revalidation, where freshness matters more than the CDN edge cache.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
    })
  : null;
