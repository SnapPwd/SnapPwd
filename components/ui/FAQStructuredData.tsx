"use client";

import { usePathname } from "next/navigation";

interface FAQData {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqData: FAQData[];
}

export default function FAQStructuredData({ faqData }: FAQStructuredDataProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Only show structured data on the FAQ page
  if (pathname !== "/faq") {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Frequently Asked Questions - SnapPwd",
    url: `${baseUrl}/faq`,
    description:
      "Frequently asked questions about SnapPwd's secure password sharing service",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
          name: "FAQ",
          item: `${baseUrl}/faq`,
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
