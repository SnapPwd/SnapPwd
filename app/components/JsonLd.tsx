'use client';

import { usePathname } from 'next/navigation';

export default function JsonLd() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  // Only show structured data on the homepage
  if (pathname !== '/') {
    return null;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'SnapPwd',
    'url': baseUrl,
    'description': 'Securely share passwords and sensitive information with self-destructing links',
    'applicationCategory': 'SecurityApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Self-destructing messages',
      'End-to-end encryption',
      'One-time viewing',
      'No registration required',
      'Free to use'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
