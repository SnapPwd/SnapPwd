"use client";

import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/textarea";
import { revealSecret } from "@/app/actions";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function RevealButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button
      variant="outline"
      size="lg"
      className="mt-4 bg-black text-white w-[160px]"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Reveal Secret"
      )}
    </Button>
  );
}

export function RevealForm({ id }: { id: string }) {
  return (
    <div>
      <p className="text-2xl">You can only reveal the secret once!</p>
      <form id="revealSecret" action={revealSecret}>
        <input name="secretId" type="hidden" value={id} />
        <RevealButton />
      </form>
    </div>
  );
}

export function SecretDisplay({ secret }: { secret: string }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:flex-1">
        <Textarea
          className="min-h-[200px] font-mono bg-gray-100"
          value={secret}
          readOnly
        />
        <p className="py-4">
          The secret has now been permanently deleted from the system, and
          the URL will no longer work. Refresh this page to verify.
        </p>
      </div>
      <div className="py-4 md:py-0 md:px-12">
        <CopyButton text={secret} />
      </div>
    </div>
  );
}
