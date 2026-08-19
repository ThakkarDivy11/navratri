import { siteConfig } from '@/lib/seo';
import { DEFAULT_VENUES, FAQ_DATA } from '@/data/venues';

export default function JsonLd() {
  const baseUrl = siteConfig.siteUrl;

  // 1. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: [siteConfig.locale, ...siteConfig.alternateLocales],
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  // 2. Organization & LocalBusiness Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${baseUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: `${baseUrl}${siteConfig.assets.logo}`,
    image: `${baseUrl}${siteConfig.assets.ogImage}`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '₹₹ - ₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'S.G. Highway, Bodakdev',
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.state,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.0373',
      longitude: '72.5117',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Ahmedabad',
      },
      {
        '@type': 'City',
        name: 'Gandhinagar',
      },
      {
        '@type': 'State',
        name: 'Gujarat',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'sales and pass reservations',
        areaServed: 'IN',
        availableLanguage: ['English', 'Gujarati', 'Hindi'],
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/divy-thakkar-a89859227/',
    ],
  };

  // 3. Events ItemList Schema
  const eventsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ahmedabad Navratri 2026 Garba Events & B2B Pass Inventory',
    itemListElement: DEFAULT_VENUES.map((venue, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Festival',
        name: venue.name,
        description: `B2B bulk passes and tickets for ${venue.name} in Ahmedabad. Featuring ${venue.artist}. ${venue.formats}.`,
        startDate: '2026-10-11T19:00:00+05:30',
        endDate: '2026-10-19T23:59:59+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: venue.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: venue.location,
            addressLocality: venue.city || 'Ahmedabad',
            addressRegion: 'Gujarat',
            addressCountry: 'IN',
          },
        },
        image: `${baseUrl}${venue.image}`,
        performer: {
          '@type': 'PerformingGroup',
          name: venue.artist,
        },
        offers: {
          '@type': 'AggregateOffer',
          url: `${baseUrl}/#events`,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          category: venue.passTypes,
          description: `B2B Wholesale rates for bulk orders (20+ passes). Formats: ${venue.formats}`,
        },
        organizer: {
          '@id': `${baseUrl}/#organization`,
        },
      },
    })),
  };

  // 4. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 5. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Navratri Events',
        item: `${baseUrl}/#events`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'B2B Benefits',
        item: `${baseUrl}/#b2b-benefits`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'FAQ',
        item: `${baseUrl}/#faq`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${baseUrl}/#contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
