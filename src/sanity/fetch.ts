import { client } from './client';
import { readToken } from './env';

/**
 * Tagged read used by every content accessor.
 *
 * - Returns `null` when Sanity isn't configured or the request fails, so callers
 *   fall back to bundled static content rather than crashing the build. The CMS
 *   is an enhancement, never a single point of failure.
 * - `tags` feed Next's cache so `/api/revalidate` can surgically refresh just the
 *   affected content (e.g. `revalidateTag('product')`) without a full redeploy.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags: string[];
}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      // Drafts are only read when a token is present (preview/build); otherwise
      // published content is served from the standard API.
      ...(readToken ? { token: readToken } : {}),
      next: { tags },
    });
  } catch (err) {
    console.error('[sanity] fetch failed, falling back to static content:', err);
    return null;
  }
}
