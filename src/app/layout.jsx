import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { siteConfig } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Analytics } from '@vercel/analytics/next';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: 'RangSetu B2B Team', url: siteConfig.siteUrl }],
  creator: 'RangSetu',
  publisher: 'RangSetu',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocales,
    type: 'website',
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: siteConfig.assets.ogImageWidth,
        height: siteConfig.assets.ogImageHeight,
        alt: siteConfig.assets.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.assets.ogImage],
    creator: '@rangsetu',
    site: '@rangsetu',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/rangsetu_logo.jpg' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/assets/rangsetu_logo.jpg',
    apple: '/assets/rangsetu_logo.jpg',
  },
  verification: {
    google: 'googledc62c8e26a94a286',
  },
  category: 'Events & Ticket Procurement',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>
        <JsonLd />
        <div className="pattern-overlay"></div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

