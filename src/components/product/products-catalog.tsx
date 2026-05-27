'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { products } from '@/content/products';
import type { ProductUseCase } from '@/content/types';
import { ProductCard } from './product-card';

type Filter = 'all' | ProductUseCase;

export function ProductsCatalog() {
  const t = useTranslations('Products');
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'residential', label: t('filterResidential') },
    { key: 'commercial', label: t('filterCommercial') },
    { key: 'industrial', label: t('filterIndustrial') },
    { key: 'security', label: t('filterSecurity') },
  ];

  const filtered = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((p) => p.useCases.includes(filter));
  }, [filter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f.key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background hover:bg-muted',
            )}
            aria-pressed={filter === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
