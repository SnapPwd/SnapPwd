import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import SecretForm from "@/components/ui/SecretForm";
import { Shield, Key, Database, Users, Zap, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Developer Tools - Secure API Key & .env File Sharing | SnapPwd",
  description:
    "Securely share API keys, database credentials, and .env files with your development team. Self-destructing links for developer secrets and environment variables.",
  keywords: [
    "developer tools",
    "API key sharing",
    "share .env files",
    "environment variables sharing",
    "database credentials sharing",
    "developer secrets",
    "team collaboration security",
    "secure development workflow",
    "onboarding developers",
    "devops security",
    "credential management",
    "secure code sharing",
  ],
  alternates: {
    canonical: "/developers",
  },
};

const developerUseCases = [
  {
    title: "Share .env Files Securely",
    description:
      "Environment variables contain sensitive configuration data that shouldn't be shared via email or chat. Share .env files with self-destructing links that provide one-time access, ensuring your environment variables remain secure.",
    icon: Shield,
    benefits: [
      "One-time access prevents accidental exposure",
      "End-to-end encryption protects your secrets",
      "Streamlines developer onboarding",
    ],
  },
  {
    title: "API Key Distribution",
    description:
      "Sharing API keys through chat or email creates permanent records that pose security risks. Use encrypted links that automatically delete after first access, eliminating digital breadcrumbs in your communication history.",
    icon: Key,
    benefits: [
      "Share API keys without permanent traces",
      "Automatic link deletion after access",
      "Maintains security compliance standards",
    ],
  },
  {
    title: "Database Credentials",
    description:
      "Database passwords and connection strings need secure distribution, especially for development and staging environments. Share credentials with temporary access links that keep your communication channels clean.",
    icon: Database,
    benefits: [
      "Secure database credential sharing",
      "Ideal for contractor and temporary access",
      "Zero-knowledge architecture protects your data",
    ],
  },
  {
    title: "Team Onboarding",
    description:
      "New developer onboarding often requires sharing multiple credentials and configuration files. Streamline the process with secure, organized credential sharing that doesn't compromise security.",
    icon: Users,
    benefits: [
      "Simplified onboarding without security risks",
      "Share multiple credentials securely at once",
      "Reduces onboarding communication overhead",
    ],
  },
];

export default function DeveloperPage() {
  return (
    <section className="py-12">
      <StructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Developer Tools for Secure Secret Sharing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share API keys, .env files, and development credentials securely
            with your team. Self-destructing links designed for developer
            workflows and security best practices.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {developerUseCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
            >
              <div className="flex items-center mb-4">
                <useCase.icon className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">{useCase.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="flex items-center text-sm text-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Why Developers Choose SnapPwd
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-foreground">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Zero-Knowledge Architecture
              </h3>
              <p className="text-muted-foreground">
                All encryption happens in your browser before transmission. Our
                servers never have access to your unencrypted secrets—it&apos;s
                technically impossible with our architecture.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-foreground">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                No Account Required
              </h3>
              <p className="text-muted-foreground">
                Share secrets instantly without sign-up, email verification, or
                password management. Simple link generation in seconds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-foreground">
                <Trash2 className="h-5 w-5 mr-2 text-primary" />
                Self-Destructing Links
              </h3>
              <p className="text-muted-foreground">
                Each link automatically deletes after first access, eliminating
                the risk of old credentials persisting in chat history or email
                threads.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready for Secure Developer Credential Sharing?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers using SnapPwd to share credentials
            securely. Eliminate the security risks of sharing API keys and
            secrets through email or chat.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Sharing Securely
          </a>
        </div>
      </div>
    </section>
  );
}
