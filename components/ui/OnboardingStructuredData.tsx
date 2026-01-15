"use client";

import { usePathname } from "next/navigation";

export default function OnboardingStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (pathname !== "/onboarding") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Secure Employee Onboarding - Share Credentials Safely",
    url: `${baseUrl}/onboarding`,
    description:
      "Streamline new employee onboarding with secure credential sharing. Share API keys, passwords, and .env files with new hires using self-destructing links.",
    dateModified: "2025-01-14",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Secure Onboarding Credential Sharing Tool",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Secure onboarding credentials",
        "Self-destructing links",
        "End-to-end encryption",
        "One-time access",
        "Environment variable sharing",
        "API key distribution",
        "Database credential sharing",
        "Zero IT overhead",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "HR and IT Teams",
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
          name: "Onboarding",
          item: `${baseUrl}/onboarding`,
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
