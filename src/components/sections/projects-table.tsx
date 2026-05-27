'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import { projects } from '@/content/projects';
import type { ProjectSector } from '@/content/types';

type Filter = 'all' | ProjectSector;

const SECTORS: ProjectSector[] = [
  'defense',
  'guard',
  'government',
  'commercial',
  'utility',
];

export function ProjectsTable() {
  const t = useTranslations('Projects');
  const locale = useLocale() as 'ar' | 'en';
  const searchParams = useSearchParams();
  // Hydrate filter from ?sector= URL param so other pages can deep-link
  const [filter, setFilter] = useState<Filter>(() => {
    const initial = searchParams?.get('sector');
    if (initial && (SECTORS as readonly string[]).includes(initial)) {
      return initial as ProjectSector;
    }
    return 'all';
  });

  const sectorCounts = useMemo(() => {
    const counts: Record<ProjectSector, number> = {
      defense: 0,
      guard: 0,
      government: 0,
      commercial: 0,
      utility: 0,
    };
    for (const p of projects) counts[p.sector]++;
    return counts;
  }, []);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: t('filterAll'), count: projects.length },
    { key: 'defense', label: t('filterDefense'), count: sectorCounts.defense },
    { key: 'guard', label: t('filterGuard'), count: sectorCounts.guard },
    {
      key: 'government',
      label: t('filterGovernment'),
      count: sectorCounts.government,
    },
    {
      key: 'commercial',
      label: t('filterCommercial'),
      count: sectorCounts.commercial,
    },
    { key: 'utility', label: t('filterUtility'), count: sectorCounts.utility },
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
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f.key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background hover:bg-muted',
            )}
            aria-pressed={filter === f.key}
          >
            <span>{f.label}</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                filter === f.key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {f.count}
            </span>
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
                  <div className="font-medium">{p.name[locale]}</div>
                  {p.scale && (
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      {p.scale[locale]}
                    </div>
                  )}
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
