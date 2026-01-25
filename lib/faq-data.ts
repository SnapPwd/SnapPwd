// Centralized FAQ data for consistency across pages

export interface FAQItem {
  question: string;
  answer: string;
}

// Complete FAQ data used on the /faq page
export const faqData: FAQItem[] = [
  {
    question: "How does SnapPwd work?",
    answer:
      "SnapPwd uses end-to-end encryption to secure your sensitive information. When you create a secret, your data is encrypted in your browser before it ever reaches our servers. We generate a unique, time-limited link that you can share with the recipient. Once the link is accessed or expires, the data is permanently deleted.",
  },
  {
    question: "Is SnapPwd really secure?",
    answer:
      "Yes, SnapPwd is designed with security as our top priority. We use industry-standard encryption protocols, and your data is encrypted client-side before transmission. We never store your unencrypted data, and all content is automatically deleted after access or expiration.",
  },
  {
    question: "Do I need to register to use SnapPwd?",
    answer:
      "No registration is required. SnapPwd is completely free to use and doesn't require any account creation or personal information.",
  },
  {
    question: "How long do links remain active?",
    answer:
      "You can choose from several expiration options when creating a secret, ranging from a few minutes to 7 days. Once the expiration time is reached or the link is accessed, the content is permanently deleted.",
  },
  {
    question: "Can I access the same link multiple times?",
    answer:
      "No, SnapPwd links are designed for one-time access only. Once a link is viewed, the content is immediately deleted to ensure your information remains secure.",
  },
  {
    question: "What happens if I lose the link?",
    answer:
      "If you lose the link before the recipient accesses it, the content will remain encrypted on our servers until it expires. However, we cannot recover lost links or regenerate them for security reasons.",
  },
  {
    question: "What types of information can I share?",
    answer:
      "You can share any sensitive information that needs to be transmitted securely, including passwords, API keys, confidential documents, or any other private data. However, please ensure you're not sharing illegal or prohibited content.",
  },
  {
    question: "Does SnapPwd track my activity?",
    answer:
      "We collect minimal anonymous usage statistics for security and service improvement purposes, such as access times and device information. We do not track personal information or the content of your messages.",
  },
  {
    question: "Is SnapPwd free to use?",
    answer:
      "Yes, SnapPwd is completely free to use. There are no hidden fees or premium features - all core functionality is available to everyone at no cost.",
  },
  {
    question: "Can I use SnapPwd for business purposes?",
    answer:
      "Yes, SnapPwd can be used for both personal and business purposes. Many teams use it to share credentials, API keys, and other sensitive information securely.",
  },
  {
    question: "How can I share .env files securely with my team?",
    answer:
      "SnapPwd is perfect for sharing .env files and environment variables securely. Instead of emailing .env files or posting them in chat, copy the content and create a secret link. The link expires after one access, ensuring your environment variables aren't accidentally exposed to unauthorized team members.",
  },
  {
    question: "Is SnapPwd good for sharing API keys and database credentials?",
    answer:
      "Absolutely! SnapPwd is ideal for sharing API keys, database credentials, and other development secrets. The one-time access nature ensures that sensitive credentials aren't left lingering in chat logs or emails where they could be discovered later.",
  },
  {
    question: "Can developers use SnapPwd for onboarding new team members?",
    answer:
      "Yes, SnapPwd is excellent for developer onboarding. You can securely share access credentials, API keys, configuration files, and other sensitive setup information with new team members. The self-destructing links ensure that access credentials are automatically cleaned up after use.",
  },
  {
    question: "How does SnapPwd compare to other methods for sharing secrets?",
    answer:
      "Unlike email, Slack, or other messaging apps where secrets persist forever, SnapPwd links self-destruct after access. This eliminates the risk of old credentials being discovered in chat history. Plus, with end-to-end encryption, even our servers can't access your data.",
  },
];

// Subset of FAQs for homepage section (first 6 questions)
export const homepageFaqs: FAQItem[] = [
  {
    question: "How secure is SnapPwd?",
    answer:
      "SnapPwd uses end-to-end encryption. Your data is encrypted in your browser before it reaches our servers, so we never see your unencrypted content. Only the recipient with the correct link can decrypt it.",
  },
  {
    question: "What happens to my data after it's viewed?",
    answer:
      "Your encrypted data is automatically deleted from our servers once it's accessed by the recipient or when it expires, whichever comes first. We don't keep backups of expired content.",
  },
  {
    question: "Can I choose an expiration time?",
    answer:
      "Yes. You can choose how long your secret lasts (1 hour, 1 day, 1 week, or 2 weeks). Secrets are designed for one-time access: once revealed, they're deleted.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account required! SnapPwd works completely anonymously. Just create your secret link and share it with the intended recipient.",
  },
  {
    question: "What types of information can I share?",
    answer:
      "You can share passwords, API keys, credit card numbers, personal notes, or any sensitive text information. We don't store file uploads - only encrypted text.",
  },
  {
    question: "Is SnapPwd free to use?",
    answer:
      "Yes, SnapPwd is completely free to use. We believe everyone should have access to secure information sharing.",
  },
];
