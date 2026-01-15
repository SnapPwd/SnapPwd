"use client";

import { usePathname } from "next/navigation";

export default function TeamsStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (pathname !== "/teams") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Team Credential Sharing - Secure Team Secrets",
    url: `${baseUrl}/teams`,
    description:
      "Securely share passwords and credentials within your team. Self-destructing links for team collaboration that don't leave traces in Slack, email, or chat history.",
    dateModified: "2025-01-14",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Team Credential Sharing Tool",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Team password sharing",
        "Self-destructing links",
        "End-to-end encryption",
        "One-time access",
        "No registration required",
        "Zero Slack/chat trail",
        "Remote team support",
        "Cross-team collaboration",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Business Teams",
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
          name: "Teams",
          item: `${baseUrl}/teams`,
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
