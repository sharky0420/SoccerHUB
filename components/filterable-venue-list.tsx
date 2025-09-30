"use client";

import { useMemo, useState } from "react";
import { FilterPanel, type FilterState } from "@/components/filter-panel";
import { VenueCard } from "@/components/venue-card";
import { VenueMap } from "@/components/venue-map";
import { MapPinIcon, TargetIcon } from "@/components/icons";
import type { Venue } from "@/types/venue";

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
  };

  const canLoadMore = visibleCount < sortedVenues.length;
  const activeCity = filters.city.trim();
  const mapVenues = filteredVenues.length > 0 ? filteredVenues : venues;

  const handleCitySelect = (city: string) => {
    setFilters((previous) => ({ ...previous, city, nearby: false }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section className="container-narrow" id="hallen">
      <div className="grid gap-10 xl:grid-cols-[minmax(280px,320px),minmax(0,1fr),minmax(300px,360px)] xl:gap-12">
        <FilterPanel
          sportsOptions={sports}
          amenityOptions={amenities}
          state={filters}
          onChange={(state) => {
            setFilters(state);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          onReset={handleReset}
        />

        <div className="space-y-8 xl:space-y-10">
          <div className="glass-panel theme-transition space-y-6 rounded-3xl border border-[color:var(--border-subtle)]/75 bg-[color:var(--surface-card)]/80 px-6 py-6 text-[color:var(--text-primary)] lg:px-8 lg:py-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-primary)]" aria-hidden />
                  Live Übersicht
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                    {sortedVenues.length} Hallen im SoccerHUB
                  </h2>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    Filtere nach Sportarten und Ausstattung. Sortiere nach Preis oder Name und springe direkt zur Kartenansicht.
                  </p>
                  {activeCity && (
                    <p className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-primary)]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
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

            {mobileView === "map" && (
              <div className="lg:hidden">
                <VenueMap venues={mapVenues} activeCity={activeCity} onCitySelect={handleCitySelect} />
              </div>
            )}
          </div>

          {mobileView === "list" && (
            <>
              {visibleVenues.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                  {visibleVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/65 p-10 text-center text-[color:var(--text-secondary)] backdrop-blur">
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
            </>
          )}
        </div>

        <div className="hidden xl:flex">
          <VenueMap venues={mapVenues} activeCity={activeCity} onCitySelect={handleCitySelect} />
        </div>
      </div>
    </section>
  );
}
