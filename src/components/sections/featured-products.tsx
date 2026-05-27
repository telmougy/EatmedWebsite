import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/section';
import { Link } from '@/i18n/navigation';
import { ProductCard } from '@/components/product/product-card';
import { featuredProducts } from '@/content/products';

export function FeaturedProducts() {
  const t = useTranslations('Home');

  return (
    <Section id="products">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow={t('featuredProductsTitle')}
          title={t('featuredProductsSubtitle')}
          className="mb-0"
        />
        <Link
          href="/products"
          className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
        >
          {t('featuredProductsCta')}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </Section>
  );
}
