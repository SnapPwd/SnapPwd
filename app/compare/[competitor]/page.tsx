import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { baseMetadata } from "../../metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StructuredData from "@/components/ui/StructuredData";
import SecretForm from "@/components/ui/SecretForm";
import {
  getAllCompetitorSlugs,
  getCompetitor,
  getRelatedCompetitors,
} from "@/lib/competitors";
import {
  CheckCircle,
  XCircle,
  Minus,
  Trophy,
  ArrowRight,
  HelpCircle,
  ThumbsUp,
} from "lucide-react";

// Static generation for all competitor pages
export function generateStaticParams() {
  return getAllCompetitorSlugs().map((competitor) => ({
    competitor,
  }));
}

// Dynamic metadata per competitor
export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitor = getCompetitor(slug);

  if (!competitor) {
    return {
      title: "Not Found",
    };
  }

  return {
    ...baseMetadata,
    title: competitor.title,
    description: competitor.description,
    keywords: competitor.keywords,
    alternates: {
      canonical: `/compare/${competitor.slug}`,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: competitor.title,
      description: competitor.description,
      url: `/compare/${competitor.slug}`,
    },
  };
}

// Helper to render table cell values
function TableCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto" />;
  }
  if (value === false) {
    return <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 mx-auto" />;
  }
  return <span className="text-sm">{value}</span>;
}

// Helper to render winner badge
function WinnerBadge({ winner }: { winner: "snappwd" | "competitor" | "tie" }) {
  if (winner === "snappwd") {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        <Trophy className="h-3 w-3 mr-1" />
        SnapPwd
      </span>
    );
  }
  if (winner === "competitor") {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
        <Trophy className="h-3 w-3 mr-1" />
        Competitor
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
      <Minus className="h-3 w-3 mr-1" />
      Tie
    </span>
  );
}

export default async function CompetitorPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const competitor = getCompetitor(slug);

  if (!competitor) {
    notFound();
  }

  const relatedCompetitors = getRelatedCompetitors(slug);

  return (
    <section className="py-12">
      <StructuredData />
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {competitor.headline}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {competitor.subheadline}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden mb-12">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">
              Feature Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    SnapPwd
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    {competitor.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitor.comparisonTable.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}
                  >
                    <td className="px-6 py-4 text-foreground">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <TableCell value={row.snappwd} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <TableCell value={row.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SnapPwd Advantages */}
        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
            <ThumbsUp className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />
            Why Choose SnapPwd
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {competitor.snappwdAdvantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border"
              >
                <h3 className="font-semibold mb-2 text-foreground">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Strengths */}
        <div className="bg-accent rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Where {competitor.name} Excels
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            A fair comparison acknowledges competitor strengths. Here&apos;s where {competitor.name} might be the better choice:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {competitor.competitorStrengths.map((strength, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border"
              >
                <h3 className="font-semibold mb-2 text-foreground text-sm">
                  {strength.title}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Use Case Showdown
          </h2>
          <div className="space-y-4">
            {competitor.useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">
                    {useCase.title}
                  </h3>
                  <WinnerBadge winner={useCase.winner} />
                </div>
                <p className="text-muted-foreground text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
            <HelpCircle className="h-6 w-6 mr-2 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {competitor.faqs.map((faq, index) => (
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

        {/* Related Comparisons */}
        {relatedCompetitors.length > 0 && (
          <div className="bg-muted rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              More Comparisons
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedCompetitors.map((related) => (
                <Link
                  key={related.slug}
                  href={`/compare/${related.slug}`}
                  className="flex items-center justify-between bg-card p-4 rounded-lg border border-border hover:border-ring transition-colors group"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">
                      SnapPwd vs {related.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      See how SnapPwd compares
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
            href="/compare"
            className="text-primary hover:underline inline-flex items-center"
          >
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            View all comparisons
          </Link>
        </div>

        {/* CTA with Secret Form */}
        <div className="bg-card p-8 rounded-xl shadow-lg border border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground text-center">
            {competitor.ctaText}
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            See for yourself why teams choose SnapPwd for quick, secure secret sharing.
          </p>
          <SecretForm />
        </div>
      </div>
    </section>
  );
}
