"use client";

import { usePathname } from "next/navigation";

export default function AboutStructuredData() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Only show structured data on the about page
  if (pathname !== "/about") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SnapPwd",
    url: `${baseUrl}/about`,
    description:
      "Learn about SnapPwd, our mission, and how we help you share sensitive information securely.",
    mainEntity: {
      "@type": "Organization",
      name: "SnapPwd",
      url: baseUrl,
      description: "Secure password and sensitive information sharing service",
      foundingDate: "2025-01-01",
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@snappwd.io",
        contactType: "customer service",
      },
      sameAs: [
        // Add social media URLs when available
      ],
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
          name: "About",
          item: `${baseUrl}/about`,
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
