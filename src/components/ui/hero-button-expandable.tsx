'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GodRays } from '@paper-design/shaders-react';

import { Link } from '@/i18n/navigation';
import { QuoteDialog } from './quote-dialog';

/**
 * Expandable hero: a primary CTA button that morphs into a full-viewport
 * modal containing a quote-request form. Submits to /api/contact.
 *
 * Reskinned from the original blue demo to use Eatmed brand green +
 * navy, with bilingual copy from next-intl (Home namespace) and RTL
 * support via the active locale.
 */
export default function HeroExpandable() {
  const t = useTranslations('Home');
  const locale = useLocale() as 'ar' | 'en';
  const isRtl = locale === 'ar';

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        {/* Subtle GodRays — uses brand-green tones at low opacity so it
            reads on both light and dark themes without dominating */}
        <div className="pointer-events-none absolute inset-0">
          <GodRays
            colorBack="#00000000"
            colors={['#3DB87A33', '#52BA8533', '#1E214733', '#A1A1AA22']}
            colorBloom="#3DB87A"
            offsetX={0.85}
            offsetY={-1}
            intensity={0.45}
            spotty={0.45}
            midSize={10}
            midIntensity={0}
            density={0.36}
            bloom={0.28}
            speed={0.4}
            scale={1.6}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              inset: 0,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border-border bg-background/60 text-foreground inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm"
          >
            <span className="bg-primary me-2 flex h-2 w-2 animate-pulse rounded-full" />
            {t('heroPillLabel')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-foreground max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('heroTitle')}{' '}
            <span className="from-primary bg-gradient-to-br to-emerald-600 bg-clip-text text-transparent dark:to-emerald-400">
              {t('heroTitleAccent')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl px-4 text-base leading-relaxed sm:text-lg md:text-xl"
          >
            {t('heroSubtitle')}
          </motion.p>

          <AnimatePresence initial={false}>
            {!isExpanded && (
              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
                {/* Primary CTA — the morphing pill */}
                <div className="relative inline-block">
                  <motion.div
                    style={{ borderRadius: '100px' }}
                    layout
                    layoutId="eatmed-cta-card"
                    className="bg-primary absolute inset-0"
                  />
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                    layout={false}
                    onClick={() => setIsExpanded(true)}
                    className="text-primary-foreground relative inline-flex h-14 items-center gap-2 px-8 text-base font-semibold tracking-wide transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                  >
                    {t('heroCtaPrimary')}
                    <ArrowRight
                      className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`}
                    />
                  </motion.button>
                </div>

                {/* Secondary CTA — not part of the morph */}
                <Link
                  href="/products"
                  className="border-border bg-background/60 text-foreground hover:bg-muted inline-flex h-14 items-center rounded-full border px-6 text-base font-semibold backdrop-blur-sm transition-colors"
                >
                  {t('heroCtaSecondary')}
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <QuoteDialog
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        layoutId="eatmed-cta-card"
      />
    </>
  );
}
