'use client';

import { MeshGradient } from '@paper-design/shaders-react';

/**
 * Site-wide ambient shader. Sits behind all content via a fixed, full-
 * viewport, negative-z layer. Body must establish a stacking context
 * (`relative isolate`) for the -z-10 to paint above the body's own
 * background but below page content.
 *
 * Uses MeshGradient with brand navy + green tones (the same palette as
 * the quote-dialog modal). Opacity-tuned so it reads as ambience rather
 * than a focal point on dark backgrounds, and tames itself on light.
 */
export function BackgroundShader() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden opacity-70 dark:block"
    >
      <MeshGradient
        speed={0.3}
        colors={['#0B0E26', '#14143F', '#0F2A24', '#1E2147']}
        distortion={0.7}
        swirl={0.1}
        grainMixer={0.12}
        grainOverlay={0}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}
