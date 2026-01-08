import Link from "next/link";

export default function Footer() {
  return (
    <footer className="">
      <div className="flex flex-col text-white items-center justify-between py-4 space-y-4 bg-zinc-900">
        <div className="flex flex-col md:flex-row md:gap-1 items-center">
          <span>&copy; {new Date().getFullYear()} SnapPwd.</span>
          <span>
            Open-sourced on{" "}
            <Link
              href="https://github.com/SnapPwd/snappwd"
              className="underline"
            >
              GitHub
            </Link>
            .
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link href="/faq" className="hover:text-gray-300 transition-colors">
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
