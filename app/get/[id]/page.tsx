import { notFound } from "next/navigation";
import { getEncryptedSecret } from "@/libs/snappwd";
import { RevealForm, SecretDisplay } from "./client-page";
import { decryptData } from "@/libs/client-crypto";

interface PageProps {
  params: { id: string };
  searchParams: { reveal?: string };
}


export default async function GetSecret({ params, searchParams }: PageProps) {
  const { id } = params;
  const { reveal } = searchParams;

  const shouldReveal = reveal === "true" || reveal === "1";

  let encryptedSecret = null;
  let decryptionKey = null;
  if (shouldReveal) {
    // Get the encrypted secret from Redis
    try {
      encryptedSecret = await getEncryptedSecret(id);
      if (!encryptedSecret) {
        notFound();
      }
    } catch (error) {
      console.error("Error retrieving encrypted secret:", error);
      notFound();
    }

    // Get the decryption key from the URL
    const matchDecryptionKey = id.match(/[a-f0-9]{32}/i);
    if (matchDecryptionKey && matchDecryptionKey.length === 1) {
      decryptionKey = matchDecryptionKey[0];
    }
  }
 
  return (
    <section>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Reveal Secret</h1>
        {shouldReveal ? (
          <SecretDisplay encryptedSecret={encryptedSecret!} decryptionKey={decryptionKey!}/>
        ) : (
          <RevealForm id={id} />
        )}
      </div>
    </section>
  );
}
