"use client";

import { usePathname } from "next/navigation";
import {
  getStructuredDataConfig,
  type FAQItem,
} from "@/lib/structured-data";

interface StructuredDataProps {
  faqItems?: FAQItem[];
}

export default function StructuredData({ faqItems }: StructuredDataProps) {
  const pathname = usePathname();

  const config = getStructuredDataConfig(pathname);
  if (!config) {
    return null;
  }

  let structuredData = config.data;

  // For FAQ pages, inject the FAQ items into the structured data
  // Use passed faqItems if provided, otherwise use faqItems from config
  if (config.type === "faq") {
    const items = faqItems || config.faqItems;
    if (items && items.length > 0) {
      structuredData = {
        ...structuredData,
        mainEntity: items.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
