import FAQAccordion from "./FAQAccordion";
import { homepageFaqs } from "@/lib/faq-data";

export default function FAQSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={homepageFaqs} />
      </div>
    </section>
  );
}
