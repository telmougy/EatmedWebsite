import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, FileText } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { site, telLink } from '@/lib/site';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tHome = useTranslations('Home');
  const tDl = useTranslations('Downloads');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-16">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Logo />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <p className="text-muted-foreground text-xs">{t('cr')}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
              {t('exploreTitle')}
            </h3>
            <ul className="space-y-2 text-sm">
              {(
                ['home', 'about', 'products', 'projects', 'approvals', 'contact'] as const
              ).map((key) => (
                <li key={key}>
                  <Link
                    href={key === 'home' ? '/' : `/${key}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{tHome('servicesSupplyTitle')}</li>
              <li>{tHome('servicesInstallTitle')}</li>
              <li>{tHome('servicesMaintenanceTitle')}</li>
              <li>{tHome('servicesCustomTitle')}</li>
              <li>{tHome('servicesConsultationTitle')}</li>
              <li>{tHome('servicesSparePartsTitle')}</li>
            </ul>
            <h3 className="mt-6 mb-3 text-sm font-semibold tracking-wide uppercase">
              {t('resourcesTitle')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/downloads/eatmed-company-profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="size-3.5" />
                  {tDl('companyProfile')}
                </a>
              </li>
              <li>
                <a
                  href="/downloads/eatmed-previous-work-and-certifications.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="size-3.5" />
                  {tDl('previousWork')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
              {t('contactTitle')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                <span className="text-muted-foreground">
                  {site.address.en}
                </span>
              </li>
              {site.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-2">
                  <Phone className="text-primary size-4 shrink-0" />
                  <a
                    href={telLink(phone)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    dir="ltr"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="text-primary size-4 shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  dir="ltr"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground border-t py-6 text-center text-xs">
          {t('rights', { year })}
        </div>
      </Container>
    </footer>
  );
}
