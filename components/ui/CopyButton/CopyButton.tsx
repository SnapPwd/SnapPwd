"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function CopyButton({ text }: { text: string }) {
  const { isCopied, copy } = useCopyToClipboard(1000);

  return (
    <Button
      className="text-white w-24 bg-black hover:bg-gray-600"
      onClick={() => copy(text)}
      aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
}
