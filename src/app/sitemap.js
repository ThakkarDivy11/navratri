import { siteConfig } from '@/lib/seo';

export default function sitemap() {
  const baseUrl = siteConfig.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
