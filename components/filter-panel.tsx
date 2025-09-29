"use client";

import { useMemo } from "react";
import type { Weekday } from "@/types/venue";

export interface FilterState {
  sports: string[];
  city: string;
  priceMin?: number;
  priceMax?: number;
  day?: Weekday | "";
  amenities: string[];
}

interface FilterPanelProps {
  sportsOptions: string[];
  amenityOptions: string[];
  state: FilterState;
  onChange: (state: FilterState) => void;
  onReset: () => void;
}

const weekdayLabels: Record<Weekday, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

export function FilterPanel({
  sportsOptions,
  amenityOptions,
  state,
  onChange,
  onReset,
}: FilterPanelProps) {
  const sportOptions = useMemo(() => sportsOptions, [sportsOptions]);
  const amenityGroups = useMemo(() => {
    return amenityOptions.reduce<string[][]>((groups, item, index) => {
      const chunkIndex = Math.floor(index / 3);
      if (!groups[chunkIndex]) groups[chunkIndex] = [];
      groups[chunkIndex]!.push(item);
      return groups;
    }, []);
  }, [amenityOptions]);

  const toggleSport = (sport: string) => {
    const exists = state.sports.includes(sport);
    const sports = exists
      ? state.sports.filter((item) => item !== sport)
      : [...state.sports, sport];
    onChange({ ...state, sports });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = state.amenities.includes(amenity);
    const amenities = exists
      ? state.amenities.filter((item) => item !== amenity)
      : [...state.amenities, amenity];
    onChange({ ...state, amenities });
  };

  return (
    <aside className="glass-panel theme-transition space-y-6 rounded-3xl border border-[color:var(--border-subtle)]/80 p-8 text-[color:var(--text-primary)]">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--text-secondary)]">Filter</p>
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Finde deine Halle</h2>
        </div>
        <button
          type="button"
          className="theme-transition text-sm font-medium text-[color:var(--accent-primary)] hover:text-[color:var(--accent-secondary)]"
          onClick={onReset}
        >
          Zurücksetzen
        </button>
      </header>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-[color:var(--text-primary)]">Sportart</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {sportOptions.map((sport) => {
              const selected = state.sports.includes(sport);
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  className={`chip theme-transition px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                    selected ? "chip-active" : ""
                  }`}
                >
                  {sport}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[color:var(--text-primary)]" htmlFor="city-filter">
            Ort
          </label>
          <input
            id="city-filter"
            type="text"
            placeholder="z. B. Mannheim"
            value={state.city}
            onChange={(event) => onChange({ ...state, city: event.target.value })}
            className="theme-transition w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-3 py-2 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-[color:var(--text-primary)]">Preis pro Stunde</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wide text-[color:var(--text-secondary)]" htmlFor="price-min">
                Min
              </label>
              <input
                id="price-min"
                type="number"
                min={0}
                inputMode="numeric"
                value={state.priceMin ?? ""}
                onChange={(event) =>
                  onChange({
                    ...state,
                    priceMin: event.target.value ? Number(event.target.value) : undefined,
                  })
                }
                className="theme-transition mt-1 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-3 py-2 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-[color:var(--text-secondary)]" htmlFor="price-max">
                Max
              </label>
              <input
                id="price-max"
                type="number"
                min={0}
                inputMode="numeric"
                value={state.priceMax ?? ""}
                onChange={(event) =>
                  onChange({
                    ...state,
                    priceMax: event.target.value ? Number(event.target.value) : undefined,
                  })
                }
                className="theme-transition mt-1 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-3 py-2 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)]/70 focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[color:var(--text-primary)]" htmlFor="day-filter">
            Öffnungszeiten
          </label>
          <select
            id="day-filter"
            value={state.day ?? ""}
            onChange={(event) => onChange({ ...state, day: event.target.value as Weekday | "" })}
            className="theme-transition w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/70 px-3 py-2 text-sm text-[color:var(--text-primary)] focus:border-[color:var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-secondary)]/40"
          >
            <option value="">Alle Tage</option>
            {(Object.keys(weekdayLabels) as Weekday[]).map((day) => (
              <option key={day} value={day}>
                {weekdayLabels[day]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-[color:var(--text-primary)]">Ausstattung</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {amenityGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-2">
                {group.map((amenity) => {
                  const checked = state.amenities.includes(amenity);
                  return (
                    <label key={amenity} className="theme-transition flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(amenity)}
                        className="h-4 w-4 rounded border-[color:var(--border-subtle)] bg-[color:var(--surface-card)]/60 text-[color:var(--accent-primary)] focus:ring-[color:var(--accent-secondary)]/50"
                      />
                      {amenity}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
