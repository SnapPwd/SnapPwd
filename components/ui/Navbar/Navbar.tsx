import s from "./Navbar.module.css";
import Logo from "@/components/icons/Logo";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between align-center py-4">
          <div className="flex items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo width={32} height={32} />
            </Link>
            <Link href="/">
              <span className="px-2">SnapPwd</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
