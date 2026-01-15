"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItemProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={index}
            className="rounded-lg shadow-sm border border-border bg-card"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              <span className="font-semibold text-card-foreground">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              hidden={!isOpen}
            >
              {isOpen && (
                <div className="px-6 pt-2 pb-4">
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
