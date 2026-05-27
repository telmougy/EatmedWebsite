import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import {
  Award,
  BadgeCheck,
  Building2,
  Hash,
  Calendar,
  FileCheck2,
  Handshake,
  Shield,
  Landmark,
  ExternalLink,
} from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DownloadCTA } from '@/components/ui/download-cta';
import { approvals } from '@/content/approvals';
import { projects } from '@/content/projects';
import type { ApprovalCategory } from '@/content/types';

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

// Display order — most credibility-loaded categories first
const CATEGORY_ORDER: ApprovalCategory[] = [
  'commercial',
  'tax',
  'labor',
  'supplier',
  'completion',
  'military',
  'government',
];

const CATEGORY_ICON: Record<ApprovalCategory, typeof Award> = {
  commercial: BadgeCheck,
  tax: Hash,
  labor: Building2,
  supplier: Handshake,
  completion: FileCheck2,
  military: Shield,
  government: Landmark,
};

function ApprovalsContent() {
  const t = useTranslations('Approvals');
  const tDl = useTranslations('Downloads');
  const locale = useLocale() as 'ar' | 'en';

  const byCategory = approvals.reduce<
    Partial<Record<ApprovalCategory, typeof approvals>>
  >((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});

  const governmentDefenseRefs = projects.filter(
    (p) =>
      p.sector === 'defense' || p.sector === 'guard' || p.sector === 'government',
  ).length;

  const yearsActive = new Date().getFullYear() - 2022;

  return (
    <>
      <Section className="border-b" size="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              {t('eyebrow')}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <DownloadCTA
              href="/downloads/eatmed-company-profile.pdf"
              label={tDl('companyProfile')}
              sizeMb={18}
            />
            <DownloadCTA
              href="/downloads/eatmed-previous-work-and-certifications.pdf"
              label={tDl('previousWork')}
              sizeMb={13}
              variant="outline"
            />
          </div>

          <div className="border-border mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 border-t pt-8 text-center">
            <Stat value={`${yearsActive}+`} label={t('statYears')} />
            <Stat value={`${approvals.length}`} label={t('statCertificates')} />
            <Stat
              value={`${governmentDefenseRefs}`}
              label={t('statGovDefense')}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-12">
            {CATEGORY_ORDER.filter((c) => byCategory[c]?.length).map((cat) => {
              const items = byCategory[cat]!;
              const Icon = CATEGORY_ICON[cat];
              return (
                <div key={cat}>
                  <div className="mb-5 flex items-center gap-2">
                    <Icon className="text-primary size-5" />
                    <h2 className="text-lg font-semibold tracking-tight">
                      {t(`categoryLabels.${cat}`)}
                    </h2>
                    <span className="text-muted-foreground text-sm">
                      ({items.length})
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((a) => (
                      <Card key={a.id} className="flex flex-col gap-3 p-5">
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="outline">
                            {t(`categoryLabels.${a.category}`)}
                          </Badge>
                          <StatusPill expiresOn={a.expiresOn} locale={locale} t={t} />
                        </div>
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
                        {a.evidenceUrl && (
                          <a
                            href={a.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-auto inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                          >
                            {t('viewCertificate')}
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-muted-foreground mt-1 text-xs">{label}</div>
    </div>
  );
}

function StatusPill({
  expiresOn,
  locale,
  t,
}: {
  expiresOn?: string;
  locale: 'ar' | 'en';
  t: ReturnType<typeof useTranslations<'Approvals'>>;
}) {
  if (!expiresOn) return null;

  const expiry = new Date(expiresOn);
  if (Number.isNaN(expiry.getTime())) return null;
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.round((expiry.getTime() - now.getTime()) / msPerDay);

  if (daysLeft < 0) {
    return (
      <Badge
        variant="outline"
        className="shrink-0 border-red-300 text-red-700 text-[10px] dark:border-red-900 dark:text-red-200"
      >
        {t('statusExpired')}
      </Badge>
    );
  }
  if (daysLeft < 90) {
    return (
      <Badge variant="warning" className="shrink-0 text-[10px]">
        {t('statusExpiringSoon')}
      </Badge>
    );
  }
  void locale;
  return (
    <Badge variant="success" className="shrink-0 text-[10px]">
      {t('statusActive')}
    </Badge>
  );
}
