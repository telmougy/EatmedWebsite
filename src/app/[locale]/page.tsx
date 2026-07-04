import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { WhyEatmed } from '@/components/sections/why-eatmed';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { ClientsMarquee } from '@/components/sections/clients-marquee';
import { Stats } from '@/components/sections/stats';
import { FinalCta } from '@/components/sections/final-cta';
import { getFeaturedProducts } from '@/content/products';
import { getClients } from '@/content/clients';
import { getProjectStats } from '@/content/projects';
import { getBrands } from '@/content/brands';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [featured, clients, projectStats, brands] = await Promise.all([
    getFeaturedProducts(),
    getClients(),
    getProjectStats(),
    getBrands(),
  ]);

  return (
    <>
      <Hero />
      <ClientsMarquee clients={clients} />
      <Services />
      <WhyEatmed />
      <FeaturedProducts products={featured} />
      <Stats projectStats={projectStats} brandCount={brands.length} />
      <FinalCta />
    </>
  );
}
