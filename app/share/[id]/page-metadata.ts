import { Metadata } from "next";

// Share page specific metadata
export const metadata: Metadata = {
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
