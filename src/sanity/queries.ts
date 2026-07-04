/**
 * GROQ queries. Each projection resolves Sanity-specific shapes (image assets,
 * references) down to the *exact* plain shapes the app's content types expect
 * (src/content/types.ts) — image fields become URL strings, brand references
 * become string ids — so consumers stay byte-compatible with the static data.
 */

// Localized objects ({ar,en}) pass through unchanged. Images → asset URL string.
const PRODUCT_PROJECTION = /* groq */ `{
  "slug": slug.current,
  name, category, useCases, tagline, description, highlights, specs, featured,
  "hero": hero.asset->url,
  "gallery": gallery[].asset->url,
  "drawing": drawing.asset->url,
  "motors": motors[]->id,
  bestFor, material, maxDimensions, motorCompatibility, fireRating, warranty,
  commonApplications
}`;

export const productsQuery = /* groq */ `*[_type == "product"] | order(order asc) ${PRODUCT_PROJECTION}`;

export const productSlugsQuery = /* groq */ `*[_type == "product" && defined(slug.current)].slug.current`;

export const featuredProductsQuery = /* groq */ `*[_type == "product" && featured == true] | order(order asc) ${PRODUCT_PROJECTION}`;

export const projectsQuery = /* groq */ `*[_type == "project"] | order(order asc) {
  "id": _id, name, location, owner, contractor, sector, year, status, scale
}`;

export const approvalsQuery = /* groq */ `*[_type == "approval"] | order(order asc) {
  "id": _id, title, issuer, category, number,
  "issuedOn": issuedOn, "expiresOn": expiresOn,
  "image": image.asset->url,
  "evidenceUrl": coalesce(evidenceUrl, evidenceFile.asset->url)
}`;

export const clientsQuery = /* groq */ `*[_type == "client"] | order(order asc) {
  "id": _id, name, "logo": logo.asset->url
}`;

export const brandsQuery = /* groq */ `*[_type == "brand"] | order(order asc) {
  id, name, country
}`;

export const uiStringsQuery = /* groq */ `*[_type == "uiStrings"][0].entries[]{ path, ar, en }`;

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  email, emailInfo, phones, whatsapp, address, city, postalCode, cr, vat
}`;
