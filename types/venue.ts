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
  city: string;
  address: string;
  description: string;
  pricePerHour: number;
  sports: string[];
  amenities: string[];
  openingHours: Record<Weekday, VenueHours>;
  images: string[];
  externalUrl: string;
}
