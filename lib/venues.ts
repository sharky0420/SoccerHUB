import venues from "@/data/venues.json";
import type { Venue } from "@/types/venue";

export const allVenues = venues as Venue[];

export const getVenueById = (id: string): Venue | undefined =>
  allVenues.find((venue) => venue.id === id);

export const getUniqueSports = (): string[] => {
  const values = new Set<string>();
  allVenues.forEach((venue) => venue.sports.forEach((sport) => values.add(sport)));
  return Array.from(values).sort((a, b) => a.localeCompare(b));
};

export const getUniqueAmenities = (): string[] => {
  const values = new Set<string>();
  allVenues.forEach((venue) => venue.amenities.forEach((amenity) => values.add(amenity)));
  return Array.from(values).sort((a, b) => a.localeCompare(b));
};
