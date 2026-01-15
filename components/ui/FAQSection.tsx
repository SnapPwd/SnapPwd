import FAQAccordion from "./FAQAccordion";

const faqs = [
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

export default function FAQSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
