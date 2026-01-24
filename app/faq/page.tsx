import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FAQStructuredData from "@/components/ui/FAQStructuredData";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "FAQ | SnapPwd",
  description:
    "Frequently asked questions about SnapPwd's secure password sharing service. Learn how to share .env files, API keys, and developer secrets securely with your team.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "password sharing FAQ",
    "secure sharing questions",
    "encryption FAQ",
    "security questions",
    "SnapPwd help",
    "password sharing guide",
    "share .env files",
    "environment variables sharing",
    "API key sharing",
    "database credentials sharing",
    "developer secrets",
    "team collaboration security",
    "onboarding credentials",
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
  {
    question: "How can I share .env files securely with my team?",
    answer:
      "SnapPwd is perfect for sharing .env files and environment variables securely. Instead of emailing .env files or posting them in chat, copy the content and create a secret link. The link expires after one access, ensuring your environment variables aren't accidentally exposed to unauthorized team members.",
  },
  {
    question: "Is SnapPwd good for sharing API keys and database credentials?",
    answer:
      "Absolutely! SnapPwd is ideal for sharing API keys, database credentials, and other development secrets. The one-time access nature ensures that sensitive credentials aren't left lingering in chat logs or emails where they could be discovered later.",
  },
  {
    question: "Can developers use SnapPwd for onboarding new team members?",
    answer:
      "Yes, SnapPwd is excellent for developer onboarding. You can securely share access credentials, API keys, configuration files, and other sensitive setup information with new team members. The self-destructing links ensure that access credentials are automatically cleaned up after use.",
  },
  {
    question: "How does SnapPwd compare to other methods for sharing secrets?",
    answer:
      "Unlike email, Slack, or other messaging apps where secrets persist forever, SnapPwd links self-destruct after access. This eliminates the risk of old credentials being discovered in chat history. Plus, with end-to-end encryption, even our servers can't access your data.",
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
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about SnapPwd&apos;s secure
            password sharing service.
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-6 hover:border-ring transition-colors bg-card"
            >
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                {faq.question}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Can&apos;t find the answer you&apos;re looking for? We&apos;re here
            to help.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link
              href={`mailto:${
                process.env.SUPPORT_EMAIL || "support@snappwd.io"
              }`}
            >
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
