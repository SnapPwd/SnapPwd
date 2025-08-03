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
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
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
      'Free to use',
      'Client-side encryption',
      'Configurable expiration times'
    ],
    'screenshot': `${baseUrl}/og-image.png`,
    'softwareVersion': '1.0',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0',
      'ratingCount': '1'
    },
    'author': {
      '@type': 'Organization',
      'name': 'SnapPwd Team'
    },
    'datePublished': '2025-01-01',
    'dateModified': '2025-08-03'
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
