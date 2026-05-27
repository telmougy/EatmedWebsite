export const site = {
  name: 'Eatmed',
  legalName: 'Eatmed Automatic Doors',
  cr: '1010831709',
  vat: '311427211600003',
  email: 'sales@eatmed.sa',
  emailInfo: 'info@eatmed.sa',
  phones: ['+966112380498', '+966533377046', '+966542606342'],
  whatsapp: '966542606342',
  address: {
    en: 'Riyadh — West Naseem District, Abdullah Bin Masoud Street',
    ar: 'الرياض - حي النسيم الغربي - شارع عبدالله بن مسعود',
  },
  postalCode: '11761',
  city: 'Riyadh',
  country: 'SA',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eatmed.sa',
} as const;

export const whatsappLink = (text?: string) => {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const telLink = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
