import type { Approval } from './types';

export const approvals: Approval[] = [
  {
    id: 'commercial-registration',
    title: { ar: 'شهادة السجل التجاري', en: 'Commercial Registration' },
    issuer: { ar: 'وزارة التجارة', en: 'Ministry of Commerce' },
    number: '1010831709',
    issuedOn: '2022-10-06',
    category: 'commercial',
  },
  {
    id: 'riyadh-chamber',
    title: { ar: 'شهادة عضوية غرفة الرياض', en: 'Riyadh Chamber Membership' },
    issuer: { ar: 'غرفة الرياض', en: 'Riyadh Chamber' },
    number: '762171',
    issuedOn: '2022-10-06',
    expiresOn: '2026-09-25',
    category: 'commercial',
  },
  {
    id: 'gosi',
    title: { ar: 'شهادة التأمينات الاجتماعية', en: 'GOSI Certificate' },
    issuer: {
      ar: 'المؤسسة العامة للتأمينات الاجتماعية',
      en: 'General Organization for Social Insurance',
    },
    number: '101798950',
    issuedOn: '2025-09-11',
    category: 'labor',
  },
  {
    id: 'zatca-vat',
    title: { ar: 'شهادة تسجيل ضريبة القيمة المضافة', en: 'VAT Registration Certificate' },
    issuer: { ar: 'هيئة الزكاة والضريبة والجمارك', en: 'Zakat, Tax & Customs Authority' },
    number: '311427211600003',
    issuedOn: '2023-03-16',
    category: 'tax',
  },
  {
    id: 'zatca-clearance',
    title: { ar: 'شهادة الزكاة والضريبة', en: 'Zakat & Tax Clearance' },
    issuer: { ar: 'هيئة الزكاة والضريبة والجمارك', en: 'Zakat, Tax & Customs Authority' },
    number: '1022665229',
    expiresOn: '2026-02-05',
    category: 'tax',
  },
  {
    id: 'qiwa-saudization',
    title: { ar: 'شهادة التوطين', en: 'Saudization Certificate' },
    issuer: {
      ar: 'وزارة الموارد البشرية والتنمية الاجتماعية - قوى',
      en: 'Ministry of Human Resources — Qiwa',
    },
    number: '171484-47504822',
    expiresOn: '2025-10-23',
    category: 'labor',
  },
  {
    id: 'monshaat',
    title: { ar: 'شهادة منشآت', en: 'Monsha\'at Certificate' },
    issuer: {
      ar: 'الهيئة العامة للمنشآت الصغيرة والمتوسطة',
      en: 'Small & Medium Enterprises General Authority',
    },
    number: '24409174498',
    issuedOn: '2024-12-10',
    category: 'commercial',
  },
  {
    id: 'national-address',
    title: { ar: 'إثبات العنوان الوطني', en: 'National Address Proof' },
    issuer: { ar: 'العنوان الوطني', en: 'National Address' },
    number: 'RQNG7703',
    category: 'government',
  },
  {
    id: 'aramco-supplier',
    title: {
      ar: 'مورد خدمات معتمد - أرامكو السعودية',
      en: 'Registered Service Provider — Saudi Aramco',
    },
    issuer: { ar: 'أرامكو السعودية', en: 'Saudi Aramco' },
    number: '10117024',
    issuedOn: '2026-04-19',
    category: 'commercial',
  },
  {
    id: 'emc-p132-supplier',
    title: {
      ar: 'مورد معتمد - أبواب معدنية وإكسسوارات (مشروع P132)',
      en: 'Approved Supplier — Metal Doors & Hardware (P132)',
    },
    issuer: { ar: 'EMC Design & Build', en: 'EMC Design & Build' },
    number: 'P132-EMC-PD-04MU-AR-045',
    issuedOn: '2025-11-25',
    category: 'commercial',
  },
  {
    id: 'sec-supplier',
    title: {
      ar: 'مورد معتمد - الشركة السعودية للكهرباء',
      en: 'Approved Supplier — Saudi Electricity Company',
    },
    issuer: { ar: 'الشركة السعودية للكهرباء', en: 'Saudi Electricity Company' },
    issuedOn: '2025-07-08',
    category: 'commercial',
  },
  {
    id: 'swcc-vendor',
    title: {
      ar: 'مورد معتمد - تحلية المياه المالحة',
      en: 'Approved Vendor — SWCC',
    },
    issuer: {
      ar: 'المؤسسة العامة لتحلية المياه المالحة',
      en: 'Saline Water Conversion Corporation',
    },
    issuedOn: '2023-09-06',
    category: 'commercial',
  },
  {
    id: 'air-force-completion',
    title: {
      ar: 'شهادة إنجاز - قاعدة الملك عبدالله الجوية',
      en: 'Completion Certificate — King Abdullah Air Base',
    },
    issuer: { ar: 'القوات الجوية الملكية السعودية', en: 'Royal Saudi Air Force' },
    category: 'military',
  },
  {
    id: 'naval-completion',
    title: {
      ar: 'محضر استلام نهائي - قاعدة الملك فيصل البحرية',
      en: 'Final Acceptance — King Faisal Naval Base',
    },
    issuer: { ar: 'القوات البحرية الملكية السعودية', en: 'Royal Saudi Naval Forces' },
    category: 'military',
  },
  {
    id: 'royal-guard-completion',
    title: { ar: 'محضر إنجاز - رئاسة الحرس الملكي', en: 'Completion Record — Royal Guard' },
    issuer: { ar: 'رئاسة الحرس الملكي', en: 'Royal Guard' },
    category: 'military',
  },
  {
    id: 'border-guard-najran',
    title: { ar: 'اعتماد حرس الحدود - نجران', en: 'Border Guard Approval — Najran' },
    issuer: { ar: 'وزارة الداخلية - حرس الحدود', en: 'Ministry of Interior — Border Guard' },
    category: 'military',
  },
  {
    id: 'air-defense-fifth-group',
    title: {
      ar: 'محضر إنجاز - مجموعة الدفاع الجوي الخامسة',
      en: 'Completion — 5th Air Defense Group',
    },
    issuer: { ar: 'الدفاع الجوي الملكي السعودي', en: 'Royal Saudi Air Defense' },
    category: 'military',
  },
];
