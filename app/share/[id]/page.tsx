import CopyButton from "@/components/ui/CopyButton";
import { getSiteUrl } from "@/libs/utils";

export default function Share({ params }: { params: { id: string } }) {
  const { id } = params;
  const secretUrl = `${getSiteUrl()}/get/${id}`;

  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Share Secret</h1>
        <p>
          The secret has been temporarily saved. Send the following URL to your
          intended recipient.
        </p>
        <div className="flex flex-col md:flex-row items-center my-2 gap-2">
          <span className="border rounded-md border-slate-400 py-1 px-2 font-mono bg-gray-200">
            {secretUrl}
          </span>
          <CopyButton text={secretUrl} />
        </div>
      </div>
    </section>
  );
}
