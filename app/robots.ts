import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/share/*", "/get/*", "/s/*", "/g/*", "/api/*"],
    },
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  };
}
