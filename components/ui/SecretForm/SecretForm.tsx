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
      className="bg-black text-white w-full"
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
  const secretValue = formData.get("secret");
  const expirationValue = formData.get("expiration");

  if (typeof secretValue !== "string" || secretValue.length === 0) {
    alert("Please enter a secret.");
    return;
  }

  if (
    typeof expirationValue !== "string" ||
    !["one_hour", "one_day", "one_week", "two_weeks"].includes(expirationValue)
  ) {
    alert("Please select a valid expiration.");
    return;
  }

  try {
    // Generate a random encryption key in the browser
    const encryptionKey = generateEncryptionKey();

    // Encrypt the secret in the browser
    const encryptedSecret = await encryptData(secretValue, encryptionKey);

    // Send only the encrypted data to the server
    const storageKey = await storeEncryptedSecret(
      encryptedSecret,
      expirationValue
    );

    // Redirect to the share page with storage key in path and encryption key in hash
    // Hash fragment is never sent to the server
    window.location.href = `/share/${encodeURIComponent(
      storageKey
    )}#${encodeURIComponent(encryptionKey)}`;
  } catch (error) {
    console.error("Encryption error:", error);
    alert("Failed to encrypt and store your secret. Please try again.");
  }
};

export default function SecretForm() {
  return (
    <form
      className="flex flex-col md:flex-row w-full gap-6 md:gap-8"
      id="generateUrl"
      action={handleSubmit}
    >
      <div className="md:flex-1">
        <SecretInput />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 w-full md:max-w-[160px] gap-4 md:gap-0">
        <div className="flex flex-col gap-2 w-full">
          <select
            className="border border-slate-400 rounded-md p-2 w-full"
            name="expiration"
            id="expiration"
          >
            <option value="one_hour">1 hour</option>
            <option value="one_day">1 day</option>
            <option value="one_week">1 week</option>
            <option value="two_weeks">2 weeks</option>
          </select>
          <p className="text-xs text-gray-500 w-full text-left">
            After this time, the secret will be permanently deleted
          </p>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
