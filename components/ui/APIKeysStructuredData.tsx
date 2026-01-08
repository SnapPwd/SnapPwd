"use client";

import { usePathname } from "next/navigation";

export default function APIKeysStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Only show structured data on the API keys page
  if (pathname !== "/api-keys") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Secure API Key Sharing - Share API Keys Safely",
    url: `${baseUrl}/api-keys`,
    description:
      "Securely share API keys, tokens, and access credentials with your team. Self-destructing links ensure API keys are never exposed in chat logs or emails.",
    dateModified: "2025-01-08",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Secure API Key Sharing Tool",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Secure API key sharing",
        "Self-destructing links",
        "End-to-end encryption",
        "One-time access",
        "No registration required",
        "Client-side encryption",
        "API token distribution",
        "Temporary API access",
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
          name: "API Key Sharing",
          item: `${baseUrl}/api-keys`,
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
