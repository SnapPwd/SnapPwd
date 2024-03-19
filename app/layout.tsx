import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import cn from "classnames";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "SnapPwd - Securely share passwords and secrets",
  description:
    "SnapPwd is a secure way to share passwords and secrets with others. It's like Snapchat for passwords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, GeistMono.variable)}>
        <Navbar /> {/* 4rem */}
        <main className="min-h-[calc(100dvh-9rem)] md:min-h-[calc(100dvh-7.5rem)] py-8">
          {children}
        </main>
        <Footer /> {/* 3.5rem for desktop, 5rem for mobile */}
        <Analytics />
      </body>
    </html>
  );
}
