import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';

const links = [
  { href: '/', key: 'home' as const },
  { href: '/about', key: 'about' as const },
  { href: '/products', key: 'products' as const },
  { href: '/projects', key: 'projects' as const },
  { href: '/approvals', key: 'approvals' as const },
  { href: '/contact', key: 'contact' as const },
];

export function Header() {
  const t = useTranslations('Nav');

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <NavLinks links={links} />
          <div className="flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden h-10 items-center rounded-md px-4 text-sm font-medium transition-colors md:inline-flex"
            >
              {t('getQuote')}
            </Link>
            <MobileNav links={links} />
          </div>
        </div>
      </Container>
    </header>
  );
}
