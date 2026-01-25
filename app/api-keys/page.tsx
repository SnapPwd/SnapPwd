import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  Shield,
  Trash2,
  Zap,
  Users,
  Lock,
  Key,
  Mail,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Secure API Key Sharing - Share API Keys Safely | SnapPwd",
  description:
    "Securely share API keys, tokens, and access credentials with your team. Self-destructing links ensure API keys are never exposed in chat logs or emails.",
  keywords: [
    "API key sharing",
    "secure API key distribution",
    "share API tokens",
    "API key security",
    "developer API key sharing",
    "temporary API key access",
    "API key management",
    "secure credential sharing",
    "API key onboarding",
    "team API access",
  ],
  alternates: {
    canonical: "/api-keys",
  },
};

const apiKeyBenefits = [
  {
    title: "Zero-Knowledge Encryption",
    description:
      "Your API keys are encrypted in your browser before transmission. We can't access your keys even if we wanted to—it's technically impossible with our architecture.",
    icon: Shield,
  },
  {
    title: "One-Time Access Links",
    description:
      "Each link self-destructs after a single use. This eliminates the risk of old API keys lingering in chat history or email threads months later.",
    icon: Trash2,
  },
  {
    title: "No Registration Required",
    description:
      "Share securely in seconds without creating an account. No email verification, password management, or lengthy signup process.",
    icon: Zap,
  },
  {
    title: "Built for Teams",
    description:
      "Whether onboarding new hires, working with contractors, or sharing with teammates, SnapPwd ensures your API keys stay secure and don't end up in the wrong hands.",
    icon: Users,
  },
];

const useCases = [
  {
    title: "Third-Party API Integration",
    description:
      "Share API keys for services like Stripe, Twilio, Google Maps, or any external API with your development team.",
  },
  {
    title: "Contractor Access",
    description:
      "Provide temporary API key access to freelancers and contractors without permanent credential sharing.",
  },
  {
    title: "Development & Testing",
    description:
      "Share test API keys for development environments without risking production credentials.",
  },
  {
    title: "Service Account Keys",
    description:
      "Securely distribute service account keys, OAuth tokens, and other authentication credentials.",
  },
];

export default function APIKeysPage() {
  return (
    <section className="py-12">
      <StructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Secure API Key Sharing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share API keys and access tokens securely with your team using
            self-destructing links. Prevent credential exposure in chat logs,
            email, and collaboration tools.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {apiKeyBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
            >
              <div className="flex items-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              </div>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Common API Key Sharing Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border"
              >
                <h3 className="font-semibold mb-2 text-foreground">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Why Traditional Tools Fall Short
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-destructive">
                <Mail className="h-5 w-5 mr-2" />
                Email Risks
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Permanent archive retention</li>
                <li>• Accidental forwarding</li>
                <li>• Searchable by all recipients</li>
                <li>• No credential revocation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-destructive">
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat Platform Risks
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Indefinite chat history</li>
                <li>• Easy screenshot sharing</li>
                <li>• Team-wide keyword search</li>
                <li>• No link expiration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5 mr-2" />
                SnapPwd Difference
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Single-use access links</li>
                <li>• Automatic link destruction</li>
                <li>• End-to-end encryption</li>
                <li>• Zero credential retention</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready for Secure API Key Sharing?
          </h2>
          <p className="text-muted-foreground mb-6">
            Stop worrying about API keys in chat history and email archives.
            Share credentials securely with self-destructing links in seconds.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Securely Share an API Key Now
          </a>
        </div>
      </div>
    </section>
  );
}
