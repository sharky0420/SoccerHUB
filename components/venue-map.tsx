import { Fragment, useMemo } from "react";
import { BadgeCheckIcon, MapPinIcon, SparkleIcon, TargetIcon } from "@/components/icons";
import { CITY_COORDINATES } from "@/lib/city-coordinates";
import type { Venue } from "@/types/venue";

interface VenueMapProps {
  venues: Venue[];
  activeCity?: string;
  onCitySelect?: (city: string) => void;
}

interface CityEntry {
  city: string;
  count: number;
  priceSample: number | null;
  top: number;
  left: number;
}

export function VenueMap({ venues, activeCity, onCitySelect }: VenueMapProps) {
  const cityEntries = useMemo(() => aggregateCities(venues), [venues]);

  return (
    <div className="glass-panel theme-transition flex h-full flex-col gap-5 rounded-3xl border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 p-6 text-[color:var(--text-primary)] shadow-[0_45px_160px_-100px_rgba(6,26,18,0.85)]">
      <header className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-primary)]">
          <TargetIcon className="h-4 w-4" />
          Standort-Explorer
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold leading-tight">Map View – verfügbare Arenen</h3>
          <p className="text-sm text-[color:var(--text-secondary)]/85">
            Zoome visuell in deine Region: Marker zeigen die Anzahl gelisteter Venues und die Preisspanne. Klicke auf einen Pin, um die Liste zu filtern.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-secondary)]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--accent-primary)]/15 px-3 py-1 text-[color:var(--accent-primary)]">
            <BadgeCheckIcon className="h-3.5 w-3.5" /> Live Slots
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--accent-secondary)]/15 px-3 py-1 text-[color:var(--accent-secondary)]">
            <SparkleIcon className="h-3 w-3" /> Auf Anfrage
          </span>
        </div>
      </header>

      <div className="relative flex-1 overflow-hidden rounded-3xl border border-[color:var(--surface-glass-border)]/90 bg-[linear-gradient(160deg,rgba(7,34,23,0.85),rgba(4,20,12,0.92))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(62,202,130,0.25),transparent_55%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[...Array(6)].map((_, index) => (
            <Fragment key={`v-${index}`}>
              <div className="absolute inset-x-0" style={{ top: `${(index + 1) * 16}%` }}>
                <div className="h-px w-full bg-white/5" />
              </div>
              <div className="absolute inset-y-0" style={{ left: `${(index + 1) * 16}%` }}>
                <div className="h-full w-px bg-white/5" />
              </div>
            </Fragment>
          ))}
        </div>

        {cityEntries.map((entry) => {
          const isActive = activeCity && entry.city.toLowerCase() === activeCity.toLowerCase();
          const hasPrice = typeof entry.priceSample === "number";
          return (
            <button
              key={entry.city}
              type="button"
              style={{ top: `${entry.top}%`, left: `${entry.left}%` }}
              className={`theme-transition absolute -translate-x-1/2 -translate-y-full rounded-2xl border px-4 py-3 text-left shadow-[0_22px_60px_-40px_rgba(5,64,38,0.9)] backdrop-blur ${
                isActive
                  ? "border-[color:var(--accent-primary)]/80 bg-[color:var(--accent-primary)]/15"
                  : "border-white/15 bg-white/10 hover:border-[color:var(--accent-primary)]/50 hover:bg-[color:var(--accent-primary)]/12"
              }`}
              onClick={() => onCitySelect?.(entry.city)}
            >
              <div className="flex items-center gap-2 text-[color:var(--background-primary)]">
                <span className={`inline-flex items-center justify-center rounded-full p-1 ${hasPrice ? "bg-[color:var(--accent-primary)]" : "bg-[color:var(--accent-secondary)]"}`}>
                  <MapPinIcon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-90">{entry.city}</p>
                  <p className="text-[11px] text-white/70">{entry.count} Venues</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                <span>{hasPrice ? "Ø Preis" : "Auf Anfrage"}</span>
                <span className={hasPrice ? "text-[color:var(--accent-primary)]" : "text-[color:var(--accent-secondary)]"}>
                  {hasPrice ? `${Math.round(entry.priceSample!)} €` : "Kontakt"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function aggregateCities(venues: Venue[]): CityEntry[] {
  const grouped = venues.reduce<Record<string, { count: number; priceSum: number; priceCount: number }>>(
    (accumulator, venue) => {
      if (!venue.city) return accumulator;
      const city = venue.city;
      if (!accumulator[city]) {
        accumulator[city] = { count: 0, priceSum: 0, priceCount: 0 };
      }
      const entry = accumulator[city]!;
      entry.count += 1;
      if (typeof venue.pricePerHour === "number") {
        entry.priceSum += venue.pricePerHour;
        entry.priceCount += 1;
      }
      return accumulator;
    },
    {}
  );

  const latitudes = Object.values(CITY_COORDINATES).map((item) => item.lat);
  const longitudes = Object.values(CITY_COORDINATES).map((item) => item.lng);
  const latMax = Math.max(...latitudes);
  const latMin = Math.min(...latitudes);
  const lngMax = Math.max(...longitudes);
  const lngMin = Math.min(...longitudes);
  const latRange = latMax - latMin || 1;
  const lngRange = lngMax - lngMin || 1;

  return Object.entries(grouped).map(([city, data]) => {
    const coordinate = CITY_COORDINATES[city];
    const avgPrice = data.priceCount > 0 ? data.priceSum / data.priceCount : null;
    const top = coordinate
      ? ((latMax - coordinate.lat) / latRange) * 75 + 12
      : 40;
    const left = coordinate ? ((coordinate.lng - lngMin) / lngRange) * 70 + 15 : 50;

    return {
      city,
      count: data.count,
      priceSample: avgPrice,
      top,
      left,
    } satisfies CityEntry;
  });
}

