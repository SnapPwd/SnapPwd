import Link from "next/link";

export default function Footer() {
  return (
    <footer className="">
      <div className="flex flex-col text-white items-center justify-between py-4 space-y-4 bg-zinc-900">
        <div className="flex flex-col md:flex-row md:gap-1 items-center">
          <span>&copy; {new Date().getFullYear()} SnapPwd.</span>
          <span>
            Open-sourced on{" "}
            <Link href="https://github.com/SnapPwd" className="underline">
              GitHub
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
