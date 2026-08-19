export const metadata = {
  title: 'Admin Portal — RangSetu Management',
  description: 'RangSetu administrative access and event inventory manager.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function AdminLayout({ children }) {
  return children;
}
