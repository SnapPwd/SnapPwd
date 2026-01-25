// Centralized structured data configurations for SEO
// Each page's structured data is defined here and rendered by the StructuredData component

import { llmProviders, type LLMProvider } from "./llm-providers";
import { competitors, type Competitor } from "./competitors";

export interface FAQItem {
  question: string;
  answer: string;
}

export type StructuredDataConfig =
  | { type: "static"; data: Record<string, unknown> }
  | { type: "faq"; data: Record<string, unknown>; faqItems: FAQItem[] };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

function createBreadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${baseUrl}${item.path}`,
      })),
    ],
  };
}

function createSoftwareApplication(
  name: string,
  category: string,
  audienceType: string,
  featureList: string[]
) {
  return {
    "@type": "SoftwareApplication",
    name,
    applicationCategory: category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList,
    audience: {
      "@type": "Audience",
      audienceType,
    },
  };
}

export const structuredDataConfigs: Record<string, StructuredDataConfig> = {
  "/": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SnapPwd",
      url: baseUrl,
      description:
        "Securely share passwords and sensitive information with self-destructing links",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Self-destructing messages",
        "End-to-end encryption",
        "One-time viewing",
        "No registration required",
        "Free to use",
        "Client-side encryption",
        "Configurable expiration times",
      ],
      screenshot: `${baseUrl}/og-image.png`,
      softwareVersion: "1.0",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        ratingCount: "1",
      },
      author: {
        "@type": "Organization",
        name: "SnapPwd Team",
      },
      datePublished: "2025-01-01",
      dateModified: "2025-08-03",
    },
  },

  "/about": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About SnapPwd",
      url: `${baseUrl}/about`,
      description:
        "Learn about SnapPwd, our mission, and how we help you share sensitive information securely.",
      mainEntity: {
        "@type": "Organization",
        name: "SnapPwd",
        url: baseUrl,
        description:
          "Secure password and sensitive information sharing service",
        foundingDate: "2025-01-01",
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@snappwd.io",
          contactType: "customer service",
        },
        sameAs: [],
      },
      breadcrumb: createBreadcrumb([{ name: "About", path: "/about" }]),
    },
  },

  "/privacy": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy - SnapPwd",
      url: `${baseUrl}/privacy`,
      description:
        "Learn how SnapPwd collects, uses, and protects your information when using our secure password sharing service",
      dateModified: "2025-07-08",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      breadcrumb: createBreadcrumb([
        { name: "Privacy Policy", path: "/privacy" },
      ]),
    },
  },

  "/terms": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service - SnapPwd",
      url: `${baseUrl}/terms`,
      description:
        "Review the terms and conditions for using SnapPwd's secure password and sensitive information sharing service",
      dateModified: "2025-07-08",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      breadcrumb: createBreadcrumb([
        { name: "Terms of Service", path: "/terms" },
      ]),
    },
  },

  "/faq": {
    type: "faq",
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "Frequently Asked Questions - SnapPwd",
      url: `${baseUrl}/faq`,
      description:
        "Frequently asked questions about SnapPwd's secure password sharing service",
      breadcrumb: createBreadcrumb([{ name: "FAQ", path: "/faq" }]),
    },
    faqItems: [], // Will be populated at render time
  },

  "/developers": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Developer Tools - Secure API Key & .env File Sharing",
      url: `${baseUrl}/developers`,
      description:
        "Securely share API keys, database credentials, and .env files with your development team. Self-destructing links for developer secrets and environment variables.",
      dateModified: "2025-01-08",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        "SnapPwd Developer Tools",
        "DeveloperApplication",
        "Developers",
        [
          "Secure .env file sharing",
          "API key distribution",
          "Database credential sharing",
          "Team onboarding tools",
          "End-to-end encryption",
          "Self-destructing links",
          "No registration required",
          "Client-side encryption",
        ]
      ),
      breadcrumb: createBreadcrumb([
        { name: "Developer Tools", path: "/developers" },
      ]),
    },
  },

  "/api-keys": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Secure API Key Sharing - Share API Keys Safely",
      url: `${baseUrl}/api-keys`,
      description:
        "Securely share API keys, tokens, and access credentials with your team. Self-destructing links ensure API keys are never exposed in chat logs or emails.",
      dateModified: "2025-01-08",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        "Secure API Key Sharing Tool",
        "SecurityApplication",
        "Developers",
        [
          "Secure API key sharing",
          "Self-destructing links",
          "End-to-end encryption",
          "One-time access",
          "No registration required",
          "Client-side encryption",
          "API token distribution",
          "Temporary API access",
        ]
      ),
      breadcrumb: createBreadcrumb([
        { name: "API Key Sharing", path: "/api-keys" },
      ]),
    },
  },

  "/passwords": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Share Passwords Securely - One-Time Password Sharing",
      url: `${baseUrl}/passwords`,
      description:
        "Share passwords securely with self-destructing links. End-to-end encrypted password sharing that disappears after one view. No registration required.",
      dateModified: "2025-01-14",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        "Secure Password Sharing Tool",
        "SecurityApplication",
        "General",
        [
          "Secure password sharing",
          "Self-destructing links",
          "End-to-end encryption",
          "One-time access",
          "No registration required",
          "Client-side encryption",
          "Zero-knowledge architecture",
          "Instant link generation",
        ]
      ),
      breadcrumb: createBreadcrumb([
        { name: "Password Sharing", path: "/passwords" },
      ]),
    },
  },

  "/teams": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Team Credential Sharing - Secure Team Secrets",
      url: `${baseUrl}/teams`,
      description:
        "Securely share passwords and credentials within your team. Self-destructing links for team collaboration that don't leave traces in Slack, email, or chat history.",
      dateModified: "2025-01-14",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        "Team Credential Sharing Tool",
        "SecurityApplication",
        "Business Teams",
        [
          "Team password sharing",
          "Self-destructing links",
          "End-to-end encryption",
          "One-time access",
          "No registration required",
          "Zero Slack/chat trail",
          "Remote team support",
          "Cross-team collaboration",
        ]
      ),
      breadcrumb: createBreadcrumb([{ name: "Teams", path: "/teams" }]),
    },
  },

  "/onboarding": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Secure Employee Onboarding - Share Credentials Safely",
      url: `${baseUrl}/onboarding`,
      description:
        "Streamline new employee onboarding with secure credential sharing. Share API keys, passwords, and .env files with new hires using self-destructing links.",
      dateModified: "2025-01-14",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        "Secure Onboarding Credential Sharing Tool",
        "SecurityApplication",
        "HR and IT Teams",
        [
          "Secure onboarding credentials",
          "Self-destructing links",
          "End-to-end encryption",
          "One-time access",
          "Environment variable sharing",
          "API key distribution",
          "Database credential sharing",
          "Zero IT overhead",
        ]
      ),
      breadcrumb: createBreadcrumb([
        { name: "Onboarding", path: "/onboarding" },
      ]),
    },
  },

  "/env-files": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Share .env Files Securely - Environment Variables Sharing",
      url: `${baseUrl}/env-files`,
      description:
        "Securely share .env files, environment variables, and configuration secrets with your team. Self-destructing links keep sensitive config out of Slack and email.",
      dateModified: "2025-01-18",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        "Secure Environment File Sharing Tool",
        "SecurityApplication",
        "Developers",
        [
          "Secure .env file sharing",
          "Environment variable distribution",
          "Self-destructing links",
          "End-to-end encryption",
          "One-time access",
          "No registration required",
          "Configuration secret sharing",
        ]
      ),
      breadcrumb: createBreadcrumb([
        { name: "Env Files Sharing", path: "/env-files" },
      ]),
    },
  },

  "/api-key-best-practices": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "Article",
      name: "API Key Security Best Practices - How to Store API Keys Safely",
      headline: "Security Best Practices for Storing and Sharing API Keys",
      url: `${baseUrl}/api-key-best-practices`,
      description:
        "Learn security best practices for storing and sharing API keys. Avoid common mistakes like hardcoding secrets, and discover secure methods for credential management.",
      datePublished: "2025-01-18",
      dateModified: "2025-01-18",
      author: {
        "@type": "Organization",
        name: "SnapPwd",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "SnapPwd",
        url: baseUrl,
      },
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/api-key-best-practices`,
      },
      breadcrumb: createBreadcrumb([
        { name: "API Key Best Practices", path: "/api-key-best-practices" },
      ]),
    },
  },

  "/env-best-practices": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "Article",
      name: "Environment Variables Best Practices - Secure .env File Management",
      headline:
        "Best Practices for Managing Environment Variables and .env Files",
      url: `${baseUrl}/env-best-practices`,
      description:
        "Learn best practices for managing environment variables and .env files. Secure your configuration secrets, avoid common mistakes, and implement proper secret management.",
      datePublished: "2025-01-18",
      dateModified: "2025-01-18",
      author: {
        "@type": "Organization",
        name: "SnapPwd",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "SnapPwd",
        url: baseUrl,
      },
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/env-best-practices`,
      },
      breadcrumb: createBreadcrumb([
        { name: "Env Best Practices", path: "/env-best-practices" },
      ]),
    },
  },

  "/compare": {
    type: "static",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SnapPwd vs Competitors: Secret Sharing Comparison",
      url: `${baseUrl}/compare`,
      description:
        "Compare SnapPwd to popular secret sharing and password management tools. See how self-destructing links stack up against 1Password, Bitwarden Send, and OneTimeSecret.",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      breadcrumb: createBreadcrumb([{ name: "Compare", path: "/compare" }]),
    },
  },
};

// Generate structured data for competitor comparison pages dynamically
function createCompetitorStructuredData(
  competitor: Competitor
): StructuredDataConfig {
  return {
    type: "faq",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: competitor.title,
      url: `${baseUrl}/compare/${competitor.slug}`,
      description: competitor.description,
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "SnapPwd",
        applicationCategory: "SecurityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Self-destructing links",
          "End-to-end encryption",
          "No account required",
          "One-time access",
          "Client-side encryption",
          "Built-in password generator",
        ],
      },
      breadcrumb: createBreadcrumb([
        { name: "Compare", path: "/compare" },
        {
          name: `vs ${competitor.name}`,
          path: `/compare/${competitor.slug}`,
        },
      ]),
    },
    faqItems: competitor.faqs,
  };
}

// Generate structured data for LLM provider pages dynamically
function createLLMProviderStructuredData(provider: LLMProvider): StructuredDataConfig {
  return {
    type: "faq",
    data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: provider.title,
      url: `${baseUrl}/api-keys/${provider.slug}`,
      description: provider.description,
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: {
        "@type": "WebSite",
        name: "SnapPwd",
        url: baseUrl,
      },
      mainEntity: createSoftwareApplication(
        `Secure ${provider.name} API Key Sharing Tool`,
        "SecurityApplication",
        "Developers",
        [
          `Secure ${provider.name} API key sharing`,
          "Self-destructing links",
          "End-to-end encryption",
          "One-time access",
          "No registration required",
          "Client-side encryption",
          `${provider.name} credential distribution`,
          "Zero-knowledge architecture",
        ]
      ),
      breadcrumb: createBreadcrumb([
        { name: "API Key Sharing", path: "/api-keys" },
        { name: provider.name, path: `/api-keys/${provider.slug}` },
      ]),
    },
    faqItems: provider.faqs,
  };
}

// Get structured data for a path, including dynamic LLM provider and competitor pages
export function getStructuredDataConfig(
  pathname: string
): StructuredDataConfig | undefined {
  // Check static configs first
  if (structuredDataConfigs[pathname]) {
    return structuredDataConfigs[pathname];
  }

  // Check for LLM provider pages (/api-keys/[provider])
  const providerMatch = pathname.match(/^\/api-keys\/([^/]+)$/);
  if (providerMatch) {
    const providerSlug = providerMatch[1];
    const provider = llmProviders[providerSlug];
    if (provider) {
      return createLLMProviderStructuredData(provider);
    }
  }

  // Check for competitor comparison pages (/compare/[competitor])
  const competitorMatch = pathname.match(/^\/compare\/([^/]+)$/);
  if (competitorMatch) {
    const competitorSlug = competitorMatch[1];
    const competitor = competitors[competitorSlug];
    if (competitor) {
      return createCompetitorStructuredData(competitor);
    }
  }

  return undefined;
}
