import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { baseMetadata } from "../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import { competitors } from "@/lib/competitors";
import {
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "SnapPwd vs Competitors: Secret Sharing Comparison | SnapPwd",
  description:
    "Compare SnapPwd to popular secret sharing and password management tools. See how self-destructing links stack up against 1Password, Bitwarden Send, and OneTimeSecret.",
  keywords: [
    "secret sharing comparison",
    "password sharing tools",
    "SnapPwd alternatives",
    "1Password vs SnapPwd",
    "Bitwarden Send vs SnapPwd",
    "OneTimeSecret alternative",
    "secure link sharing comparison",
    "self-destructing link tools",
    "password manager comparison",
    "one-time secret tools",
  ],
  alternates: {
    canonical: "/compare",
  },
};

const differentiators = [
  {
    title: "No Account Required",
    description:
      "Share secrets instantly without forcing recipients to sign up. No email verification, no app installation—just a secure link.",
    icon: Zap,
  },
  {
    title: "True One-Time Links",
    description:
      "Links self-destruct after a single view. No lingering access, no expired links in dashboards—immediate, permanent deletion.",
    icon: Shield,
  },
  {
    title: "External Sharing Made Easy",
    description:
      "Perfect for contractors, clients, and collaborators outside your organization. They don't need to adopt your tools.",
    icon: Users,
  },
];

export default function ComparePage() {
  return (
    <section className="py-12">
      <StructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            SnapPwd vs the Competition
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how SnapPwd compares to popular password managers and secret sharing tools.
            Find the right tool for your security needs.
          </p>
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border"
            >
              <div className="flex items-center mb-3">
                <item.icon className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Competitor Grid */}
        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Detailed Comparisons
          </h2>
          <p className="text-muted-foreground mb-6">
            Click on a comparison to see a detailed breakdown of features, strengths, and use cases.
          </p>
          <div className="grid md:grid-cols-1 gap-4">
            {Object.values(competitors).map((competitor) => (
              <Link
                key={competitor.slug}
                href={`/compare/${competitor.slug}`}
                className="flex items-center justify-between bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors group"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    SnapPwd vs {competitor.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {competitor.subheadline.slice(0, 150)}...
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors ml-4 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Why SnapPwd Section */}
        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            When to Choose SnapPwd
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-foreground flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                SnapPwd is Perfect For
              </h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>Sharing secrets with external parties</li>
                <li>One-time credential distribution</li>
                <li>Quick, no-friction sharing</li>
                <li>Contractor and client handoffs</li>
                <li>Anyone who doesn&apos;t want another account</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-foreground">
                Consider Alternatives When
              </h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>You need full password management features</li>
                <li>Your team requires shared vaults with persistent access</li>
                <li>Enterprise compliance requires audit logs</li>
                <li>You need self-hosted deployment</li>
                <li>API automation is a core requirement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready to Try SnapPwd?
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience instant, secure secret sharing with no signup required.
            See why teams choose SnapPwd for external credential distribution.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Share a Secret Securely
          </Link>
        </div>
      </div>
    </section>
  );
}
