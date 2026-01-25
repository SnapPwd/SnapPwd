"use client";

import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/CopyButton/CopyButton";
import { Check, RefreshCw, Clock, Shield } from "lucide-react";

interface SecretLinkResultProps {
  secretUrl: string;
  expirationLabel: string;
  onCreateAnother: () => void;
}

export default function SecretLinkResult({
  secretUrl,
  expirationLabel,
  onCreateAnother,
}: SecretLinkResultProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-2 bg-card rounded-lg">
      {/* Success Icon */}
      <div className="mb-8 relative">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Check className="h-10 w-10 text-green-600 dark:text-green-400" strokeWidth={2.5} />
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 animate-ping opacity-20" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-foreground mb-3">
        Your Secure Link is Ready
      </h2>

      {/* Expiration info */}
      <p className="text-muted-foreground mb-4">
        This link will expire in{" "}
        <span className="font-semibold">{expirationLabel}</span>
      </p>

      {/* URL Display with Copy Button */}
      <div className="w-full max-w-2xl mb-4">
        <div className="relative flex items-center gap-3 p-4 bg-muted rounded-lg border-2 border-border">
          <code className="flex-1 text-sm font-mono text-foreground break-all pr-10">
            {secretUrl}
          </code>
          <CopyButton
            text={secretUrl}
            variant="icon"
            className="absolute bottom-2 right-2"
          />
        </div>
      </div>

      {/* Security Features */}
      <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>End-to-end encrypted</span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>One-time view</span>
        </div>
      </div>

      {/* Create Another Button */}
      <Button
        onClick={onCreateAnother}
        variant="outline"
        size="lg"
        className="flex items-center gap-2 hover:bg-accent transition-all duration-200"
      >
        <RefreshCw className="h-5 w-5" />
        Create Another Secret
      </Button>
    </div>
  );
}
