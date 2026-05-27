import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/content/types';

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('Products');

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group focus-visible:outline-none"
    >
      <Card className="group-focus-visible:ring-ring h-full overflow-hidden p-0 group-focus-visible:ring-2 group-focus-visible:ring-offset-2">
        <div className="bg-muted/40 from-primary/5 via-primary/0 to-muted/40 relative aspect-[5/4] overflow-hidden bg-gradient-to-br">
          {product.hero ? (
            <Image
              src={product.hero}
              alt={product.name[locale]}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, currentColor 0 2px, transparent 2px 14px)',
                color: 'oklch(0.22 0.06 264)',
              }}
            />
          )}
          <div className="absolute top-3 end-3">
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <h3 className="text-base font-semibold leading-tight tracking-tight">
            {product.name[locale]}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {product.tagline[locale]}
          </p>
          <div className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium">
            {t('viewDetails')}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-[270deg] rtl:group-hover:-translate-x-0.5 rtl:group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
