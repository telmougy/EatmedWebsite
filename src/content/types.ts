export type Locale = 'ar' | 'en';
export type Bilingual = { ar: string; en: string };

export type ProductCategory =
  | 'rolling'
  | 'shutter'
  | 'gate'
  | 'glass'
  | 'safety'
  | 'barrier';

export type ProductUseCase =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'security';

export type Product = {
  slug: string;
  name: Bilingual;
  category: ProductCategory;
  useCases: ProductUseCase[];
  hero?: string;
  gallery?: string[];
  drawing?: string;
  tagline: Bilingual;
  description: Bilingual;
  highlights: Bilingual[];
  specs?: { label: Bilingual; value: Bilingual }[];
  motors?: string[];
  featured?: boolean;
  // Decision-support fields (optional, populated where data exists)
  bestFor?: Bilingual[];
  material?: Bilingual;
  maxDimensions?: Bilingual;
  motorCompatibility?: Bilingual;
  fireRating?: Bilingual;
  warranty?: Bilingual;
  commonApplications?: Bilingual[];
};

export type ProjectSector =
  | 'defense'
  | 'guard'
  | 'commercial'
  | 'government'
  | 'utility';

export type Project = {
  id: string;
  name: Bilingual;
  location: Bilingual;
  contractor?: Bilingual;
  owner: Bilingual;
  sector: ProjectSector;
  year: number | string;
  status: 'completed' | 'ongoing';
  scale?: Bilingual;
};

export type Client = {
  id: string;
  name: Bilingual;
  logo?: string;
};

export type ApprovalCategory =
  | 'commercial'
  | 'tax'
  | 'labor'
  | 'government'
  | 'military'
  | 'supplier'
  | 'completion';

export type Approval = {
  id: string;
  title: Bilingual;
  issuer: Bilingual;
  number?: string;
  issuedOn?: string;
  expiresOn?: string;
  image?: string;
  evidenceUrl?: string;
  category: ApprovalCategory;
};

export type Brand = {
  id: string;
  name: string;
  country?: string;
};
