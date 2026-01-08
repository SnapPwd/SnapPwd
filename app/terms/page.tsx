import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TermsStructuredData from "@/components/ui/TermsStructuredData";

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
          <p className="text-lg mb-6">Last updated: July 8, 2025</p>

          <p>
            Please read these Terms of Service (&quot;Terms&quot;) carefully
            before using the SnapPwd service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using SnapPwd, you agree to be bound by these Terms.
            If you disagree with any part of the terms, you may not access the
            service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Description of Service
          </h2>
          <p>
            SnapPwd provides a secure way to share sensitive information through
            self-destructing links. The service encrypts your content in the
            browser and generates time-limited links that can be accessed only
            once before being permanently deleted.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. User Responsibilities
          </h2>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
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
          <p>You may not use SnapPwd to share:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Content that violates any applicable laws or regulations</li>
            <li>Malicious software or harmful code</li>
            <li>Content that infringes on intellectual property rights</li>
            <li>Content that promotes illegal activities or harm to others</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Limitation of Liability
          </h2>
          <p>
            SnapPwd is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any damages arising from your use of the
            service or any inability to access or use the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Service Modifications
          </h2>
          <p>
            We reserve the right to modify or discontinue the service
            temporarily or permanently at any time, with or without notice. We
            shall not be liable to you or any third party for any modification,
            suspension, or discontinuance of the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Changes to Terms
          </h2>
          <p>
            We may revise these Terms at any time without notice. By continuing
            to use SnapPwd after any changes, you accept the revised Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:legal@snappwd.io"
              className="text-blue-600 hover:underline"
            >
              legal@snappwd.io
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
