import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Award, BadgeCheck, Building2, Hash, Calendar } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { approvals } from '@/content/approvals';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Approvals' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ApprovalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ApprovalsContent />;
}

const categoryIcon = {
  commercial: BadgeCheck,
  tax: Hash,
  labor: Building2,
  government: Award,
  military: Award,
} as const;

function ApprovalsContent() {
  const t = useTranslations('Approvals');
  const locale = useLocale() as 'ar' | 'en';

  const byCategory = approvals.reduce<Record<string, typeof approvals>>(
    (acc, a) => {
      (acc[a.category] ??= []).push(a);
      return acc;
    },
    {},
  );

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
        <div className="space-y-12">
          {Object.entries(byCategory).map(([cat, items]) => {
            const Icon = categoryIcon[cat as keyof typeof categoryIcon] ?? Award;
            return (
              <div key={cat}>
                <div className="mb-5 flex items-center gap-2">
                  <Icon className="text-primary size-5" />
                  <h2 className="text-lg font-semibold tracking-tight capitalize">
                    {cat}
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <Card key={a.id} className="space-y-3 p-5">
                      <Badge variant="outline" className="capitalize">
                        {a.category}
                      </Badge>
                      <h3 className="text-base font-semibold leading-tight">
                        {a.title[locale]}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t('issuedBy')}: {a.issuer[locale]}
                      </p>
                      <div className="border-border space-y-1 border-t pt-3 text-xs">
                        {a.number && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Hash className="size-3" />
                            <span dir="ltr">{a.number}</span>
                          </div>
                        )}
                        {a.issuedOn && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="size-3" />
                            {t('issuedOn')}:{' '}
                            <span dir="ltr">{a.issuedOn}</span>
                          </div>
                        )}
                        {a.expiresOn && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="size-3" />
                            {t('expiresOn')}:{' '}
                            <span dir="ltr">{a.expiresOn}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
