import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PasswordsStructuredData from "@/components/ui/PasswordsStructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  Shield,
  Trash2,
  Zap,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Share Passwords Securely - One-Time Password Sharing | SnapPwd",
  description:
    "Share passwords securely with self-destructing links. End-to-end encrypted password sharing that disappears after one view. No registration required.",
  keywords: [
    "share password securely",
    "password sharing tool",
    "secure password sharing",
    "one-time password link",
    "encrypted password sharing",
    "send password safely",
    "temporary password sharing",
    "password transfer",
    "secure credential sharing",
    "self-destructing password",
  ],
  alternates: {
    canonical: "/passwords",
  },
};

const passwordBenefits = [
  {
    title: "End-to-End Encryption",
    description:
      "Your password is encrypted in your browser before transmission. Not even we can see it—the decryption key never leaves your hands until you share the link.",
    icon: Shield,
  },
  {
    title: "View Once, Then Gone",
    description:
      "Each password link can only be viewed once. After the recipient sees it, the password is permanently deleted from our servers—no traces left behind.",
    icon: EyeOff,
  },
  {
    title: "Instant Sharing",
    description:
      "No account creation, email verification, or app installation. Generate a secure password link in seconds and share it via any channel.",
    icon: Zap,
  },
  {
    title: "Password Stays Hidden",
    description:
      "Unlike email or chat where passwords remain visible forever, your password is revealed only once to the intended recipient, then vanishes.",
    icon: Lock,
  },
];

const commonScenarios = [
  {
    title: "WiFi Passwords",
    description:
      "Share home or office WiFi passwords with guests without writing them down or texting them permanently.",
  },
  {
    title: "Account Credentials",
    description:
      "Send login credentials for shared accounts like Netflix, Spotify, or business tools to family or team members.",
  },
  {
    title: "IT Support",
    description:
      "Receive temporary passwords from IT help desks without them lingering in your email inbox forever.",
  },
  {
    title: "New Account Setup",
    description:
      "Share initial passwords when creating accounts for others, ensuring they can securely receive and change them.",
  },
];

export default function PasswordsPage() {
  return (
    <section className="py-12">
      <PasswordsStructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Share Passwords Securely
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop sending passwords through email or text messages. Use
            self-destructing links that encrypt your password and delete it
            after one view.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {passwordBenefits.map((benefit, index) => (
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
            Common Password Sharing Scenarios
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonScenarios.map((scenario, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border"
              >
                <h3 className="font-semibold mb-2 text-foreground">
                  {scenario.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            The Problem with Traditional Password Sharing
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-destructive">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Stays in inbox forever</li>
                <li>• Can be forwarded accidentally</li>
                <li>• Searchable by anyone with access</li>
                <li>• Backup copies on multiple servers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-destructive">
                <MessageSquare className="h-5 w-5 mr-2" />
                Text & Chat
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Permanent message history</li>
                <li>• Screenshots easily taken</li>
                <li>• Synced across devices</li>
                <li>• Visible in notifications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5 mr-2" />
                SnapPwd
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Deleted after one view</li>
                <li>• End-to-end encrypted</li>
                <li>• No permanent records</li>
                <li>• Zero-knowledge architecture</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready to Share a Password Securely?
          </h2>
          <p className="text-muted-foreground mb-6">
            Create a self-destructing password link in seconds. No sign-up
            required, no traces left behind.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Share a Password Now
          </a>
        </div>
      </div>
    </section>
  );
}
