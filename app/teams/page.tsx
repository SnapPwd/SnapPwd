import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TeamsStructuredData from "@/components/ui/TeamsStructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  Shield,
  Users,
  Building2,
  Lock,
  UserPlus,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Team Credential Sharing - Secure Team Secrets | SnapPwd",
  description:
    "Securely share passwords and credentials within your team. Self-destructing links for team collaboration that don't leave traces in Slack, email, or chat history.",
  keywords: [
    "team password sharing",
    "team credentials",
    "secure team collaboration",
    "share secrets with team",
    "team security",
    "enterprise password sharing",
    "workplace credential sharing",
    "team onboarding credentials",
    "secure team communication",
    "business password sharing",
  ],
  alternates: {
    canonical: "/teams",
  },
};

const teamBenefits = [
  {
    title: "Zero Slack/Chat Trail",
    description:
      "Stop sharing passwords in Slack, Teams, or Discord where they stay searchable forever. Our links self-destruct after viewing, leaving no trace in your communication history.",
    icon: Shield,
  },
  {
    title: "Works for Any Team Size",
    description:
      "Whether you're a startup of 5 or an enterprise of 5,000, share credentials securely without complex setup or per-seat pricing. Just generate and share.",
    icon: Users,
  },
  {
    title: "Perfect for Remote Teams",
    description:
      "Distributed teams can't hand over credentials in person. Secure links bridge the gap, letting you share sensitive data across any timezone safely.",
    icon: Globe,
  },
  {
    title: "No IT Overhead",
    description:
      "No software to install, no training required, no accounts to manage. Anyone on your team can start using secure sharing in seconds.",
    icon: Building2,
  },
];

const teamScenarios = [
  {
    title: "Shared Service Accounts",
    description:
      "Share login credentials for tools like social media accounts, analytics platforms, or shared admin panels without permanent exposure.",
    icon: Users,
  },
  {
    title: "Cross-Team Collaboration",
    description:
      "Marketing needs design tool access. Sales needs CRM credentials. Share securely between departments without going through IT for every request.",
    icon: UserPlus,
  },
  {
    title: "Contractor & Vendor Access",
    description:
      "Give temporary access to external partners, freelancers, or agencies without sharing credentials that could be reused later.",
    icon: Clock,
  },
  {
    title: "Emergency Access",
    description:
      "When someone's locked out or on vacation, share recovery credentials quickly without leaving a permanent paper trail.",
    icon: Lock,
  },
];

export default function TeamsPage() {
  return (
    <section className="py-12">
      <TeamsStructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Secure Credential Sharing for Teams
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share passwords, API keys, and sensitive information with your team
            using self-destructing links. No more credentials lingering in Slack
            threads or email chains.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {teamBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
            >
              <div className="flex items-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Team Credential Sharing Scenarios
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamScenarios.map((scenario, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border"
              >
                <div className="flex items-center mb-2">
                  <scenario.icon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-foreground">
                    {scenario.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            How Teams Typically Share Credentials (And Why It&apos;s Risky)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-destructive text-lg">
                Common Risky Practices
              </h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  Passwords in Slack DMs that stay searchable forever
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  Email threads with credentials that get forwarded and archived
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  Shared documents with passwords visible to anyone with access
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  Screenshots of credentials shared in chat
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400 text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                The SnapPwd Way
              </h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  Share a link that self-destructs after viewing
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  End-to-end encryption means we can&apos;t see your credentials
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  No permanent records in any communication channel
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  Works instantly with zero setup or accounts
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Start Sharing Team Credentials Securely
          </h2>
          <p className="text-muted-foreground mb-6">
            Join teams that have switched from risky password sharing to
            secure, self-destructing links. No signup needed.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Share a Team Credential Now
          </a>
        </div>
      </div>
    </section>
  );
}
