import { sanityFetch } from '@/sanity/fetch';
import { TAGS } from '@/sanity/tags';
import { uiStringsQuery } from '@/sanity/queries';

/**
 * UI-string overrides from Sanity, merged over the bundled JSON in
 * src/i18n/messages by src/i18n/request.ts.
 *
 * The JSON stays authoritative: only non-empty Sanity values override a key, so
 * a blank/missing entry can never blank the live UI. Entries are stored flat by
 * dotted path (e.g. `Home.heroTitle`) and reconstructed into the nested message
 * tree next-intl expects.
 */

type Entry = { path: string; ar?: string | null; en?: string | null };
type Messages = Record<string, unknown>;

function setDeep(target: Messages, path: string, value: string) {
  const parts = path.split('.');
  let cursor: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (typeof cursor[key] !== 'object' || cursor[key] === null) {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[parts[parts.length - 1]] = value;
}

/** Recursively merge `override` onto `base`, leaf values winning. */
export function deepMerge<T extends Messages>(base: T, override: Messages): T {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = out[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      out[key] = deepMerge(existing as Messages, value as Messages);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

/** Nested override tree for a locale, or `{}` when there are no overrides. */
export async function getMessageOverrides(
  locale: 'ar' | 'en',
): Promise<Messages> {
  const entries = await sanityFetch<Entry[]>({
    query: uiStringsQuery,
    tags: [TAGS.uiStrings],
  });
  if (!entries?.length) return {};

  const overrides: Messages = {};
  for (const entry of entries) {
    const value = entry[locale];
    if (typeof value === 'string' && value.trim().length > 0) {
      setDeep(overrides, entry.path, value);
    }
  }
  return overrides;
}
