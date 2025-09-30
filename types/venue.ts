export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface VenueHours {
  open: string;
  close: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  description: string;
  pricePerHour: number | null;
  sports: string[];
  amenities: string[];
  openingHours: Partial<Record<Weekday, VenueHours | null>> | null;
  images: string[];
  externalUrl: string;
  notes?: string | null;
}
