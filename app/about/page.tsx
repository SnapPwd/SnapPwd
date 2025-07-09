"use client";

import React from "react";

export default function AboutPage() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">About SnapPwd</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg mb-6">
            SnapPwd is a secure password and sensitive information sharing service designed 
            with security and privacy as our top priorities.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            We created SnapPwd to solve a common problem: how to securely share sensitive 
            information like passwords, API keys, and other credentials without exposing them 
            to unintended recipients or leaving them vulnerable in email inboxes, chat logs, 
            or text messages.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <p>
            SnapPwd uses end-to-end encryption to secure your sensitive information. When you 
            create a secret:
          </p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Your data is encrypted in your browser before it ever reaches our servers</li>
            <li>We generate a unique, time-limited link you can share with the recipient</li>
            <li>Once the link is accessed or expires, the data is permanently deleted</li>
            <li>We never store your unencrypted data at any point</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Security First</h2>
          <p>
            Security isn&apos;t just a feature of SnapPwd—it&apos;s the foundation. We employ 
            industry-standard encryption protocols, maintain strict data handling practices, 
            and continuously update our security measures to protect your information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            Have questions, feedback, or need support? We&apos;d love to hear from you.
            Please contact us at <a href="mailto:support@snappwd.io" className="text-blue-600 hover:underline">support@snappwd.io</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
