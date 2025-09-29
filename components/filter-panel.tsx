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
    <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Filter</p>
          <h2 className="text-lg font-semibold text-slate-900">Finde deine Halle</h2>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-primary hover:text-primary/80"
          onClick={onReset}
        >
          Zurücksetzen
        </button>
      </header>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Sportart</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {sportOptions.map((sport) => {
              const selected = state.sports.includes(sport);
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  className={`rounded-full border px-4 py-1 text-sm font-medium transition ${
                    selected
                      ? "border-primary bg-primary text-white shadow"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {sport}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600" htmlFor="city-filter">
            Ort
          </label>
          <input
            id="city-filter"
            type="text"
            placeholder="z. B. Mannheim"
            value={state.city}
            onChange={(event) => onChange({ ...state, city: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">Preis pro Stunde</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500" htmlFor="price-min">
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
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500" htmlFor="price-max">
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
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600" htmlFor="day-filter">
            Öffnungszeiten
          </label>
          <select
            id="day-filter"
            value={state.day ?? ""}
            onChange={(event) => onChange({ ...state, day: event.target.value as Weekday | "" })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
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
          <p className="text-sm font-medium text-slate-600">Ausstattung</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {amenityGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-2">
                {group.map((amenity) => {
                  const checked = state.amenities.includes(amenity);
                  return (
                    <label key={amenity} className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(amenity)}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/50"
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
