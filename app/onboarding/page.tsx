import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  Shield,
  UserPlus,
  Key,
  Database,
  FileCode,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Secure Employee Onboarding - Share Credentials Safely | SnapPwd",
  description:
    "Streamline new employee onboarding with secure credential sharing. Share API keys, passwords, and .env files with new hires using self-destructing links.",
  keywords: [
    "employee onboarding credentials",
    "new hire password sharing",
    "secure onboarding",
    "developer onboarding",
    "share credentials new employee",
    "onboarding security",
    "new team member access",
    "first day credentials",
    "onboarding .env files",
    "new hire API keys",
  ],
  alternates: {
    canonical: "/onboarding",
  },
};

const onboardingCredentials = [
  {
    title: "Environment Variables",
    description:
      "Share .env files containing API keys, database URLs, and configuration secrets. New developers get set up instantly without insecure email chains.",
    icon: FileCode,
  },
  {
    title: "Service Account Access",
    description:
      "Provide access to shared tools like AWS, Google Cloud, or internal services. One-time links ensure credentials aren't floating around in old messages.",
    icon: Key,
  },
  {
    title: "Database Credentials",
    description:
      "Share development database passwords and connection strings securely. Perfect for getting new team members connected to staging environments.",
    icon: Database,
  },
  {
    title: "Third-Party Integrations",
    description:
      "API keys for Stripe, Twilio, SendGrid, or any external service. New hires get access without credentials being permanently visible.",
    icon: Shield,
  },
];

const onboardingSteps = [
  {
    step: "1",
    title: "Collect Credentials",
    description:
      "Gather the API keys, passwords, and configuration files your new hire needs.",
  },
  {
    step: "2",
    title: "Generate Secure Links",
    description:
      "Create self-destructing links for each credential set using SnapPwd.",
  },
  {
    step: "3",
    title: "Share via Any Channel",
    description:
      "Send links through Slack, email, or your onboarding system—they self-destruct after viewing.",
  },
  {
    step: "4",
    title: "New Hire Accesses Once",
    description:
      "The new team member views and saves the credentials. Links disappear, leaving no trace.",
  },
];

export default function OnboardingPage() {
  return (
    <section className="py-12">
      <StructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Secure Credential Sharing for Employee Onboarding
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Onboard new team members without leaving credentials scattered
            across email and chat. Share API keys, passwords, and configuration
            files with self-destructing links.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {onboardingCredentials.map((credential, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
            >
              <div className="flex items-center mb-4">
                <credential.icon className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">
                  {credential.title}
                </h3>
              </div>
              <p className="text-muted-foreground">{credential.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            Simple Secure Onboarding Workflow
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card p-4 rounded-lg border border-border h-full">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
                {index < onboardingSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Why Traditional Onboarding Credential Sharing Fails
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-destructive text-lg">
                The Old Way
              </h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  .env files sent via email, archived forever
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  API keys shared in Slack DMs, searchable by anyone
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  Credentials in shared docs accessible to past employees
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  No way to know if credentials were properly received
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400 text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                With SnapPwd
              </h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  Self-destructing links leave no permanent traces
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  End-to-end encryption protects sensitive data
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  One-time access prevents credential reuse after viewing
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  No accounts needed—new hires access immediately
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border mb-12">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">
              First Day Ready in Minutes
            </h2>
          </div>
          <p className="text-muted-foreground mb-4">
            New developers often wait hours or days for access to the tools they
            need. With SnapPwd, you can prepare secure credential links ahead of
            time, send them on day one, and have your new hire fully set up
            within minutes—not days.
          </p>
          <ul className="grid md:grid-cols-3 gap-4">
            <li className="flex items-center text-foreground">
              <UserPlus className="h-5 w-5 text-primary mr-2" />
              Instant access delivery
            </li>
            <li className="flex items-center text-foreground">
              <Shield className="h-5 w-5 text-primary mr-2" />
              Security-first approach
            </li>
            <li className="flex items-center text-foreground">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              Zero IT overhead
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready to Secure Your Onboarding Process?
          </h2>
          <p className="text-muted-foreground mb-6">
            Stop sending credentials through insecure channels. Create
            self-destructing links for your next new hire in seconds.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Create Onboarding Credentials Link
          </a>
        </div>
      </div>
    </section>
  );
}
