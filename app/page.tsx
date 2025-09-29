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
        <div className="relative overflow-hidden rounded-[3rem] border border-[color:var(--border-subtle)] bg-[color:var(--background-elevated)]/80 px-8 py-16 shadow-glass backdrop-blur-xl sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -left-28 top-1/3 h-64 w-64 rounded-full bg-[color:var(--accent-primary)]/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[color:var(--accent-secondary)]/40 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr),360px]">
            <div className="space-y-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">
                MVP · Mannheim Rhein-Neckar
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-5xl sm:leading-tight">
                Die moderne Plattform für Soccer- &amp; Padelhallen in Mannheim &amp; Heidelberg
              </h1>
              <p className="max-w-2xl text-lg text-[color:var(--text-secondary)]">
                Vergleiche Hallen in Sekundenschnelle, filtere nach Preisen und Ausstattung und buche direkt beim Original-Anbieter.
                Alles an einem Ort – superklar, supermodern.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row" id="sofunktionierts">
                <a
                  href="#hallen"
                  className="theme-transition inline-flex items-center justify-center rounded-full bg-[color:var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
                >
                  Hallen entdecken
                </a>
                <a
                  href="mailto:info@turftime.app"
                  className="theme-transition inline-flex items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/60 px-8 py-3 text-sm font-semibold text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/40"
                >
                  MVP vorstellen lassen
                </a>
              </div>
              <div className="grid gap-4 text-sm text-[color:var(--text-secondary)] sm:grid-cols-3">
                {["Entdecken", "Filtern", "Extern buchen"].map((label, index) => (
                  <div
                    key={label}
                    className="theme-transition flex items-center gap-3 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-primary)]/10 text-sm font-semibold text-[color:var(--accent-primary)]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-[color:var(--text-primary)]">{label}</span>
                  </div>
                ))}
              </div>
              <dl className="grid gap-6 pt-2 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">Hallen im Fokus</dt>
                  <dd className="text-2xl font-semibold text-[color:var(--text-primary)]">25+</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">Sportarten</dt>
                  <dd className="text-2xl font-semibold text-[color:var(--text-primary)]">3 Filter ready</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.32em] text-[color:var(--text-secondary)]">Beta Nutzer:innen</dt>
                  <dd className="text-2xl font-semibold text-[color:var(--text-primary)]">180+</dd>
                </div>
              </dl>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2.5rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 p-10 text-[color:var(--text-primary)] shadow-glass backdrop-blur lg:block">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,127,58,0.12),_transparent_65%)]" aria-hidden />
              <div className="relative space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">Turftime Insights</p>
                <h2 className="text-3xl font-semibold leading-tight">3 Klicks bis zur Halle</h2>
                <p className="text-base text-[color:var(--text-secondary)]">
                  Wir bauen die smarte Plattform für Sporthallen. Heute noch MVP, morgen direkte Anbindung an Betreiber:innen.
                </p>
                <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
                  <li>• Lokale Datenbasis mit zuverlässigen Öffnungszeiten</li>
                  <li>• Filtersystem für Sportart, Preis und Ausstattung</li>
                  <li>• Weiterleitung zur Buchung beim Original-Anbieter</li>
                </ul>
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
