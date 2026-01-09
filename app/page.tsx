import SecretForm from "@/components/ui/SecretForm";
import { Shield, Clock, Lock, RefreshCw } from "lucide-react";
import FAQSection from "../components/ui/FAQSection";

export const metadata = {
  title: "SnapPwd - Share Secrets Securely",
  description:
    "Share passwords and sensitive information securely with end-to-end encryption. Self-destructing links with one-time access for maximum security.",
  alternates: {
    canonical: "/",
  },
};

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Share Secrets Securely
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SnapPwd lets you share passwords and sensitive information with
            end-to-end encryption. Your secrets never leave your browser
            unencrypted.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <Lock className="h-5 w-5 mr-2" /> Create Your Secure Link
            </h2>
            <SecretForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose SnapPwd?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="End-to-End Encryption"
              description="Your secret is encrypted in your browser before it’s sent to our servers. Only someone with the link can open it."
            />
            <FeatureCard
              icon={Clock}
              title="Self-Destructing Links"
              description="Set an expiration time for your secrets. After the time is up, the data is automatically deleted from our servers."
            />
            <FeatureCard
              icon={RefreshCw}
              title="One-Time Access"
              description="Each secret can be revealed only once. After it’s opened, it’s permanently deleted from our servers."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <ol className="flex flex-col md:flex-row gap-8 justify-between">
            <li className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold absolute -top-4 left-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">
                Enter Your Secret
              </h3>
              <p className="text-gray-600">
                Type the password or sensitive information you want to share
                securely.
              </p>
            </li>
            <li className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold absolute -top-4 left-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">
                Generate Secure Link
              </h3>
              <p className="text-gray-600">
                Your secret is encrypted in your browser and a link is generated
                for you to share.
              </p>
            </li>
            <li className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold absolute -top-4 left-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">
                Recipient Views Secret
              </h3>
              <p className="text-gray-600">
                The recipient clicks the link and can view the decrypted
                information securely.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
