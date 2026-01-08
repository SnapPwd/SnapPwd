"use client";

import { usePathname } from "next/navigation";

export default function DeveloperStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Only show structured data on the developers page
  if (pathname !== "/developers") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Developer Tools - Secure API Key & .env File Sharing",
    url: `${baseUrl}/developers`,
    description:
      "Securely share API keys, database credentials, and .env files with your development team. Self-destructing links for developer secrets and environment variables.",
    dateModified: "2025-01-08",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "SnapPwd Developer Tools",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Secure .env file sharing",
        "API key distribution",
        "Database credential sharing",
        "Team onboarding tools",
        "End-to-end encryption",
        "Self-destructing links",
        "No registration required",
        "Client-side encryption",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Developers",
      },
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
          name: "Developer Tools",
          item: `${baseUrl}/developers`,
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
