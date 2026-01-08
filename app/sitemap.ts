import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL!;
  const showLegalPages = process.env.SHOW_LEGAL_PAGES === "true";

  const homeLastModified = new Date("2025-01-07");
  const aboutLastModified = new Date("2025-01-07");
  const privacyLastModified = new Date("2025-01-07");
  const termsLastModified = new Date("2025-01-07");
  const faqLastModified = new Date("2025-01-07");

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

  return sitemapEntries;
}
