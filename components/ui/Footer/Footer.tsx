import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Use Cases */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Use Cases</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/passwords" className="hover:text-foreground transition-colors">
                  Share Passwords
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-foreground transition-colors">
                  Team Credentials
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-foreground transition-colors">
                  Employee Onboarding
                </Link>
              </li>
              <li>
                <Link href="/env-files" className="hover:text-foreground transition-colors">
                  Environment Files
                </Link>
              </li>
              <li>
                <Link href="/api-keys" className="hover:text-foreground transition-colors">
                  API Keys
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/env-best-practices" className="hover:text-foreground transition-colors">
                  Env File Best Practices
                </Link>
              </li>
              <li>
                <Link href="/api-key-best-practices" className="hover:text-foreground transition-colors">
                  API Key Best Practices
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/SnapPwd/snappwd"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} SnapPwd. Open-sourced on{" "}
            <Link
              href="https://github.com/SnapPwd/snappwd"
              className="underline hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
