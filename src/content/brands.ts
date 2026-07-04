import type { Brand } from './types';
import { sanityFetch } from '@/sanity/fetch';
import { TAGS } from '@/sanity/tags';
import { brandsQuery } from '@/sanity/queries';

// Bundled fallback / seed source for scripts/sanity-import.ts. Remove at cutover.
export const fallbackBrands: Brand[] = [
  { id: 'acm', name: 'ACM', country: 'Italy' },
  { id: 'bft', name: 'BFT', country: 'Italy' },
  { id: 'gfa', name: 'GfA', country: 'Germany' },
  { id: 'liftmaster', name: 'LiftMaster', country: 'USA' },
  { id: 'jielong', name: 'Jielong', country: 'China' },
  { id: 'faac', name: 'FAAC', country: 'Italy' },
  { id: 'rib', name: 'RIB', country: 'Italy' },
  { id: 'dormakaba', name: 'dormakaba', country: 'Germany / Switzerland' },
  { id: 'dorma', name: 'DORMA', country: 'Germany' },
  { id: 'somfy', name: 'Somfy', country: 'France' },
  { id: 'nice', name: 'Nice', country: 'Italy' },
  { id: 'came', name: 'CAME', country: 'Italy' },
];

/** All brands, Sanity-first with static fallback. */
export async function getBrands(): Promise<Brand[]> {
  const data = await sanityFetch<Brand[]>({
    query: brandsQuery,
    tags: [TAGS.brand],
  });
  return data && data.length > 0 ? data : fallbackBrands;
}

/** Resolve an ordered list of brand ids against an already-fetched brand list.
 * Keeps the original array order and drops unknown ids. */
export function resolveBrands(ids: string[] | undefined, all: Brand[]): Brand[] {
  if (!ids?.length) return [];
  return ids
    .map((id) => all.find((b) => b.id === id))
    .filter((b): b is Brand => Boolean(b));
}
