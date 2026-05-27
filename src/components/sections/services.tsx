import { useTranslations } from 'next-intl';
import {
  Truck,
  Wrench,
  Clock,
  Settings2,
  ClipboardCheck,
  Package,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card } from '@/components/ui/card';

export function Services() {
  const t = useTranslations('Home');

  const items = [
    { icon: Truck, title: t('servicesSupplyTitle'), body: t('servicesSupplyBody') },
    { icon: Wrench, title: t('servicesInstallTitle'), body: t('servicesInstallBody') },
    { icon: Clock, title: t('servicesMaintenanceTitle'), body: t('servicesMaintenanceBody') },
    { icon: Settings2, title: t('servicesCustomTitle'), body: t('servicesCustomBody') },
    { icon: ClipboardCheck, title: t('servicesConsultationTitle'), body: t('servicesConsultationBody') },
    { icon: Package, title: t('servicesSparePartsTitle'), body: t('servicesSparePartsBody') },
  ];

  return (
    <Section id="services">
      <SectionHeader
        eyebrow={t('servicesTitle')}
        title={t('servicesSubtitle')}
        align="center"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="p-6">
            <div className="bg-primary/10 text-primary mb-4 inline-flex size-12 items-center justify-center rounded-xl">
              <Icon className="size-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
