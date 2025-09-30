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
        <div className="relative overflow-hidden rounded-[3.25rem] border border-[color:var(--border-subtle)]/70 bg-[color:var(--background-elevated)]/85 px-8 py-16 shadow-[0_40px_140px_-70px_rgba(8,52,28,0.75)] backdrop-blur-[22px] sm:px-14 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(92,255,157,0.12),transparent_55%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(4,36,18,0.75),transparent_65%)]" aria-hidden />
          <div className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[color:var(--accent-primary)]/20 blur-[120px]" aria-hidden />
          <div className="pointer-events-none absolute -left-20 top-32 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(19,88,53,0.45),transparent_70%)] blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.32),transparent_70%)] blur-3xl" aria-hidden />
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr),380px]">
            <div className="space-y-12">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] px-5 py-2 text-[color:var(--text-secondary)] shadow-inner backdrop-blur">
                  🚀 Beta live in Rhein-Neckar
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)]/15 px-4 py-2 text-[color:var(--accent-primary)]">
                  Liquid Booking Experience
                </span>
              </div>
              <div className="space-y-7">
                <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-5xl">
                  SoccerHUB – Liquid Glass Playbook für Indoor-Soccer &amp; Padel
                </h1>
                <p className="max-w-2xl text-lg text-[color:var(--text-secondary)]">
                  Stell dir ein Taktikboard in Apple-Ästhetik vor: sanfte Reflexionen, Glassmorphism und Fokus auf dein Team. Wir veredeln jede Buchung mit Fußball-DNA – von Spielzügen bis Slot-Radar.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
                <a
                  href="#hallen"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[color:var(--background-primary)] shadow-[0_0_40px_-10px_rgba(0,184,97,0.55)] hover:translate-y-[-2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
                >
                  <span className="text-lg">⚽</span>
                  Arenen entdecken
                </a>
                <a
                  href="mailto:team@soccerhub.app"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] px-8 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/40 hover:bg-[color:var(--surface-card-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]/70"
                >
                  Beta-Deck sichern
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[{ label: "360° Arena Profile", description: "Fotos, Slots &amp; Preise in Ultra-Clear." }, { label: "Live Slot Radar", description: "aktualisiert im 5-Minuten-Takt" }, { label: "Direkte Buchung", description: "ohne Anruf, ohne Wartezeit" }].map((feature) => (
                  <div
                    key={feature.label}
                    className="theme-transition rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] p-4 text-left text-sm text-[color:var(--text-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-primary)]">
                      {feature.label}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--text-primary)]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2.75rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-10 text-[color:var(--text-primary)] shadow-[0_65px_180px_-90px_rgba(2,22,12,0.95)] backdrop-blur-2xl lg:block">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,120,64,0.4),transparent_70%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-x-10 top-16 h-[1px] bg-[color:var(--field-line)]/40" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 right-1/2 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.22),transparent_70%)] blur-2xl" aria-hidden />
              <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" aria-hidden />
              <div className="relative space-y-7">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
                  <span>Match Center</span>
                  <span>Realtime Sync</span>
                </div>
                <h2 className="text-3xl font-semibold leading-tight">Liquid Tactics Board</h2>
                <div className="relative overflow-hidden rounded-[2.25rem] border border-white/20 bg-[color:var(--pitch-dark)]/85 p-6 shadow-inner">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(92,255,157,0.2),transparent_75%)]" aria-hidden />
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-white/60">
                    <span>Nächstes Highlight</span>
                    <span>Freitag · 19:30</span>
                  </div>
                  <div className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/90 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-white/50">Arena</p>
                        <p className="text-2xl font-semibold text-white">Green Dome Mannheim</p>
                      </div>
                      <span className="text-4xl font-black text-[color:var(--accent-secondary)] drop-shadow-[0_0_15px_rgba(92,255,157,0.4)]">19:30</span>
                    </div>
                    <div className="grid gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70 sm:grid-cols-3">
                      {["Padel Courts · 4", "Soccer XL · Slots frei", "Teams · 78"].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center font-semibold shadow-[0_0_20px_-12px_rgba(255,255,255,0.8)]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-[color:var(--text-secondary)]">
                    {[
                      { label: "Integrationen", value: "12 Systeme" },
                      { label: "Verfügbarkeiten", value: "Live Refresh" },
                      { label: "Team Ranking", value: "Beta Zugriff" },
                    ].map((info) => (
                    <div
                      key={info.label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80"
                    >
                        <span>{info.label}</span>
                        <span className="font-semibold text-[color:var(--accent-secondary)]">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Einbindung in Vereinssoftware</p>
                <p className="text-sm text-[color:var(--text-secondary)]">
                  Synchronisiert mit Betreiber-Systemen, sendet Smart Alerts und exportiert Buchungen direkt in ClubPlanner &amp; Co.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow" id="matchcenter">
        <div className="relative overflow-hidden rounded-[2.9rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] px-8 py-12 shadow-[0_55px_160px_-90px_rgba(6,38,20,0.8)] backdrop-blur-[26px] sm:px-14">
          <div className="pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-[radial-gradient(circle_at_top,_rgba(92,255,157,0.28),transparent_75%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(5,38,22,0.72),transparent_68%)]" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr),320px]">
            <div className="space-y-10">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr),minmax(0,320px)] sm:items-center">
                <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Match Center Insights</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Liquid Lines, klare Typo und Spielfeld-Flair: Unser Dashboard zeigt Filter, Preisfenster und Buchungswege wie ein aufpoliertes Coaching-Tablet – inklusive Echtzeit-Intelligenz.
                </p>
              </div>
              <dl className="grid gap-6 md:grid-cols-3">
                {[{ title: "Teams on Board", value: "180+", detail: "Beta-Teams testen Live-Buchungen &amp; Slot-Radar." }, { title: "Operator Sync", value: "12 Integrationen", detail: "Von lokalen Betreiber:innen bis Pro Clubs." }, { title: "Instant Visibility", value: "< 45 Sek.", detail: "Von Anfrage bis Buchung ohne Medienbrüche." }].map((stat) => (
                  <div key={stat.title} className="relative overflow-hidden rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur">
                    <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.18),transparent_70%)] blur-xl" aria-hidden />
                    <dt className="relative text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">{stat.title}</dt>
                    <dd className="relative mt-3 text-3xl font-semibold text-[color:var(--accent-primary)]">{stat.value}</dd>
                    <p className="relative mt-2 text-sm text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: stat.detail }} />
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-6 rounded-3xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">So klappt die Buchung</p>
              <ol className="space-y-5 text-sm text-[color:var(--text-secondary)]">
                {["Wähle Sportart, Preisfenster &amp; Ausstattung.", "Prüfe freie Slots im Echtzeit-Radar und sichere dir deinen Termin.", "Informiere dein Team via Deep Link und nutze optionale Add-ons."]
                  .map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/20 text-xs font-semibold text-[color:var(--accent-primary)]">
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
              <div className="rounded-2xl border border-dashed border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card-strong)] px-4 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--text-secondary)] backdrop-blur">
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
