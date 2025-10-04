import rawVenues from '../../../data/venues.json';

export type OpeningHours = Record<string, { open: string; close: string } | null> | null;

export type Venue = {
  id: string;
  name: string;
  city: string;
  address: string | null;
  description: string;
  pricePerHour: number | null;
  sports: string[];
  amenities: string[];
  openingHours: OpeningHours;
  notes: string | null;
  externalUrl: string | null;
  heroImage: string;
  tags: {
    livePricing: boolean;
    hasShowers: boolean;
    hasCatering: boolean;
    accessible: boolean;
  };
};

type RawVenue = (typeof rawVenues)[number];

const fallbackImages = [
  'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526285840714-3b1b83f8ddc0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'
];

const sanitiseAmenities = (amenities: RawVenue['amenities']): string[] => {
  if (!Array.isArray(amenities)) {
    return [];
  }

  return amenities
    .map((item) => (typeof item === 'string' ? item.trim() : null))
    .filter((item): item is string => Boolean(item && item.length > 0));
};

const createTags = (venue: RawVenue) => {
  const amenities = sanitiseAmenities(venue.amenities);
  const normalisedAmenities = amenities.map((item) => item.toLowerCase());

  const includesAmenity = (needle: string | string[]) => {
    const needles = Array.isArray(needle) ? needle : [needle];
    return needles.some((value) => normalisedAmenities.includes(value.toLowerCase()));
  };

  return {
    livePricing: typeof venue.pricePerHour === 'number',
    hasShowers: includesAmenity(['duschen', 'dusche']),
    hasCatering: includesAmenity(['gastronomie', 'verpflegung', 'sportsbar', 'bar']),
    accessible: includesAmenity(['barrierefrei'])
  };
};

const ensureHeroImage = (venue: RawVenue, index: number): string => {
  if (Array.isArray(venue.images) && venue.images.length > 0) {
    const source = venue.images.find((image) => typeof image === 'string' && image.length > 0);
    if (source) {
      return source;
    }
  }

  return fallbackImages[index % fallbackImages.length];
};

const normaliseField = <T>(value: T | null | undefined): T | null => {
  if (value === undefined || value === null) {
    return null;
  }
  return value;
};

export const venues: Venue[] = rawVenues.map((venue, index) => {
  const tags = createTags(venue);
  const amenities = sanitiseAmenities(venue.amenities);

  return {
    id: venue.id,
    name: venue.name,
    city: venue.city ?? 'Unbekannter Standort',
    address: normaliseField(venue.address),
    description:
      venue.description?.trim() ?? 'Für diesen Standort liegt derzeit keine Beschreibung vor.',
    pricePerHour: typeof venue.pricePerHour === 'number' ? venue.pricePerHour : null,
    sports: Array.isArray(venue.sports) ? venue.sports.filter((sport): sport is string => !!sport) : [],
    amenities,
    openingHours: venue.openingHours ?? null,
    notes: normaliseField(venue.notes),
    externalUrl: normaliseField(venue.externalUrl),
    heroImage: ensureHeroImage(venue, index),
    tags
  };
});
