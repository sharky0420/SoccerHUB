import type { Venue } from '../data/venues';
import type { FilterState, Weekday } from '../context/FiltersContext';

export const weekdayOrder: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export const filterVenues = (items: Venue[], filters: FilterState): Venue[] => {
  const normalizedCity = filters.city.trim().toLowerCase();

  return items.filter((venue) => {
    if (filters.sports.length > 0 && !filters.sports.every((sport) => venue.sports.includes(sport))) {
      return false;
    }

    if (normalizedCity.length > 0) {
      const haystack = `${venue.city ?? ''} ${venue.address ?? ''}`.toLowerCase();
      if (!haystack.includes(normalizedCity)) {
        return false;
      }
    }

    if (
      typeof filters.priceMin === 'number' &&
      (typeof venue.pricePerHour !== 'number' || venue.pricePerHour < filters.priceMin)
    ) {
      return false;
    }

    if (
      typeof filters.priceMax === 'number' &&
      (typeof venue.pricePerHour !== 'number' || venue.pricePerHour > filters.priceMax)
    ) {
      return false;
    }

    if (filters.day) {
      const schedule = venue.openingHours?.[filters.day];
      if (!schedule || (schedule.open === '' && schedule.close === '')) {
        return false;
      }
    }

    if (filters.amenities.length > 0) {
      const amenities = venue.amenities ?? [];
      if (!filters.amenities.every((amenity) => amenities.includes(amenity))) {
        return false;
      }
    }

    return true;
  });
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
