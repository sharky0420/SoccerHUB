import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-narrow flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          Turftime Venues
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/#hallen" className="hover:text-slate-900">
            Hallen
          </Link>
          <Link href="/#sofunktionierts" className="hover:text-slate-900">
            So funktioniert&apos;s
          </Link>
          <Link href="/#kontakt" className="hover:text-slate-900">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
