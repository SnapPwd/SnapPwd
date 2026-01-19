import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import APIKeyBestPracticesStructuredData from "@/components/ui/APIKeyBestPracticesStructuredData";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  Key,
  FileCode,
  Server,
  Users,
  RefreshCw,
  Eye,
  Database,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "API Key Security Best Practices - How to Store Secrets Safely | SnapPwd",
  description:
    "Learn security best practices for storing and sharing API keys. Avoid common mistakes like hardcoding secrets in code, and discover secure methods for credential management.",
  keywords: [
    "API key security",
    "API key best practices",
    "how to store API keys",
    "secure API key storage",
    "API key management",
    "secret management",
    "credential security",
    "environment variables",
    "API key rotation",
    "secure secret sharing",
  ],
  alternates: {
    canonical: "/api-key-best-practices",
  },
};

const commonMistakes = [
  {
    title: "Hardcoding in Source Code",
    description:
      "Never embed API keys directly in your code. Keys in source files end up in version control, build artifacts, and can be extracted from compiled applications.",
    icon: FileCode,
  },
  {
    title: "Committing to Git",
    description:
      "Even if you delete a key from your code, it remains in git history forever. Attackers actively scan public repositories for exposed credentials.",
    icon: Database,
  },
  {
    title: "Sharing via Chat or Email",
    description:
      "Credentials shared in Slack, Teams, or email remain searchable indefinitely. These platforms aren't designed for secure secret transmission.",
    icon: Users,
  },
  {
    title: "Using the Same Key Everywhere",
    description:
      "Reusing API keys across environments (dev, staging, prod) or services increases blast radius if one key is compromised.",
    icon: Key,
  },
];

const bestPractices = [
  {
    title: "Use Environment Variables",
    description:
      "Store API keys in environment variables that are injected at runtime. This keeps secrets out of your codebase and allows different values per environment.",
    icon: Server,
    tips: [
      "Use .env files for local development (add to .gitignore)",
      "Use platform secrets management for production",
      "Never log environment variable values",
    ],
  },
  {
    title: "Implement Secret Rotation",
    description:
      "Regularly rotate API keys to limit the impact of potential exposure. Automated rotation reduces the window of vulnerability if a key is compromised.",
    icon: RefreshCw,
    tips: [
      "Set up automatic key rotation schedules",
      "Ensure your app can handle key updates gracefully",
      "Keep old keys active briefly during rotation",
    ],
  },
  {
    title: "Apply Least Privilege",
    description:
      "Create API keys with only the permissions needed for their specific use case. Avoid using admin or full-access keys when limited permissions suffice.",
    icon: Lock,
    tips: [
      "Create separate keys for different services",
      "Use read-only keys when writes aren't needed",
      "Restrict keys to specific IP ranges or domains",
    ],
  },
  {
    title: "Use a Secrets Manager",
    description:
      "Enterprise teams should consider dedicated secrets management solutions that provide encryption, access control, audit logging, and rotation.",
    icon: Shield,
    tips: [
      "HashiCorp Vault, AWS Secrets Manager, Azure Key Vault",
      "Centralized access control and audit trails",
      "Automatic secret injection into applications",
    ],
  },
  {
    title: "Monitor and Audit Access",
    description:
      "Enable logging for API key usage to detect unusual patterns. Set up alerts for suspicious activity like requests from unexpected locations.",
    icon: Eye,
    tips: [
      "Review API usage logs regularly",
      "Set up anomaly detection alerts",
      "Track which team members access which secrets",
    ],
  },
];

const doAndDont = {
  do: [
    "Store keys in environment variables or secrets managers",
    "Use different keys for development, staging, and production",
    "Rotate keys regularly and after any suspected exposure",
    "Restrict key permissions to only what's needed",
    "Use self-destructing links when sharing keys with teammates",
    "Revoke keys immediately when team members leave",
    "Enable API key usage monitoring and alerts",
  ],
  dont: [
    "Hardcode API keys in source code",
    "Commit keys to version control (even private repos)",
    "Share keys via Slack, email, or chat platforms",
    "Use production keys in development environments",
    "Share keys with more people than necessary",
    "Ignore key expiration warnings",
    "Store keys in plain text files on servers",
  ],
};

export default function APIKeyBestPracticesPage() {
  return (
    <section className="py-12">
      <APIKeyBestPracticesStructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            API Key Security Best Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to securely store, manage, and share API keys and secrets.
            Protect your applications from credential exposure and security breaches.
          </p>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-destructive mr-3 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Why API Key Security Matters
              </h2>
              <p className="text-muted-foreground">
                Exposed API keys are one of the leading causes of security breaches.
                Attackers use automated tools to scan code repositories, public pastes,
                and chat logs for credentials. A single exposed key can lead to data
                breaches, unauthorized charges, and service abuse.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Common Mistakes to Avoid
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-destructive/30 hover:border-destructive/50 transition-colors"
              >
                <div className="flex items-center mb-3">
                  <div className="bg-destructive/10 p-2 rounded-lg mr-3">
                    <mistake.icon className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {mistake.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">{mistake.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Security Best Practices
          </h2>
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
              >
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4 flex-shrink-0">
                    <practice.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{practice.description}</p>
                    <ul className="space-y-2">
                      {practice.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            Quick Reference: Do&apos;s and Don&apos;ts
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-green-600 dark:text-green-400 text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Do
              </h3>
              <ul className="space-y-3">
                {doAndDont.do.map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-destructive text-lg flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Don&apos;t
              </h3>
              <ul className="space-y-3">
                {doAndDont.dont.map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <XCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Secure Sharing When You Must
          </h2>
          <p className="text-muted-foreground mb-4">
            Sometimes you need to share an API key with a teammate, contractor, or
            collaborator. When that happens, avoid chat and email. Use a secure,
            self-destructing link that ensures the key is viewed once and then
            permanently deleted.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-1" />
              One-time access ensures the key isn&apos;t left in message history
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-1" />
              End-to-end encryption protects the key during transmission
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-1" />
              Automatic destruction means no cleanup needed
            </li>
          </ul>
        </div>

        <div className="text-center bg-card rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Need to Share a Secret Securely?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            When you need to share an API key, password, or credential with someone,
            use SnapPwd to create a secure, self-destructing link. No signup required.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            <Lock className="h-5 w-5 mr-2" />
            Share a Secret Securely
          </a>
        </div>
      </div>
    </section>
  );
}
