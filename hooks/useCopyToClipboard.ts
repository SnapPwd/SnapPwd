"use client";

import { useState, useCallback } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetDelay);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    [resetDelay]
  );

  return { isCopied, copy };
}
