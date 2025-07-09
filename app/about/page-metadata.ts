import { Metadata } from "next";
import { baseMetadata } from "../metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "About Us",
  description: "Learn about SnapPwd, our mission, and how we help you share sensitive information securely.",
  alternates: {
    canonical: "/about",
  },
};
