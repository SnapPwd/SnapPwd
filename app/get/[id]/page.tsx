import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/CopyButton";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { getSecretAndDecrypt } from "@/libs/snappwd";

interface PageProps {
  params: { id: string };
  searchParams: { reveal: string };
}

const revealSecret = async (formData: FormData) => {
  "use server";

  redirect(`/get/${formData.get("secretId")}?reveal=true`);
};

export default async function Reveal({ params, searchParams }: PageProps) {
  const { id } = params;
  const { reveal } = searchParams;

  let secret = null;
  if (reveal) {
    secret = await getSecretAndDecrypt(id);
    if (!secret) {
      redirect("/not-found");
    }
  }

  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Reveal Secret</h1>
        {!reveal ? (
          <div>
            <p className="text-2xl">You can only reveal the secret once!</p>
            <form id="revealSecret" action={revealSecret}>
              <input name="secretId" type="hidden" value={id} />
              <Button className="mt-4 text-white bg-black" type="submit">
                Reveal Secret
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1">
              <Textarea
                className="min-h-[200px] font-mono bg-gray-100"
                value={secret || ""}
                readOnly
              />
              <p className="py-4">
                The secret has now been permanently deleted from the system, and
                the URL will no longer work. Refresh this page to verify.
              </p>
            </div>
            <div className="py-4 md:py-0 md:px-12">
              <CopyButton text={secret || ""} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
