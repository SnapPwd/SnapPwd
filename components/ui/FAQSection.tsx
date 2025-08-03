"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-lg shadow-sm border border-gray-100">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
        onClick={onToggle}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pt-2 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How secure is SnapPwd?",
      answer:
        "SnapPwd uses end-to-end encryption. Your data is encrypted in your browser before it reaches our servers, so we never see your unencrypted content. Only the recipient with the correct link can decrypt it.",
    },
    {
      question: "What happens to my data after it's viewed?",
      answer:
        "Your encrypted data is automatically deleted from our servers once it's accessed by the recipient or when it expires, whichever comes first. We don't keep backups of expired content.",
    },
    {
      question: "Can I set custom expiration times?",
      answer:
        "Yes, you can set custom expiration times for your secrets, from minutes to days. You can also configure links for one-time access only.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No account required! SnapPwd works completely anonymously. Just create your secret link and share it with the intended recipient.",
    },
    {
      question: "What types of information can I share?",
      answer:
        "You can share passwords, API keys, credit card numbers, personal notes, or any sensitive text information. We don't store file uploads - only encrypted text.",
    },
    {
      question: "Is SnapPwd free to use?",
      answer:
        "Yes, SnapPwd is completely free to use. We believe everyone should have access to secure information sharing.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
