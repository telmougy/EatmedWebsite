'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  Headphones,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { MeshGradient } from '@paper-design/shaders-react';

import { whatsappLink } from '@/lib/site';

type FormStep = 'idle' | 'submitting' | 'success' | 'error';

export type QuoteDialogProps = {
  open: boolean;
  onClose: () => void;
  /** If set, prepended to the message textarea so the lead carries product context. */
  prefillProduct?: string;
  /** Optional shared layoutId — pass when triggered from a morphing pill. */
  layoutId?: string;
};

/**
 * Shared quote-request modal used by the home hero and by per-product
 * "Request a quote" CTAs. Submits to /api/contact.
 */
export function QuoteDialog({
  open,
  onClose,
  prefillProduct,
  layoutId,
}: QuoteDialogProps) {
  const t = useTranslations('Home');
  const tContact = useTranslations('Contact');
  const locale = useLocale() as 'ar' | 'en';
  const [step, setStep] = useState<FormStep>('idle');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep('idle'), 500);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 'submitting') return;
    setStep('submitting');

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      company: String(data.get('company') ?? ''),
      message: [
        `Scope: ${data.get('scope')}`,
        '',
        String(data.get('message') ?? ''),
      ].join('\n'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStep('success');
    } catch {
      setStep('error');
    }
  };

  const productLabel = locale === 'ar' ? 'المنتج' : 'Product';
  const defaultMessage = prefillProduct
    ? `${productLabel}: ${prefillProduct}\n\n`
    : '';

  return (
    <AnimatePresence initial={false}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
          <motion.div
            layoutId={layoutId}
            initial={layoutId ? false : { opacity: 0, scale: 0.96 }}
            animate={layoutId ? undefined : { opacity: 1, scale: 1 }}
            exit={layoutId ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            style={{ borderRadius: '24px' }}
            layout={Boolean(layoutId)}
            className="bg-brand-navy relative flex h-full w-full overflow-hidden shadow-2xl sm:rounded-[24px]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-0"
            >
              <MeshGradient
                speed={0.55}
                colors={['#0B0E26', '#14143F', '#0F2A24', '#1E2147']}
                distortion={0.8}
                swirl={0.1}
                grainMixer={0.15}
                grainOverlay={0}
                style={{ height: '100%', width: '100%' }}
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleClose}
              aria-label={t('heroClose')}
              className="absolute top-4 end-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:top-8 sm:end-8"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col overflow-y-auto lg:flex-row lg:overflow-hidden"
            >
              {/* LEFT: pitch + testimonial */}
              <div className="flex flex-1 flex-col justify-center gap-8 p-8 text-white sm:p-12 lg:p-16">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    {t('heroModalTitle')}
                  </h2>
                  <p className="max-w-md text-lg text-white/80">
                    {t('heroModalSubtitle')}
                  </p>
                </div>

                <div className="space-y-6">
                  <Feature
                    icon={<Headphones className="text-primary h-6 w-6" />}
                    title={t('heroFeature1Title')}
                    body={t('heroFeature1Body')}
                  />
                  <Feature
                    icon={<ShieldCheck className="text-primary h-6 w-6" />}
                    title={t('heroFeature2Title')}
                    body={t('heroFeature2Body')}
                  />
                </div>

              </div>

              {/* RIGHT: form */}
              <div className="flex flex-1 items-center justify-center bg-black/15 p-4 backdrop-blur-sm sm:p-12 lg:bg-transparent lg:p-16 lg:backdrop-blur-none">
                <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                  {step === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-[400px] flex-col items-center justify-center space-y-6 text-center"
                    >
                      <div className="bg-primary shadow-primary/30 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
                        <Check className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          {t('heroSuccessTitle')}
                        </h3>
                        <p className="text-white/80">{t('heroSuccessBody')}</p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="rounded-lg bg-white/20 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30"
                      >
                        {t('heroSuccessClose')}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-white">
                          {t('heroFormTitle')}
                        </h3>
                        <p className="text-sm text-white/70">
                          {t('heroFormSubtitle')}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Field label={t('heroFormName')} htmlFor="name">
                          <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            placeholder={t('heroFormNamePlaceholder')}
                            className={inputClass}
                            autoComplete="name"
                          />
                        </Field>

                        <Field label={t('heroFormEmail')} htmlFor="email">
                          <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            dir="ltr"
                            placeholder={t('heroFormEmailPlaceholder')}
                            className={inputClass}
                            autoComplete="email"
                          />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                          <Field label={t('heroFormCompany')} htmlFor="company">
                            <input
                              type="text"
                              id="company"
                              name="company"
                              placeholder={t('heroFormCompanyPlaceholder')}
                              className={inputClass}
                              autoComplete="organization"
                            />
                          </Field>
                          <Field label={t('heroFormPhone')} htmlFor="phone">
                            <input
                              required
                              type="tel"
                              id="phone"
                              name="phone"
                              dir="ltr"
                              placeholder={t('heroFormPhonePlaceholder')}
                              className={inputClass}
                              autoComplete="tel"
                            />
                          </Field>
                        </div>

                        <Field label={t('heroFormScope')} htmlFor="scope">
                          <select
                            id="scope"
                            name="scope"
                            defaultValue="supply-install"
                            className={`${inputClass} cursor-pointer appearance-none`}
                          >
                            <option className="bg-brand-navy" value="supply">
                              {t('heroFormScopeSupply')}
                            </option>
                            <option className="bg-brand-navy" value="supply-install">
                              {t('heroFormScopeInstall')}
                            </option>
                            <option className="bg-brand-navy" value="maintenance">
                              {t('heroFormScopeMaintenance')}
                            </option>
                            <option className="bg-brand-navy" value="custom">
                              {t('heroFormScopeCustom')}
                            </option>
                          </select>
                        </Field>

                        <Field label={t('heroFormMessage')} htmlFor="message">
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            required
                            defaultValue={defaultMessage}
                            placeholder={t('heroFormMessagePlaceholder')}
                            className={`${inputClass} resize-none`}
                          />
                        </Field>
                      </div>

                      {step === 'error' && (
                        <p className="flex items-start gap-2 rounded-lg bg-red-500/15 p-3 text-sm text-red-100">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>
                            <strong className="block">
                              {t('heroErrorTitle')}
                            </strong>
                            {t('heroErrorBody')}
                          </span>
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={step === 'submitting'}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/40 mt-2 flex w-full items-center justify-center rounded-lg px-8 py-3.5 font-semibold transition-all focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {step === 'submitting' ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            {t('heroFormSubmitting')}
                          </span>
                        ) : (
                          t('heroFormSubmit')
                        )}
                      </button>

                      <p className="text-center text-xs text-white/60">
                        {t('heroFormConsent')}
                      </p>

                      <p className="text-center text-xs text-white/60">
                        <a
                          href={whatsappLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-2 hover:underline"
                        >
                          {tContact('whatsapp')}
                        </a>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  'w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/60';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/70"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/75">{body}</p>
      </div>
    </div>
  );
}
