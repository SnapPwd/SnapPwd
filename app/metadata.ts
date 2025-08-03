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
    "encrypted password sharing",
    "confidential information sharing",
    "secure link generator",
    "one-time secret sharing",
    "end-to-end encryption",
    "ephemeral secrets",
    "burn after reading",
    "secure communication",
    "privacy protection",
    "data security",
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
