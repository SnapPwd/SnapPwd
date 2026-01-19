"use client";

import { usePathname } from "next/navigation";

export default function APIKeyBestPracticesStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (pathname !== "/api-key-best-practices") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: "API Key Security Best Practices - How to Store API Keys Safely",
    headline: "Security Best Practices for Storing and Sharing API Keys",
    url: `${baseUrl}/api-key-best-practices`,
    description:
      "Learn security best practices for storing and sharing API keys. Avoid common mistakes like hardcoding secrets, and discover secure methods for credential management.",
    datePublished: "2025-01-18",
    dateModified: "2025-01-18",
    author: {
      "@type": "Organization",
      name: "SnapPwd",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "SnapPwd",
      url: baseUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/api-key-best-practices`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "API Key Best Practices",
          item: `${baseUrl}/api-key-best-practices`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
