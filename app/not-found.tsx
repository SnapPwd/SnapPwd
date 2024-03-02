import Link from "next/link";

export default function NotFound() {
  return (
    <section className="">
      <div className="text-center max-w-6xl mx-auto px-6">
        <h1 className="text-4xl py-20">404 - Page Not Found</h1>
        <Link href="/" className="underline">
          Return Home
        </Link>
      </div>
    </section>
  );
}
