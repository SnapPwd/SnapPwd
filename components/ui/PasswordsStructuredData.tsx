"use client";

import { usePathname } from "next/navigation";

export default function PasswordsStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (pathname !== "/passwords") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Share Passwords Securely - One-Time Password Sharing",
    url: `${baseUrl}/passwords`,
    description:
      "Share passwords securely with self-destructing links. End-to-end encrypted password sharing that disappears after one view. No registration required.",
    dateModified: "2025-01-14",
    isPartOf: {
      "@type": "WebSite",
      name: "SnapPwd",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Secure Password Sharing Tool",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Secure password sharing",
        "Self-destructing links",
        "End-to-end encryption",
        "One-time access",
        "No registration required",
        "Client-side encryption",
        "Zero-knowledge architecture",
        "Instant link generation",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "General",
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
          name: "Password Sharing",
          item: `${baseUrl}/passwords`,
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
