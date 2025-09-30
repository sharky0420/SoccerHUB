export interface CityCoordinate {
  lat: number;
  lng: number;
  label: string;
}

export const CITY_COORDINATES: Record<string, CityCoordinate> = {
  Mannheim: { lat: 49.4875, lng: 8.466, label: "Mannheim" },
  "Ludwigshafen am Rhein": {
    lat: 49.4811,
    lng: 8.4353,
    label: "Ludwigshafen am Rhein",
  },
  "Brühl (Baden)": { lat: 49.3927, lng: 8.533, label: "Brühl (Baden)" },
  Bischofsheim: { lat: 49.9854, lng: 8.3699, label: "Bischofsheim" },
  Langen: { lat: 49.9896, lng: 8.6734, label: "Langen" },
  Mainaschaff: { lat: 49.9809, lng: 9.0833, label: "Mainaschaff" },
  Heidelberg: { lat: 49.3988, lng: 8.6724, label: "Heidelberg" },
  Dudenhofen: { lat: 49.3192, lng: 8.4206, label: "Dudenhofen" },
  Karlsruhe: { lat: 49.0069, lng: 8.4037, label: "Karlsruhe" },
  Kuppenheim: { lat: 48.8211, lng: 8.2525, label: "Kuppenheim" },
  Sindelfingen: { lat: 48.7089, lng: 9.0022, label: "Sindelfingen" },
};

export function getNearestCity(lat: number, lng: number): string | null {
  let closest: { city: string; distance: number } | null = null;

  for (const [city, coordinate] of Object.entries(CITY_COORDINATES)) {
    const distance = haversineDistance(lat, lng, coordinate.lat, coordinate.lng);

    if (!closest || distance < closest.distance) {
      closest = { city, distance };
    }
  }

  return closest?.city ?? null;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

