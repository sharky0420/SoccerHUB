import { Suspense } from "react";
import { FilterableVenueList } from "@/components/filterable-venue-list";
import { allVenues, getUniqueAmenities, getUniqueSports } from "@/lib/venues";

export default function HomePage() {
  // TODO: Ersetzen durch einen API-Aufruf, sobald die Betreiber:innen Daten direkt liefern.
  const sports = getUniqueSports();
  const amenities = getUniqueAmenities();

  return (
    <div className="space-y-16">
      <section className="container-narrow">
        <div className="grid gap-10 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              MVP Modell 0
            </span>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Die besten Soccer- und Padelhallen in Mannheim &amp; Heidelberg
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Vergleiche Preise, Öffnungszeiten und Ausstattung von Hallen in deiner Nähe. Mit einem Klick gelangst du zur externen Buchung des Anbieters.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600" id="sofunktionierts">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
                <span className="text-primary">1</span>
                Hallen entdecken
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
                <span className="text-primary">2</span>
                Filter anpassen
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
                <span className="text-primary">3</span>
                Direkt extern buchen
              </div>
            </div>
          </div>
          <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-slate-900 p-10 text-white shadow-soft lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" aria-hidden />
            <div className="relative space-y-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Turftime Insights</p>
              <h2 className="text-3xl font-semibold">3 Klicks bis zur Halle</h2>
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
      </section>

      <Suspense fallback={<p className="container-narrow">Lade Hallen...</p>}>
        <FilterableVenueList venues={allVenues} sports={sports} amenities={amenities} />
      </Suspense>
    </div>
  );
}
