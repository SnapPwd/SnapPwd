import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EnvBestPracticesStructuredData from "@/components/ui/EnvBestPracticesStructuredData";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  FileCode,
  Server,
  GitBranch,
  FolderTree,
  RefreshCw,
  Eye,
  Terminal,
  Layers,
  FileWarning,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Environment Variables Best Practices - Secure .env Management | SnapPwd",
  description:
    "Learn best practices for managing environment variables and .env files. Secure your configuration secrets, prevent accidental exposure, and implement proper secret management.",
  keywords: [
    "environment variables best practices",
    "env file security",
    "dotenv best practices",
    "secure environment variables",
    ".env file management",
    "configuration secrets",
    "env file gitignore",
    "environment variable security",
    "dotenv security",
    "secret configuration management",
  ],
  alternates: {
    canonical: "/env-best-practices",
  },
};

const commonMistakes = [
  {
    title: "Committing .env to Version Control",
    description:
      "The most common mistake. Once committed, secrets remain in git history forever, even after deletion. Attackers scan repositories for leaked credentials.",
    icon: GitBranch,
  },
  {
    title: "Using Production Secrets in Development",
    description:
      "Development environments are less secure. Using production credentials locally risks exposure through debug logs, error messages, or shared machines.",
    icon: Server,
  },
  {
    title: "Hardcoding Fallback Values",
    description:
      "Using default values like `process.env.API_KEY || 'default-key'` can accidentally expose test credentials or cause production to use insecure defaults.",
    icon: FileCode,
  },
  {
    title: "Sharing .env Files Insecurely",
    description:
      "Sending .env contents via Slack, email, or shared documents leaves secrets searchable and archived in multiple systems indefinitely.",
    icon: FileWarning,
  },
];

const bestPractices = [
  {
    title: "Always Add .env to .gitignore",
    description:
      "The first thing to do in any project. Create a .gitignore file and add .env, .env.local, .env.*.local to prevent accidental commits.",
    icon: GitBranch,
    code: `# .gitignore
.env
.env.local
.env.*.local
.env.development
.env.production`,
  },
  {
    title: "Create .env.example Template",
    description:
      "Maintain a .env.example file with all required variables but placeholder values. This documents what's needed without exposing secrets.",
    icon: FileCode,
    code: `# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=your-api-key-here
JWT_SECRET=generate-a-secure-secret`,
  },
  {
    title: "Use Environment-Specific Files",
    description:
      "Separate configurations for different environments. Use .env.development, .env.staging, .env.production with appropriate secrets for each.",
    icon: Layers,
    code: `# File structure
.env                 # Shared defaults
.env.local           # Local overrides (gitignored)
.env.development     # Development settings
.env.production      # Production settings`,
  },
  {
    title: "Validate Required Variables",
    description:
      "Check that all required environment variables are set at startup. Fail fast with clear error messages rather than encountering undefined errors later.",
    icon: Shield,
    code: `// Validate at startup
const required = ['DATABASE_URL', 'API_KEY'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(\`Missing env: \${key}\`);
  }
}`,
  },
  {
    title: "Never Log Environment Variables",
    description:
      "Avoid logging process.env or individual secrets. Logs are often stored, aggregated, and accessed by multiple systems and team members.",
    icon: Eye,
    code: `// Bad - exposes secrets in logs
console.log(process.env);
console.log('API Key:', process.env.API_KEY);

// Good - log only non-sensitive info
console.log('Environment:', process.env.NODE_ENV);`,
  },
  {
    title: "Use Secrets Manager in Production",
    description:
      "For production deployments, use platform-native secrets management instead of .env files. AWS Secrets Manager, Azure Key Vault, or Vercel Environment Variables.",
    icon: Lock,
    code: `# Platform examples
# Vercel: Project Settings → Environment Variables
# AWS: Secrets Manager or Parameter Store
# Heroku: Config Vars
# Docker: Docker secrets or env_file`,
  },
];

const structureExample = {
  title: "Recommended Project Structure",
  files: [
    { name: ".env", description: "Shared defaults (optional, gitignored)", gitignored: true },
    { name: ".env.local", description: "Local overrides with real secrets", gitignored: true },
    { name: ".env.example", description: "Template with placeholder values", gitignored: false },
    { name: ".env.development", description: "Development environment config", gitignored: true },
    { name: ".env.production", description: "Production config (if needed locally)", gitignored: true },
    { name: ".gitignore", description: "Lists all .env files to ignore", gitignored: false },
  ],
};

const doAndDont = {
  do: [
    "Add .env to .gitignore before your first commit",
    "Create .env.example with placeholder values",
    "Use different secrets for each environment",
    "Validate required variables at application startup",
    "Use platform secrets management for production",
    "Share .env contents via self-destructing links",
    "Rotate secrets periodically and after team changes",
    "Document all required variables in README or .env.example",
  ],
  dont: [
    "Commit .env files to version control",
    "Use production secrets in development",
    "Log environment variables or their values",
    "Share .env contents via Slack, email, or docs",
    "Use the same secrets across all environments",
    "Hardcode fallback values for secrets",
    "Store .env files in cloud drives or shared folders",
    "Ignore .env.example when it needs updating",
  ],
};

export default function EnvBestPracticesPage() {
  return (
    <section className="py-12">
      <EnvBestPracticesStructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Environment Variables Best Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to securely manage .env files and environment variables.
            Protect your configuration secrets from accidental exposure.
          </p>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-destructive mr-3 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Why .env Security Matters
              </h2>
              <p className="text-muted-foreground">
                Environment files often contain database passwords, API keys, and
                authentication secrets. A single exposed .env file can compromise your
                entire application, leading to data breaches, unauthorized access, and
                financial loss.
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
            Best Practices with Examples
          </h2>
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4 flex-shrink-0">
                    <practice.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code className="text-muted-foreground">{practice.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <FolderTree className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">
              {structureExample.title}
            </h2>
          </div>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground font-semibold">File</th>
                  <th className="text-left p-4 text-foreground font-semibold">Purpose</th>
                  <th className="text-left p-4 text-foreground font-semibold">Git</th>
                </tr>
              </thead>
              <tbody>
                {structureExample.files.map((file, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {file.name}
                      </code>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {file.description}
                    </td>
                    <td className="p-4">
                      {file.gitignored ? (
                        <span className="text-destructive text-sm flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Ignored
                        </span>
                      ) : (
                        <span className="text-green-600 dark:text-green-400 text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Tracked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 mb-12 border border-border">
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
            When You Need to Share .env Contents
          </h2>
          <p className="text-muted-foreground mb-4">
            Sometimes sharing environment variables is unavoidable—onboarding new
            developers, working with contractors, or collaborating across teams.
            When you must share, use secure, self-destructing links instead of
            chat or email.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-1" />
              One-time access prevents secrets from lingering in message history
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-1" />
              End-to-end encryption ensures only the recipient sees the content
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-1" />
              Automatic destruction means no manual cleanup needed
            </li>
          </ul>
        </div>

        <div className="text-center bg-card rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Need to Share Environment Variables?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            When you need to share .env contents with a teammate or collaborator,
            use SnapPwd to create a secure, self-destructing link. No signup required.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            <Lock className="h-5 w-5 mr-2" />
            Share .env Securely
          </a>
        </div>
      </div>
    </section>
  );
}
