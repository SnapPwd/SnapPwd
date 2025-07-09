import { Metadata } from "next";
import { baseMetadata } from "../metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Terms of Service",
  description: "Review the terms and conditions for using SnapPwd's secure password and sensitive information sharing service.",
  alternates: {
    canonical: "/terms",
  },
};
