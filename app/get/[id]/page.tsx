import {  notFound } from "next/navigation";
import { getSecretAndDecrypt } from "@/libs/snappwd";
import { RevealForm, SecretDisplay } from "./client-page";

interface PageProps {
  params: { id: string };
  searchParams: { reveal?: string };
}

export default async function GetSecret({ params, searchParams }: PageProps) {
  const { id } = params;
  const { reveal } = searchParams;

  let secret = null;
  if (reveal === "true" || reveal === "1") {
    try {
      secret = await getSecretAndDecrypt(id);
      if (!secret) {
        notFound();
      }
    } catch (error) {
      console.error("Error retrieving secret:", error);
      notFound();
    }
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Reveal Secret</h1>
        {!reveal ? (
          <RevealForm id={id} />
        ) : (
          <SecretDisplay secret={secret || ""} />
        )}
      </div>
    </section>
  );
}
