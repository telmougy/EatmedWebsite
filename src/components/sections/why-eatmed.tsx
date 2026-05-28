import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Users,
  Zap,
  Headphones,
  Tag,
  Sparkles,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/section';

export function WhyEatmed() {
  const t = useTranslations('Home');

  const items = [
    { icon: ShieldCheck, title: t('why1Title'), body: t('why1Body') },
    { icon: Users, title: t('why2Title'), body: t('why2Body') },
    { icon: Zap, title: t('why3Title'), body: t('why3Body') },
    { icon: Headphones, title: t('why4Title'), body: t('why4Body') },
    { icon: Tag, title: t('why5Title'), body: t('why5Body') },
    { icon: Sparkles, title: t('why6Title'), body: t('why6Body') },
  ];

  return (
    <Section id="why-us" className="bg-muted/30">
      <SectionHeader
        eyebrow={t('whyTitle')}
        title={t('whySubtitle')}
        align="center"
      />
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <li key={title} className="relative ps-14">
            <span className="bg-background border-border absolute start-0 top-0 inline-flex size-12 items-center justify-center rounded-xl border shadow-sm">
              <Icon className="text-primary size-6" />
            </span>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
