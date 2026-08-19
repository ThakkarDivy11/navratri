import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

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
  title: 'RANGSETU — B2B Navratri Passes Ahmedabad 2026',
  description: 'RangSetu — B2B Navratri Pass Procurement Portal in Ahmedabad. Connect with top Garba venues (Karnavati, Rajpath, Mirchi, Suvarn, Red Raas, Shankus) for bulk B2B pass orders. Direct WhatsApp line: +91 96649 25159.',
  icons: {
    icon: '/assets/rangsetu_logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>
        <div className="pattern-overlay"></div>
        {children}
      </body>
    </html>
  );
}
