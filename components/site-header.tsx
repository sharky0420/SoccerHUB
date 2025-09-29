import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="container-narrow flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          Turftime Venues
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <Link href="/#hallen" className="transition hover:text-white">
            Hallen
          </Link>
          <Link href="/#sofunktionierts" className="transition hover:text-white">
            So funktioniert&apos;s
          </Link>
          <Link href="/#kontakt" className="transition hover:text-white">
            Kontakt
          </Link>
          <a
            href="mailto:info@turftime.app"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-15px_rgba(15,118,110,0.7)] transition hover:border-primary/60 hover:bg-primary/80"
          >
            Demo anfragen
          </a>
        </nav>
      </div>
    </header>
  );
}
