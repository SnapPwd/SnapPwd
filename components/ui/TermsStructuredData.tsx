"use client";

import { usePathname } from "next/navigation";

export default function TermsStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Only show structured data on the terms page
  if (pathname !== "/terms") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service - SnapPwd",
    url: `${baseUrl}/terms`,
    description:
      "Review the terms and conditions for using SnapPwd's secure password and sensitive information sharing service",
    dateModified: "2025-07-08",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
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
          name: "Terms of Service",
          item: `${baseUrl}/terms`,
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
