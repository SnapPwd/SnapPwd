"use client";

import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { LockOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { decryptData, isValidBase58Key } from "@/libs/client-crypto";

export function RevealForm({ id }: { id: string }) {
  const handleReveal = () => {
    // Redirect client-side to preserve the hash fragment
    const hash = window.location.hash;
    if (!hash) {
      window.alert(
        "Decryption key not found in URL. Please use the full link you were given."
      );
      return;
    }
    window.location.href = `/g/${encodeURIComponent(id)}?reveal=true${hash}`;
  };

  return (
    <div>
      <p className="text-2xl text-foreground">You can only reveal the secret once!</p>
      <Button
        size="lg"
        className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 text-base h-12"
        onClick={handleReveal}
      >
        <LockOpen className="mr-2 h-4 w-4" />
        Reveal Secret
      </Button>
    </div>
  );
}

export function SecretDisplay({
  encryptedSecret,
}: {
  encryptedSecret: string;
}) {
  const [decryptedSecret, setDecryptedSecret] = useState<string>("");
  const [isDecrypting, setIsDecrypting] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const decrypt = async () => {
      // Extract decryption key from URL hash fragment (never sent to server)
      const decryptionKeyRaw = window.location.hash.slice(1);

      if (!decryptionKeyRaw) {
        setError(
          "Decryption key not found in URL. The link may be incomplete."
        );
        setIsDecrypting(false);
        return;
      }

      let decryptionKey: string;
      try {
        decryptionKey = decodeURIComponent(decryptionKeyRaw);
      } catch {
        setError("Invalid decryption key encoding in URL.");
        setIsDecrypting(false);
        return;
      }

      if (!isValidBase58Key(decryptionKey)) {
        setError("Invalid decryption key in URL.");
        setIsDecrypting(false);
        return;
      }

      try {
        const decryptedSecret = await decryptData(
          encryptedSecret,
          decryptionKey
        );
        setDecryptedSecret(decryptedSecret);
      } catch (err) {
        setError(
          "Failed to decrypt. The decryption key may be invalid, or the secret may already have been revealed."
        );
      }
      setIsDecrypting(false);
    };

    decrypt();
  }, [encryptedSecret]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:flex-1">
        <Textarea
          className="min-h-[200px] font-mono bg-muted"
          value={
            isDecrypting ? "Decrypting..." : error ? error : decryptedSecret
          }
          readOnly
          aria-live="polite"
          aria-busy={isDecrypting}
        />
        <p className="py-4 text-foreground">
          The secret has now been permanently deleted from the system, and the
          URL will no longer work. Refresh this page to verify.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Security note:</strong> This secret was decrypted in your
          browser. The server never had access to the unencrypted content.
        </p>
      </div>
      <div className="py-4 md:py-0 md:px-12">
        <CopyButton text={error ? "" : decryptedSecret} />
      </div>
    </div>
  );
}
