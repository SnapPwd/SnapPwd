"use client";

import CopyButton from "@/components/ui/CopyButton";
import { isValidBase58Key } from "@/libs/client-crypto";
import { useEffect, useState } from "react";

export function ShareClient({ storageKey }: { storageKey: string }) {
  const [secretUrl, setSecretUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read the encryption key from the hash fragment (never sent to server)
    const encryptionKeyRaw = window.location.hash.slice(1);
    if (!encryptionKeyRaw) {
      setError("Encryption key not found in URL. The link may be incomplete.");
      return;
    }

    let encryptionKey: string;
    try {
      encryptionKey = decodeURIComponent(encryptionKeyRaw);
    } catch {
      setError("Invalid encryption key encoding in URL.");
      return;
    }

    if (!isValidBase58Key(encryptionKey)) {
      setError("Invalid encryption key in URL.");
      return;
    }

    const baseUrl = window.location.origin;
    setSecretUrl(
      `${baseUrl}/g/${encodeURIComponent(storageKey)}#${encodeURIComponent(
        encryptionKey
      )}`
    );
  }, [storageKey]);

  if (error) {
    return <div className="my-2">{error}</div>;
  }

  if (!secretUrl) {
    return <div className="my-2">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center my-2 gap-2">
      <span className="border rounded-md border-slate-400 py-1 px-2 font-mono bg-gray-200 break-all">
        {secretUrl}
      </span>
      <CopyButton text={secretUrl} />
    </div>
  );
}
