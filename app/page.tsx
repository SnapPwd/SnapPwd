import { Button } from "@/components/ui/button";
import SecretInput from "@/components/ui/SecretInput";
import { encryptAndStoreSecret } from "@/libs/snappwd";
import { redirect } from "next/navigation";

const expirationOptions = {
  one_hour: 3600,
  one_day: 86400,
  one_week: 604800,
  two_weeks: 1209600,
};

const generateUrl = async (formData: FormData) => {
  "use server";

  const { secret, expiration } = Object.fromEntries(formData);
  const expirationKey = expiration.toString() as keyof typeof expirationOptions;

  const k = await encryptAndStoreSecret(
    secret.toString(),
    expirationOptions[expirationKey]
  );
  redirect(`/share/${k}`);
};

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
              className="border border-slate-400 rounded-md p-2"
              name="expiration"
              id="expiration"
            >
              <option value="one_hour">1 hour</option>
              <option value="one_day">1 day</option>
              <option value="one_week">1 week</option>
              <option value="two_weeks">2 weeks</option>
            </select>
            <Button
              variant="outline"
              size="lg"
              className="bg-black text-white"
              type="submit"
            >
              Generate URL
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
