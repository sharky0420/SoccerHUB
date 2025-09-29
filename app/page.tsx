import { Suspense } from "react";
import { FilterableVenueList } from "@/components/filterable-venue-list";
import { allVenues, getUniqueAmenities, getUniqueSports } from "@/lib/venues";

export default function HomePage() {
  // TODO: Ersetzen durch einen API-Aufruf, sobald die Betreiber:innen Daten direkt liefern.
  const sports = getUniqueSports();
  const amenities = getUniqueAmenities();

  return (
    <div className="space-y-24 lg:space-y-28">
      <section className="container-narrow">
        <div className="relative overflow-hidden rounded-[3rem] border border-[color:var(--border-subtle)] bg-[color:var(--background-elevated)]/90 px-8 py-16 shadow-[0_45px_140px_-60px_rgba(6,40,18,0.65)] backdrop-blur-xl sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(4,110,52,0.32),_transparent_60%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_140deg_at_30%_40%,rgba(8,175,82,0.18),transparent_45%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_65%,rgba(6,26,14,0.55)_120%)]" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-[color:var(--field-line)]/30" aria-hidden />
          <div className="pointer-events-none absolute bottom-20 left-0 h-[1px] w-full bg-[color:var(--field-line)]/20" aria-hidden />
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr),360px]">
            <div className="space-y-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">
                  Neu · SoccerHUB Beta
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--accent-primary)]">
                  Smarte Spielpläne
                </span>
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-5xl sm:leading-tight">
                  SoccerHUB – Dein digitales Clubhaus für Indoor-Soccer &amp; Padel
                </h1>
                <p className="max-w-2xl text-lg text-[color:var(--text-secondary)]">
                  Erlebe eine Plattform, die aussieht wie das Spiel selbst: präzise, dynamisch und voll auf Performance getrimmt. Vergleiche Arenen, erkenne freie Slots und buche direkt beim Betreiber.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#hallen"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
                >
                  <span className="text-lg">⚽</span>
                  Arenen entdecken
                </a>
                <a
                  href="mailto:team@soccerhub.app"
                  className="theme-transition inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-8 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/40"
                >
                  Beta-Deck sichern
                </a>
              </div>
              <div className="grid gap-4 text-sm text-[color:var(--text-secondary)] sm:grid-cols-3">
                {["360° Arena Profile", "Realtime Slot Radar", "Direktkontakt Betreiber"].map((label) => (
                  <div
                    key={label}
                    className="theme-transition flex items-center gap-3 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/75 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--background-primary)]/60 text-sm font-semibold text-[color:var(--accent-primary)]">
                      ●
                    </span>
                    <span className="text-sm font-medium text-[color:var(--text-primary)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2.5rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/80 p-10 text-[color:var(--text-primary)] shadow-[0_55px_180px_-90px_rgba(0,0,0,0.8)] backdrop-blur lg:block">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,128,64,0.25),_transparent_65%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-x-10 top-20 h-[1px] bg-[color:var(--field-line)]/35" aria-hidden />
              <div className="relative space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Match Center</p>
                <h2 className="text-3xl font-semibold leading-tight">Taktisches Dashboard</h2>
                <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/70 p-6 shadow-inner">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[color:var(--text-secondary)]">
                    <span>Next Match</span>
                    <span>Freitag · 19:30</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-[color:var(--pitch-dark)]/80 px-5 py-4 text-[color:var(--background-primary)]">
                    <div className="space-y-1">
                      <p className="text-sm uppercase tracking-[0.32em] text-white/60">Arena</p>
                      <p className="text-2xl font-semibold text-white">Green Dome Mannheim</p>
                    </div>
                    <span className="text-4xl font-black text-[color:var(--accent-secondary)]">19:30</span>
                  </div>
                  <ul className="mt-5 grid gap-3 text-sm text-[color:var(--text-secondary)]">
                    <li className="flex items-center justify-between rounded-xl bg-[color:var(--surface-card)]/80 px-4 py-3">
                      <span>Padel Courts</span>
                      <span className="font-semibold text-[color:var(--accent-primary)]">4 verfügbar</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-[color:var(--surface-card)]/80 px-4 py-3">
                      <span>Soccer XL</span>
                      <span className="font-semibold text-[color:var(--accent-primary)]">Slots 21-23h</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-[color:var(--surface-card)]/80 px-4 py-3">
                      <span>Members</span>
                      <span className="font-semibold text-[color:var(--accent-primary)]">78 Teams</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Realtime Booking Radar</p>
                <p className="text-sm text-[color:var(--text-secondary)]">
                  Synchronisiert mit Betreiber-Systemen und bereit für Deep Links in deine Vereinssoftware.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow" id="matchcenter">
        <div className="grid gap-8 rounded-[2.5rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-8 py-10 shadow-[0_45px_120px_-80px_rgba(10,60,28,0.7)] backdrop-blur sm:px-12 sm:py-14">
          <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Match Center Insights</h2>
            <p className="text-base text-[color:var(--text-secondary)]">
              Wir verbinden Field-Optik mit datengetriebenen Insights. Filter, Preislevel, Öffnungszeiten und direkte Buchungslinks – alles im klaren Soccer-Branding.
            </p>
          </div>
          <dl className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/70 p-6 shadow-inner">
              <dt className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Teams on Board</dt>
              <dd className="mt-3 text-3xl font-semibold text-[color:var(--accent-primary)]">180+</dd>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Beta-Teams testen gerade Live-Buchungen und Slot-Radar.</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/70 p-6 shadow-inner">
              <dt className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Operator Sync</dt>
              <dd className="mt-3 text-3xl font-semibold text-[color:var(--accent-primary)]">12 Integrationen</dd>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Von Local Heroes bis Pro Clubs – wir binden Systeme direkt an.</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/70 p-6 shadow-inner">
              <dt className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Instant Visibility</dt>
              <dd className="mt-3 text-3xl font-semibold text-[color:var(--accent-primary)]">45s Search</dd>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Von Anfrage bis Buchung in unter einer Minute. Kein Tabellen-Chaos.</p>
            </div>
          </dl>
        </div>
      </section>

      <Suspense fallback={<p className="container-narrow">Lade Hallen...</p>}>
        <FilterableVenueList venues={allVenues} sports={sports} amenities={amenities} />
      </Suspense>
    </div>
  );
}
