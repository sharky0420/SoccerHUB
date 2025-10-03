import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeCheckIcon, MapPinIcon, SparkleIcon, TargetIcon } from "@/components/icons";
import { GoogleMapCanvas } from "@/components/google-map-canvas";
import type { Venue } from "@/types/venue";

interface VenueMapProps {
  venues: Venue[];
  activeCity?: string;
  onCitySelect?: (city: string) => void;
}
export function VenueMap({ venues, activeCity, onCitySelect }: VenueMapProps) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const liveCount = useMemo(
    () => venues.filter((venue) => typeof venue.pricePerHour === "number").length,
    [venues]
  );
  const onRequestCount = useMemo(() => venues.length - liveCount, [venues, liveCount]);

  useEffect(() => {
    if (!activeCity) {
      return;
    }

    const matchingVenue = venues.find((venue) =>
      venue.city && venue.city.toLowerCase() === activeCity.toLowerCase()
    );

    if (matchingVenue) {
      setSelectedVenue(matchingVenue);
    }
  }, [activeCity, venues]);

  const handleMarkerSelect = useCallback(
    (venue: Venue) => {
      setSelectedVenue(venue);
      if (venue.city) {
        onCitySelect?.(venue.city);
      }
    },
    [onCitySelect]
  );

  const statusChip = (label: string, Icon: typeof BadgeCheckIcon, tone: "live" | "request") => (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] ${
        tone === "live"
          ? "bg-[color:var(--accent-primary-strong)] text-[color:var(--accent-primary-contrast)] shadow-[0_16px_32px_-18px_rgba(0,108,56,0.55)]"
          : "bg-[color:var(--surface-card-muted)]/80 text-[color:var(--text-secondary)]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );

  return (
    <div className="glass-panel theme-transition flex h-full flex-col gap-6 rounded-3xl border border-[color:var(--border-subtle)]/65 bg-[var(--gradient-venue-map)] p-6 text-[color:var(--text-primary)] shadow-[0_45px_160px_-100px_rgba(6,26,18,0.7)] backdrop-blur-2xl">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-primary-strong)]">
          <TargetIcon className="h-4 w-4" />
          Standort-Explorer
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold leading-tight text-[color:var(--text-primary)] break-words hyphens-auto">
              Map View – verfügbare Arenen
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-[color:var(--text-secondary)]/85 break-words hyphens-auto">
              Interaktive Pins zeigen dir Preise, Live-Verfügbarkeiten und die schnellsten Buchungswege. Klicke auf einen Marker, um Details zu öffnen und die Ergebnisliste zu fokussieren.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[color:var(--text-secondary)]/80">
            {statusChip(`${liveCount}× Direkt buchbar`, BadgeCheckIcon, "live")}
            {statusChip(`${onRequestCount}× Auf Anfrage`, SparkleIcon, "request")}
          </div>
        </div>
      </header>

      <GoogleMapCanvas
        venues={venues}
        activeCity={activeCity}
        selectedVenueId={selectedVenue?.id ?? null}
        onMarkerSelect={handleMarkerSelect}
      />

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr),minmax(0,240px)] md:items-center">
        <div className="rounded-2xl border border-[color:var(--surface-glass-border)]/70 bg-[color:var(--surface-card)]/80 p-5 shadow-[0_28px_96px_-70px_rgba(6,28,18,0.7)]">
          {selectedVenue ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-primary-strong)]">
                    {selectedVenue.city ?? "Unbekannter Standort"}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold leading-tight break-words hyphens-auto">{selectedVenue.name}</h4>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)] break-words hyphens-auto">
                    {selectedVenue.address ?? "Adresse folgt"}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                    typeof selectedVenue.pricePerHour === "number"
                      ? "bg-[color:var(--accent-primary-strong)]/15 text-[color:var(--accent-primary-strong)]"
                      : "bg-[color:var(--surface-card-muted)] text-[color:var(--text-secondary)]"
                  }`}
                >
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {typeof selectedVenue.pricePerHour === "number" ? "Live Slots" : "Anfrage"}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card-muted)]/70 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-tertiary)]">
                    Preisindikator
                  </p>
                  <p className="mt-1 text-base font-semibold text-[color:var(--text-primary)]">
                    {typeof selectedVenue.pricePerHour === "number"
                      ? `${selectedVenue.pricePerHour} € / Stunde`
                      : "Auf Anfrage"}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--border-subtle)]/60 bg-[color:var(--surface-card-muted)]/70 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-tertiary)]">
                    Sportarten
                  </p>
                  <p className="mt-1 font-medium text-[color:var(--text-primary)]">{selectedVenue.sports.join(", ")}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-[color:var(--text-secondary)]">
              <p className="text-base font-semibold text-[color:var(--text-primary)]">Wähle einen Pin auf der Karte</p>
              <p>
                Klicke auf einen Standort, um Details, Preisindikatoren und den direkten Buchungslink einzublenden.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end">
          <a
            href={selectedVenue?.externalUrl ?? "mailto:team@sportshub.app"}
            target="_blank"
            rel="noopener"
            className={`theme-transition inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] shadow-[0_18px_48px_-28px_rgba(0,108,56,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)] ${
              typeof selectedVenue?.pricePerHour === "number"
                ? "bg-[linear-gradient(120deg,rgba(0,108,56,1),rgba(31,184,100,0.92))] text-[color:var(--accent-primary-contrast)]"
                : "bg-[color:var(--surface-card-muted)] text-[color:var(--text-primary)]"
            }`}
          >
            {typeof selectedVenue?.pricePerHour === "number" ? "Jetzt buchen" : "Anfrage senden"}
          </a>
          <button
            type="button"
            onClick={() => {
              setSelectedVenue(null);
              onCitySelect?.("");
            }}
            className="theme-transition inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/75 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--text-secondary)] hover:border-[color:var(--accent-primary)]/35 hover:text-[color:var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            Reset Fokus
          </button>
        </div>
      </div>
    </div>
  );
}

