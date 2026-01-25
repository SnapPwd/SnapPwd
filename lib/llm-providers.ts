// Centralized data layer for LLM provider pages
// Each provider has unique, intent-matched content to avoid thin/duplicate pages

export interface LLMProvider {
  // URL slug
  slug: string;
  // Display name
  name: string;
  // Parent company (for schema)
  company: string;
  // Primary keyword target
  primaryKeyword: string;
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
  // Unique benefits for this provider
  benefits: {
    title: string;
    description: string;
  }[];
  // Provider-specific use cases
  useCases: {
    title: string;
    description: string;
  }[];
  // Provider-specific risks of insecure sharing
  risks: string[];
  // FAQs unique to this provider
  faqs: {
    question: string;
    answer: string;
  }[];
  // CTA text
  ctaText: string;
  // Related providers for internal linking
  relatedProviders: string[];
}

export const llmProviders: Record<string, LLMProvider> = {
  openai: {
    slug: "openai",
    name: "OpenAI",
    company: "OpenAI",
    primaryKeyword: "share OpenAI API key securely",
    title: "Share OpenAI API Keys Securely - GPT & ChatGPT API Key Sharing",
    description:
      "Securely share OpenAI API keys with your team using self-destructing links. Protect GPT-4, ChatGPT, and DALL-E API credentials from exposure in Slack and email.",
    headline: "Share OpenAI API Keys Securely",
    subheadline:
      "Protect your GPT-4, ChatGPT, and DALL-E API credentials with self-destructing links. Stop sharing OpenAI keys in Slack channels where they live forever.",
    keywords: [
      "share OpenAI API key",
      "OpenAI API key security",
      "GPT-4 API key sharing",
      "ChatGPT API credentials",
      "secure OpenAI key distribution",
      "OpenAI team API access",
      "DALL-E API key sharing",
      "OpenAI developer onboarding",
    ],
    benefits: [
      {
        title: "Protect High-Value API Credits",
        description:
          "OpenAI API keys are tied to billing. A leaked key can rack up thousands in charges. Self-destructing links ensure keys don't linger in chat history.",
      },
      {
        title: "Safe Team Onboarding",
        description:
          "Share API keys with new developers without the key sitting in your Slack workspace forever. One view, then it's gone.",
      },
      {
        title: "Contractor-Safe Sharing",
        description:
          "Working with freelancers on GPT integrations? Share temporary access without permanent credential exposure.",
      },
      {
        title: "Zero-Knowledge Security",
        description:
          "Your OpenAI keys are encrypted in your browser. We can't see them, and neither can anyone intercepting the link.",
      },
    ],
    useCases: [
      {
        title: "GPT-4 Integration Projects",
        description:
          "Share API keys with developers building GPT-4 powered features without exposing credentials in project management tools.",
      },
      {
        title: "ChatGPT Plugin Development",
        description:
          "Distribute API access to team members working on ChatGPT plugins and integrations securely.",
      },
      {
        title: "AI Startup Teams",
        description:
          "Onboard new engineers to your OpenAI-powered product without keys ending up in onboarding docs.",
      },
      {
        title: "Agency Client Handoffs",
        description:
          "Transfer OpenAI API credentials to clients at project completion without email trails.",
      },
    ],
    risks: [
      "OpenAI keys in Slack can be searched by anyone in the workspace",
      "Email-shared keys remain in sent folders indefinitely",
      "Leaked keys can generate unauthorized API charges",
      "Compromised keys may access sensitive fine-tuned models",
    ],
    faqs: [
      {
        question: "How do I share my OpenAI API key securely?",
        answer:
          "Paste your OpenAI API key into SnapPwd, generate a self-destructing link, and share that link instead of the raw key. The recipient views it once, then it's permanently deleted.",
      },
      {
        question: "Can I share organization-level OpenAI API keys?",
        answer:
          "Yes. SnapPwd works with any API key format including OpenAI organization keys. The key is encrypted end-to-end regardless of its type or permissions.",
      },
      {
        question: "What happens if someone tries to view my OpenAI key twice?",
        answer:
          "They can't. After the first view, the link is destroyed. If someone claims they didn't receive it, generate a new link—never reuse or re-share the original.",
      },
    ],
    ctaText: "Share Your OpenAI API Key Securely",
    relatedProviders: ["anthropic", "google-gemini"],
  },

  anthropic: {
    slug: "anthropic",
    name: "Anthropic Claude",
    company: "Anthropic",
    primaryKeyword: "share Anthropic API key securely",
    title: "Share Anthropic Claude API Keys Securely - Claude API Key Sharing",
    description:
      "Securely share Anthropic Claude API keys with your team. Self-destructing links protect Claude 3, Claude Opus, and Sonnet API credentials from chat and email exposure.",
    headline: "Share Anthropic Claude API Keys Securely",
    subheadline:
      "Protect your Claude 3 Opus, Sonnet, and Haiku API credentials with self-destructing links. Don't let Anthropic keys sit in your team's Slack history.",
    keywords: [
      "share Anthropic API key",
      "Claude API key security",
      "Claude 3 API key sharing",
      "Anthropic developer credentials",
      "secure Claude key distribution",
      "Claude Opus API sharing",
      "Claude Sonnet API key",
      "Anthropic team access",
    ],
    benefits: [
      {
        title: "Protect Claude API Spend",
        description:
          "Anthropic API usage is billed per token. Leaked keys can drain your budget fast. Self-destructing links eliminate lingering exposure.",
      },
      {
        title: "Model Access Control",
        description:
          "Claude API keys may have access to Opus, Sonnet, or Haiku. Share securely to control which team members get which tier.",
      },
      {
        title: "Safe for AI Research Teams",
        description:
          "Academic and research teams can share Claude access without credentials living in university email systems.",
      },
      {
        title: "Instant Revocation Awareness",
        description:
          "If a link is viewed, you know the key was accessed. Rotate immediately if it was unintended.",
      },
    ],
    useCases: [
      {
        title: "Claude-Powered App Development",
        description:
          "Share API keys with developers building Claude integrations without exposing credentials in GitHub issues or PRs.",
      },
      {
        title: "AI Safety Research Collaboration",
        description:
          "Distribute Anthropic API access to research collaborators securely across institutions.",
      },
      {
        title: "Enterprise Claude Deployments",
        description:
          "Onboard enterprise teams to Claude-powered internal tools without keys in IT ticketing systems.",
      },
      {
        title: "Consultant Access",
        description:
          "Give AI consultants temporary Claude access for audits or implementations without permanent credential sharing.",
      },
    ],
    risks: [
      "Claude API keys in emails can be forwarded to unintended recipients",
      "Slack-shared keys are searchable across workspace history",
      "Leaked keys may access your fine-tuned or custom Claude models",
      "Unauthorized usage directly impacts your Anthropic billing",
    ],
    faqs: [
      {
        question: "How do I share my Anthropic API key without exposing it?",
        answer:
          "Use SnapPwd to create a self-destructing link for your Anthropic API key. Share the link instead of the raw key—it can only be viewed once before being permanently deleted.",
      },
      {
        question: "Does this work with Claude API keys from the Anthropic Console?",
        answer:
          "Yes. SnapPwd encrypts any text including Anthropic Console API keys, regardless of their format or permission level.",
      },
      {
        question: "Can I share Claude API keys with contractors safely?",
        answer:
          "Absolutely. Self-destructing links are ideal for temporary contractor access. Once they view the key, the link is gone—no lingering credentials.",
      },
    ],
    ctaText: "Share Your Claude API Key Securely",
    relatedProviders: ["openai", "google-gemini"],
  },

  "google-gemini": {
    slug: "google-gemini",
    name: "Google Gemini",
    company: "Google",
    primaryKeyword: "share Google Gemini API key securely",
    title: "Share Google Gemini API Keys Securely - Gemini Pro API Key Sharing",
    description:
      "Securely share Google Gemini API keys with your team. Self-destructing links protect Gemini Pro and Gemini Ultra credentials from Slack and email exposure.",
    headline: "Share Google Gemini API Keys Securely",
    subheadline:
      "Protect your Gemini Pro, Gemini Ultra, and Google AI Studio API credentials. Stop pasting API keys in Google Chat where they're indexed forever.",
    keywords: [
      "share Gemini API key",
      "Google Gemini API security",
      "Gemini Pro API key sharing",
      "Google AI Studio credentials",
      "secure Gemini key distribution",
      "Gemini Ultra API sharing",
      "Google AI API key",
      "Gemini developer onboarding",
    ],
    benefits: [
      {
        title: "Protect GCP-Linked Credentials",
        description:
          "Gemini API keys are often tied to Google Cloud billing. A leaked key can spin up unexpected charges across GCP services.",
      },
      {
        title: "Safe for Google Workspace Teams",
        description:
          "Ironically, sharing Gemini keys in Google Chat or Gmail is risky—they're searchable and retained. Use self-destructing links instead.",
      },
      {
        title: "Multi-Model Access Protection",
        description:
          "Gemini keys may access Pro, Ultra, or other Google AI models. Share securely to control exposure.",
      },
      {
        title: "Contractor & Agency Safe",
        description:
          "Share Gemini access with external partners without keys living in shared Google Drives.",
      },
    ],
    useCases: [
      {
        title: "Gemini App Integration",
        description:
          "Share API keys with developers building Gemini-powered features without exposing credentials in Jira or Linear.",
      },
      {
        title: "Google AI Studio Projects",
        description:
          "Distribute AI Studio access to team members working on prompt engineering and model testing.",
      },
      {
        title: "Cross-Team Google AI Access",
        description:
          "Share Gemini credentials across departments without keys ending up in shared documentation.",
      },
      {
        title: "Hackathon & Sprint Teams",
        description:
          "Quickly distribute Gemini access to temporary project teams without permanent credential trails.",
      },
    ],
    risks: [
      "Gemini keys in Google Chat are indexed and searchable",
      "Keys in Gmail threads can be found via search years later",
      "Leaked keys may impact Google Cloud billing beyond just Gemini",
      "Shared Drive documents with keys can be accessed by too many people",
    ],
    faqs: [
      {
        question: "How do I share a Google Gemini API key securely?",
        answer:
          "Create a self-destructing link with SnapPwd. Paste your Gemini API key, generate the link, and share it. The recipient views it once, then it's deleted forever.",
      },
      {
        question: "Does this work with Google AI Studio API keys?",
        answer:
          "Yes. SnapPwd works with any API key including those generated from Google AI Studio or the Google Cloud Console.",
      },
      {
        question: "Why shouldn't I share Gemini keys in Google Chat?",
        answer:
          "Google Chat messages are retained and searchable. A Gemini key shared today can be found by anyone with workspace access searching months or years later.",
      },
    ],
    ctaText: "Share Your Gemini API Key Securely",
    relatedProviders: ["openai", "anthropic"],
  },

  stripe: {
    slug: "stripe",
    name: "Stripe",
    company: "Stripe",
    primaryKeyword: "share Stripe API key securely",
    title: "Share Stripe API Keys Securely - Payment API Key Sharing",
    description:
      "Securely share Stripe API keys with your team. Self-destructing links protect live and test API keys from exposure in Slack, email, and shared docs.",
    headline: "Share Stripe API Keys Securely",
    subheadline:
      "Protect your Stripe live and test API keys with self-destructing links. Never paste payment credentials in Slack channels or email threads again.",
    keywords: [
      "share Stripe API key",
      "Stripe API key security",
      "Stripe secret key sharing",
      "payment API credentials",
      "secure Stripe key distribution",
      "Stripe publishable key",
      "Stripe webhook secret",
      "Stripe developer onboarding",
    ],
    benefits: [
      {
        title: "Protect Live Payment Credentials",
        description:
          "Stripe live keys process real money. A leaked key can lead to fraudulent charges or data breaches. Self-destructing links ensure keys don't linger in chat history.",
      },
      {
        title: "Separate Test from Live Keys",
        description:
          "Share test keys for development and live keys for production securely. Each link is single-use, so you control exactly who gets which environment.",
      },
      {
        title: "PCI Compliance Support",
        description:
          "Avoid credential exposure that could complicate PCI compliance. Self-destructing links leave no audit trail of keys in unsecured channels.",
      },
      {
        title: "Webhook Secret Protection",
        description:
          "Stripe webhook secrets are just as sensitive as API keys. Share them securely without risking replay attacks from leaked credentials.",
      },
    ],
    useCases: [
      {
        title: "E-commerce Development Teams",
        description:
          "Share Stripe keys with developers building checkout flows without exposing credentials in project management tools.",
      },
      {
        title: "Agency Client Handoffs",
        description:
          "Transfer Stripe credentials to clients at project completion without keys sitting in email trails.",
      },
      {
        title: "Contractor Payment Integrations",
        description:
          "Give freelancers temporary Stripe access for integration work without permanent credential sharing.",
      },
      {
        title: "Multi-Environment Deployments",
        description:
          "Share staging and production Stripe keys with DevOps teams securely across environments.",
      },
    ],
    risks: [
      "Stripe live keys can process unauthorized charges on your account",
      "Leaked keys in Slack are searchable by anyone in the workspace",
      "Email-shared keys remain in sent folders indefinitely",
      "Compromised webhook secrets enable replay attacks on your endpoints",
    ],
    faqs: [
      {
        question: "How do I share my Stripe API key securely?",
        answer:
          "Paste your Stripe API key (secret or publishable) into SnapPwd, generate a self-destructing link, and share that link. The recipient views it once, then it's permanently deleted.",
      },
      {
        question: "Should I share Stripe test keys or live keys differently?",
        answer:
          "Both should be shared securely. Even test keys can expose your account structure. Use separate self-destructing links for each environment.",
      },
      {
        question: "Can I share Stripe restricted keys with limited permissions?",
        answer:
          "Yes. SnapPwd works with any Stripe key type including restricted API keys with specific permission scopes.",
      },
    ],
    ctaText: "Share Your Stripe API Key Securely",
    relatedProviders: ["supabase", "openai"],
  },

  supabase: {
    slug: "supabase",
    name: "Supabase",
    company: "Supabase",
    primaryKeyword: "share Supabase API key securely",
    title: "Share Supabase API Keys Securely - Backend Credentials Sharing",
    description:
      "Securely share Supabase API keys, service role keys, and database passwords with your team. Self-destructing links protect your backend infrastructure.",
    headline: "Share Supabase API Keys Securely",
    subheadline:
      "Protect your Supabase anon keys, service role keys, and database credentials with self-destructing links. Keep your backend secure.",
    keywords: [
      "share Supabase API key",
      "Supabase service role key",
      "Supabase anon key sharing",
      "Supabase database password",
      "secure Supabase credentials",
      "Supabase JWT secret",
      "Supabase developer onboarding",
      "Supabase team access",
    ],
    benefits: [
      {
        title: "Service Role Key Protection",
        description:
          "Supabase service role keys bypass Row Level Security. A leaked service key means full database access. Self-destructing links eliminate lingering exposure.",
      },
      {
        title: "Database Password Security",
        description:
          "Your Supabase Postgres password grants direct database access. Share it securely without the password living in chat logs.",
      },
      {
        title: "JWT Secret Safeguarding",
        description:
          "The JWT secret lets anyone forge authentication tokens. Protect it like the keys to your entire user system.",
      },
      {
        title: "Multi-Project Management",
        description:
          "Working with multiple Supabase projects? Share credentials for each project securely with the right team members.",
      },
    ],
    useCases: [
      {
        title: "Full-Stack Development Teams",
        description:
          "Share Supabase credentials with developers building features without exposing keys in GitHub issues or PRs.",
      },
      {
        title: "Startup Team Onboarding",
        description:
          "Onboard new engineers to your Supabase-powered app without credentials ending up in onboarding docs.",
      },
      {
        title: "Agency Project Handoffs",
        description:
          "Transfer Supabase project ownership to clients with secure credential sharing at project completion.",
      },
      {
        title: "Freelancer Backend Access",
        description:
          "Give contractors temporary Supabase access for specific tasks without permanent credential exposure.",
      },
    ],
    risks: [
      "Supabase service keys in Slack bypass all Row Level Security",
      "Database passwords in email grant direct Postgres access",
      "Leaked JWT secrets allow forged authentication tokens",
      "Anon keys in public repos can lead to data exposure",
    ],
    faqs: [
      {
        question: "How do I share my Supabase API key securely?",
        answer:
          "Paste your Supabase key (anon, service role, or any credential) into SnapPwd, generate a self-destructing link, and share that link instead of the raw key.",
      },
      {
        question: "Should I share anon keys and service role keys differently?",
        answer:
          "Service role keys are more sensitive as they bypass RLS. Use separate self-destructing links and only share service keys with team members who need admin access.",
      },
      {
        question: "Can I share Supabase database connection strings?",
        answer:
          "Yes. SnapPwd works with any text including Postgres connection strings, pooler URLs, and direct database credentials.",
      },
    ],
    ctaText: "Share Your Supabase API Key Securely",
    relatedProviders: ["stripe", "openai"],
  },
};

// Get all provider slugs for static generation
export function getAllProviderSlugs(): string[] {
  return Object.keys(llmProviders);
}

// Get provider by slug
export function getProvider(slug: string): LLMProvider | undefined {
  return llmProviders[slug];
}

// Get related providers for internal linking
export function getRelatedProviders(slug: string): LLMProvider[] {
  const provider = llmProviders[slug];
  if (!provider) return [];
  return provider.relatedProviders
    .map((relatedSlug) => llmProviders[relatedSlug])
    .filter(Boolean);
}
