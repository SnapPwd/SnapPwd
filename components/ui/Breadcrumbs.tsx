"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const breadcrumbItems = useMemo(() => {
    if (pathname === "/") {
      return null;
    }

    const pathSegments = pathname.split("/").filter((segment) => segment);

    return [
      { name: "Home", href: "/" },
      ...pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const name = segment.charAt(0).toUpperCase() + segment.slice(1);
        return { name, href };
      }),
    ];
  }, [pathname]);

  const structuredData = useMemo(() => {
    if (!breadcrumbItems) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.href}`,
      })),
    };
  }, [breadcrumbItems, baseUrl]);

  // Don't show breadcrumbs on homepage
  if (!breadcrumbItems) {
    return null;
  }

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
