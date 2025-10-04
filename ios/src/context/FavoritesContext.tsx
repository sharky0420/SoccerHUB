import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Venue, venues } from '../data/venues';

interface FavoritesContextValue {
  favoriteIds: string[];
  favorites: Venue[];
  isFavorite: (venueId: string) => boolean;
  addFavorite: (venueId: string) => void;
  removeFavorite: (venueId: string) => void;
  toggleFavorite: (venueId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const addFavorite = useCallback((venueId: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(venueId)) {
        return prev;
      }
      return [...prev, venueId];
    });
  }, []);

  const removeFavorite = useCallback((venueId: string) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== venueId));
  }, []);

  const toggleFavorite = useCallback(
    (venueId: string) => {
      setFavoriteIds((prev) => {
        const exists = prev.includes(venueId);
        if (exists) {
          return prev.filter((id) => id !== venueId);
        }
        return [...prev, venueId];
      });
    },
    []
  );

  const favorites = useMemo(
    () => venues.filter((venue) => venue.id && favoriteIdSet.has(venue.id)),
    [favoriteIdSet]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      favorites,
      isFavorite: (venueId: string) => favoriteIdSet.has(venueId),
      addFavorite,
      removeFavorite,
      toggleFavorite
    }),
    [favoriteIds, favorites, favoriteIdSet, addFavorite, removeFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
