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
        <div className="relative overflow-hidden rounded-[3rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--background-elevated)]/95 px-8 py-16 shadow-[0_35px_120px_-60px_rgba(6,48,26,0.7)] backdrop-blur-xl sm:px-14 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(8,140,74,0.28),transparent_60%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(3,53,27,0.55),transparent_65%)]" aria-hidden />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[240px] w-[480px] -translate-x-1/2 rounded-full bg-[color:var(--accent-primary)]/20 blur-3xl" aria-hidden />
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr),380px]">
            <div className="space-y-12">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/80 px-5 py-2 text-[color:var(--text-secondary)]">
                  🚀 Beta live in Rhein-Neckar
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)]/15 px-4 py-2 text-[color:var(--accent-primary)]">
                  UX-first Booking
                </span>
              </div>
              <div className="space-y-7">
                <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-5xl">
                  SoccerHUB – Dein digitales Clubhaus für Indoor-Soccer &amp; Padel
                </h1>
                <p className="max-w-2xl text-lg text-[color:var(--text-secondary)]">
                  Buche Slots schneller als je zuvor: transparente Preise, Echtzeit-Verfügbarkeit und ein Interface, das sich wie ein Taktikbrett anfühlt. Für Teams, Betreiber:innen und Communities, die keine Zeit verlieren wollen.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
                <a
                  href="#hallen"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
                >
                  <span className="text-lg">⚽</span>
                  Arenen entdecken
                </a>
                <a
                  href="mailto:team@soccerhub.app"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/80 px-8 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]/70"
                >
                  Beta-Deck sichern
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[{ label: "360° Arena Profile", description: "inkl. Fotos, Slots &amp; Preisen" }, { label: "Live Slot Radar", description: "aktualisiert im 5-Minuten-Takt" }, { label: "Direkte Buchung", description: "ohne Anruf, ohne Wartezeit" }].map((feature) => (
                  <div
                    key={feature.label}
                    className="theme-transition rounded-2xl border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/85 p-4 text-left text-sm text-[color:var(--text-secondary)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-primary)]">
                      {feature.label}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--text-primary)]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2.75rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/90 p-10 text-[color:var(--text-primary)] shadow-[0_55px_160px_-80px_rgba(0,0,0,0.85)] backdrop-blur lg:block">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,120,64,0.35),transparent_70%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-x-10 top-16 h-[1px] bg-[color:var(--field-line)]/30" aria-hidden />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
                  <span>Match Center</span>
                  <span>Realtime Sync</span>
                </div>
                <h2 className="text-3xl font-semibold leading-tight">Taktisches Dashboard</h2>
                <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/80 p-6 shadow-inner">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">
                    <span>Nächstes Highlight</span>
                    <span>Freitag · 19:30</span>
                  </div>
                  <div className="mt-5 space-y-4 rounded-2xl bg-[color:var(--pitch-dark)]/85 px-5 py-4 text-[color:var(--background-primary)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-white/60">Arena</p>
                        <p className="text-2xl font-semibold text-white">Green Dome Mannheim</p>
                      </div>
                      <span className="text-4xl font-black text-[color:var(--accent-secondary)]">19:30</span>
                    </div>
                    <div className="grid gap-3 text-xs uppercase tracking-[0.3em] text-white/70 sm:grid-cols-3">
                      {["Padel Courts · 4", "Soccer XL · Slots frei", "Teams · 78"].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-[11px] font-semibold"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-[color:var(--text-secondary)]">
                    <li className="flex items-center justify-between rounded-xl bg-[color:var(--surface-card)]/85 px-4 py-3">
                      <span>Integrationen</span>
                      <span className="font-semibold text-[color:var(--accent-primary)]">12 Systeme</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-[color:var(--surface-card)]/85 px-4 py-3">
                      <span>Verfügbarkeiten</span>
                      <span className="font-semibold text-[color:var(--accent-primary)]">Live Refresh</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-[color:var(--surface-card)]/85 px-4 py-3">
                      <span>Team Ranking</span>
                      <span className="font-semibold text-[color:var(--accent-primary)]">Beta Zugriff</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Einbindung in Vereinssoftware</p>
                <p className="text-sm text-[color:var(--text-secondary)]">
                  Synchronisiert mit Betreiber-Systemen, bietet Smart Alerts und exportiert deine Buchungen direkt in ClubPlanner &amp; Co.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow" id="matchcenter">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/85 px-8 py-12 shadow-[0_40px_120px_-80px_rgba(10,60,28,0.7)] backdrop-blur sm:px-14">
          <div className="pointer-events-none absolute inset-x-0 -top-1/3 h-full bg-[radial-gradient(circle_at_top,_rgba(8,140,74,0.22),transparent_70%)]" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr),320px]">
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr),minmax(0,320px)] sm:items-center">
                <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Match Center Insights</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Wir kombinieren Field-Optik mit datengetriebenem Booking. Filter, Preislevel, Öffnungszeiten und direkte Buchungslinks – sauber strukturiert für schnelle Entscheidungen.
                </p>
              </div>
              <dl className="grid gap-6 md:grid-cols-3">
                {[{ title: "Teams on Board", value: "180+", detail: "Beta-Teams testen Live-Buchungen &amp; Slot-Radar." }, { title: "Operator Sync", value: "12 Integrationen", detail: "Von lokalen Betreiber:innen bis Pro Clubs." }, { title: "Instant Visibility", value: "< 45 Sek.", detail: "Von Anfrage bis Buchung ohne Medienbrüche." }].map((stat) => (
                  <div key={stat.title} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--background-primary)]/80 p-6 shadow-inner">
                    <dt className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">{stat.title}</dt>
                    <dd className="mt-3 text-3xl font-semibold text-[color:var(--accent-primary)]">{stat.value}</dd>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: stat.detail }} />
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-6 rounded-3xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--background-primary)]/70 p-6 shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">So klappt die Buchung</p>
              <ol className="space-y-5 text-sm text-[color:var(--text-secondary)]">
                {["Wähle Sportart, Preisfenster &amp; Ausstattung.", "Prüfe freie Slots im Echtzeit-Radar und sichere dir deinen Termin.", "Informiere dein Team via Deep Link und nutze optionale Add-ons."]
                  .map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/15 text-xs font-semibold text-[color:var(--accent-primary)]">
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
              <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 px-4 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">
                <span className="font-semibold text-[color:var(--accent-primary)]">Neu:</span> Sammelbuchungen &amp; Multicourt-Planung im Beta-Test.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<p className="container-narrow">Lade Hallen...</p>}>
        <FilterableVenueList venues={allVenues} sports={sports} amenities={amenities} />
      </Suspense>
    </div>
  );
}
