"use client";

import { useMemo, useState } from "react";
import { FilterPanel, type FilterState } from "@/components/filter-panel";
import { VenueCard } from "@/components/venue-card";
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
  });
  const [sort, setSort] = useState<SortOption>("recommended");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredVenues = useMemo(() => {
    const normalizedCity = filters.city.trim().toLowerCase();
    return venues.filter((venue) => {
      if (filters.sports.length > 0 && !filters.sports.every((sport) => venue.sports.includes(sport))) {
        return false;
      }

      if (normalizedCity && !`${venue.city} ${venue.address}`.toLowerCase().includes(normalizedCity)) {
        return false;
      }

      if (typeof filters.priceMin === "number" && venue.pricePerHour < filters.priceMin) {
        return false;
      }

      if (typeof filters.priceMax === "number" && venue.pricePerHour > filters.priceMax) {
        return false;
      }

      if (filters.day && venue.openingHours[filters.day] === undefined) {
        return false;
      }

      if (
        filters.day &&
        venue.openingHours[filters.day] &&
        venue.openingHours[filters.day]!.open === "" &&
        venue.openingHours[filters.day]!.close === ""
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
        case "price-asc":
          return a.pricePerHour - b.pricePerHour;
        case "price-desc":
          return b.pricePerHour - a.pricePerHour;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return a.city.localeCompare(b.city);
      }
    });
  }, [filteredVenues, sort]);

  const visibleVenues = sortedVenues.slice(0, visibleCount);

  const handleReset = () => {
    setFilters({ sports: [], city: "", amenities: [] });
    setSort("recommended");
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const canLoadMore = visibleCount < sortedVenues.length;

  return (
    <section className="container-narrow" id="hallen">
      <div className="grid gap-10 lg:grid-cols-[340px,1fr]">
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

        <div className="space-y-8">
          <div className="glass-panel theme-transition flex flex-col justify-between gap-4 rounded-3xl border border-[color:var(--border-subtle)]/80 px-6 py-5 text-[color:var(--text-primary)] sm:flex-row sm:items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">{sortedVenues.length} Arenen im SoccerHUB</h2>
              <p className="text-sm text-[color:var(--text-secondary)]">
                Stell deinen Matchplan zusammen: Preise checken, Ausstattung prüfen und direkt beim Betreiber buchen.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-[color:var(--text-secondary)]">
                Sortierung
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="theme-transition rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-5 py-2 text-sm font-medium text-[color:var(--text-primary)] focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {sortLabels[option]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {visibleVenues.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)]/80 bg-[color:var(--surface-card)]/60 p-10 text-center text-[color:var(--text-secondary)] backdrop-blur">
              Keine Halle gefunden. Passe die Filter an oder setze sie zurück.
            </div>
          )}

          {canLoadMore && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
                className="theme-transition rounded-full bg-[color:var(--accent-primary)] px-8 py-3 text-sm font-semibold text-[color:var(--background-primary)] shadow-glow hover:brightness-110"
              >
                Mehr Arenen laden
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
