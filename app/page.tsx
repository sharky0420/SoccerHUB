import { Suspense } from "react";
import { FilterableVenueList } from "@/components/filterable-venue-list";
import { allVenues, getUniqueAmenities, getUniqueSports } from "@/lib/venues";

export default function HomePage() {
  // TODO: Ersetzen durch einen API-Aufruf, sobald die Betreiber:innen Daten direkt liefern.
  const sports = getUniqueSports();
  const amenities = getUniqueAmenities();

  return (
    <div className="space-y-20 lg:space-y-24">
      <section className="container-narrow">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-slate-900/80 px-8 py-16 shadow-[0_45px_120px_-40px_rgba(8,47,73,0.9)] backdrop-blur">
          <div
            className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-primary/40 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-secondary/40 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr),380px]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                MVP · Mannheim Rhein-Neckar
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
                Die moderne Plattform für Soccer- &amp; Padelhallen in Mannheim &amp; Heidelberg
              </h1>
              <p className="max-w-2xl text-lg text-slate-200">
                Vergleiche Hallen in Sekundenschnelle, filtere nach Preisen und Ausstattung und buche direkt beim Original-Anbieter. Alles an einem Ort – superklar, supermodern.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row" id="sofunktionierts">
                <a
                  href="#hallen"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-primary/80 to-secondary px-8 py-3 text-sm font-semibold text-white shadow-[0_25px_60px_-30px_rgba(14,124,123,0.9)] transition hover:brightness-110"
                >
                  Hallen entdecken
                </a>
                <a
                  href="mailto:info@turftime.app"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:border-primary/40 hover:bg-white/10"
                >
                  MVP vorstellen lassen
                </a>
              </div>
              <div className="grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
                {["Entdecken", "Filtern", "Extern buchen"].map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <dl className="grid gap-6 pt-2 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/50">Hallen im Fokus</dt>
                  <dd className="text-2xl font-semibold text-white">25+</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/50">Sportarten</dt>
                  <dd className="text-2xl font-semibold text-white">3 Filter ready</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/50">Beta Nutzer:innen</dt>
                  <dd className="text-2xl font-semibold text-white">180+</dd>
                </div>
              </dl>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/20 via-white/10 to-primary/30 p-10 text-white shadow-[0_30px_120px_-60px_rgba(14,124,123,0.8)] backdrop-blur lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" aria-hidden />
              <div className="relative space-y-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Turftime Insights</p>
                <h2 className="text-3xl font-semibold leading-tight">3 Klicks bis zur Halle</h2>
                <p className="text-base text-white/80">
                  Wir bauen die smarte Plattform für Sporthallen. Heute noch MVP, morgen direkte Anbindung an Betreiber:innen.
                </p>
                <ul className="space-y-3 text-sm text-white/80">
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
