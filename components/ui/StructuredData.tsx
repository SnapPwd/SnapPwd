"use client";

import { usePathname } from "next/navigation";
import {
  structuredDataConfigs,
  type FAQItem,
} from "@/lib/structured-data";

interface StructuredDataProps {
  faqItems?: FAQItem[];
}

export default function StructuredData({ faqItems }: StructuredDataProps) {
  const pathname = usePathname();

  const config = structuredDataConfigs[pathname];
  if (!config) {
    return null;
  }

  let structuredData = config.data;

  // For FAQ pages, inject the FAQ items into the structured data
  if (config.type === "faq" && faqItems) {
    structuredData = {
      ...structuredData,
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
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
