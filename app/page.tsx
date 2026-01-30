import SecretForm from "@/components/ui/SecretForm";
import FileShareForm from "@/components/ui/FileShareForm";
import { Shield, Clock, RefreshCw, Key, Users, UserPlus, FileCode, Code, FileText, File } from "lucide-react";
import FAQSection from "../components/ui/FAQSection";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border">
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
            Share Secrets Securely
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Share passwords and sensitive information with end-to-end
            encryption. Your secrets never leave your browser unencrypted.
          </p>
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-6xl mx-auto">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="text" className="text-base">
                  <FileText className="mr-2 h-4 w-4" />
                  Text / Password
                </TabsTrigger>
                <TabsTrigger value="file" className="text-base">
                  <File className="mr-2 h-4 w-4" />
                  File Share
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-0">
                <SecretForm />
              </TabsContent>
              <TabsContent value="file" className="mt-0">
                <FileShareForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Why Choose SnapPwd?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="End-to-End Encryption"
              description="Your secret is encrypted in your browser before it's sent to our servers. Only someone with the link can open it."
            />
            <FeatureCard
              icon={Clock}
              title="Self-Destructing Links"
              description="Set an expiration time for your secrets. After the time is up, the data is automatically deleted from our servers."
            />
            <FeatureCard
              icon={RefreshCw}
              title="One-Time Access"
              description="Each secret can be revealed only once. After it's opened, it's permanently deleted from our servers."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">How It Works</h2>
          <ol className="flex flex-col md:flex-row gap-8 justify-between">
            <li className="flex-1 bg-card p-6 rounded-lg shadow-sm border border-border relative">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold absolute -top-4 left-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2 text-card-foreground">
                Enter Your Secret
              </h3>
              <p className="text-muted-foreground">
                Type the password or sensitive information you want to share
                securely.
              </p>
            </li>
            <li className="flex-1 bg-card p-6 rounded-lg shadow-sm border border-border relative">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold absolute -top-4 left-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2 text-card-foreground">
                Generate Secure Link
              </h3>
              <p className="text-muted-foreground">
                Your secret is encrypted in your browser and a link is generated
                for you to share.
              </p>
            </li>
            <li className="flex-1 bg-card p-6 rounded-lg shadow-sm border border-border relative">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold absolute -top-4 left-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2 text-card-foreground">
                Recipient Views Secret
              </h3>
              <p className="text-muted-foreground">
                The recipient clicks the link and can view the decrypted
                information securely.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-foreground">
            Popular Use Cases
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            SnapPwd helps teams and individuals securely share sensitive information across various scenarios.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/passwords"
              className="group bg-card p-6 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <Key className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  Share Passwords
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Send login credentials securely with one-time access links that self-destruct after viewing.
              </p>
            </Link>

            <Link
              href="/teams"
              className="group bg-card p-6 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  Team Credentials
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Share access credentials with team members without exposing them in chat or email.
              </p>
            </Link>

            <Link
              href="/onboarding"
              className="group bg-card p-6 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <UserPlus className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  Employee Onboarding
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Securely provision new hires with the credentials they need on day one.
              </p>
            </Link>

            <Link
              href="/env-files"
              className="group bg-card p-6 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <FileCode className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  Environment Files
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Share .env files and configuration secrets with developers safely.
              </p>
            </Link>

            <Link
              href="/api-keys"
              className="group bg-card p-6 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  API Keys
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Distribute API keys and tokens without leaving them exposed in messages.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
