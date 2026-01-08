import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FAQStructuredData from "@/components/ui/FAQStructuredData";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "FAQ | SnapPwd",
  description:
    "Frequently asked questions about SnapPwd's secure password sharing service. Learn how our encryption works, security features, and usage guidelines.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "password sharing FAQ",
    "secure sharing questions",
    "encryption FAQ",
    "security questions",
    "SnapPwd help",
    "password sharing guide",
  ],
  alternates: {
    canonical: "/faq",
  },
};

const faqData = [
  {
    question: "How does SnapPwd work?",
    answer:
      "SnapPwd uses end-to-end encryption to secure your sensitive information. When you create a secret, your data is encrypted in your browser before it ever reaches our servers. We generate a unique, time-limited link that you can share with the recipient. Once the link is accessed or expires, the data is permanently deleted.",
  },
  {
    question: "Is SnapPwd really secure?",
    answer:
      "Yes, SnapPwd is designed with security as our top priority. We use industry-standard encryption protocols, and your data is encrypted client-side before transmission. We never store your unencrypted data, and all content is automatically deleted after access or expiration.",
  },
  {
    question: "Do I need to register to use SnapPwd?",
    answer:
      "No registration is required. SnapPwd is completely free to use and doesn't require any account creation or personal information.",
  },
  {
    question: "How long do links remain active?",
    answer:
      "You can choose from several expiration options when creating a secret, ranging from a few minutes to 7 days. Once the expiration time is reached or the link is accessed, the content is permanently deleted.",
  },
  {
    question: "Can I access the same link multiple times?",
    answer:
      "No, SnapPwd links are designed for one-time access only. Once a link is viewed, the content is immediately deleted to ensure your information remains secure.",
  },
  {
    question: "What happens if I lose the link?",
    answer:
      "If you lose the link before the recipient accesses it, the content will remain encrypted on our servers until it expires. However, we cannot recover lost links or regenerate them for security reasons.",
  },
  {
    question: "What types of information can I share?",
    answer:
      "You can share any sensitive information that needs to be transmitted securely, including passwords, API keys, confidential documents, or any other private data. However, please ensure you're not sharing illegal or prohibited content.",
  },
  {
    question: "Does SnapPwd track my activity?",
    answer:
      "We collect minimal anonymous usage statistics for security and service improvement purposes, such as access times and device information. We do not track personal information or the content of your messages.",
  },
  {
    question: "Is SnapPwd free to use?",
    answer:
      "Yes, SnapPwd is completely free to use. There are no hidden fees or premium features - all core functionality is available to everyone at no cost.",
  },
  {
    question: "Can I use SnapPwd for business purposes?",
    answer:
      "Yes, SnapPwd can be used for both personal and business purposes. Many teams use it to share credentials, API keys, and other sensitive information securely.",
  },
];

export default function FAQPage() {
  return (
    <section className="py-12">
      <FAQStructuredData faqData={faqData} />
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="prose prose-lg mb-8">
          <p className="text-lg">
            Find answers to common questions about SnapPwd&apos;s secure
            password sharing service.
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                {faq.question}
              </h2>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">
            Still have questions?
          </h3>
          <p className="text-blue-800 mb-4">
            Can&apos;t find the answer you&apos;re looking for? We&apos;re here
            to help.
          </p>
          <a
            href="mailto:support@snappwd.io"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
