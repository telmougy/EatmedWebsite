import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, ArrowLeft, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { ProductCard } from '@/components/product/product-card';
import { products, getProductBySlug } from '@/content/products';
import { getBrand } from '@/content/brands';
import { whatsappLink } from '@/lib/site';

type RouteParams = { locale: string; slug: string };

export async function generateStaticParams() {
  return products.flatMap((p) =>
    (['ar', 'en'] as const).map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const name = product.name[locale as 'ar' | 'en'];
  return {
    title: name,
    description: product.tagline[locale as 'ar' | 'en'],
    openGraph: {
      title: `${name} | ${t('siteName')}`,
      description: product.tagline[locale as 'ar' | 'en'],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail slug={slug} />;
}

function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)!;
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('Products');

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  const motors = product.motors?.map(getBrand).filter(Boolean) ?? [];

  return (
    <>
      <Section className="border-b" size="sm">
        <Container>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t('title')}
          </Link>
        </Container>
      </Section>

      <Section size="default">
        <Container className="grid gap-12 lg:grid-cols-5">
          {/* Visual */}
          <div className="lg:col-span-2">
            <div className="bg-muted from-primary/15 via-primary/5 to-muted relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, currentColor 0 2px, transparent 2px 14px)',
                  color: 'oklch(0.22 0.06 264)',
                }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.useCases.map((u) => (
                <Badge key={u} variant="outline" className="capitalize">
                  {u}
                </Badge>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-3">
            <Badge variant="secondary" className="mb-3 capitalize">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name[locale]}
            </h1>
            <p className="text-primary mt-2 text-base font-medium">
              {product.tagline[locale]}
            </p>
            <p className="text-muted-foreground mt-6 text-base leading-relaxed">
              {product.description[locale]}
            </p>

            <div className="mt-8">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                {t('highlightsTitle')}
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                    <span>{h[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold"
              >
                {t('requestQuote')}
              </Link>
              <a
                href={whatsappLink(product.name[locale])}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-background hover:bg-muted inline-flex h-11 items-center gap-2 rounded-lg border px-5 text-sm font-semibold"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {(product.specs?.length || motors.length > 0) && (
        <Section className="bg-muted/30" size="default">
          <Container className="grid gap-8 lg:grid-cols-2">
            {product.specs && product.specs.length > 0 && (
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold tracking-tight">
                  {t('specsTitle')}
                </h2>
                <dl className="divide-y divide-border">
                  {product.specs.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <dt className="text-muted-foreground">{s.label[locale]}</dt>
                      <dd className="font-medium">{s.value[locale]}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            )}
            {motors.length > 0 && (
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold tracking-tight">
                  {t('compatibleMotorsTitle')}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {motors.map((b) => (
                    <li
                      key={b!.id}
                      className="bg-background border-border rounded-md border px-3 py-1.5 text-sm font-medium"
                    >
                      {b!.name}
                      {b!.country && (
                        <span className="text-muted-foreground ms-2 text-xs">
                          {b!.country}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            {t('relatedTitle')}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
