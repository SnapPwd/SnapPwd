import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL!;
  const showLegalPages = process.env.SHOW_LEGAL_PAGES === "true";

  const homeLastModified = new Date("2025-01-08");
  const aboutLastModified = new Date("2025-01-07");
  const privacyLastModified = new Date("2025-01-07");
  const termsLastModified = new Date("2025-01-07");
  const faqLastModified = new Date("2025-01-07");
  const developersLastModified = new Date("2025-01-08");
  const apiKeysLastModified = new Date("2025-01-08");

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
    }
  );

  return sitemapEntries;
}
