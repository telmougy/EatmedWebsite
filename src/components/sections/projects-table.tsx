'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import { projects } from '@/content/projects';
import type { ProjectSector } from '@/content/types';

type Filter = 'all' | ProjectSector;

export function ProjectsTable() {
  const t = useTranslations('Projects');
  const locale = useLocale() as 'ar' | 'en';
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'defense', label: t('filterDefense') },
    { key: 'guard', label: t('filterGuard') },
    { key: 'government', label: t('filterGovernment') },
    { key: 'commercial', label: t('filterCommercial') },
    { key: 'utility', label: t('filterUtility') },
  ];

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.sector === filter);
  }, [filter]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
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

      <div className="border-border overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            <tr>
              <th className="px-4 py-3 text-start">{t('columnProject')}</th>
              <th className="hidden px-4 py-3 text-start md:table-cell">
                {t('columnOwner')}
              </th>
              <th className="hidden px-4 py-3 text-start lg:table-cell">
                {t('columnLocation')}
              </th>
              <th className="px-4 py-3 text-start">{t('columnYear')}</th>
              <th className="px-4 py-3 text-start">{t('columnStatus')}</th>
            </tr>
          </thead>
          <tbody className="divide-border bg-background divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-medium">{p.name[locale]}</span>
                </td>
                <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">
                  {p.owner[locale]}
                </td>
                <td className="text-muted-foreground hidden px-4 py-3 lg:table-cell">
                  {p.location[locale]}
                </td>
                <td className="text-muted-foreground px-4 py-3 whitespace-nowrap">
                  {p.year}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={p.status === 'completed' ? 'success' : 'warning'}
                  >
                    {p.status === 'completed'
                      ? t('statusCompleted')
                      : t('statusOngoing')}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground mt-4 text-sm">
        {filtered.length} / {projects.length}
      </p>
    </div>
  );
}
