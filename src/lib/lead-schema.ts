import { z } from 'zod';

export const SCOPES = [
  'supply',
  'supply-install',
  'maintenance',
  'custom',
] as const;
export type Scope = (typeof SCOPES)[number];

export const URGENCIES = [
  'immediate',
  '1-3-months',
  '3-6-months',
  'planning',
] as const;
export type Urgency = (typeof URGENCIES)[number];

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  company: z.string().optional(),
  city: z.string().optional(),
  scope: z.enum(SCOPES).optional(),
  productSlug: z.string().optional(),
  productName: z.string().optional(),
  quantity: z.number().int().positive().optional(),
  dimensions: z.string().optional(),
  urgency: z.enum(URGENCIES).optional(),
  sourcePage: z.string().optional(),
  locale: z.enum(['ar', 'en']).optional(),
  message: z.string().min(10),
  website: z.string().optional(), // honeypot
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Use with react-hook-form `register(field, { setValueAs })` to strip empty selects. */
export const emptyToUndefined = (v: unknown) =>
  v === '' || v === null || v === undefined ? undefined : v;

/** Use with react-hook-form `register('quantity', { setValueAs })`. */
export const toNumberOrUndefined = (v: unknown) => {
  if (v === '' || v === null || v === undefined) return undefined;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
};
