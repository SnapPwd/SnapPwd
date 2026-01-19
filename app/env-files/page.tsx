import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EnvFilesStructuredData from "@/components/ui/EnvFilesStructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  Shield,
  FileCode,
  AlertTriangle,
  CheckCircle,
  Lock,
  Zap,
  Users,
  Server,
  GitBranch,
  Terminal,
  Eye,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Share .env Files Securely - Environment Variables Sharing | SnapPwd",
  description:
    "Securely share .env files and environment variables with your team. Self-destructing links ensure your database URLs, API keys, and secrets never linger in chat or email.",
  keywords: [
    "share env file",
    "share .env file securely",
    "environment variables sharing",
    "share environment variables",
    "secure env file transfer",
    "dotenv sharing",
    "config file sharing",
    "share database credentials",
    "share connection strings",
    "developer secrets sharing",
  ],
  alternates: {
    canonical: "/env-files",
  },
};

const envFileBenefits = [
  {
    title: "Share Complete .env Files",
    description:
      "Paste your entire .env file contents and share with a single link. Perfect for onboarding new developers or sharing config across environments.",
    icon: FileCode,
  },
  {
    title: "Zero-Knowledge Encryption",
    description:
      "Your environment variables are encrypted in your browser before transmission. We never see your database passwords, API keys, or secrets.",
    icon: Shield,
  },
  {
    title: "Self-Destructing Links",
    description:
      "Links expire after a single view or a set time. No more worrying about .env contents sitting in Slack history or email threads forever.",
    icon: Zap,
  },
  {
    title: "No Account Required",
    description:
      "Share environment variables instantly without signing up. The recipient doesn't need an account either—just click the link and view.",
    icon: Users,
  },
];

const commonEnvSecrets = [
  {
    title: "Database Connection Strings",
    description: "PostgreSQL, MySQL, MongoDB URIs with credentials",
    icon: Server,
    examples: ["DATABASE_URL", "MONGODB_URI", "REDIS_URL"],
  },
  {
    title: "API Keys & Tokens",
    description: "Third-party service credentials and access tokens",
    icon: Lock,
    examples: ["STRIPE_SECRET_KEY", "AWS_ACCESS_KEY_ID", "GITHUB_TOKEN"],
  },
  {
    title: "Authentication Secrets",
    description: "JWT secrets, session keys, OAuth credentials",
    icon: Shield,
    examples: ["JWT_SECRET", "SESSION_SECRET", "OAUTH_CLIENT_SECRET"],
  },
  {
    title: "Service Configuration",
    description: "Email, storage, and cloud service credentials",
    icon: Terminal,
    examples: ["SMTP_PASSWORD", "S3_SECRET_KEY", "SENDGRID_API_KEY"],
  },
];

const riskyPractices = [
  {
    practice: "Committing .env to Git",
    risk: "Secrets exposed in repository history forever, even after deletion",
    icon: GitBranch,
  },
  {
    practice: "Sharing via Slack/Teams",
    risk: "Environment variables searchable in chat history indefinitely",
    icon: Eye,
  },
  {
    practice: "Emailing .env files",
    risk: "Credentials archived, forwarded, and backed up across multiple systems",
    icon: AlertTriangle,
  },
  {
    practice: "Shared cloud documents",
    risk: "Access permissions change, sync across devices, stored unencrypted",
    icon: XCircle,
  },
];

export default function EnvFilesPage() {
  return (
    <section className="py-12">
      <EnvFilesStructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Share .env Files Securely
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Securely share environment variables, database credentials, and
            configuration secrets with your team using self-destructing links.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {envFileBenefits.map((benefit, index) => (
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
            What&apos;s Typically in .env Files?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonEnvSecrets.map((secret, index) => (
              <div
                key={index}
                className="bg-card p-5 rounded-lg border border-border"
              >
                <div className="flex items-center mb-3">
                  <secret.icon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-foreground">
                    {secret.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {secret.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {secret.examples.map((example, i) => (
                    <code
                      key={i}
                      className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                    >
                      {example}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
            <AlertTriangle className="h-6 w-6 text-destructive mr-3" />
            Risky Ways Teams Share .env Files
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {riskyPractices.map((item, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-destructive/30"
              >
                <div className="flex items-center mb-2">
                  <item.icon className="h-5 w-5 text-destructive mr-2" />
                  <h3 className="font-semibold text-foreground">
                    {item.practice}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">{item.risk}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            How to Share .env Files Safely
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">
                Paste Your .env
              </h3>
              <p className="text-muted-foreground text-sm">
                Copy your environment variables or entire .env file contents
                into the form above
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">
                Get Secure Link
              </h3>
              <p className="text-muted-foreground text-sm">
                We encrypt everything in your browser and generate a one-time
                access link
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">
                Share & Forget
              </h3>
              <p className="text-muted-foreground text-sm">
                Send the link to your teammate. It self-destructs after viewing.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Common Scenarios
          </h2>
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-1">
                Onboarding New Developers
              </h3>
              <p className="text-muted-foreground text-sm">
                New team member needs the local development .env to get started.
                Share securely without adding secrets to your onboarding docs.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-1">
                Contractor Handoff
              </h3>
              <p className="text-muted-foreground text-sm">
                External developer needs staging credentials. Share with a
                self-destructing link that won&apos;t persist after they&apos;ve
                copied it.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-1">
                Cross-Team Collaboration
              </h3>
              <p className="text-muted-foreground text-sm">
                Backend team needs to share service credentials with the mobile
                team. No more hunting through old Slack messages for that
                DATABASE_URL.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Best Practices for .env Security
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Do
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  Add .env to .gitignore immediately
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  Use .env.example with placeholder values
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  Share real values via self-destructing links
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  Use different credentials per environment
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-destructive flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Don&apos;t
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  Commit .env files to version control
                </li>
                <li className="flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  Share .env contents in Slack or email
                </li>
                <li className="flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  Store .env files in shared cloud drives
                </li>
                <li className="flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  Use production credentials in development
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center bg-card rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready to Share Your .env Securely?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stop risking credential exposure in chat and email. Share your
            environment variables with a secure, self-destructing link.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            <Lock className="h-5 w-5 mr-2" />
            Share Environment Variables Now
          </a>
        </div>
      </div>
    </section>
  );
}
