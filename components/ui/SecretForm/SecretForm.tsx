"use client";

import { Button } from "@/components/ui/button";
import SecretInput from "@/components/ui/SecretInput";
import { Loader2, Clock, Link2 } from "lucide-react";
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
  const [secretCharCount, setSecretCharCount] = useState(0);

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
    setSecretCharCount(value.length);
  };

  // Calculate approximate character limit (assuming average 1.5 bytes per character for UTF-8)
  const maxChars = Math.floor(maxSize.bytes / 1.5);

  return (
    <form
      className="flex flex-col lg:flex-row w-full gap-8"
      id="generateUrl"
      onSubmit={handleSubmit}
    >
      {/* Left side - Secret Input */}
      <div className="flex-1">
        <SecretInput onChange={handleSecretChange} />

        {/* Character counter with modern styling */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">
              {secretCharCount.toLocaleString()}
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">
              ~{maxChars.toLocaleString()} characters
            </span>
          </div>
          <span
            className={`font-medium transition-colors ${
              secretLength > maxSize.bytes
                ? "text-red-600"
                : "text-slate-600"
            }`}
          >
            {secretLength > maxSize.bytes
              ? "Exceeds size limit"
              : `${(maxChars - secretCharCount).toLocaleString()} remaining`}
          </span>
        </div>
      </div>

      {/* Right side - Settings & Action */}
      <div className="flex flex-col gap-6 w-full lg:w-64">
        {/* Expiration selector with modern design */}
        <div className="flex flex-col gap-3">
          <label htmlFor="expiration" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Link Expiration
          </label>
          <select
            className="border border-slate-300 rounded-lg p-3 w-full bg-white hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 transition-all outline-none text-sm font-medium cursor-pointer"
            name="expiration"
            id="expiration"
          >
            <option value="one_hour">1 hour</option>
            <option value="one_day">1 day</option>
            <option value="one_week">1 week</option>
            <option value="two_weeks">2 weeks</option>
          </select>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your secret will be permanently deleted after this time period
          </p>
        </div>

        {/* Generate button with modern styling */}
        <Button
          size="lg"
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-base h-12"
          type="submit"
          disabled={isSubmitting || secretLength > maxSize.bytes}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Link...
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-5 w-5" />
              Generate Secure Link
            </>
          )}
        </Button>

        {/* Security features badge */}
        <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>One-time access only</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>Auto-expires after time limit</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    </form>
  );
}
