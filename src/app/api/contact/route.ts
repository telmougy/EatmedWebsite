import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { site } from '@/lib/site';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 422 });
  }
  const { name, company, email, phone, message, website } = parsed.data;

  // Honeypot — silently succeed without sending
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey) {
    // No key configured — log to server but return success so the form still works in dev
    console.warn('[contact] RESEND_API_KEY not set; skipping send. Payload:', {
      name, company, email, phone, message,
    });
    return NextResponse.json({ ok: true, mode: 'dev' });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Eatmed Website <noreply@eatmed.sa>`,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name: ${name}`,
        company ? `Company: ${company}` : null,
        `Email: ${email}`,
        `Phone: ${phone}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
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
