"use client";

import { usePathname } from "next/navigation";

export default function EnvFilesStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (pathname !== "/env-files") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Share .env Files Securely - Environment Variables Sharing",
    url: `${baseUrl}/env-files`,
    description:
      "Securely share .env files, environment variables, and configuration secrets with your team. Self-destructing links keep sensitive config out of Slack and email.",
    dateModified: "2025-01-18",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Secure Environment File Sharing Tool",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Secure .env file sharing",
        "Environment variable distribution",
        "Self-destructing links",
        "End-to-end encryption",
        "One-time access",
        "No registration required",
        "Configuration secret sharing",
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
          name: "Env Files Sharing",
          item: `${baseUrl}/env-files`,
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
