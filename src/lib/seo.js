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
  title: 'RANGSETU — B2B Navratri Passes Ahmedabad 2026 | Bulk Garba Pass Procurement',
  titleTemplate: '%s | RangSetu — B2B Navratri Passes Ahmedabad',
  description:
    'Ahmedabad’s premier B2B Navratri pass procurement platform. Source authentic bulk garba passes for Karnavati Club, Rajpath Club, Mirchi Rock N Dhol, Suvarn, Red Raas & Shankus. Direct B2B rates, physical & digital passes, and instant WhatsApp support (+91 96649 25159).',
  tagline: 'Direct B2B Navratri Pass Procurement & Wholesale Rates in Ahmedabad',
  
  // Keyword Strategy
  keywords: [
    // Primary Keywords
    'Navratri passes Ahmedabad 2026',
    'B2B Navratri passes',
    'bulk Garba passes Ahmedabad',
    'Navratri pass booking Ahmedabad',
    // Venue Specific Keywords
    'Karnavati Club Garba passes 2026',
    'Rajpath Club Navratri passes',
    'Mirchi Rock N Dhol passes Ahmedabad',
    'Suvarn Navratri Garba passes',
    'Red Raas VIP Garba passes',
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
