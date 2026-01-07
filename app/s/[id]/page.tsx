import { ShareClient } from "@/app/share/[id]/client-page";

export default function Share({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Share Secret</h1>
        <p>
          The secret has been temporarily saved. Send the following URL to your
          intended recipient.
        </p>
        <ShareClient storageKey={id} />
      </div>
    </section>
  );
}
