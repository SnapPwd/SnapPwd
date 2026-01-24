import React from "react";
import { Metadata } from "next";
import { baseMetadata } from "../metadata";
import AboutStructuredData from "@/components/ui/AboutStructuredData";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "About Us",
  description:
    "Learn about SnapPwd, our mission, and how we help you share sensitive information securely.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="py-12">
      <AboutStructuredData />
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-4">About SnapPwd</h1>
        <p className="text-xl text-muted-foreground mb-12">
          The safe way to share passwords and private information
        </p>

        {/* The Problem */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            We&apos;ve All Been There
          </h2>
          <p className="text-muted-foreground mb-4">
            You need to send someone a password, a WiFi code, or your credit
            card number. So you text it, email it, or drop it in a chat. Sound
            familiar?
          </p>
          <p className="text-muted-foreground">
            The problem is that those messages stick around forever. They sit in
            your sent folder, in chat history, on someone else&apos;s phone. If
            any of those get hacked or stolen, your private information is
            exposed.
          </p>
        </div>

        {/* The Solution */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">A Better Way</h2>
          <p className="text-muted-foreground mb-6">
            SnapPwd works like a self-destructing message. Instead of sending
            your password directly, you create a secure link that can only be
            opened once. After it&apos;s viewed, it&apos;s gone forever.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-5 rounded-lg border bg-card">
              <div className="text-3xl mb-3">1.</div>
              <h3 className="font-semibold mb-2">Paste your secret</h3>
              <p className="text-sm text-muted-foreground">
                Type or paste whatever you need to share—a password, account
                info, or any private text.
              </p>
            </div>
            <div className="p-5 rounded-lg border bg-card">
              <div className="text-3xl mb-3">2.</div>
              <h3 className="font-semibold mb-2">Get a secure link</h3>
              <p className="text-sm text-muted-foreground">
                We create a special link that only works once. Send it however
                you like—text, email, or chat.
              </p>
            </div>
            <div className="p-5 rounded-lg border bg-card">
              <div className="text-3xl mb-3">3.</div>
              <h3 className="font-semibold mb-2">It disappears</h3>
              <p className="text-sm text-muted-foreground">
                Once your recipient opens the link, the secret is shown and then
                permanently deleted.
              </p>
            </div>
          </div>
        </div>

        {/* Why It's Safe */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why It&apos;s Safe</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Your secret is scrambled before it leaves your device
                </h3>
                <p className="text-sm text-muted-foreground">
                  We use the same protection that banks use. Even we can&apos;t
                  read what you share—only the person with the link can.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  One view, then it&apos;s gone
                </h3>
                <p className="text-sm text-muted-foreground">
                  Unlike a text message that lives forever, your secret is
                  permanently erased after being viewed. No copies, no backups.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Set it to expire automatically
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose how long your link stays active—from 5 minutes to 7
                  days. If no one opens it in time, it disappears anyway.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12 p-6 rounded-lg border bg-card">
          <h2 className="text-2xl font-semibold mb-4">Perfect For</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>•</span>
              <span>Sharing passwords with family</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>•</span>
              <span>Sending WiFi codes to guests</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>•</span>
              <span>Sharing account logins with coworkers</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>•</span>
              <span>Sending payment or card details</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>•</span>
              <span>Sharing private notes or messages</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>•</span>
              <span>Anything you wouldn&apos;t want leaked</span>
            </div>
          </div>
        </div>

        {/* Free & No Signup */}
        <div className="mb-8 text-center p-8 rounded-lg bg-muted/30">
          <h2 className="text-2xl font-semibold mb-2">Free & No Sign-Up</h2>
          <p className="text-muted-foreground mb-4">
            Just paste, share, and go. No account needed, no personal info
            required, no strings attached.
          </p>
          <Button asChild size="lg">
            <Link href="/">Try It Now</Link>
          </Button>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            We&apos;re happy to help if you have any questions or feedback.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link
              href={`mailto:${
                process.env.SUPPORT_EMAIL || "support@snappwd.io"
              }`}
            >
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
