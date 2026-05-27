import { useLocale, useTranslations } from 'next-intl';
import {
  Anchor,
  Building2,
  Plane,
  ShieldHalf,
  Droplets,
  Zap,
  Crown,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/card';

type Bilingual = { ar: string; en: string };

type Reference = {
  id: string;
  icon: typeof Plane;
  title: Bilingual;
  body: Bilingual;
  href: string;
};

const REFERENCES: Reference[] = [
  {
    id: 'aramco',
    icon: Droplets,
    title: {
      ar: 'مورد خدمات معتمد - أرامكو السعودية',
      en: 'Saudi Aramco — Registered Service Provider',
    },
    body: {
      ar: 'مسجل ضمن منظومة موردي الخدمات لأرامكو السعودية برقم 10117024.',
      en: 'Registered in the Aramco service-provider system (#10117024).',
    },
    href: '/approvals',
  },
  {
    id: 'royal-commission',
    icon: Building2,
    title: {
      ar: 'الهيئة الملكية للجبيل وينبع',
      en: 'Royal Commission — Jubail & Yanbu',
    },
    body: {
      ar: 'توريد واستبدال أبواب الكراج لمرافق الهيئة الملكية (2023–2025).',
      en: 'Garage supply and replacement across Royal Commission facilities (2023–2025).',
    },
    href: '/projects?sector=government',
  },
  {
    id: 'mod',
    icon: ShieldHalf,
    title: { ar: 'وزارة الدفاع', en: 'Ministry of Defense' },
    body: {
      ar: 'مشاريع متعددة عبر القوات البرية والبحرية والجوية والدفاع الجوي.',
      en: 'Repeat work across Land, Naval, Air and Air-Defense Forces.',
    },
    href: '/projects?sector=defense',
  },
  {
    id: 'royal-guard',
    icon: Crown,
    title: { ar: 'الحرس الملكي', en: 'Royal Guard' },
    body: {
      ar: 'استبدال وصيانة أبواب جراج معسكرات الحرس الملكي في الرياض وجدة.',
      en: 'Garage door replacement and maintenance at Royal Guard camps in Riyadh and Jeddah.',
    },
    href: '/projects?sector=guard',
  },
  {
    id: 'air-force',
    icon: Plane,
    title: {
      ar: 'القوات الجوية الملكية السعودية',
      en: 'Royal Saudi Air Force',
    },
    body: {
      ar: 'استبدال أبواب الحظائر والمستودعات في قاعدة الملك عبدالله الجوية.',
      en: 'Hangar and warehouse door replacement at King Abdullah Air Base.',
    },
    href: '/projects?sector=defense',
  },
  {
    id: 'navy-swcc-sec',
    icon: Anchor,
    title: {
      ar: 'القوات البحرية ومرافق المياه والكهرباء',
      en: 'Naval Forces, SWCC & SEC',
    },
    body: {
      ar: 'مورد معتمد لدى تحلية المياه المالحة والشركة السعودية للكهرباء، مع مشاريع للقوات البحرية.',
      en: 'Approved vendor for SWCC and SEC, with Naval Forces project history.',
    },
    href: '/projects',
  },
];

// Silence unused-icon warning while keeping the import for future entries
void Zap;

export function FeaturedReferences() {
  const t = useTranslations('Projects');
  const locale = useLocale() as 'ar' | 'en';

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {t('featuredTitle')}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {t('featuredSubtitle')}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REFERENCES.map((r) => {
          const Icon = r.icon;
          return (
            <Link key={r.id} href={r.href} className="group">
              <Card className="h-full p-5 transition-colors group-hover:border-primary/40">
                <div className="bg-primary/10 text-primary mb-4 inline-flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold leading-tight">
                  {r.title[locale]}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {r.body[locale]}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
