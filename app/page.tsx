"use client";

import { Suspense } from "react";
import { FilterableVenueList } from "@/components/filterable-venue-list";
import { allVenues, getUniqueAmenities, getUniqueSports } from "@/lib/venues";
import { GoogleMapCanvas } from "@/components/google-map-canvas";

export default function HomePage() {
  const sports = getUniqueSports();
  const amenities = getUniqueAmenities();

  return (
    <div className="space-y-20 lg:space-y-24">
      {/* HERO: left copy, right live map */}
      <section className="container-narrow">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[color:var(--border-subtle)]/70 bg-[color:var(--background-elevated)]/85 px-6 py-12 shadow-[0_40px_140px_-70px_rgba(8,52,28,0.75)] backdrop-blur-[18px] sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(92,255,157,0.10),transparent_60%)]" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr),460px] lg:gap-14">
            {/* Left: value + CTA */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/90 px-4 py-2 text-[color:var(--text-secondary)]/95 shadow-[0_12px_32px_-20px_rgba(6,36,22,0.45)] backdrop-blur">
                  ✅ Verifizierte Betreiber:innen
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary-strong)] px-4 py-2 text-[color:var(--accent-primary-contrast)] shadow-[0_18px_38px_-18px_rgba(0,108,56,0.6)]">
                  120+ Hallen deutschlandweit
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight text-[color:var(--text-primary)] break-words hyphens-auto sm:text-5xl">
                  Sports Hub – Dein Live-Überblick über Indoor-Sportanlagen
                </h1>
                <p className="max-w-2xl text-lg text-[color:var(--text-secondary)]/90">
                  Finde in Sekunden die passende Halle: Indoor-Soccer, Padel, Functional – mit Live-Verfügbarkeit, Ausstattung und Buchungslink.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="#netzwerk"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(120deg,rgba(0,108,56,1),rgba(31,184,100,0.92))] px-7 py-3 text-sm font-semibold text-[color:var(--accent-primary-contrast)] shadow-[0_28px_72px_-28px_rgba(0,108,56,0.75)] hover:translate-y-[-2px] hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/80"
                >
                  <span className="text-lg">⚽</span>
                  Hallen entdecken
                </a>
                <a
                  href="mailto:team@sportshub.app"
                  className="theme-transition inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/92 px-7 py-3 text-sm font-semibold text-[color:var(--text-primary)] shadow-[0_18px_46px_-28px_rgba(6,36,22,0.45)] hover:border-[color:var(--accent-primary)]/45 hover:bg-[color:var(--surface-card-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary-strong)]/70"
                >
                  Demo anfragen
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Direkt buchbar", description: "Verbindliche Slots in Betreiber-Systemen." },
                  { label: "Multisport-Übersicht", description: "Fußball, Padel, Fitness &amp; mehr." },
                  { label: "Live aktualisiert", description: "Preise &amp; Auslastung in Echtzeit." },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="theme-transition rounded-2xl border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/92 p-4 text-left text-sm text-[color:var(--text-secondary)] shadow-[0_18px_48px_-32px_rgba(6,36,22,0.45)] backdrop-blur"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-primary-strong)]">
                      {feature.label}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]/95" dangerouslySetInnerHTML={{ __html: feature.description }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live map */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,120,64,0.22),transparent_70%)]" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)]/90 p-2 shadow-[0_65px_180px_-90px_rgba(2,22,12,0.95)] backdrop-blur-2xl">
                <div className="h-[380px] rounded-[1.6rem] overflow-hidden">
                  {/* Use your Google map as visual anchor in hero */}
                  <GoogleMapCanvas venues={allVenues} />
                </div>
                <div className="mt-3 px-2 text-center text-xs uppercase tracking-[0.28em] text-[color:var(--text-secondary)]/80">
                  Live-Map – Städte &amp; Verfügbarkeiten
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES / VALUE PROPS */}
      <section className="container-narrow" id="netzwerk">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)]/82 px-6 py-12 shadow-[0_55px_160px_-100px_rgba(4,32,18,0.85)] backdrop-blur-[16px] sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(92,255,157,0.16),transparent_70%)]" aria-hidden />
          <div className="relative space-y-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),360px] lg:items-start">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--accent-primary)]">Hallenkategorien</p>
                <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] break-words hyphens-auto">Strukturiert nach Sportart &amp; Ausstattung</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Kuratierte Profile mit Fokus auf Spielflächen, Equipment und Services. Ideal für Training, Turniere oder Corporate Events.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-6 shadow-[0_40px_140px_-90px_rgba(8,36,20,0.72)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">Sofort ersichtlich</p>
                <ul className="mt-4 space-y-3 text-sm text-[color:var(--text-secondary)]">
                  {["Live-Kapazität &amp; Peakzeiten", "Equipment &amp; Videoanalyse", "Parkplätze, Gastro &amp; Teamräume"].map((item) => (
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
                  description: "5er-/7er-Courts mit modernem Kunstrasen, LED &amp; Tracking.",
                  accent: "⚽",
                },
                {
                  title: "Padel &amp; Rackets",
                  description: "Premium-Glas-Courts, Outdoor-Dächer, Trainer:innen buchbar.",
                  accent: "🎾",
                },
                {
                  title: "Functional &amp; Hybrid",
                  description: "Performance-Hallen &amp; modulare Flächen für Events.",
                  accent: "🏋️",
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="theme-transition relative overflow-hidden rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] p-6 text-[color:var(--text-primary)] shadow-[0_25px_90px_-60px_rgba(6,30,18,0.7)]"
                >
                  <div className="pointer-events-none absolute -top-12 right-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(92,255,157,0.18),transparent_70%)] blur-2xl" aria-hidden />
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-secondary)]">
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

      {/* EXPLAINER / STATS */}
      <section className="container-narrow" id="matchcenter">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card)] px-6 py-10 shadow-[0_55px_160px_-90px_rgba(6,38,20,0.78)] backdrop-blur-[20px] sm:px-10">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr),minmax(0,320px)] sm:items-center">
                <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] break-words hyphens-auto">So funktioniert die Hallen-Suche</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Filtere nach Sportart, Fläche, Ausstattung – erhalte sofort passende Ergebnisse. Jedes Profil mit Preisfenster, Auslastung, Extras und Direktbuchung.
                </p>
              </div>
              <dl className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Gelistete Standorte", value: "120+", detail: "Indoor-Soccer, Padel, Fitness &amp; Multifunktion." },
                  { title: "Städte im Netzwerk", value: "35", detail: "Lokale Betreiber:innen &amp; Premiumpartner." },
                  { title: "Buchungszeit", value: "&lt; 45 Sek.", detail: "Von Suche zu Reservierung." },
                ].map((stat) => (
                  <div key={stat.title} className="relative overflow-hidden rounded-xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur">
                    <dt className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">{stat.title}</dt>
                    <dd className="mt-2 text-3xl font-semibold text-[color:var(--accent-primary)]" dangerouslySetInnerHTML={{ __html: stat.value }} />
                    <p className="mt-1 text-sm text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: stat.detail }} />
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-5 rounded-2xl border border-[color:var(--surface-glass-border)] bg-[color:var(--surface-card-muted)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">In drei Schritten</p>
              <ol className="space-y-4 text-sm text-[color:var(--text-secondary)]">
                {[
                  "Sportart wählen (Soccer, Padel, Fitness, Spezialflächen).",
                  "Verfügbarkeit prüfen &amp; direkt beim Betreiber buchen.",
                  "Team informieren, Extras hinzufügen – fertig.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/20 text-xs font-semibold text-[color:var(--accent-primary)]">
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
              <div className="rounded-xl border border-dashed border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card-strong)] px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-secondary)] backdrop-blur">
                <span className="font-semibold text-[color:var(--accent-primary)]">Beliebt:</span> Sammelbuchungen &amp; Multicourt-Planung.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIST */}
      <Suspense fallback={<p className="container-narrow">Lade Hallen...</p>}>
        <FilterableVenueList venues={allVenues} sports={sports} amenities={amenities} />
      </Suspense>
    </div>
  );
}
