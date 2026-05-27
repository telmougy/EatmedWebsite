# Eatmed Website

Marketing and identity site for **مؤسسة أعتمد للأبواب الأوتوماتيكية / Eatmed Automatic Doors** — Riyadh, KSA.

Bilingual (Arabic / English), light and dark themes, SEO-ready, built for Vercel.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (OKLCH token-based design system)
- **next-intl** for path-based i18n (`/ar` default, `/en`)
- **next-themes** for light/dark with system preference
- **shadcn-style** primitives on top of Radix UI
- **Framer Motion**, **lucide-react**
- **react-hook-form** + **zod** for the contact form
- **Resend** for transactional email

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in the values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/ar` (Arabic, default).

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with Turbopack |
| `pnpm build` | Production build (statically pre-renders all routes) |
| `pnpm start` | Run the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |

## Project layout

```
src/
  app/
    [locale]/             # ar | en — all public pages
    api/contact/route.ts  # POST → Resend
    sitemap.ts, robots.ts # auto-generated SEO
  components/
    ui/                   # Button, Card, Input, Section, ... (primitives)
    layout/               # Header, Footer, MobileNav, Theme/Locale toggles, WhatsApp FAB
    sections/             # Hero, Services, WhyEatmed, Stats, ProjectsTable, ContactForm, ...
    product/              # ProductCard, ProductsCatalog
    seo/                  # JSON-LD components
  content/                # 🟢 Edit content here (typed)
    products.ts           # 17 product lines with bilingual specs
    projects.ts           # 29 reference projects
    clients.ts            # strategic clients
    approvals.ts          # certifications (CR, VAT, GOSI, Qiwa, military approvals, ...)
    brands.ts             # CAME, Nice, GfA, Dormakaba, ...
  i18n/
    routing.ts            # locales config
    request.ts            # next-intl getRequestConfig
    navigation.ts         # locale-aware <Link>, useRouter, usePathname
    messages/{ar,en}.json # UI copy
  lib/
    site.ts               # company facts (CR, address, phones, WhatsApp)
    cn.ts                 # className helper
  proxy.ts                # next-intl locale negotiation (renamed from middleware in Next 16)
```

## Editing content

- **Product specs / new product** → `src/content/products.ts`
- **New reference project** → `src/content/projects.ts`
- **UI strings** → `src/i18n/messages/{ar,en}.json`
- **Phone numbers, address, email** → `src/lib/site.ts`

All product/project text is bilingual: `{ ar: '...', en: '...' }`.

## RTL conventions

Tailwind logical properties are used everywhere — **never** use `pl-`/`pr-`/`ml-`/`mr-`/`text-left`/`text-right`. Use `ps-`/`pe-`/`ms-`/`me-`/`text-start`/`text-end` so RTL mirrors automatically. Directional icons (arrows, chevrons) get `rtl:rotate-180`.

## Theming

CSS variables in `src/app/globals.css` (in OKLCH) drive both themes. Tokens are exposed to Tailwind via `@theme inline`. The `.dark` class on `<html>` flips the variable set. `next-themes` handles the class with `disableTransitionOnChange` to prevent FOUC.

## SEO

- `src/app/sitemap.ts` and `src/app/robots.ts` auto-generate.
- Per-route `generateMetadata` sets localized titles + `alternates.languages` (hreflang).
- `src/components/seo/json-ld.tsx` injects `Organization` JSON-LD on every page.

## Environment

See `.env.example`. The only mandatory variable for production is `RESEND_API_KEY` (otherwise the contact form silently logs in dev mode). `NEXT_PUBLIC_SITE_URL` should be set to the production origin for correct OG/sitemap URLs.

## Deploying

1. Connect the GitHub repo to Vercel.
2. Add env vars in the Vercel project settings.
3. Point `eatmed.sa` (or the chosen domain) at Vercel.
4. The build prerenders all 50 pages (`/ar` + `/en` × every route).
