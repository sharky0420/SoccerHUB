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
      <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
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

        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-soft sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {sortedVenues.length} Hallen gefunden
              </h2>
              <p className="text-sm text-slate-500">
                Vergleiche Preise, Ausstattung und buche mit einem Klick direkt beim Anbieter.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-slate-600">
                Sortierung
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
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
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
              Keine Halle gefunden. Passe die Filter an oder setze sie zurück.
            </div>
          )}

          {canLoadMore && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Mehr anzeigen
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
