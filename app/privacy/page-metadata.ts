import { Metadata } from "next";
import { baseMetadata } from "../metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Privacy Policy",
  description: "Learn how SnapPwd collects, uses, and protects your information when using our secure password sharing service.",
  alternates: {
    canonical: "/privacy",
  },
};
