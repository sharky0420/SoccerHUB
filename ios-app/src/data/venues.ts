export type Amenity =
  | 'lights'
  | 'locker'
  | 'parking'
  | 'refreshments'
  | 'indoor'
  | 'outdoor'
  | 'coaching';

export type Venue = {
  id: string;
  name: string;
  neighborhood: string;
  hourlyRate: number;
  surface: string;
  distance: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  amenities: Amenity[];
  availability: string;
  nextAvailable: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Skyline Fives Arena',
    neighborhood: 'Brooklyn Navy Yard',
    hourlyRate: 120,
    surface: '5v5 rooftop turf',
    distance: 1.2,
    rating: 4.8,
    reviewCount: 312,
    heroImage:
      'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80',
    amenities: ['lights', 'locker', 'parking', 'refreshments', 'outdoor'],
    availability: 'Prime time slots available tonight',
    nextAvailable: '7:30 PM – 9:00 PM',
    description:
      'A rooftop pitch with skyline views, pro-grade turf, and curated playlists for match nights.',
    coordinates: {
      latitude: 40.703333,
      longitude: -73.980889
    }
  },
  {
    id: '2',
    name: 'Liquid Glass Pavilion',
    neighborhood: 'Lower Manhattan',
    hourlyRate: 160,
    surface: '7v7 climate-controlled dome',
    distance: 2.5,
    rating: 4.9,
    reviewCount: 198,
    heroImage:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    amenities: ['lights', 'indoor', 'locker', 'refreshments', 'coaching'],
    availability: 'Members priority until 6:00 PM',
    nextAvailable: '9:30 PM – 11:00 PM',
    description:
      'A premium dome wrapped in electrochromic glass with adaptable lighting and dedicated analysts.',
    coordinates: {
      latitude: 40.7099,
      longitude: -74.0134
    }
  },
  {
    id: '3',
    name: 'Harborline Grounds',
    neighborhood: 'Williamsburg Waterfront',
    hourlyRate: 95,
    surface: '7v7 hybrid turf',
    distance: 1.9,
    rating: 4.6,
    reviewCount: 254,
    heroImage:
      'https://images.unsplash.com/photo-1505672678657-cc7037095e2c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['outdoor', 'parking', 'refreshments'],
    availability: 'Sunset league in progress',
    nextAvailable: '10:00 PM – 11:30 PM',
    description:
      'Flexible pitch with modular boards, perfect for pickup nights and custom tournament formats.',
    coordinates: {
      latitude: 40.7156,
      longitude: -73.9627
    }
  }
];
