"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CITY_COORDINATES } from "@/lib/city-coordinates";
import type { Venue } from "@/types/venue";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapCanvasProps {
  venues: Venue[];
  activeCity?: string;
  selectedVenueId?: string | null;
  onMarkerSelect?: (venue: Venue) => void;
}

interface VenuePoint {
  venue: Venue;
  position: { lat: number; lng: number };
}

declare global {
  interface Window {
    google?: any;
  }
}

const MAP_DEFAULT_CENTER = { lat: 51.163375, lng: 10.447683 }; // Germany midpoint

export function GoogleMapCanvas({
  venues,
  activeCity,
  selectedVenueId,
  onMarkerSelect,
}: GoogleMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any | null>(null);
  const markerSelectRef = useRef(onMarkerSelect);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  markerSelectRef.current = onMarkerSelect;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

  const venuePoints = useMemo(() => computeVenuePoints(venues), [venues]);


  const loader = useMemo(() => {
    if (!apiKey) return null;
    return new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"], // nur, falls du Places API nutzt
    });
  }, [apiKey]);

  const ensureScript = useCallback(async () => {
    if (typeof window === "undefined" || !loader) return null;
    if (window.google?.maps) {
      setIsScriptLoaded(true);
      return window.google;
    }
    try {
      const google = await loader.load();
      setIsScriptLoaded(true);
      return google;
    } catch {
      setScriptError("Google Maps konnte nicht geladen werden.");
      return null;
    }
  }, [loader]);

  

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    let cancelled = false;

    ensureScript().catch((error) => {
      if (!cancelled) {
        setScriptError(error instanceof Error ? error.message : String(error));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [ensureScript, apiKey]);

  useEffect(() => {
    if (!apiKey || !containerRef.current || !window.google?.maps || !isScriptLoaded) {
      return;
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (!mapRef.current) {
      mapRef.current = new window.google.maps.Map(containerRef.current, {
        center: MAP_DEFAULT_CENTER,
        zoom: 6,
        disableDefaultUI: true,
        styles: mapStyles,
      });
    }

    const map = mapRef.current;

    if (!infoWindowRef.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow({ maxWidth: 280 });
    }

    const bounds = new window.google.maps.LatLngBounds();

    venuePoints.forEach((point) => {
      const isLive = typeof point.venue.pricePerHour === "number";
      const marker = new window.google.maps.Marker({
        map,
        position: point.position,
        title: point.venue.name,
        icon: createMarkerIcon(isLive),
      });

      marker.addListener("click", () => {
        markerSelectRef.current?.(point.venue);
        infoWindowRef.current?.setContent(createInfoWindowContent(point.venue));
        infoWindowRef.current?.open({ anchor: marker, map, shouldFocus: false });
      });

      markersRef.current.push(marker);
      bounds.extend(point.position);
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 64);
    } else {
      map.setCenter(MAP_DEFAULT_CENTER);
      map.setZoom(6);
    }

    if (activeCity && CITY_COORDINATES[activeCity]) {
      const coordinate = CITY_COORDINATES[activeCity];
      map.panTo({ lat: coordinate.lat, lng: coordinate.lng });
      map.setZoom(Math.max(map.getZoom(), 11));
    }
  }, [apiKey, venuePoints, activeCity, isScriptLoaded]);

  useEffect(() => {
    if (!mapRef.current || !window.google?.maps || venuePoints.length === 0 || !selectedVenueId) {
      return;
    }

    const selected = venuePoints.find((point) => point.venue.id === selectedVenueId);
    if (selected) {
      mapRef.current.panTo(selected.position);
      mapRef.current.setZoom(Math.max(mapRef.current.getZoom(), 12));
    }
  }, [selectedVenueId, venuePoints]);

  useEffect(
    () => () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      mapRef.current = null;
    },
    []
  );

  const shouldRenderFallback = !apiKey || !!scriptError || !isScriptLoaded;

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-[color:var(--surface-glass-border)]/90 bg-[linear-gradient(160deg,rgba(7,34,23,0.85),rgba(4,20,12,0.92))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(62,202,130,0.25),transparent_55%)]" aria-hidden />
      {shouldRenderFallback ? (
        <FallbackMap
          points={venuePoints}
          activeCity={activeCity}
          selectedVenueId={selectedVenueId ?? null}
          onMarkerSelect={onMarkerSelect}
          errorMessage={scriptError}
        />
      ) : (
        <div ref={containerRef} className="absolute inset-0" role="presentation" />
      )}
      {!apiKey && (
        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white">
          Demo-Modus ohne API-Key
        </div>
      )}
      {scriptError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[color:var(--accent-secondary)]/40 bg-black/60 px-4 py-3 text-sm text-white">
          {scriptError}
        </div>
      ) : null}
    </div>
  );
}

interface FallbackMapProps {
  points: VenuePoint[];
  activeCity?: string;
  selectedVenueId: string | null;
  onMarkerSelect?: (venue: Venue) => void;
  errorMessage: string | null;
}

function FallbackMap({ points, activeCity, selectedVenueId, onMarkerSelect, errorMessage }: FallbackMapProps) {
  const latitudes = points.map((point) => point.position.lat);
  const longitudes = points.map((point) => point.position.lng);
  const latMax = Math.max(...latitudes, MAP_DEFAULT_CENTER.lat + 1);
  const latMin = Math.min(...latitudes, MAP_DEFAULT_CENTER.lat - 1);
  const lngMax = Math.max(...longitudes, MAP_DEFAULT_CENTER.lng + 1);
  const lngMin = Math.min(...longitudes, MAP_DEFAULT_CENTER.lng - 1);
  const latRange = latMax - latMin || 1;
  const lngRange = lngMax - lngMin || 1;

  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[...Array(6)].map((_, index) => (
          <div key={`grid-${index}`} className="absolute inset-0">
            <div className="absolute inset-x-0" style={{ top: `${(index + 1) * 16}%` }}>
              <div className="h-px w-full bg-white/8" />
            </div>
            <div className="absolute inset-y-0" style={{ left: `${(index + 1) * 16}%` }}>
              <div className="h-full w-px bg-white/8" />
            </div>
          </div>
        ))}
      </div>

      {points.map((point) => {
        const top = ((latMax - point.position.lat) / latRange) * 75 + 12;
        const left = ((point.position.lng - lngMin) / lngRange) * 70 + 15;
        const isSelected = selectedVenueId === point.venue.id;
        const isLive = typeof point.venue.pricePerHour === "number";
        const isActiveCity = activeCity && point.venue.city && point.venue.city.toLowerCase() === activeCity.toLowerCase();

        return (
          <button
            key={point.venue.id}
            type="button"
            style={{ top: `${top}%`, left: `${left}%` }}
            className={`theme-transition absolute -translate-x-1/2 -translate-y-full rounded-2xl border px-4 py-3 text-left shadow-[0_22px_60px_-40px_rgba(5,64,38,0.9)] backdrop-blur ${
              isSelected
                ? "border-[color:var(--accent-primary-strong)] bg-[color:var(--accent-primary-strong)]/85 text-[color:var(--accent-primary-contrast)]"
                : "border-white/18 bg-white/14 text-white/90 hover:border-[color:var(--accent-primary)]/50 hover:bg-[color:var(--accent-primary)]/18"
            } ${isActiveCity ? "ring-2 ring-[color:var(--accent-secondary)]/70" : ""}`}
            onClick={() => onMarkerSelect?.(point.venue)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center rounded-full p-1.5 text-[color:var(--accent-primary-contrast)] ${
                  isLive ? "bg-[color:var(--accent-primary-strong)]" : "bg-[color:var(--accent-secondary-strong)] text-[color:var(--pitch-dark)]"
                }`}
              >
                ●
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-90">{point.venue.city ?? "Unbekannt"}</p>
                <p className="text-xs font-medium opacity-75">{point.venue.name}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] opacity-80">
              <span>{isLive ? "Live Slots" : "Auf Anfrage"}</span>
              <span className="text-white">{isLive ? `${point.venue.pricePerHour} €` : "Kontakt"}</span>
            </div>
          </button>
        );
      })}

      {errorMessage ? (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/60 px-4 py-3 text-sm text-white">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}

function computeVenuePoints(venues: Venue[]): VenuePoint[] {
  return venues
    .map((venue, index) => {
      if (!venue.city || !CITY_COORDINATES[venue.city]) {
        return null;
      }
      const base = CITY_COORDINATES[venue.city];
      const jitter = createDeterministicOffset(venue.id ?? String(index));
      return {
        venue,
        position: {
          lat: base.lat + jitter.lat,
          lng: base.lng + jitter.lng,
        },
      } satisfies VenuePoint;
    })
    .filter((entry): entry is VenuePoint => entry !== null);
}

function createDeterministicOffset(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }

  const lat = ((hash % 1000) / 1000 - 0.5) * 0.08;
  const lng = ((((hash / 1000) | 0) % 1000) / 1000 - 0.5) * 0.12;
  return { lat, lng };
}

function createMarkerIcon(isLive: boolean) {
  if (!window.google?.maps) {
    return undefined;
  }

  return {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    fillColor: isLive ? "#1FB864" : "#7C8A82",
    fillOpacity: 0.95,
    strokeColor: "#042416",
    strokeWeight: 1,
    scale: 1.2,
    anchor: new window.google.maps.Point(12, 22),
  };
}

function createInfoWindowContent(venue: Venue) {
  const isLive = typeof venue.pricePerHour === "number";
  const priceLabel = isLive ? `${venue.pricePerHour} € pro Stunde` : "Preis auf Anfrage";
  const statusLabel = isLive ? "Live Slots verfügbar" : "Anfrage notwendig";
  const buttonLabel = isLive ? "Jetzt buchen" : "Anfrage senden";

  return `
    <div style="font-family: 'Inter', sans-serif; min-width: 220px; max-width: 260px;">
      <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.22em; color: #0c7f45; font-weight: 600;">
        ${venue.city ?? ""}
      </div>
      <div style="margin-top: 6px; font-size: 18px; font-weight: 700; color: #032414;">
        ${venue.name}
      </div>
      <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #103828;">
        <span>${statusLabel}</span>
        <span>${priceLabel}</span>
      </div>
      <div style="margin-top: 14px;">
        <a href="${venue.externalUrl}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(120deg,#006c38,#1fb864); color: #ffffff; padding: 8px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; text-decoration: none;">
          ${buttonLabel}
        </a>
      </div>
    </div>
  `;
}

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0b1f16" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#6bf3a5" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#011009" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    stylers: [{ color: "#123525" }],
  },
  {
    featureType: "water",
    stylers: [{ color: "#05261a" }],
  },
];
