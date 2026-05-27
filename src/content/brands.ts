import type { Brand } from './types';

export const brands: Brand[] = [
  { id: 'acm', name: 'ACM', country: 'Italy' },
  { id: 'bft', name: 'BFT', country: 'Italy' },
  { id: 'gfa', name: 'GfA', country: 'Germany' },
  { id: 'liftmaster', name: 'LiftMaster', country: 'USA' },
  { id: 'jielong', name: 'Jielong', country: 'China' },
  { id: 'faac', name: 'FAAC', country: 'Italy' },
  { id: 'rib', name: 'RIB', country: 'Italy' },
  { id: 'dormakaba', name: 'dormakaba', country: 'Germany / Switzerland' },
  { id: 'dorma', name: 'DORMA', country: 'Germany' },
  { id: 'somfy', name: 'Somfy', country: 'France' },
  { id: 'nice', name: 'Nice', country: 'Italy' },
  { id: 'came', name: 'CAME', country: 'Italy' },
];

export const getBrand = (id: string) => brands.find((b) => b.id === id);
