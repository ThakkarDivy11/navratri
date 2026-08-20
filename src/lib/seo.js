/**
 * Centralized SEO Configuration & Helpers for RangSetu
 * Production-ready SEO tokens, keyword taxonomy, metadata, and schema generators.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  : 'https://rangsetu.divythakkar.in';

export const siteConfig = {
  name: 'RangSetu',
  legalName: 'RangSetu Navratri Services Ahmedabad',
  siteUrl: SITE_URL,
  title: 'RANGSETU — Mandli & AC Dome Garba Passes Ahmedabad 2026 | B2B Bulk Passes',
  titleTemplate: '%s | RangSetu — Mandli & AC Dome Garba Passes Ahmedabad',
  description:
    'Ahmedabad’s premier Mandli & AC Dome Garba B2B pass portal. Source authentic bulk passes for Rudaah Mandli Garba, Raataldi Mandli Garba, Suvarn AC Dome & Shankus AC Dome Arena. Direct B2B rates, physical & digital passes, and instant WhatsApp support (+91 96649 25159).',
  tagline: 'Direct B2B Mandli & AC Dome Garba Pass Procurement & Wholesale Rates in Ahmedabad',
  
  // Keyword Strategy
  keywords: [
    // Mandli Garba Keywords
    'Mandli Garba passes Ahmedabad 2026',
    'Rudaah Mandli Garba passes',
    'Raataldi Mandli Garba passes',
    'Rudaah Garba Ahmedabad',
    'Raataldi Garba passes 2026',
    'Mandli Garba bulk passes Ahmedabad',
    'Ahmedabad Mandli Garba tickets',
    'B2B Mandli Garba passes',
    // AC Dome Garba Keywords
    'AC Dome Garba passes Ahmedabad 2026',
    'AC Dome Navratri passes Ahmedabad',
    'Suvarn AC Dome Garba passes',
    'Shankus AC Dome tickets',
    'AC Dome Garba tickets price',
    'luxury AC Dome Garba passes',
    'bulk AC Dome Navratri passes',
    // Commercial Intent Keywords
    'corporate Navratri passes Ahmedabad',
    'wholesale garba passes',
    'bulk Navratri tickets for companies',
    'Ahmedabad garba pass supplier',
    'physical Mandli Garba wristbands Ahmedabad',
    'online Navratri passes Gujarat',
    'Ahmedabad Navratri 2026 passes'
  ],

  // Contact and Location Information
  contact: {
    phone: '+91 96649 25159',
    phoneFormatted: '+91 96649 25159',
    whatsapp: '919664925159',
    email: 'b2b@navratripasses.com',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    countryCode: 'IN',
    postalCode: '380054',
    address: 'S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054'
  },

  // Social & Assets
  assets: {
    logo: '/assets/rangsetu_logo.jpg',
    ogImage: '/assets/rangsetu_logo.jpg',
    ogImageWidth: 800,
    ogImageHeight: 800,
    ogImageAlt: 'RangSetu — B2B Navratri Passes Ahmedabad 2026'
  },

  locale: 'en_IN',
  alternateLocales: ['gu_IN', 'hi_IN'],
  themeColor: '#7928CA',
};

/**
 * Helper to construct absolute canonical URLs
 */
export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath === '/' ? siteConfig.siteUrl : `${siteConfig.siteUrl}${cleanPath}`;
}
