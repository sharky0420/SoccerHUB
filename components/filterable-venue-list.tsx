"use client";

import { useCallback, useMemo, useState } from "react";
import { FilterPanel, type FilterState } from "@/components/filter-panel";
import { VenueCard } from "@/components/venue-card";
import { VenueMap } from "@/components/venue-map";
import { FilterIcon, MapPinIcon, TargetIcon } from "@/components/icons";
import { StickyCta } from "@/components/sticky-cta";
import type { Venue, Weekday } from "@/types/venue";

interface FilterableVenueListProps {
  venues: Venue[];
  sports: string[];
  amenities: string[];
}

const ITEMS_PER_PAGE = 4;

type SortOption = "recommended" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<SortOption, string> = {
  recommended: "Empfohlen",
  "price-asc": "Preis aufsteigend",
  "price-desc": "Preis absteigend",
  name: "Name A-Z",
};

const weekdayLabels: Record<Weekday, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

export function FilterableVenueList({ venues, sports, amenities }: FilterableVenueListProps) {
  const [filters, setFilters] = useState<FilterState>({
    sports: [],
    city: "",
    amenities: [],
    nearby: false,
  });
  const [sort, setSort] = useState<SortOption>("recommended");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [desktopLayout, setDesktopLayout] = useState<"stacked" | "split">("stacked");
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);

  const filteredVenues = useMemo(() => {
    const normalizedCity = filters.city.trim().toLowerCase();
    return venues.filter((venue) => {
      if (filters.sports.length > 0 && !filters.sports.every((sport) => venue.sports.includes(sport))) {
        return false;
      }

      if (
        normalizedCity &&
        !`${venue.city ?? ""} ${venue.address ?? ""}`.toLowerCase().includes(normalizedCity)
      ) {
        return false;
      }

      if (
        typeof filters.priceMin === "number" &&
        (typeof venue.pricePerHour !== "number" || venue.pricePerHour < filters.priceMin)
      ) {
        return false;
      }

      if (
        typeof filters.priceMax === "number" &&
        (typeof venue.pricePerHour !== "number" || venue.pricePerHour > filters.priceMax)
      ) {
        return false;
      }

      const openingHoursForDay = filters.day ? venue.openingHours?.[filters.day] : undefined;

      if (filters.day && openingHoursForDay === undefined) {
        return false;
      }

      if (
        filters.day &&
        openingHoursForDay &&
        openingHoursForDay.open === "" &&
        openingHoursForDay.close === ""
      ) {
        return false;
      }

      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((amenity) => venue.amenities.includes(amenity))
      ) {
        return false;
      }

      return true;
    });
  }, [filters, venues]);

  const sortedVenues = useMemo(() => {
    return [...filteredVenues].sort((a, b) => {
      switch (sort) {
        case "price-asc": {
          const priceA = typeof a.pricePerHour === "number" ? a.pricePerHour : Number.POSITIVE_INFINITY;
          const priceB = typeof b.pricePerHour === "number" ? b.pricePerHour : Number.POSITIVE_INFINITY;
          return priceA - priceB;
        }
        case "price-desc": {
          const priceA = typeof a.pricePerHour === "number" ? a.pricePerHour : null;
          const priceB = typeof b.pricePerHour === "number" ? b.pricePerHour : null;

          if (priceA === null && priceB === null) {
            return 0;
          }

          if (priceA === null) {
            return 1;
          }

          if (priceB === null) {
            return -1;
          }

          return priceB - priceA;
        }
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return (a.city ?? "").localeCompare(b.city ?? "");
      }
    });
  }, [filteredVenues, sort]);

  const visibleVenues = sortedVenues.slice(0, visibleCount);

  const handleReset = () => {
    setFilters({ sports: [], city: "", amenities: [], nearby: false });
    setSort("recommended");
    setVisibleCount(ITEMS_PER_PAGE);
    setMobileView("list");
    setDesktopLayout("stacked");
    setIsFilterOpen(false);
  };

  const canLoadMore = visibleCount < sortedVenues.length;
  const activeCity = filters.city.trim();
  const mapVenues = filteredVenues.length > 0 ? filteredVenues : venues;

  const handleCitySelect = useCallback(
    (city: string) => {
      setFilters((previous) => ({ ...previous, city, nearby: false }));
      setVisibleCount(ITEMS_PER_PAGE);
    },
    []
  );

  const listSection = (
    <div className="space-y-8">
      {visibleVenues.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {visibleVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/70 p-10 text-center text-[color:var(--text-secondary)] backdrop-blur">
          <p className="text-lg font-semibold text-[color:var(--text-primary)]">Keine Halle gefunden</p>
          <p className="mt-2 text-sm">
            Passe die Filter an oder setze sie zurück, um neue Slots zu entdecken.
          </p>
        </div>
      )}

      {canLoadMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
            className="theme-transition inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-secondary)]"
          >
            <span aria-hidden>＋</span>
            Mehr Hallen laden
          </button>
        </div>
      )}
    </div>
  );

  const mapSection = (
    <div className="min-h-[520px]">
      <VenueMap venues={mapVenues} activeCity={activeCity} onCitySelect={handleCitySelect} />
    </div>
  );

  const filterSummaryTokens = useMemo(() => {
    const tokens: string[] = [];
    const cityLabel = filters.city.trim();
    if (filters.nearby) {
      tokens.push("Near Me aktiv");
    } else if (cityLabel) {
      tokens.push(cityLabel);
    }

    if (filters.sports.length > 0) {
      tokens.push(
        `${filters.sports.length} Sport${filters.sports.length === 1 ? "art" : "arten"}`
      );
    }

    if (typeof filters.priceMin === "number" || typeof filters.priceMax === "number") {
      const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      });
      if (typeof filters.priceMin === "number" && typeof filters.priceMax === "number") {
        tokens.push(`${formatter.format(filters.priceMin)} – ${formatter.format(filters.priceMax)}`);
      } else if (typeof filters.priceMin === "number") {
        tokens.push(`ab ${formatter.format(filters.priceMin)}`);
      } else if (typeof filters.priceMax === "number") {
        tokens.push(`bis ${formatter.format(filters.priceMax)}`);
      }
    }

    if (filters.day) {
      tokens.push(`Tag: ${weekdayLabels[filters.day as Weekday] ?? filters.day}`);
    }

    if (filters.amenities.length > 0) {
      tokens.push(
        `${filters.amenities.length} Feature${filters.amenities.length === 1 ? "" : "s"}`
      );
    }

    return tokens;
  }, [filters]);

  return (
    <section className="container-narrow pb-24" id="hallen">
      <div className="space-y-8">
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setIsFilterOpen((open) => !open)}
            className={`theme-transition flex w-full items-center justify-between rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] ${
              isFilterOpen
                ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]/15 text-[color:var(--accent-primary)]"
                : "border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/80 text-[color:var(--text-secondary)]"
            }`}
            aria-expanded={isFilterOpen}
            aria-controls="mobile-filter-panel"
          >
            <span className="inline-flex items-center gap-2">
              <FilterIcon className="h-4 w-4" /> Filter
            </span>
            <span className="text-xs">{isFilterOpen ? "Schließen" : "Öffnen"}</span>
          </button>
          {isFilterOpen ? (
            <div id="mobile-filter-panel" className="mt-4">
              <FilterPanel
                sportsOptions={sports}
                amenityOptions={amenities}
                state={filters}
                density="compact"
                onChange={(state) => {
                  setFilters(state);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                onReset={handleReset}
              />
            </div>
          ) : null}
        </div>

        <div className="hidden lg:block">
          {isDesktopFilterOpen ? (
            <div className="lg:sticky lg:top-24 space-y-3">
              <div className="flex justify-end pr-1">
                <button
                  type="button"
                  onClick={() => setIsDesktopFilterOpen(false)}
                  className="theme-transition inline-flex items-center gap-2 rounded-full border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-secondary)]/80 shadow-[0_18px_48px_-28px_rgba(6,36,22,0.5)] hover:border-[color:var(--accent-primary)]/45 hover:text-[color:var(--accent-primary)]"
                >
                  Menü einklappen
                </button>
              </div>
              <FilterPanel
                sportsOptions={sports}
                amenityOptions={amenities}
                state={filters}
                density="compact"
                onChange={(state) => {
                  setFilters(state);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                onReset={handleReset}
              />
            </div>
          ) : (
            <div className="lg:sticky lg:top-24 rounded-3xl border border-[color:var(--surface-glass-border)]/60 bg-[var(--gradient-filter-sidebar)] px-6 py-6 text-[color:var(--text-primary)] shadow-[0_60px_160px_-90px_rgba(6,36,22,0.6)] backdrop-blur-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-primary)]/85">
                    Filter kompakt
                  </p>
                  <div className="flex max-w-xl flex-wrap gap-2">
                    {filterSummaryTokens.length > 0 ? (
                      filterSummaryTokens.map((token) => (
                        <span
                          key={token}
                          className="inline-flex min-w-[5rem] items-center justify-center rounded-full border border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/75 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--text-secondary)]/85 shadow-[0_16px_48px_-34px_rgba(6,36,22,0.55)] break-words"
                        >
                          {token}
                        </span>
                      ))
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-dashed border-[color:var(--surface-glass-border)]/60 bg-[color:var(--surface-card)]/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--text-secondary)]/70">
                        Keine Filter aktiv
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDesktopFilterOpen(true)}
                  className="theme-transition inline-flex items-center gap-2 rounded-full bg-[linear-gradient(130deg,rgba(0,108,56,0.85),rgba(36,168,96,0.92))] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-primary-contrast)] shadow-[0_28px_82px_-40px_rgba(0,108,56,0.7)] hover:brightness-[1.04]"
                >
                  Filter öffnen
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-7">
          <div className="glass-panel theme-transition space-y-5 rounded-3xl border border-[color:var(--border-subtle)]/70 bg-[var(--gradient-filter-results)] px-6 py-6 text-[color:var(--text-primary)] shadow-[0_48px_160px_-90px_rgba(6,36,22,0.68)] lg:px-8 lg:py-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-primary-strong)]">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-primary-strong)]" aria-hidden />
                  Live Übersicht
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold leading-tight text-[color:var(--text-primary)] break-words hyphens-auto sm:text-3xl">
                    {sortedVenues.length} Hallen im Sports Hub
                  </h2>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]/90 break-words hyphens-auto">
                    Filtere nach Sportarten, Preisen und Features. Sortiere nach Preis oder Name und öffne die Kartenansicht für eine visuelle Auswahl.
                  </p>
                  {activeCity && (
                    <p className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary-strong)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-primary-contrast)] shadow-[0_14px_32px_-18px_rgba(0,108,56,0.5)]">
                      <MapPinIcon className="h-3.5 w-3.5" /> Fokus: {activeCity}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                    Sortierung
                  </span>
                  <div className="relative inline-flex items-center">
                    <span className="pointer-events-none absolute left-4 text-xs text-[color:var(--text-secondary)]/70">⇅</span>
                    <select
                      id="sort"
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortOption)}
                      className="theme-transition w-full min-w-[12rem] rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/85 px-10 py-2 text-sm font-medium text-[color:var(--text-primary)] focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
                      aria-label="Sortierung der Arenen"
                    >
                      {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                        <option key={option} value={option}>
                          {sortLabels[option]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileView((view) => (view === "list" ? "map" : "list"))}
                    className={`theme-transition inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                      mobileView === "map"
                        ? "border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)]/15 text-[color:var(--accent-primary)]"
                        : "border-[color:var(--border-subtle)]/70 text-[color:var(--text-secondary)]"
                    }`}
                  >
                    <TargetIcon className="h-3.5 w-3.5" />
                    {mobileView === "map" ? "Liste" : "Map"}
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-between gap-4 text-xs text-[color:var(--text-secondary)]/85">
              <p>Wähle dein bevorzugtes Layout – gestapelt oder Split-Screen mit Karte neben der Liste.</p>
              <div className="inline-flex rounded-full border border-[color:var(--border-subtle)]/70 bg-[color:var(--surface-card)]/70 p-1">
                {(
                  [
                    { key: "stacked" as const, label: "Gestapelt" },
                    { key: "split" as const, label: "Split Screen" },
                  ]
                ).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setDesktopLayout(option.key)}
                    className={`theme-transition rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
                      desktopLayout === option.key
                        ? "bg-[color:var(--accent-primary-strong)] text-[color:var(--accent-primary-contrast)] shadow-[0_14px_32px_-20px_rgba(0,108,56,0.55)]"
                        : "text-[color:var(--text-secondary)] hover:text-[color:var(--accent-primary)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {mobileView === "map" && <div className="lg:hidden">{mapSection}</div>}
          </div>

          <div className="lg:hidden">{mobileView === "list" ? listSection : null}</div>

          <div className="hidden lg:block">
            {desktopLayout === "split" ? (
              <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr),minmax(0,520px)]">
                <div className="space-y-7">{listSection}</div>
                <div className="lg:sticky lg:top-32">{mapSection}</div>
              </div>
            ) : (
              <div className="space-y-8">
                {listSection}
                {mapSection}
              </div>
            )}
          </div>
        </div>
      </div>

      <StickyCta />
    </section>
  );
}
