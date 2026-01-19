"use client";

import { usePathname } from "next/navigation";

export default function EnvBestPracticesStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (pathname !== "/env-best-practices") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: "Environment Variables Best Practices - Secure .env File Management",
    headline: "Best Practices for Managing Environment Variables and .env Files",
    url: `${baseUrl}/env-best-practices`,
    description:
      "Learn best practices for managing environment variables and .env files. Secure your configuration secrets, avoid common mistakes, and implement proper secret management.",
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
      "@id": `${baseUrl}/env-best-practices`,
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
          name: "Env Best Practices",
          item: `${baseUrl}/env-best-practices`,
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
