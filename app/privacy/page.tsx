import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PrivacyStructuredData from "@/components/ui/PrivacyStructuredData";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Privacy Policy | SnapPwd",
  description:
    "Learn how SnapPwd collects, uses, and protects your information when using our secure password sharing service. Your privacy is our priority.",
  keywords: [
    "privacy policy",
    "data protection",
    "secure sharing",
    "password privacy",
    "encryption privacy",
    "data retention",
    "privacy protection",
    "user privacy",
  ],
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-12">
      <PrivacyStructuredData />
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg">
          <p className="text-lg mb-6">Last updated: July 8, 2025</p>

          <p>
            At SnapPwd, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Information We Collect
          </h2>
          <p>
            We collect minimal information to provide and improve our service:
          </p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              <strong>Usage Data:</strong> We collect anonymous usage statistics
              such as access times, device information, and IP addresses for
              security and service improvement purposes.
            </li>
            <li>
              <strong>Encrypted Content:</strong> The content you share through
              our service is encrypted in your browser before it reaches our
              servers. We never have access to the unencrypted content.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>
              Detect, prevent, and address technical issues and security threats
            </li>
            <li>Monitor the usage of our service</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
          <p>
            We automatically delete all encrypted content once it has been
            accessed by the recipient or when it reaches its expiration time,
            whichever comes first. We do not maintain backups of expired or
            accessed content.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data. However, no method of transmission over the
            Internet or electronic storage is 100% secure, so we cannot
            guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href={`mailto:${
                process.env.PRIVACY_EMAIL || "privacy@snappwd.io"
              }`}
              className="text-blue-600 hover:underline"
            >
              {process.env.PRIVACY_EMAIL || "privacy@snappwd.io"}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
