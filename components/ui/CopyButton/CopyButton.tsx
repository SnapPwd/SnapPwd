"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import cn from "classnames";

interface CopyButtonProps {
  text: string | (() => string);
  variant?: "default" | "icon";
  className?: string;
}

export default function CopyButton({
  text,
  variant = "default",
  className,
}: CopyButtonProps) {
  const { isCopied, copy } = useCopyToClipboard(1000);
  const getText = () => (typeof text === "function" ? text() : text);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => copy(getText())}
        className={cn(
          "p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground",
          className
        )}
        title={isCopied ? "Copied!" : "Copy to clipboard"}
        aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <Button
      className={cn(
        "w-24 bg-primary hover:bg-primary/90 text-primary-foreground",
        className
      )}
      onClick={() => copy(getText())}
      aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
}
