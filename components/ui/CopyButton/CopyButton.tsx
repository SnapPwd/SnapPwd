"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function CopyButton({ text }: { text: string }) {
  const { isCopied, copy } = useCopyToClipboard(1000);

  return (
    <Button
      className="w-24 bg-primary hover:bg-primary/90 text-primary-foreground"
      onClick={() => copy(text)}
      aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
}
