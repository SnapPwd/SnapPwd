"use client";

import { Button } from "@/components/ui/button";
import SecretInput from "@/components/ui/SecretInput";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { generateUrl } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button
      variant="outline"
      size="lg"
      className="bg-black text-white w-[160px]"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Generate URL"
      )}
    </Button>
  );
}

export default function Home() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Set Secret</h1>
        <form
          className="flex flex-col md:flex-row w-full"
          id="generateUrl"
          action={generateUrl}
        >
          <div className="md:flex-1">
            <SecretInput />
          </div>
          <div className="py-4 md:py-0 md:px-12 flex flex-row md:flex-col gap-4">
            <select
              className="border border-slate-400 rounded-md p-2 w-[160px]"
              name="expiration"
              id="expiration"
            >
              <option value="one_hour">1 hour</option>
              <option value="one_day">1 day</option>
              <option value="one_week">1 week</option>
              <option value="two_weeks">2 weeks</option>
            </select>
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}
