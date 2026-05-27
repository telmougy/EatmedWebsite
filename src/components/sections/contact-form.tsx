'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Input, Textarea, Label } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10),
  // honeypot
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (data.website) return; // honeypot triggered
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('formName')}
          error={errors.name && t('errorRequired')}
          required
        >
          <Input
            {...register('name')}
            placeholder={t('formNamePlaceholder')}
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
        </Field>
        <Field label={t('formCompany')}>
          <Input
            {...register('company')}
            placeholder={t('formCompanyPlaceholder')}
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('formEmail')}
          error={errors.email && t('errorEmail')}
          required
        >
          <Input
            type="email"
            {...register('email')}
            placeholder={t('formEmailPlaceholder')}
            aria-invalid={!!errors.email}
            autoComplete="email"
            dir="ltr"
          />
        </Field>
        <Field
          label={t('formPhone')}
          error={errors.phone && t('errorPhone')}
          required
        >
          <Input
            type="tel"
            {...register('phone')}
            placeholder={t('formPhonePlaceholder')}
            aria-invalid={!!errors.phone}
            autoComplete="tel"
            dir="ltr"
          />
        </Field>
      </div>

      <Field
        label={t('formMessage')}
        error={errors.message && t('errorRequired')}
        required
      >
        <Textarea
          {...register('message')}
          placeholder={t('formMessagePlaceholder')}
          aria-invalid={!!errors.message}
          rows={5}
        />
      </Field>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register('website')}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
        }}
      />

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? t('formSubmitting') : t('formSubmit')}
      </Button>

      {status === 'success' && (
        <p className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          {t('formSuccess')}
        </p>
      )}
      {status === 'error' && (
        <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          {t('formError')}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string | undefined;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive ms-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
