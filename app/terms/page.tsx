import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TermsStructuredData from "@/components/ui/TermsStructuredData";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Terms of Service | SnapPwd",
  description:
    "Review the terms and conditions for using SnapPwd's secure password and sensitive information sharing service. Read our usage guidelines.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "usage terms",
    "legal terms",
    "service agreement",
    "user agreement",
    "password sharing terms",
    "secure service terms",
  ],
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="py-12">
      <TermsStructuredData />
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg">
          <p className="text-lg mb-6 text-muted-foreground">
            Last updated: July 8, 2025
          </p>

          <p className="text-muted-foreground">
            Please read these Terms of Service (&quot;Terms&quot;) carefully
            before using the SnapPwd service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground">
            By accessing or using SnapPwd, you agree to be bound by these Terms.
            If you disagree with any part of the terms, you may not access the
            service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground">
            SnapPwd provides a secure way to share sensitive information through
            self-destructing links. The service encrypts your content in the
            browser and generates time-limited links that can be accessed only
            once before being permanently deleted.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. User Responsibilities
          </h2>
          <p className="text-muted-foreground">You are responsible for:</p>
          <ul className="list-disc pl-6 my-4 space-y-2 text-muted-foreground">
            <li>Maintaining the confidentiality of links you generate</li>
            <li>Ensuring you share links only with intended recipients</li>
            <li>
              Using the service in compliance with all applicable laws and
              regulations
            </li>
            <li>
              Not using the service for any illegal or unauthorized purpose
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Prohibited Content
          </h2>
          <p className="text-muted-foreground">
            You may not use SnapPwd to share:
          </p>
          <ul className="list-disc pl-6 my-4 space-y-2 text-muted-foreground">
            <li>Content that violates any applicable laws or regulations</li>
            <li>Malicious software or harmful code</li>
            <li>Content that infringes on intellectual property rights</li>
            <li>Content that promotes illegal activities or harm to others</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-muted-foreground">
            SnapPwd is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any damages arising from your use of the
            service or any inability to access or use the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Service Modifications
          </h2>
          <p className="text-muted-foreground">
            We reserve the right to modify or discontinue the service
            temporarily or permanently at any time, with or without notice. We
            shall not be liable to you or any third party for any modification,
            suspension, or discontinuance of the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Changes to Terms
          </h2>
          <p className="text-muted-foreground">
            We may revise these Terms at any time without notice. By continuing
            to use SnapPwd after any changes, you accept the revised Terms.
          </p>

        </div>

        <div className="mt-8 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Questions About These Terms?
          </h3>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms of Service, we&apos;re
            here to help.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link
              href={`mailto:${process.env.LEGAL_EMAIL || "legal@snappwd.io"}`}
            >
              Contact Legal
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
