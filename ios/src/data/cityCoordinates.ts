export interface CityCoordinate {
  lat: number;
  lng: number;
  label: string;
}

export const CITY_COORDINATES: Record<string, CityCoordinate> = {
  'Bad Homburg': { lat: 50.226, lng: 8.6182, label: 'Bad Homburg' },
  Bischofsheim: { lat: 49.9854, lng: 8.3699, label: 'Bischofsheim' },
  Bretten: { lat: 49.0383, lng: 8.7043, label: 'Bretten' },
  Bruchsal: { lat: 49.1241, lng: 8.5981, label: 'Bruchsal' },
  'Brühl (Baden)': { lat: 49.3927, lng: 8.533, label: 'Brühl (Baden)' },
  Darmstadt: { lat: 49.8728, lng: 8.6512, label: 'Darmstadt' },
  Dudenhofen: { lat: 49.3192, lng: 8.4206, label: 'Dudenhofen' },
  Frankfurt: { lat: 50.1109, lng: 8.6821, label: 'Frankfurt' },
  'Frankfurt am Main': { lat: 50.1109, lng: 8.6821, label: 'Frankfurt am Main' },
  'Freiburg im Breisgau': { lat: 47.999, lng: 7.8421, label: 'Freiburg im Breisgau' },
  Heidelberg: { lat: 49.3988, lng: 8.6724, label: 'Heidelberg' },
  Karlsruhe: { lat: 49.0069, lng: 8.4037, label: 'Karlsruhe' },
  Kuppenheim: { lat: 48.8211, lng: 8.2525, label: 'Kuppenheim' },
  Langen: { lat: 49.9896, lng: 8.6734, label: 'Langen' },
  Ludwigshafen: { lat: 49.4811, lng: 8.4353, label: 'Ludwigshafen' },
  'Ludwigshafen am Rhein': { lat: 49.4811, lng: 8.4353, label: 'Ludwigshafen am Rhein' },
  Mannheim: { lat: 49.4875, lng: 8.466, label: 'Mannheim' },
  Mainaschaff: { lat: 49.9809, lng: 9.0833, label: 'Mainaschaff' },
  Mainz: { lat: 49.9929, lng: 8.2473, label: 'Mainz' },
  'Neu-Isenburg': { lat: 50.0483, lng: 8.6941, label: 'Neu-Isenburg' },
  'Nußloch': { lat: 49.3236, lng: 8.6978, label: 'Nußloch' },
  'Offenbach am Main': { lat: 50.0956, lng: 8.7761, label: 'Offenbach am Main' },
  Sindelfingen: { lat: 48.7089, lng: 9.0022, label: 'Sindelfingen' },
  Walldorf: { lat: 49.3064, lng: 8.6414, label: 'Walldorf' },
  Wiesbaden: { lat: 50.0782, lng: 8.2398, label: 'Wiesbaden' }
};

export const DEFAULT_REGION = {
  latitude: 50.0,
  longitude: 8.5,
  latitudeDelta: 4.5,
  longitudeDelta: 4.5
};
