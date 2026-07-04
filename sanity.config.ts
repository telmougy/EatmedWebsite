'use client';

/**
 * Sanity Studio configuration, mounted in-app at /studio.
 *
 * Uses placeholder project values when env is absent so the module never throws
 * at import time during a Sanity-less build; the /studio route itself guards on
 * `isSanityConfigured` and shows setup instructions instead of a broken Studio.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schemaTypes, singletonTypes } from './src/sanity/schemas';
import { structure } from './src/sanity/structure';

export default defineConfig({
  name: 'eatmed',
  title: 'Eatmed Content',
  basePath: '/studio',
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "create new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Remove delete/duplicate actions for singletons.
    actions: (input, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? input.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action ?? ''),
          )
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
