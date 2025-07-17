import SecretForm from "@/components/ui/SecretForm";

export const metadata = {
  title: "SnapPwd - Share Secrets Securely",
  description: "Share passwords and sensitive information securely with end-to-end encryption"
};

export default function Home() {  
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Set Secret</h1>
        <SecretForm />
      </div>
    </section>
  );
}
