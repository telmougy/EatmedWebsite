/**
 * One-time seed: pushes the bundled static content (src/content/*, the i18n
 * JSON, and src/lib/site.ts) into Sanity.
 *
 * Idempotent — every document uses a deterministic `_id` and `createOrReplace`,
 * so re-running updates in place rather than duplicating. Sanity dedupes asset
 * uploads by content hash, so images aren't re-stored on repeat runs.
 *
 * Run:  pnpm sanity:import
 * Needs: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *        SANITY_API_WRITE_TOKEN  (Developer role — the Editor role's token was
 *        read-only on this project and mutations failed with "create required").
 */
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';

// Load .env.local (standalone scripts don't get Next's env loading).
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
  for (const line of envFile.split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trimStart().startsWith('#')) {
      const key = m[1];
      const val = m[2].replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = val;
    }
  }
} catch {
  // No .env.local — rely on real environment variables.
}

import { fallbackProducts } from '../src/content/products';
import { fallbackProjects } from '../src/content/projects';
import { fallbackApprovals } from '../src/content/approvals';
import { fallbackClients } from '../src/content/clients';
import { fallbackBrands } from '../src/content/brands';
import { site } from '../src/lib/site';
import en from '../src/i18n/messages/en.json';
import ar from '../src/i18n/messages/ar.json';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. ' +
      'Set them in your environment before running the import.',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  // Writes use a stable legacy API version; newer versions (2024+) reject this
  // token's mutations with "permission create required".
  apiVersion: '2021-06-07',
  useCdn: false,
});

const PUBLIC = resolve(process.cwd(), 'public');

/** Upload a file from /public as a Sanity asset; returns a reference object. */
async function uploadAsset(
  kind: 'image' | 'file',
  publicPath: string,
): Promise<{ _type: 'image' | 'file'; asset: { _type: 'reference'; _ref: string } } | undefined> {
  try {
    const buf = await readFile(resolve(PUBLIC, publicPath.replace(/^\//, '')));
    const asset = await client.assets.upload(kind, buf, {
      filename: publicPath.split('/').pop(),
    });
    return { _type: kind, asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ! could not upload ${publicPath}:`, (err as Error).message);
    return undefined;
  }
}

async function importBrands() {
  console.log('Importing brands…');
  for (const [i, b] of fallbackBrands.entries()) {
    await client.createOrReplace({
      _id: `brand-${b.id}`,
      _type: 'brand',
      id: b.id,
      name: b.name,
      country: b.country,
      order: i,
    });
  }
}

async function importProducts() {
  console.log('Importing products…');
  for (const [i, p] of fallbackProducts.entries()) {
    const hero = p.hero ? await uploadAsset('image', p.hero) : undefined;
    await client.createOrReplace({
      _id: `product-${p.slug}`,
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      useCases: p.useCases,
      ...(hero ? { hero } : {}),
      tagline: p.tagline,
      description: p.description,
      highlights: p.highlights,
      ...(p.specs ? { specs: p.specs } : {}),
      ...(p.motors
        ? {
            motors: p.motors.map((id) => ({
              _type: 'reference',
              _ref: `brand-${id}`,
              _key: id,
            })),
          }
        : {}),
      featured: p.featured ?? false,
      order: i,
      ...(p.bestFor ? { bestFor: p.bestFor } : {}),
      ...(p.material ? { material: p.material } : {}),
      ...(p.maxDimensions ? { maxDimensions: p.maxDimensions } : {}),
      ...(p.motorCompatibility ? { motorCompatibility: p.motorCompatibility } : {}),
      ...(p.fireRating ? { fireRating: p.fireRating } : {}),
      ...(p.warranty ? { warranty: p.warranty } : {}),
      ...(p.commonApplications ? { commonApplications: p.commonApplications } : {}),
    });
  }
}

async function importProjects() {
  console.log('Importing projects…');
  for (const [i, p] of fallbackProjects.entries()) {
    await client.createOrReplace({
      _id: `project-${p.id}`,
      _type: 'project',
      name: p.name,
      location: p.location,
      owner: p.owner,
      ...(p.contractor ? { contractor: p.contractor } : {}),
      sector: p.sector,
      year: String(p.year),
      status: p.status,
      ...(p.scale ? { scale: p.scale } : {}),
      order: i,
    });
  }
}

async function importApprovals() {
  console.log('Importing approvals…');
  for (const [i, a] of fallbackApprovals.entries()) {
    const image = a.image ? await uploadAsset('image', a.image) : undefined;
    // Local /downloads/* paths become uploaded file assets; real URLs stay as-is.
    const localEvidence =
      a.evidenceUrl && a.evidenceUrl.startsWith('/')
        ? await uploadAsset('file', a.evidenceUrl)
        : undefined;
    await client.createOrReplace({
      _id: `approval-${a.id}`,
      _type: 'approval',
      title: a.title,
      issuer: a.issuer,
      category: a.category,
      ...(a.number ? { number: a.number } : {}),
      ...(a.issuedOn ? { issuedOn: a.issuedOn } : {}),
      ...(a.expiresOn ? { expiresOn: a.expiresOn } : {}),
      ...(image ? { image } : {}),
      ...(localEvidence ? { evidenceFile: localEvidence } : {}),
      ...(a.evidenceUrl && !a.evidenceUrl.startsWith('/')
        ? { evidenceUrl: a.evidenceUrl }
        : {}),
      order: i,
    });
  }
}

async function importClients() {
  console.log('Importing clients…');
  for (const [i, c] of fallbackClients.entries()) {
    const logo = c.logo ? await uploadAsset('image', c.logo) : undefined;
    await client.createOrReplace({
      _id: `client-${c.id}`,
      _type: 'client',
      name: c.name,
      ...(logo ? { logo } : {}),
      order: i,
    });
  }
}

/** Flatten a nested messages object into dotted-path leaves. */
function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value as Record<string, unknown>, path));
    } else if (typeof value === 'string') {
      out[path] = value;
    }
  }
  return out;
}

async function importUiStrings() {
  console.log('Importing UI strings…');
  const enFlat = flatten(en as Record<string, unknown>);
  const arFlat = flatten(ar as Record<string, unknown>);
  const paths = Array.from(new Set([...Object.keys(enFlat), ...Object.keys(arFlat)])).sort();
  const entries = paths.map((path) => ({
    _key: path.replace(/[^a-zA-Z0-9]/g, '_'),
    _type: 'entry',
    path,
    ar: arFlat[path] ?? '',
    en: enFlat[path] ?? '',
  }));
  await client.createOrReplace({
    _id: 'uiStrings',
    _type: 'uiStrings',
    entries,
  });
}

async function importSiteSettings() {
  console.log('Importing company info…');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    email: site.email,
    emailInfo: site.emailInfo,
    phones: [...site.phones],
    whatsapp: site.whatsapp,
    address: { ...site.address },
    city: site.city,
    postalCode: site.postalCode,
    cr: site.cr,
    vat: site.vat,
  });
}

async function main() {
  console.log(`Seeding Sanity project ${projectId} / ${dataset}…\n`);
  // Brands first — products reference them.
  await importBrands();
  await importProducts();
  await importProjects();
  await importApprovals();
  await importClients();
  await importUiStrings();
  await importSiteSettings();
  console.log('\n✅ Import complete.');
}

main().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
