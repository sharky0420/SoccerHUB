import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type FilterState = {
  sports: string[];
  city: string;
  nearby: boolean;
  priceMin?: number;
  priceMax?: number;
  day?: Weekday | '';
  amenities: string[];
};

interface FiltersContextValue {
  filters: FilterState;
  setFilters: (next: FilterState | ((previous: FilterState) => FilterState)) => void;
  updateFilters: (partial: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const DEFAULT_STATE: FilterState = {
  sports: [],
  city: '',
  nearby: false,
  priceMin: undefined,
  priceMax: undefined,
  day: '',
  amenities: []
};

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<FilterState>(DEFAULT_STATE);

  const setFilters = useCallback(
    (next: FilterState | ((previous: FilterState) => FilterState)) => {
      setFiltersState((previous) => (typeof next === 'function' ? (next as (value: FilterState) => FilterState)(previous) : next));
    },
    []
  );

  const updateFilters = useCallback((partial: Partial<FilterState>) => {
    setFiltersState((previous) => ({ ...previous, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_STATE);
  }, []);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      updateFilters,
      resetFilters
    }),
    [filters, resetFilters, setFilters, updateFilters]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
};

export const weekdayLabels: Record<Weekday, string> = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag'
};
