import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { faqData } from "@/lib/faq-data";

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

export default function FAQPage() {
  return (
    <section className="py-12">
      <StructuredData faqItems={faqData} />
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
