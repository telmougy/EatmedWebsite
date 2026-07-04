import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { TAGS } from '@/sanity/tags';

/**
 * On-demand revalidation webhook called by Sanity on publish.
 *
 * Sanity signs the request with SANITY_REVALIDATE_SECRET; `parseBody` verifies
 * that signature. The payload's `_type` matches our cache tag names (see
 * src/sanity/tags.ts), so we revalidate exactly the affected content with no
 * full redeploy. Configure the webhook to send `{ "_type": _type }`.
 */

type WebhookPayload = { _type?: string };

const KNOWN_TAGS = new Set<string>(Object.values(TAGS));

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    const type = body?._type;
    if (!type) {
      return new NextResponse('Bad request: missing _type', { status: 400 });
    }

    if (!KNOWN_TAGS.has(type)) {
      // Unknown document type — nothing to revalidate, but not an error.
      return NextResponse.json({ revalidated: false, type, reason: 'untracked' });
    }

    // Next 16 requires a cache-life profile; 'max' purges on demand.
    revalidateTag(type, 'max');
    return NextResponse.json({ revalidated: true, type });
  } catch (err) {
    console.error('[revalidate] failed:', err);
    return new NextResponse('Error revalidating', { status: 500 });
  }
}
