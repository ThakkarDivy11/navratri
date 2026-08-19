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
  title: 'RANGSETU — Mandli Garba Passes Ahmedabad 2026 | Rudaah & Raataldi B2B Passes',
  titleTemplate: '%s | RangSetu — Mandli Garba Passes Ahmedabad',
  description:
    'Ahmedabad’s premier Mandli Garba B2B pass portal. Source authentic bulk passes for Rudaah Mandli Garba, Raataldi Mandli Garba, Karnavati Club, Rajpath Club & Mirchi. Direct B2B rates, physical & digital passes, and instant WhatsApp support (+91 96649 25159).',
  tagline: 'Direct B2B Mandli Garba Pass Procurement & Wholesale Rates in Ahmedabad',
  
  // Keyword Strategy
  keywords: [
    // Primary Mandli Garba Keywords
    'Mandli Garba passes Ahmedabad 2026',
    'Rudaah Mandli Garba passes',
    'Raataldi Mandli Garba passes',
    'Rudaah Garba Ahmedabad',
    'Raataldi Garba passes 2026',
    'Mandli Garba passes price',
    'Ahmedabad Mandli Garba tickets',
    'B2B Mandli Garba passes',
    // Venue & General Keywords
    'Navratri passes Ahmedabad 2026',
    'B2B Navratri passes',
    'bulk Garba passes Ahmedabad',
    'Navratri pass booking Ahmedabad',
    'Karnavati Club Garba passes 2026',
    'Rajpath Club Navratri passes',
    'Mirchi Rock N Dhol passes Ahmedabad',
    'Shankus Mega Garba Arena tickets',
    // Audience & Commercial Intent Keywords
    'corporate Navratri passes Ahmedabad',
    'wholesale garba passes',
    'bulk Navratri tickets for companies',
    'Navratri pass reseller Ahmedabad',
    'Ahmedabad garba pass supplier',
    'physical garba wristbands Ahmedabad',
    'online Navratri passes Gujarat',
    'Ahmedabad Navratri 2026 tickets'
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
