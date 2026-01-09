"use client";

import { Button } from "@/components/ui/button";
import SecretInput from "@/components/ui/SecretInput";
import { Loader2 } from "lucide-react";
import { storeEncryptedSecret, getMaxSecretSize } from "@/app/actions";
import { encryptData, generateEncryptionKey } from "@/libs/client-crypto";
import { useState, useEffect, FormEvent } from "react";

export default function SecretForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maxSize, setMaxSize] = useState<{ bytes: number; display: string }>({
    bytes: 1048576, // Default 1MB
    display: "1MB",
  });
  const [secretLength, setSecretLength] = useState(0);

  // Fetch max size configuration on mount
  useEffect(() => {
    getMaxSecretSize().then(setMaxSize);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const secretValue = formData.get("secret");
    const expirationValue = formData.get("expiration");

    try {
      if (typeof secretValue !== "string" || secretValue.length === 0) {
        alert("Please enter a secret.");
        return;
      }

      // Client-side size validation
      const secretSizeBytes = new TextEncoder().encode(secretValue).length;
      if (secretSizeBytes > maxSize.bytes) {
        const approxChars = Math.ceil(secretSizeBytes / 1.5);
        const maxApproxChars = Math.floor(maxSize.bytes / 1.5);
        alert(
          `Secret is too large. Your secret has approximately ${approxChars.toLocaleString()} characters, but the maximum is around ${maxApproxChars.toLocaleString()} characters (${maxSize.display}).`
        );
        return;
      }

      if (
        typeof expirationValue !== "string" ||
        !["one_hour", "one_day", "one_week", "two_weeks"].includes(
          expirationValue
        )
      ) {
        alert("Please select a valid expiration.");
        return;
      }

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
      // Note: We must use window.location.href here because Next.js router.push()
      // doesn't support hash fragments in the URL
      const shareUrl = `/s/${encodeURIComponent(storageKey)}#${encodeURIComponent(encryptionKey)}`;

      try {
        window.location.href = shareUrl;
      } catch (navError) {
        console.error("Navigation error:", navError);
        alert("Failed to navigate to the share page. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Encryption error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(
        `Failed to encrypt and store your secret: ${errorMessage}\n\nPlease try again.`
      );
      setIsSubmitting(false);
    }
  };

  const handleSecretChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const sizeBytes = new TextEncoder().encode(value).length;
    setSecretLength(sizeBytes);
  };

  // Calculate approximate character limit (assuming average 1.5 bytes per character for UTF-8)
  const maxChars = Math.floor(maxSize.bytes / 1.5);
  const currentChars = secretLength > 0 ? Math.ceil(secretLength / 1.5) : 0;

  return (
    <form
      className="flex flex-col md:flex-row w-full gap-6 md:gap-8"
      id="generateUrl"
      onSubmit={handleSubmit}
    >
      <div className="md:flex-1">
        <SecretInput onChange={handleSecretChange} />
        <div className="mt-2 text-xs text-gray-500 flex justify-between">
          <span>
            {currentChars.toLocaleString()} / ~{maxChars.toLocaleString()}{" "}
            characters
          </span>
          <span
            className={
              secretLength > maxSize.bytes ? "text-red-600 font-semibold" : ""
            }
          >
            {secretLength > maxSize.bytes
              ? `Exceeds size limit`
              : `${(maxChars - currentChars).toLocaleString()} characters remaining`}
          </span>
        </div>
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
        <Button
          variant="outline"
          size="lg"
          className="bg-black text-white w-full"
          type="submit"
          disabled={isSubmitting || secretLength > maxSize.bytes}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Generate Link"
          )}
        </Button>
      </div>
    </form>
  );
}
