'use client';

import { GodRays } from '@paper-design/shaders-react';

/**
 * Site-wide ambient shader. Sits behind all content via a fixed, full-
 * viewport, negative-z layer. Body must establish a stacking context
 * (`relative isolate`) for the -z-10 to paint above the body's own
 * background but below page content.
 *
 * Parameters are intentionally subtler than the hero's prominent
 * instance: lower intensity/density and tighter alphas so the effect
 * reads as ambience, not a focal point.
 */
export function BackgroundShader() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <GodRays
        colorBack="#00000000"
        colors={['#3DB87A1F', '#52BA851F', '#1E21471F', '#A1A1AA14']}
        colorBloom="#3DB87A"
        offsetX={0.85}
        offsetY={-1}
        intensity={0.22}
        spotty={0.4}
        midSize={10}
        midIntensity={0}
        density={0.28}
        bloom={0.18}
        speed={0.3}
        scale={1.8}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}
