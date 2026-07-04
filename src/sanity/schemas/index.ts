import type { SchemaTypeDefinition } from 'sanity';
import { localeString, localeText } from './locale';
import { product } from './product';
import { project } from './project';
import { approval } from './approval';
import { client } from './client';
import { brand } from './brand';
import { uiStrings } from './uiStrings';
import { siteSettings } from './siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // primitives
  localeString,
  localeText,
  // documents
  product,
  project,
  approval,
  client,
  brand,
  // singletons
  uiStrings,
  siteSettings,
];

/** Document types that should exist as a single editable entry (no "create new"). */
export const singletonTypes = new Set(['uiStrings', 'siteSettings']);
