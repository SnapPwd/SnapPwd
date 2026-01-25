import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { baseMetadata } from "../../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  getAllProviderSlugs,
  getProvider,
  getRelatedProviders,
} from "@/lib/llm-providers";
import {
  Shield,
  Trash2,
  Zap,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

// Static generation for all provider pages
export function generateStaticParams() {
  return getAllProviderSlugs().map((provider) => ({
    provider,
  }));
}

// Dynamic metadata per provider
export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>;
}): Promise<Metadata> {
  const { provider: slug } = await params;
  const provider = getProvider(slug);

  if (!provider) {
    return {
      title: "Not Found",
    };
  }

  return {
    ...baseMetadata,
    title: provider.title,
    description: provider.description,
    keywords: provider.keywords,
    alternates: {
      canonical: `/api-keys/${provider.slug}`,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: provider.title,
      description: provider.description,
      url: `/api-keys/${provider.slug}`,
    },
  };
}

// Icon mapping for benefits
const benefitIcons = [Shield, Trash2, Zap, AlertTriangle];

export default async function LLMProviderPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider: slug } = await params;
  const provider = getProvider(slug);

  if (!provider) {
    notFound();
  }

  const relatedProviders = getRelatedProviders(slug);

  return (
    <section className="py-12">
      <StructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {provider.headline}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {provider.subheadline}
          </p>
        </div>

        {/* Secret Form */}
        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto mb-12">
          <SecretForm />
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {provider.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-ring transition-colors"
              >
                <div className="flex items-center mb-4">
                  <Icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Use Cases Section */}
        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {provider.name} API Key Sharing Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {provider.useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border"
              >
                <h3 className="font-semibold mb-2 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Risks Section */}
        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-destructive" />
            Risks of Sharing {provider.name} Keys Insecurely
          </h2>
          <ul className="space-y-3">
            {provider.risks.map((risk, index) => (
              <li
                key={index}
                className="flex items-start text-muted-foreground"
              >
                <span className="text-destructive mr-2">•</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
            <HelpCircle className="h-6 w-6 mr-2 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {provider.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h3 className="font-semibold mb-2 text-foreground">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Providers - Internal Linking */}
        {relatedProviders.length > 0 && (
          <div className="bg-muted rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Share Other AI API Keys Securely
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedProviders.map((related) => (
                <Link
                  key={related.slug}
                  href={`/api-keys/${related.slug}`}
                  className="flex items-center justify-between bg-card p-4 rounded-lg border border-border hover:border-ring transition-colors group"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {related.name} API Keys
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {related.primaryKeyword}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Hub Link */}
        <div className="text-center mb-8">
          <Link
            href="/api-keys"
            className="text-primary hover:underline inline-flex items-center"
          >
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            View all API key sharing options
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Ready to {provider.ctaText}?
          </h2>
          <p className="text-muted-foreground mb-6">
            Stop risking your {provider.name} API credentials in chat history
            and email archives. Share securely with self-destructing links.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {provider.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
