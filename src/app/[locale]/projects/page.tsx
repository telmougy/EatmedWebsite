import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { ProjectsTable } from '@/components/sections/projects-table';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsContent />;
}

function ProjectsContent() {
  const t = useTranslations('Projects');
  return (
    <>
      <Section className="border-b" size="default">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Section>
      <Section>
        <ProjectsTable />
      </Section>
    </>
  );
}
