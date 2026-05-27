import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { WhyEatmed } from '@/components/sections/why-eatmed';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { ClientsMarquee } from '@/components/sections/clients-marquee';
import { Stats } from '@/components/sections/stats';
import { FinalCta } from '@/components/sections/final-cta';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ClientsMarquee />
      <Services />
      <WhyEatmed />
      <FeaturedProducts />
      <Stats />
      <FinalCta />
    </>
  );
}
