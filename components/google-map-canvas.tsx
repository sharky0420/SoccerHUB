"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { CITY_COORDINATES } from "@/lib/city-coordinates";
import type { Venue } from "@/types/venue";
import { setOptions as setMapsOptions, importLibrary } from "@googlemaps/js-api-loader";

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

const MAP_DEFAULT_CENTER = { lat: 51.163375, lng: 10.447683 };

export function GoogleMapCanvas({
  venues,
  activeCity,
  selectedVenueId,
  onMarkerSelect,
}: GoogleMapCanvasProps) {
  const { theme } = useTheme();
  const initialTheme = useRef(theme);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any | null>(null);
  const markerSelectRef = useRef(onMarkerSelect);
  const mapsModuleRef = useRef<{
    Map?: any;
    Marker?: any;
    InfoWindow?: any;
    LatLngBounds?: any;
    Point?: any;
  } | null>(null);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  markerSelectRef.current = onMarkerSelect;

  const apiKey = useMemo(() => (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "").trim(), []);
  console.log("[Maps] env key present:", apiKey ? `yes (len ${apiKey.length})` : "no");

  const venuePoints = useMemo(() => computeVenuePoints(venues), [venues]);

  const loadPromiseRef = useRef<Promise<void> | null>(null);

  const ensureScript = useCallback(async () => {
    console.log("[Maps] ensureScript start");
    if (typeof window === "undefined") {
      console.log("[Maps] SSR -> abort");
      return null;
    }
    if (!apiKey) {
      console.warn("[Maps] No API key -> fallback");
      return null;
    }

    if (mapsModuleRef.current?.Map) {
      console.log("[Maps] modules already cached");
      setIsScriptLoaded(true);
      return mapsModuleRef.current;
    }

    if (!loadPromiseRef.current) {
      try {
        console.log("[Maps] setOptions({ key, v:'weekly' })");
        setMapsOptions({ key: apiKey, v: "weekly" });

        loadPromiseRef.current = (async () => {
          console.log("[Maps] importLibrary('maps')…");
          const mapsLib = await importLibrary("maps");
          console.log("[Maps] importLibrary('marker')…");
          const markerLib = await importLibrary("marker");
          const currentGoogleMaps = (globalThis as any).google?.maps ?? {};
          mapsModuleRef.current = {
            Map: mapsLib.Map ?? currentGoogleMaps.Map,
            Marker: markerLib.Marker ?? mapsLib.Marker ?? currentGoogleMaps.Marker,
            InfoWindow: mapsLib.InfoWindow ?? currentGoogleMaps.InfoWindow,
            LatLngBounds: mapsLib.LatLngBounds ?? currentGoogleMaps.LatLngBounds,
            Point: mapsLib.Point ?? currentGoogleMaps.Point,
          };
          console.log("[Maps] libraries imported");
        })();
      } catch (e) {
        console.error("[Maps] init error", e);
        setScriptError("Google Maps konnte nicht geladen werden.");
        return null;
      }
    }

    try {
      await loadPromiseRef.current;
      if (mapsModuleRef.current) {
        const currentGoogle = (globalThis as any).google ?? {};
        (globalThis as any).google = {
          ...currentGoogle,
          maps: {
            ...currentGoogle.maps,
            ...mapsModuleRef.current,
          },
        };
      }
      setIsScriptLoaded(true);
      console.log("[Maps] ensureScript done");
      return mapsModuleRef.current;
    } catch (e) {
      console.error("[Maps] load failed", e);
      setScriptError("Google Maps konnte nicht geladen werden.");
      return null;
    }
  }, [apiKey]);

  // Script laden
  useEffect(() => {
    if (!apiKey) return;
    let cancelled = false;
    ensureScript().catch((error) => {
      if (!cancelled) {
        console.error("[Maps] ensureScript error", error);
        setScriptError(error instanceof Error ? error.message : String(error));
      }
    });
    return () => { cancelled = true; };
  }, [ensureScript, apiKey]);

  // Map initialisieren & Marker setzen
  useEffect(() => {
    const hasGoogle = !!(globalThis as any)?.google?.maps;
    const hasModules = !!mapsModuleRef.current?.Map;
    const hasContainer = !!containerRef.current;
    console.log("[Maps] init effect gate", {
      hasApiKey: !!apiKey,
      isScriptLoaded,
      hasGoogle,
      hasModules,
      hasContainer,
    });

    if (!apiKey || !isScriptLoaded || !hasGoogle || !hasContainer || !hasModules) {
      if (!apiKey) console.warn("[Maps] gate: no apiKey");
      if (!isScriptLoaded) console.log("[Maps] gate: script not loaded yet");
      if (!hasGoogle) console.log("[Maps] gate: google.maps missing");
      if (!hasModules) console.log("[Maps] gate: map modules missing");
      if (!hasContainer) console.log("[Maps] gate: containerRef null");
      return;
    }

    const modules = mapsModuleRef.current;
    if (!modules?.Map || !modules?.InfoWindow || !modules?.Marker || !modules?.LatLngBounds) {
      console.warn("[Maps] Missing constructors after load", modules);
      return;
    }

    // Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // Map einmalig erstellen
    if (!mapRef.current) {
      console.log("[Maps] creating Map instance");
      mapRef.current = new modules.Map(containerRef.current!, {
        center: MAP_DEFAULT_CENTER,
        zoom: 6,
        disableDefaultUI: true,
        styles: mapStylesByTheme[initialTheme.current],
      });
    }

    const map = mapRef.current;

    if (!infoWindowRef.current) {
      infoWindowRef.current = new modules.InfoWindow({ maxWidth: 280 });
    }

    const bounds = new modules.LatLngBounds();
    const markerCtor = modules.Marker;
    const pointCtor = modules.Point ?? window.google?.maps?.Point;

    venuePoints.forEach((point) => {
      const isLive = typeof point.venue.pricePerHour === "number";
      const marker = new markerCtor({
        map,
        position: point.position,
        title: point.venue.name,
        icon: createMarkerIcon(isLive, pointCtor),
      });

      marker.addListener("click", () => {
        console.log("[Maps] marker click:", point.venue.name);
        markerSelectRef.current?.(point.venue);
        infoWindowRef.current?.setContent(createInfoWindowContent(point.venue));
        infoWindowRef.current?.open({ anchor: marker, map, shouldFocus: false });
      });

      markersRef.current.push(marker);
      bounds.extend(point.position);
    });

    console.log("[Maps] markers added:", markersRef.current.length);

    if (!bounds.isEmpty()) {
      console.log("[Maps] fitBounds");
      map.fitBounds(bounds, 64);
    } else {
      console.log("[Maps] set default center");
      map.setCenter(MAP_DEFAULT_CENTER);
      map.setZoom(6);
    }

    if (activeCity && CITY_COORDINATES[activeCity]) {
      const c = CITY_COORDINATES[activeCity];
      console.log("[Maps] panTo activeCity:", activeCity, c);
      map.panTo({ lat: c.lat, lng: c.lng });
      map.setZoom(Math.max(map.getZoom(), 11));
    }
  }, [apiKey, isScriptLoaded, venuePoints, activeCity]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setOptions({ styles: mapStylesByTheme[theme] });
  }, [theme]);

  // Fokus auf ausgewähltes Venue
  useEffect(() => {
    if (!mapRef.current || !window.google?.maps || venuePoints.length === 0 || !selectedVenueId) return;
    const selected = venuePoints.find((p) => p.venue.id === selectedVenueId);
    if (selected) {
      console.log("[Maps] focus selected venue:", selected.venue.name);
      mapRef.current.panTo(selected.position);
      mapRef.current.setZoom(Math.max(mapRef.current.getZoom(), 12));
    }
  }, [selectedVenueId, venuePoints]);

  // Cleanup
  useEffect(() => {
    return () => {
      console.log("[Maps] cleanup");
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      mapRef.current = null;
    };
  }, []);

  const shouldRenderFallback = !apiKey || !!scriptError || !isScriptLoaded;

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-[color:var(--surface-glass-border)]/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.82),rgba(204,239,222,0.78))] shadow-[0_45px_160px_-100px_rgba(12,78,48,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,196,130,0.22),transparent_60%)]" aria-hidden />
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
        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-primary-strong)] shadow-[0_12px_32px_-20px_rgba(12,74,48,0.45)]">
          Demo-Modus ohne API-Key
        </div>
      )}
      {scriptError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[color:var(--accent-secondary)]/40 bg-white/80 px-4 py-3 text-sm text-[color:var(--text-primary)] shadow-[0_32px_120px_-60px_rgba(12,78,48,0.45)]">
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
  const latitudes = points.map((p) => p.position.lat);
  const longitudes = points.map((p) => p.position.lng);
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
              <div className="h-px w-full bg-[color:var(--accent-primary)]/25" />
            </div>
            <div className="absolute inset-y-0" style={{ left: `${(index + 1) * 16}%` }}>
              <div className="h-full w-px bg-[color:var(--accent-primary)]/25" />
            </div>
          </div>
        ))}
      </div>

      {points.map((point) => {
        const top = ((latMax - point.position.lat) / latRange) * 75 + 12;
        const left = ((point.position.lng - lngMin) / lngRange) * 70 + 15;
        const isSelected = selectedVenueId === point.venue.id;
        const isLive = typeof point.venue.pricePerHour === "number";
        const isActiveCity =
          activeCity && point.venue.city && point.venue.city.toLowerCase() === activeCity.toLowerCase();

        return (
          <button
            key={point.venue.id}
            type="button"
            style={{ top: `${top}%`, left: `${left}%` }}
            className={`theme-transition absolute -translate-x-1/2 -translate-y-full rounded-2xl border px-4 py-3 text-left shadow-[0_26px_70px_-42px_rgba(16,88,60,0.55)] backdrop-blur ${
              isSelected
                ? "border-[color:var(--accent-primary-strong)] bg-[color:var(--accent-primary-strong)]/88 text-[color:var(--accent-primary-contrast)]"
                : "border-[color:var(--surface-glass-border)]/70 bg-white/75 text-[color:var(--text-primary)] hover:border-[color:var(--accent-primary)]/55 hover:bg-[color:var(--accent-primary)]/18"
            } ${isActiveCity ? "ring-2 ring-[color:var(--accent-secondary)]/70" : ""}`}
            onClick={() => onMarkerSelect?.(point.venue)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center rounded-full p-1.5 text-[color:var(--accent-primary-contrast)] ${
                  isLive
                    ? "bg-[color:var(--accent-primary-strong)]"
                    : "bg-[color:var(--accent-secondary-strong)] text-[color:var(--pitch-dark)]"
                }`}
              >
                ●
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]/80">
                  {point.venue.city ?? "Unbekannt"}
                </p>
                <p className="text-xs font-medium text-[color:var(--text-primary)]/85 break-words hyphens-auto">{point.venue.name}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-secondary)]/80">
              <span>{isLive ? "Live Slots" : "Auf Anfrage"}</span>
              <span className="text-[color:var(--accent-primary-strong)]">
                {isLive ? `${point.venue.pricePerHour} €` : "Kontakt"}
              </span>
            </div>
          </button>
        );
      })}

      {errorMessage ? (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[color:var(--surface-glass-border)]/70 bg-white/85 px-4 py-3 text-sm text-[color:var(--text-primary)] shadow-[0_32px_120px_-60px_rgba(16,88,60,0.45)]">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}

function computeVenuePoints(venues: Venue[]): VenuePoint[] {
  return venues
    .map((venue, index) => {
      if (!venue.city || !CITY_COORDINATES[venue.city]) return null;
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
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const lat = ((hash % 1000) / 1000 - 0.5) * 0.08;
  const lng = ((((hash / 1000) | 0) % 1000) / 1000 - 0.5) * 0.12;
  return { lat, lng };
}

function createMarkerIcon(isLive: boolean, PointCtor?: any) {
  const Point = PointCtor ?? window.google?.maps?.Point;
  if (!Point) return undefined;
  return {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    fillColor: isLive ? "#1FB864" : "#9AB8AF",
    fillOpacity: 0.92,
    strokeColor: "#7BD1A5",
    strokeWeight: 0.8,
    scale: 1.2,
    anchor: new Point(12, 22),
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

const mapStylesByTheme = {
  light: [
    { elementType: "geometry", stylers: [{ color: "#d9efe4" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#1c4e34" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5fffa" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#b7e0cd" }] },
    { featureType: "administrative", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { color: "#f5fbf7" },
        { lightness: -6 },
      ],
    },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7aa08f" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", stylers: [{ color: "#b6e5d3" }] },
    {
      featureType: "landscape.natural",
      stylers: [{ color: "#e7f4ec" }],
    },
  ],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#0b1b14" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#7bd1a5" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#03120c" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#123c2a" }] },
    { featureType: "administrative", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { color: "#163427" },
        { lightness: 10 },
      ],
    },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#4c8264" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", stylers: [{ color: "#0f2a1e" }] },
    {
      featureType: "landscape.natural",
      stylers: [{ color: "#10291d" }],
    },
  ],
} as const;
