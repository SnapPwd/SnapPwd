import { MetadataRoute } from "next";
import { getAllProviderSlugs } from "@/lib/llm-providers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL!;
  const showLegalPages = process.env.SHOW_LEGAL_PAGES === "true";

  const homeLastModified = new Date("2026-01-08");
  const aboutLastModified = new Date("2026-01-23");
  const privacyLastModified = new Date("2026-01-23");
  const termsLastModified = new Date("2026-01-23");
  const faqLastModified = new Date("2026-01-23");
  const developersLastModified = new Date("2026-01-08");
  const apiKeysLastModified = new Date("2026-01-08");
  const passwordsLastModified = new Date("2026-01-14");
  const teamsLastModified = new Date("2026-01-14");
  const onboardingLastModified = new Date("2026-01-14");
  const apiKeyBestPracticesLastModified = new Date("2026-01-18");
  const envFilesLastModified = new Date("2026-01-18");
  const envBestPracticesLastModified = new Date("2026-01-18");

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  if (showLegalPages) {
    sitemapEntries.push(
      {
        url: `${baseUrl}/about`,
        lastModified: aboutLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: faqLastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: privacyLastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: termsLastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      }
    );
  }

  // Always include developer-focused pages
  sitemapEntries.push(
    {
      url: `${baseUrl}/developers`,
      lastModified: developersLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api-keys`,
      lastModified: apiKeysLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/passwords`,
      lastModified: passwordsLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: teamsLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/onboarding`,
      lastModified: onboardingLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api-key-best-practices`,
      lastModified: apiKeyBestPracticesLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/env-files`,
      lastModified: envFilesLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/env-best-practices`,
      lastModified: envBestPracticesLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    }
  );

  // Add LLM provider pages (programmatic SEO)
  const llmProviderLastModified = new Date("2026-01-24");
  const providerSlugs = getAllProviderSlugs();

  for (const slug of providerSlugs) {
    sitemapEntries.push({
      url: `${baseUrl}/api-keys/${slug}`,
      lastModified: llmProviderLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return sitemapEntries;
}
