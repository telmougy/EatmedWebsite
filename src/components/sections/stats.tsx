import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { projectStats } from '@/content/projects';
import { brands } from '@/content/brands';

export function Stats() {
  const t = useTranslations('Home');

  const items = [
    { value: `${projectStats.total}+`, label: t('statsProjects') },
    { value: `${projectStats.sectors}`, label: t('statsSectors') },
    { value: `${projectStats.yearsActive}+`, label: t('statsYears') },
    { value: `${brands.length}`, label: t('statsBrands') },
  ];

  return (
    <Section
      id="stats"
      className="bg-brand-navy text-background dark:bg-card dark:text-foreground"
      size="default"
    >
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        {t('statsTitle')}
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-primary text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {s.value}
            </dd>
            <p className="text-background/70 dark:text-muted-foreground mt-2 text-sm font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </dl>
    </Section>
  );
}
