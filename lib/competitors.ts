// Centralized data layer for competitor comparison pages
// Each competitor has unique, intent-matched content targeting "SnapPwd vs X" queries

export interface Competitor {
  // URL slug
  slug: string;
  // Display name
  name: string;
  // Page title (50-60 chars ideal)
  title: string;
  // Meta description (150-160 chars ideal)
  description: string;
  // H1 heading
  headline: string;
  // Subheadline/intro paragraph
  subheadline: string;
  // Keywords for this page
  keywords: string[];
  // Feature comparison table
  comparisonTable: {
    feature: string;
    snappwd: string | boolean;
    competitor: string | boolean;
  }[];
  // Why choose SnapPwd
  snappwdAdvantages: { title: string; description: string }[];
  // Fair assessment of competitor strengths
  competitorStrengths: { title: string; description: string }[];
  // Use case winners
  useCases: {
    title: string;
    winner: "snappwd" | "competitor" | "tie";
    description: string;
  }[];
  // FAQs
  faqs: { question: string; answer: string }[];
  // CTA text
  ctaText: string;
  // Related competitors for internal linking
  relatedCompetitors: string[];
}

export const competitors: Record<string, Competitor> = {
  "1password": {
    slug: "1password",
    name: "1Password",
    title: "SnapPwd vs 1Password: Secure Secret Sharing Comparison",
    description:
      "Compare SnapPwd and 1Password for secure secret sharing. See which tool is better for one-time links, external sharing, and quick credential distribution.",
    headline: "SnapPwd vs 1Password: Which is Better for Secret Sharing?",
    subheadline:
      "1Password excels at team password management, but when you need to share a secret with someone outside your vault—a contractor, client, or one-time collaborator—SnapPwd's self-destructing links offer a simpler, more secure approach.",
    keywords: [
      "SnapPwd vs 1Password",
      "1Password alternative",
      "1Password secret sharing",
      "secure link sharing",
      "one-time password link",
      "share password without 1Password",
      "1Password vs SnapPwd comparison",
      "external secret sharing",
    ],
    comparisonTable: [
      {
        feature: "Account Required to Share",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Account Required to Receive",
        snappwd: false,
        competitor: "Optional (Psst! feature)",
      },
      {
        feature: "Self-Destructing Links",
        snappwd: true,
        competitor: "Limited (7-14 days)",
      },
      {
        feature: "One-Time View",
        snappwd: true,
        competitor: true,
      },
      {
        feature: "Free Tier",
        snappwd: "Unlimited",
        competitor: "14-day trial",
      },
      {
        feature: "Password Manager",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Team Vaults",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "End-to-End Encryption",
        snappwd: true,
        competitor: true,
      },
      {
        feature: "Browser-Based (No Install)",
        snappwd: true,
        competitor: false,
      },
      {
        feature: "Built-in Password Generator",
        snappwd: true,
        competitor: true,
      },
    ],
    snappwdAdvantages: [
      {
        title: "No Account Needed",
        description:
          "Share secrets instantly without requiring recipients to sign up, install apps, or create accounts. Perfect for external sharing.",
      },
      {
        title: "Truly One-Time Links",
        description:
          "Links self-destruct after a single view. No lingering access, no expired links sitting in dashboards—just immediate deletion.",
      },
      {
        title: "Zero Friction Sharing",
        description:
          "Paste, encrypt, share. No vault setup, no team invitations, no subscription management. Ideal for quick, one-off sharing.",
      },
      {
        title: "Free Forever",
        description:
          "SnapPwd is completely free with no usage limits. No trial periods, no feature gates, no credit card required.",
      },
    ],
    competitorStrengths: [
      {
        title: "Full Password Management",
        description:
          "1Password provides comprehensive password storage, auto-fill, and cross-device sync—features beyond SnapPwd's scope.",
      },
      {
        title: "Team & Enterprise Features",
        description:
          "Shared vaults, admin controls, audit logs, and SSO integration make 1Password ideal for organization-wide password management.",
      },
      {
        title: "Watchtower Security Alerts",
        description:
          "Proactive breach monitoring and password health reports help teams maintain strong security hygiene.",
      },
    ],
    useCases: [
      {
        title: "Sharing with External Contractors",
        winner: "snappwd",
        description:
          "SnapPwd wins—no account required for the contractor, link self-destructs, and there's no vault to manage afterward.",
      },
      {
        title: "Day-to-Day Team Password Access",
        winner: "competitor",
        description:
          "1Password wins—shared vaults provide persistent, organized access for team members who need credentials regularly.",
      },
      {
        title: "Client Project Handoffs",
        winner: "snappwd",
        description:
          "SnapPwd wins—share credentials at project completion without requiring clients to adopt your password manager.",
      },
      {
        title: "Enterprise Security Compliance",
        winner: "competitor",
        description:
          "1Password wins—audit logs, admin controls, and SSO meet enterprise compliance requirements.",
      },
      {
        title: "Quick One-Time Sharing",
        winner: "snappwd",
        description:
          "SnapPwd wins—instant sharing without login, app installation, or subscription. Faster than any vault-based solution.",
      },
    ],
    faqs: [
      {
        question: "Can I use SnapPwd instead of 1Password?",
        answer:
          "SnapPwd and 1Password serve different purposes. Use SnapPwd for one-time, external secret sharing. Use 1Password for ongoing team password management. Many teams use both.",
      },
      {
        question: "Is SnapPwd more secure than 1Password's Psst! feature?",
        answer:
          "Both use end-to-end encryption. The key difference is SnapPwd links are truly single-use with immediate destruction, while 1Password's Psst! links have configurable expiration but may allow multiple views.",
      },
      {
        question: "Why not just use 1Password for everything?",
        answer:
          "1Password requires accounts and subscriptions. When sharing with external parties who don't use 1Password, SnapPwd provides a frictionless alternative without forcing tool adoption.",
      },
    ],
    ctaText: "Try SnapPwd's Instant Secret Sharing",
    relatedCompetitors: ["bitwarden-send", "onetimesecret"],
  },

  "bitwarden-send": {
    slug: "bitwarden-send",
    name: "Bitwarden Send",
    title: "SnapPwd vs Bitwarden Send: Secret Sharing Comparison",
    description:
      "Compare SnapPwd and Bitwarden Send for secure secret sharing. See the differences in ease of use, account requirements, and self-destructing link features.",
    headline: "SnapPwd vs Bitwarden Send: Which Secret Sharing Tool is Better?",
    subheadline:
      "Bitwarden Send is a solid feature within the Bitwarden ecosystem. But if you want truly instant sharing without accounts or app installation, SnapPwd offers a more streamlined experience.",
    keywords: [
      "SnapPwd vs Bitwarden Send",
      "Bitwarden Send alternative",
      "Bitwarden secret sharing",
      "secure link sharing",
      "one-time secret link",
      "share password without Bitwarden",
      "Bitwarden Send comparison",
      "self-destructing links",
    ],
    comparisonTable: [
      {
        feature: "Account Required to Share",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Account Required to Receive",
        snappwd: false,
        competitor: false,
      },
      {
        feature: "Self-Destructing Links",
        snappwd: true,
        competitor: true,
      },
      {
        feature: "One-Time View Option",
        snappwd: "Always (default)",
        competitor: "Configurable",
      },
      {
        feature: "Free Tier",
        snappwd: "Unlimited",
        competitor: "Text only (free), Files (premium)",
      },
      {
        feature: "Open Source",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Password Manager Integration",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Mobile Apps",
        snappwd: "Web-based",
        competitor: true,
      },
      {
        feature: "Browser-Based (No Install)",
        snappwd: true,
        competitor: "Requires account",
      },
      {
        feature: "Built-in Password Generator",
        snappwd: true,
        competitor: true,
      },
    ],
    snappwdAdvantages: [
      {
        title: "No Account Required",
        description:
          "Share secrets instantly without creating a Bitwarden account first. No email verification, no app download—just paste and share.",
      },
      {
        title: "Simpler User Experience",
        description:
          "SnapPwd is purpose-built for one thing: secure one-time sharing. No complex menus, vault navigation, or feature-packed interfaces.",
      },
      {
        title: "Truly Unlimited Free Usage",
        description:
          "Bitwarden Send limits file sharing to premium users. SnapPwd has no limits on text secrets, completely free.",
      },
      {
        title: "Faster Workflow",
        description:
          "No login required means faster sharing. Open SnapPwd, paste your secret, get a link. Done in seconds.",
      },
    ],
    competitorStrengths: [
      {
        title: "Open Source Transparency",
        description:
          "Bitwarden's open-source codebase allows security audits and community verification of their encryption claims.",
      },
      {
        title: "Vault Integration",
        description:
          "Bitwarden Send integrates with your existing password vault, making it easy to share stored credentials.",
      },
      {
        title: "Mobile Apps",
        description:
          "Native iOS and Android apps provide on-the-go access to Bitwarden Send features.",
      },
      {
        title: "Self-Hosted Option",
        description:
          "Organizations can self-host Bitwarden for complete data control—ideal for regulated industries.",
      },
    ],
    useCases: [
      {
        title: "Quick External Sharing",
        winner: "snappwd",
        description:
          "SnapPwd wins—no account creation means you can share with anyone instantly, even if you've never used the tool before.",
      },
      {
        title: "Sharing Stored Vault Items",
        winner: "competitor",
        description:
          "Bitwarden wins—if the secret is already in your vault, Send lets you share it directly without copy-pasting.",
      },
      {
        title: "Mobile-First Sharing",
        winner: "competitor",
        description:
          "Bitwarden wins—native mobile apps provide a better experience for sharing on the go.",
      },
      {
        title: "One-Off Collaborator Sharing",
        winner: "snappwd",
        description:
          "SnapPwd wins—no need to explain how to receive a Send or deal with account-related friction.",
      },
      {
        title: "Privacy-Conscious Users",
        winner: "tie",
        description:
          "Tie—both offer end-to-end encryption. Bitwarden is open-source; SnapPwd collects no personal data.",
      },
    ],
    faqs: [
      {
        question: "Is SnapPwd better than Bitwarden Send?",
        answer:
          "It depends on your use case. SnapPwd is better for instant, no-account sharing. Bitwarden Send is better if you're already in the Bitwarden ecosystem and want vault integration.",
      },
      {
        question: "Can I use SnapPwd without installing anything?",
        answer:
          "Yes. SnapPwd is entirely browser-based. No apps, extensions, or downloads required—just visit the site and share.",
      },
      {
        question: "Why would I choose SnapPwd over free Bitwarden Send?",
        answer:
          "Even free Bitwarden Send requires an account. SnapPwd provides the same core functionality with zero signup friction, making it faster for quick shares.",
      },
    ],
    ctaText: "Share Secrets Instantly with SnapPwd",
    relatedCompetitors: ["1password", "onetimesecret"],
  },

  onetimesecret: {
    slug: "onetimesecret",
    name: "OneTimeSecret",
    title: "SnapPwd vs OneTimeSecret: Self-Destructing Link Comparison",
    description:
      "Compare SnapPwd and OneTimeSecret for self-destructing secret links. See the differences in UI, encryption, password generation, and user experience.",
    headline: "SnapPwd vs OneTimeSecret: Which Self-Destructing Link Tool Wins?",
    subheadline:
      "OneTimeSecret pioneered the self-destructing secret link. SnapPwd builds on this concept with a modern interface, client-side encryption, and built-in password generation.",
    keywords: [
      "SnapPwd vs OneTimeSecret",
      "OneTimeSecret alternative",
      "self-destructing links",
      "one-time secret sharing",
      "secure link sharing",
      "OTS alternative",
      "secret link comparison",
      "burn after reading links",
    ],
    comparisonTable: [
      {
        feature: "Account Required",
        snappwd: false,
        competitor: "Optional",
      },
      {
        feature: "Self-Destructing Links",
        snappwd: true,
        competitor: true,
      },
      {
        feature: "Client-Side Encryption",
        snappwd: true,
        competitor: false,
      },
      {
        feature: "Built-in Password Generator",
        snappwd: true,
        competitor: false,
      },
      {
        feature: "Modern UI/UX",
        snappwd: true,
        competitor: "Basic",
      },
      {
        feature: "Free Tier",
        snappwd: "Unlimited",
        competitor: "Limited (without account)",
      },
      {
        feature: "Open Source",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Self-Hostable",
        snappwd: false,
        competitor: true,
      },
      {
        feature: "Link Password Protection",
        snappwd: true,
        competitor: true,
      },
      {
        feature: "Dark Mode",
        snappwd: true,
        competitor: false,
      },
    ],
    snappwdAdvantages: [
      {
        title: "Client-Side Encryption",
        description:
          "Secrets are encrypted in your browser before transmission. The server never sees your plaintext—a stronger security model than server-side encryption.",
      },
      {
        title: "Modern, Clean Interface",
        description:
          "A polished, responsive design that works beautifully on desktop and mobile. No dated aesthetics or cluttered layouts.",
      },
      {
        title: "Built-in Password Generator",
        description:
          "Generate strong passwords directly in the app, then share them immediately. No need for a separate password generator.",
      },
      {
        title: "No Account Limits",
        description:
          "OneTimeSecret limits anonymous users. SnapPwd provides full functionality without any account or login.",
      },
    ],
    competitorStrengths: [
      {
        title: "Established & Battle-Tested",
        description:
          "OneTimeSecret has been around since 2012, with a proven track record and established user trust.",
      },
      {
        title: "Open Source",
        description:
          "The codebase is publicly available, allowing security researchers to audit the encryption implementation.",
      },
      {
        title: "Self-Hosting Option",
        description:
          "Organizations can run their own OneTimeSecret instance for complete data control and custom branding.",
      },
      {
        title: "API Access",
        description:
          "OneTimeSecret offers an API for programmatic secret creation, useful for automation workflows.",
      },
    ],
    useCases: [
      {
        title: "Quick Password Sharing",
        winner: "snappwd",
        description:
          "SnapPwd wins—generate and share a password in one place with a cleaner, faster interface.",
      },
      {
        title: "Developer Automation",
        winner: "competitor",
        description:
          "OneTimeSecret wins—their API enables scripted secret creation for CI/CD pipelines and automation.",
      },
      {
        title: "Security-Conscious Sharing",
        winner: "snappwd",
        description:
          "SnapPwd wins—client-side encryption means the server never sees your secret, even briefly.",
      },
      {
        title: "Self-Hosted Requirements",
        winner: "competitor",
        description:
          "OneTimeSecret wins—the only option for organizations requiring on-premises deployment.",
      },
      {
        title: "Non-Technical Users",
        winner: "snappwd",
        description:
          "SnapPwd wins—the modern interface is more approachable for users unfamiliar with security tools.",
      },
    ],
    faqs: [
      {
        question: "Is SnapPwd more secure than OneTimeSecret?",
        answer:
          "SnapPwd uses client-side encryption, meaning secrets are encrypted in your browser before reaching the server. OneTimeSecret encrypts on the server. Client-side is generally considered stronger as the server never sees plaintext.",
      },
      {
        question: "Why not just use OneTimeSecret since it's free?",
        answer:
          "Both are free. SnapPwd offers a better user experience, client-side encryption, and built-in password generation. Choose based on your priorities.",
      },
      {
        question: "Can I self-host SnapPwd like OneTimeSecret?",
        answer:
          "Currently, SnapPwd is a hosted service only. If self-hosting is a requirement, OneTimeSecret is the better choice.",
      },
    ],
    ctaText: "Experience Modern Secret Sharing with SnapPwd",
    relatedCompetitors: ["1password", "bitwarden-send"],
  },
};

// Get all competitor slugs for static generation
export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}

// Get competitor by slug
export function getCompetitor(slug: string): Competitor | undefined {
  return competitors[slug];
}

// Get related competitors for internal linking
export function getRelatedCompetitors(slug: string): Competitor[] {
  const competitor = competitors[slug];
  if (!competitor) return [];
  return competitor.relatedCompetitors
    .map((relatedSlug) => competitors[relatedSlug])
    .filter(Boolean);
}
