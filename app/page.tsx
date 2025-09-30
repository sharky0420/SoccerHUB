import { Suspense } from "react";
import { FilterableVenueList } from "@/components/filterable-venue-list";
import { allVenues, getUniqueAmenities, getUniqueSports } from "@/lib/venues";

export default function HomePage() {
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
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/90 px-5 py-2 text-[color:var(--text-secondary)]/95 shadow-[0_12px_32px_-20px_rgba(6,36,22,0.45)] backdrop-blur">
                  ✅ Verifizierte Betreiber:innen
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary-strong)] px-4 py-2 text-[color:var(--accent-primary-contrast)] shadow-[0_18px_38px_-18px_rgba(0,108,56,0.6)]">
                  120+ Hallen deutschlandweit
                </span>
              </div>
              <div className="space-y-7">
                <h1 className="text-4xl font-bold leading-tight text-[color:var(--text-primary)] sm:text-5xl">
                  Sports Hub – Dein Live-Überblick über Indoor-Sportanlagen
                </h1>
                <p className="max-w-2xl text-lg text-[color:var(--text-secondary)]/90">
                  Finde in Sekunden die passende Halle für dein Team: von modernen Indoor-Soccer-Arenen über Padel-Courts bis hin zu funktionellen Trainingsflächen. Alle Plätze sind geprüft, mit Live-Verfügbarkeiten, Ausstattung und Buchungslinks.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
                <a
                  href="#netzwerk"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(120deg,rgba(0,108,56,1),rgba(31,184,100,0.92))] px-8 py-3 text-sm font-semibold text-[color:var(--accent-primary-contrast)] shadow-[0_28px_72px_-28px_rgba(0,108,56,0.75)] hover:translate-y-[-2px] hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/80"
                >
                  <span className="text-lg">⚽</span>
                  Hallen entdecken
                </a>
                <a
                  href="mailto:team@sportshub.app"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/92 px-8 py-3 text-sm font-semibold text-[color:var(--text-primary)] shadow-[0_18px_46px_-28px_rgba(6,36,22,0.45)] hover:border-[color:var(--accent-primary)]/45 hover:bg-[color:var(--surface-card-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/70"
                >
                  Demo anfragen
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Direkt buchbar", description: "Alle Betreiber:innen mit verbindlichen Slots." },
                  { label: "Multisport-Übersicht", description: "Fußball, Padel, Fitness &amp; mehr." },
                  { label: "Live aktualisiert", description: "Preisfenster &amp; Auslastung in Echtzeit." },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="theme-transition rounded-2xl border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/92 p-4 text-left text-sm text-[color:var(--text-secondary)] shadow-[0_18px_48px_-32px_rgba(6,36,22,0.45)] backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-primary-strong)]">
                      {feature.label}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]/95">{feature.description}</p>
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
                  <span>Venue Dashboard</span>
                  <span>Echtzeitdaten</span>
                </div>
                <h2 className="text-3xl font-semibold leading-tight">Alle Infos auf einem Board</h2>
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
                    <div className="grid gap-3 text-xs uppercase tracking-[0.3em] text-white/70 sm:grid-cols-3">
                      {["Padel Courts · 4", "Indoor Soccer XL · Slots frei", "Functional Gym · 2 Studios"].map((item) => (
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
                      { label: "Mitglieder", value: "Teams &amp; Studios" },
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

      <section className="container-narrow" id="netzwerk">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)]/80 px-8 py-14 shadow-[0_55px_160px_-100px_rgba(4,32,18,0.9)] backdrop-blur-[18px] sm:px-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(92,255,157,0.18),transparent_70%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(8,44,24,0.65),transparent_58%)]" aria-hidden />
          <div className="relative space-y-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),360px] lg:items-start">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--accent-primary)]">Hallenkategorien</p>
                <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Strukturiert nach Sportart &amp; Ausstattung</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Jede Halle auf Sports Hub erhält ein kuratiertes Profil mit Fokus auf Spielflächen, Equipment und Services. So findest du schnell den passenden Spot für Training, Turniere oder Corporate Events.
                </p>
              </div>
              <div className="rounded-[2.5rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-6 shadow-[0_40px_140px_-90px_rgba(8,36,20,0.75)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">Sofort ersichtlich</p>
                <ul className="mt-4 space-y-3 text-sm text-[color:var(--text-secondary)]">
                  {["Live-Kapazität &amp; Peakzeiten", "Equipment &amp; Extras wie Videoanalyse", "Parkplätze, Gastronomie &amp; Teamräume"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/20 text-xs font-semibold text-[color:var(--accent-primary)]">
                        •
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Indoor Soccer",
                  description: "5er- &amp; 7er-Courts mit modernen Kunstrasen-Systemen, LED-Beleuchtung und Tracking-Setups.",
                  accent: "⚽",
                },
                {
                  title: "Padel &amp; Rackets",
                  description: "Premium-Glas-Courts, Outdoor-Dächer und Buchung von Trainer:innen direkt aus dem Profil.",
                  accent: "🎾",
                },
                {
                  title: "Functional &amp; Hybrid",
                  description: "Performance-Hallen, Boutique-Studios und modulare Flächen für Athletik und Events.",
                  accent: "🏋️",
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="theme-transition relative overflow-hidden rounded-3xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-6 text-[color:var(--text-primary)] shadow-[0_25px_90px_-60px_rgba(6,30,18,0.7)]"
                >
                  <div className="pointer-events-none absolute -top-12 right-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.2),transparent_70%)] blur-2xl" aria-hidden />
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">
                    <span>{category.title}</span>
                    <span className="text-lg">{category.accent}</span>
                  </div>
                  <p className="mt-4 text-sm text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: category.description }} />
                </div>
              ))}
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
                <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">So funktioniert die Hallen-Suche</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Kombiniere Filter wie Sportart, Fläche und Ausstattung und erhalte sofort passende Ergebnisse. Alle Venue-Profile zeigen Preise, Auslastung, Zusatzservices und direkte Buchungswege – transparent und ohne Umwege.
                </p>
              </div>
              <dl className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Gelistete Standorte", value: "120+", detail: "Indoor-Soccer, Padel, Fitness &amp; Multifunktion." },
                  { title: "Städte im Netzwerk", value: "35", detail: "Lokale Betreiber:innen &amp; Premiumpartner." },
                  { title: "Buchungszeit", value: "< 45 Sek.", detail: "Von Suche zu verbindlicher Reservierung." },
                ].map((stat) => (
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
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">In drei Schritten zur Halle</p>
              <ol className="space-y-5 text-sm text-[color:var(--text-secondary)]">
                {[
                  "Sportart wählen – Indoor-Soccer, Padel, Fitness oder Spezialflächen.",
                  "Verfügbarkeit prüfen und direkt beim Betreiber:in buchen.",
                  "Team informieren, Extras hinzufügen und bereit zum Spiel sein.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/20 text-xs font-semibold text-[color:var(--accent-primary)]">
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
              <div className="rounded-2xl border border-dashed border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card-strong)] px-4 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--text-secondary)] backdrop-blur">
                <span className="font-semibold text-[color:var(--accent-primary)]">Beliebt:</span> Sammelbuchungen &amp; Multicourt-Planung für Turniere.
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
