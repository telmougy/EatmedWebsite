import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { site } from '@/lib/site';
import { leadSchema, type LeadInput } from '@/lib/lead-schema';

const SCOPE_LABELS: Record<NonNullable<LeadInput['scope']>, string> = {
  supply: 'Supply only',
  'supply-install': 'Supply + install',
  maintenance: 'Maintenance',
  custom: 'Custom project',
};

const URGENCY_LABELS: Record<NonNullable<LeadInput['urgency']>, string> = {
  immediate: 'Immediate',
  '1-3-months': '1–3 months',
  '3-6-months': '3–6 months',
  planning: 'Planning / future',
};

function formatBody(data: LeadInput): string {
  const sep = '─'.repeat(40);
  const scopeLabel = data.scope ? SCOPE_LABELS[data.scope] : '—';
  const urgencyLabel = data.urgency ? URGENCY_LABELS[data.urgency] : '—';
  const product = data.productName
    ? `${data.productName}${data.productSlug ? ` (${data.productSlug})` : ''}`
    : '—';

  return [
    'Eatmed — New Enquiry',
    sep,
    `Name      : ${data.name}`,
    `Company   : ${data.company ?? '—'}`,
    `Email     : ${data.email}`,
    `Phone     : ${data.phone}`,
    `City      : ${data.city ?? '—'}`,
    `Locale    : ${data.locale ?? '—'}`,
    `Source    : ${data.sourcePage ?? '—'}`,
    sep,
    `Scope     : ${scopeLabel}`,
    `Product   : ${product}`,
    `Quantity  : ${data.quantity ?? '—'}`,
    `Dimensions: ${data.dimensions ?? '—'}`,
    `Urgency   : ${urgencyLabel}`,
    sep,
    'Message:',
    data.message,
  ].join('\n');
}

function formatSubject(data: LeadInput): string {
  const parts: string[] = [];
  if (data.scope) parts.push(SCOPE_LABELS[data.scope]);
  if (data.productName) parts.push(data.productName);
  parts.push(data.name);
  if (data.company) parts.push(`(${data.company})`);
  return `New enquiry — ${parts.join(' — ')}`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot — silently succeed without sending
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const text = formatBody(data);

  if (!apiKey) {
    // No key configured — log to server but return success so the form still works in dev
    console.warn('[contact] RESEND_API_KEY not set; skipping send. Payload:\n' + text);
    return NextResponse.json({ ok: true, mode: 'dev' });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Eatmed Website <noreply@eatmed.sa>`,
      to,
      replyTo: data.email,
      subject: formatSubject(data),
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json(
      { ok: false, error: 'send_failed' },
      { status: 500 },
    );
  }
}
