'use client';

/**
 * The embedded Sanity Studio, served at /studio. Renders the full Studio SPA
 * when a project is configured; otherwise shows setup instructions so the route
 * never hard-fails on a Sanity-less build.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';
import { isSanityConfigured } from '@/sanity/env';

export const dynamic = 'force-static';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          maxWidth: 560,
          margin: '15vh auto',
          padding: '0 24px',
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>Sanity not configured</h1>
        <p style={{ color: '#555' }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and{' '}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) in your environment, then
          reload this page to open the content Studio.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
