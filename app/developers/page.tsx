import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DeveloperStructuredData from "@/components/ui/DeveloperStructuredData";
import SecretForm from "@/components/ui/SecretForm";
import { Shield, Key, Database, Users, Lock, Zap, Trash2 } from "lucide-react";

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
      "Stop emailing .env files or posting them in Slack. Share environment variables with self-destructing links that automatically expire after use.",
    icon: Shield,
    benefits: [
      "One-time access prevents accidental exposure",
      "End-to-end encryption protects your secrets",
      "Perfect for onboarding new team members",
    ],
  },
  {
    title: "API Key Distribution",
    description:
      "Safely distribute API keys, tokens, and access credentials to team members without leaving traces in chat history.",
    icon: Key,
    benefits: [
      "Secure API key sharing with developers",
      "Automatic cleanup after access",
      "Audit trail for compliance",
    ],
  },
  {
    title: "Database Credentials",
    description:
      "Share database passwords, connection strings, and access credentials securely during development and deployment.",
    icon: Database,
    benefits: [
      "Secure database credential sharing",
      "Temporary access for contractors",
      "Zero-knowledge architecture",
    ],
  },
  {
    title: "Team Onboarding",
    description:
      "Streamline developer onboarding by securely sharing all necessary credentials, configuration files, and access information.",
    icon: Users,
    benefits: [
      "Secure onboarding workflow",
      "Share multiple credentials safely",
      "Reduce onboarding time",
    ],
  },
];

export default function DeveloperPage() {
  return (
    <section className="py-12">
      <DeveloperStructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Developer Tools for Secure Secret Sharing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The secure way to share API keys, .env files, and development
            credentials with your team. Built by developers, for developers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Lock className="h-5 w-5 mr-2" /> Share Your Development Secret
          </h2>
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {developerUseCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center mb-4">
                <useCase.icon className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">{useCase.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Why Developers Choose SnapPwd
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-blue-600" />
                Zero-Knowledge
              </h3>
              <p className="text-gray-700">
                We never have access to your secrets. All encryption happens in
                your browser.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-600" />
                Instant Setup
              </h3>
              <p className="text-gray-700">
                No registration required. Start sharing secrets with your team
                in seconds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Trash2 className="h-5 w-5 mr-2 text-blue-600" />
                Auto-Cleanup
              </h3>
              <p className="text-gray-700">
                Links self-destruct after access, eliminating credential sprawl
                in your tools.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Secure Your Development Workflow?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of developers who trust SnapPwd for secure credential
            sharing.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Sharing Securely
          </a>
        </div>
      </div>
    </section>
  );
}
