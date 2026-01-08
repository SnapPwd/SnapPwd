"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItemProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg shadow-sm border border-gray-100"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-semibold text-gray-900">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transform transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pt-2 pb-4">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
