# Content editing with Sanity (Phase 2)

Non-technical staff edit the site's content in **Sanity Studio**, embedded at
[`/studio`](/studio). The public site stays static (SSG); published edits appear
within seconds via on-demand revalidation — no code, no git, no redeploy.

Until a Sanity project is wired up, the site falls back to the bundled content in
`src/content/*` and `src/i18n/messages/*`, so everything keeps working unchanged.

## What's editable

| In Sanity Studio | Source of truth before Sanity |
| --- | --- |
| Products, Projects, Approvals, Clients, Brands | `src/content/*.ts` |
| UI text (headings, labels, buttons) | `src/i18n/messages/{ar,en}.json` |
| Company info (phones, email, address, CR, VAT, app store links) | `src/lib/site.ts` |

UI text and company info are merged **over** the bundled defaults — a blank entry
keeps the built-in text, so an editor can't blank out the layout.

## One-time setup (developer)

1. Create a free project at <https://sanity.io>. Note the **project ID** and create
   a **dataset** named `production`.
2. Create a write API token (Project → API → Tokens) with the **Developer** role.
   ⚠️ Use **Developer**, not Editor — on this project the Editor role's grants came
   back read-only (`create` was refused), so the import needs Developer (full
   read+write to all datasets). Reads don't need a token at all (the `production`
   dataset is public).
3. Set environment variables (locally in `.env.local`, and in Vercel) — see
   `.env.example` for the full list:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_READ_TOKEN` (Viewer), `SANITY_API_WRITE_TOKEN` (Editor, local only)
   - `SANITY_REVALIDATE_SECRET` (any long random string)
4. Seed the existing content into Sanity:
   ```bash
   pnpm sanity:import
   ```
   Idempotent — safe to re-run; it updates in place and de-dupes image uploads.
5. Add the Studio origin under Sanity → API → CORS origins: your local
   `http://localhost:3000` and the production domain.
6. Configure the publish webhook (Sanity → API → Webhooks):
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: create / update / delete
   - Secret: the same `SANITY_REVALIDATE_SECRET`
   - Projection: `{ "_type": _type }`
7. Invite the editors (Sanity → Members) with the **Editor** role.

## How editors work

- Go to `https://<your-domain>/studio` and sign in with the invited email.
- Each text field has **العربية (Arabic)** and **English** — fill both.
- Upload product/certificate images directly; they're served from Sanity's CDN.
- Click **Publish**. The affected page refreshes on the live site within seconds.

## How it fits together (developer notes)

- `src/sanity/*` — client, env gating (`isSanityConfigured`), tagged `fetch`
  helper (falls back to static on any error), GROQ queries, schemas, Studio config.
- `src/content/*.ts` — unchanged public types; each exposes async accessors
  (`getProducts`, `getProductBySlug`, …) that are **Sanity-first, static-fallback**.
  GROQ projects images to URL strings and brand refs to ids, so the returned
  shapes match the existing types exactly.
- `src/i18n/request.ts` merges Sanity UI-string overrides over the JSON.
- `src/app/api/revalidate/route.ts` — webhook; revalidates the cache tag matching
  the published document's `_type` (tags defined in `src/sanity/tags.ts`).
- Cutover (later): once content is fully managed in Sanity, delete the
  `fallback*` arrays from `src/content/*.ts` (keep the typed accessors).
