import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL!;

  const homeLastModified = new Date("2025-07-08");
  const aboutLastModified = new Date("2025-07-09");
  const privacyLastModified = new Date("2025-07-09");
  const termsLastModified = new Date("2025-07-09");

  return [
    {
      url: baseUrl,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: aboutLastModified,
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
    },
  ];
}
