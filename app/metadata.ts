import { Metadata } from "next";

// Base metadata that applies to all pages
export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: {
    template: "%s | SnapPwd",
    default: "SnapPwd - Securely share passwords and secrets",
  },
  description:
    "SnapPwd is a secure way to share passwords and secrets with others. Self-destructing messages for sensitive information.",
  keywords: [
    "password sharing",
    "secure secrets",
    "temporary passwords",
    "self-destructing messages",
    "secure sharing",
  ],
  authors: [{ name: "SnapPwd Team" }],
  creator: "SnapPwd",
  publisher: "SnapPwd",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SnapPwd",
    title: "SnapPwd - Secure Password Sharing",
    description:
      "Share sensitive information securely with self-destructing links",
    images: [
      {
        url: "/og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "SnapPwd - Secure Password Sharing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapPwd - Secure Password Sharing",
    description:
      "Share sensitive information securely with self-destructing links",
    images: ["/og-image.png"], // Same as OpenGraph image
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Home page specific metadata
export const homeMetadata: Metadata = {
  title: "Secure Password Sharing",
  description:
    "Create self-destructing links to share passwords, API keys, and other sensitive information securely.",
  alternates: {
    canonical: "/",
  },
};

// Share page specific metadata
export const shareMetadata: Metadata = {
  title: "Share Your Secret Link",
  description:
    "Your secret has been encrypted and is ready to share with a self-destructing link.",
  robots: {
    index: false, // Don't index share pages
  },
  alternates: {
    canonical: "/share",
  },
};

// Get page specific metadata
export const getMetadata: Metadata = {
  title: "Reveal Secret",
  description:
    "Securely access a shared secret. This link will self-destruct after viewing.",
  robots: {
    index: false, // Don't index get pages
  },
  alternates: {
    canonical: "/get",
  },
};
