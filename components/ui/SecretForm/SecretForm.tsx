"use client";

import { Button } from "@/components/ui/button";
import SecretInput from "@/components/ui/SecretInput";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { storeEncryptedSecret } from "@/app/actions";
import { encryptData, generateEncryptionKey } from "@/libs/client-crypto";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      size="lg"
      className="bg-black text-white w-[160px]"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Generate URL"
      )}
    </Button>
  );
}

const handleSubmit = async (formData: FormData) => {
  const secret = formData.get("secret") as string;
  const expiration = formData.get("expiration") as string;

  try {
    // Generate a random encryption key in the browser
    const encryptionKey = generateEncryptionKey();

    // Encrypt the secret in the browser
    const encryptedSecret = await encryptData(secret, encryptionKey);

    // Send only the encrypted data to the server
    const storageKey = await storeEncryptedSecret(encryptedSecret, expiration);

    // Redirect to the share page with both the storage key and encryption key
    window.location.href = `/share/${storageKey}-${encryptionKey}`;
  } catch (error) {
    console.error("Encryption error:", error);
    alert("Failed to encrypt and store your secret. Please try again.");
  }
};

export default function SecretForm() {
  return (
    <form
      className="flex flex-col md:flex-row w-full"
      id="generateUrl"
      action={handleSubmit}
    >
      <div className="md:flex-1">
        <SecretInput />
      </div>
      <div className="py-4 md:py-0 md:px-12 flex flex-row md:flex-col gap-4">
        <select
          className="border border-slate-400 rounded-md p-2 w-[160px]"
          name="expiration"
          id="expiration"
        >
          <option value="one_hour">1 hour</option>
          <option value="one_day">1 day</option>
          <option value="one_week">1 week</option>
          <option value="two_weeks">2 weeks</option>
        </select>
        <SubmitButton />
      </div>
    </form>
  );
}
