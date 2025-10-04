import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, type LatLng, type Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { GlassCard } from '../components/GlassCard';
import { Venue, venues } from '../data/venues';
import { CITY_COORDINATES, DEFAULT_REGION } from '../data/cityCoordinates';
import { useFilters } from '../context/FiltersContext';
import { filterVenues, formatCurrency } from '../utils/filtering';
import { RootStackParamList, TabParamList } from '../types/navigation';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../context/FavoritesContext';

interface MapVenue {
  venue: Venue;
  coordinate: LatLng;
  isLive: boolean;
}

type MapScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Map'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: MapScreenNavigationProp;
}

const createDeterministicOffset = (seed: string) => {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }

  const lat = ((hash % 1000) / 1000 - 0.5) * 0.08;
  const lng = ((((hash / 1000) | 0) % 1000) / 1000 - 0.5) * 0.12;
  return { lat, lng };
};

const computeMapVenues = (items: Venue[]): MapVenue[] =>
  items
    .map((venue, index) => {
      if (!venue.city) {
        return null;
      }
      const coordinate = CITY_COORDINATES[venue.city] ?? CITY_COORDINATES[venue.city.trim()];
      if (!coordinate) {
        return null;
      }
      const jitter = createDeterministicOffset(venue.id ?? `venue-${index}`);
      return {
        venue,
        coordinate: {
          latitude: coordinate.lat + jitter.lat,
          longitude: coordinate.lng + jitter.lng
        },
        isLive: typeof venue.pricePerHour === 'number'
      } as MapVenue;
    })
    .filter((entry): entry is MapVenue => entry !== null);

const computeRegion = (points: MapVenue[]): Region => {
  if (points.length === 0) {
    return DEFAULT_REGION;
  }

  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  points.forEach(({ coordinate }) => {
    minLat = Math.min(minLat, coordinate.latitude);
    maxLat = Math.max(maxLat, coordinate.latitude);
    minLng = Math.min(minLng, coordinate.longitude);
    maxLng = Math.max(maxLng, coordinate.longitude);
  });

  const latitude = (minLat + maxLat) / 2;
  const longitude = (minLng + maxLng) / 2;
  const latitudeDelta = Math.max(0.5, (maxLat - minLat) * 1.8);
  const longitudeDelta = Math.max(0.5, (maxLng - minLng) * 1.8);

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
};

export const MapScreen = ({ navigation }: Props) => {
  const { typography, colors } = useTheme();
  const { filters } = useFilters();
  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredVenues = useMemo(() => filterVenues(venues, filters), [filters]);
  const mapVenues = useMemo(() => computeMapVenues(filteredVenues), [filteredVenues]);
  const initialRegion = useMemo(() => computeRegion(mapVenues), [mapVenues]);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(mapVenues[0]?.venue.id ?? null);

  const selectedVenue = useMemo(
    () => mapVenues.find((entry) => entry.venue.id === selectedVenueId) ?? null,
    [mapVenues, selectedVenueId]
  );

  useEffect(() => {
    if (mapVenues.length === 0) {
      setSelectedVenueId(null);
      return;
    }

    if (!selectedVenueId || !mapVenues.some((entry) => entry.venue.id === selectedVenueId)) {
      setSelectedVenueId(mapVenues[0]?.venue.id ?? null);
    }
  }, [mapVenues, selectedVenueId]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View>
          <Text style={[typography.headingL, styles.title]}>Standorte</Text>
          <Text style={[typography.caption, styles.subtitle]}>
            {mapVenues.length} {mapVenues.length === 1 ? 'Halle' : 'Hallen'} auf der Karte
          </Text>
        </View>
        <TouchableOpacity
          style={styles.filtersButton}
          onPress={() => navigation.navigate('Filters')}
          accessibilityRole="button"
        >
          <Ionicons name="options-outline" size={18} color={colors.aqua} />
          <Text style={[typography.caption, styles.filtersLabel]}>Filter anpassen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapWrapper}>
        <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
          {mapVenues.map((entry) => (
            <Marker
              key={entry.venue.id}
              coordinate={entry.coordinate}
              pinColor={entry.isLive ? '#1FB864' : '#9AB8AF'}
              identifier={entry.venue.id}
              onPress={() => setSelectedVenueId(entry.venue.id)}
              onSelect={() => setSelectedVenueId(entry.venue.id)}
            >
              <Callout
                tooltip
                onPress={() => navigation.navigate('VenueDetail', { venueId: entry.venue.id })}
              >
                <View style={styles.calloutContainer}>
                  <Text style={[typography.caption, styles.calloutTitle]}>{entry.venue.name}</Text>
                  <Text style={[typography.caption, styles.calloutSubtitle]}>{entry.venue.city}</Text>
                  <Text style={[typography.caption, styles.calloutAction]}>Tippen für Details</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      <GlassCard style={styles.detailsCard} contentStyle={styles.cardContent}>
        {selectedVenue ? (
          <View style={styles.cardInner}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[typography.caption, styles.cardEyebrow]}>{selectedVenue.venue.city}</Text>
                <Text style={[typography.headingM, styles.cardTitle]} numberOfLines={2}>
                  {selectedVenue.venue.name}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.favoriteButton, isFavorite(selectedVenue.venue.id) && styles.favoriteButtonActive]}
                onPress={() => toggleFavorite(selectedVenue.venue.id)}
                accessibilityRole="button"
                accessibilityLabel={
                  isFavorite(selectedVenue.venue.id)
                    ? 'Aus Favoriten entfernen'
                    : 'Zu Favoriten hinzufügen'
                }
              >
                <Ionicons
                  name={isFavorite(selectedVenue.venue.id) ? 'heart' : 'heart-outline'}
                  size={18}
                  color={isFavorite(selectedVenue.venue.id) ? '#05080F' : 'white'}
                />
              </TouchableOpacity>
              <View style={styles.pricePill}>
                <Ionicons name="cash-outline" size={16} color={colors.aqua} />
                <Text style={[typography.caption, styles.priceLabel]}>
                  {typeof selectedVenue.venue.pricePerHour === 'number'
                    ? formatCurrency(selectedVenue.venue.pricePerHour)
                    : 'Auf Anfrage'}
                </Text>
              </View>
            </View>
            <Text style={[typography.caption, styles.cardAddress]} numberOfLines={2}>
              {selectedVenue.venue.address ?? 'Adresse auf Anfrage'}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryAction]}
                onPress={() => navigation.navigate('VenueDetail', { venueId: selectedVenue.venue.id })}
              >
                <Text style={[typography.caption, styles.primaryLabel]}>Details öffnen</Text>
                <Ionicons name="arrow-forward" size={16} color="#05080F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryAction]}
                onPress={() => setSelectedVenueId(mapVenues[0]?.venue.id ?? null)}
                disabled={mapVenues.length === 0}
              >
                <Ionicons name="locate" size={16} color={colors.aqua} />
                <Text style={[typography.caption, styles.secondaryLabel]}>Ersten Standort fokussieren</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="map-outline" size={28} color={colors.aqua} />
            <Text style={[typography.headingM, styles.emptyTitle]}>Keine Marker verfügbar</Text>
            <Text style={[typography.caption, styles.emptyCopy]}>
              Aktiviere weitere Filter oder entferne Eingrenzungen, um Standorte einzublenden.
            </Text>
          </View>
        )}
      </GlassCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#05080F'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16
  },
  title: {
    color: 'white'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.35)',
    backgroundColor: 'rgba(9,14,24,0.6)'
  },
  filtersLabel: {
    color: 'white',
    marginLeft: 6
  },
  mapWrapper: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.2)'
  },
  calloutContainer: {
    backgroundColor: 'rgba(5,8,15,0.85)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.35)',
    maxWidth: 180
  },
  calloutTitle: {
    color: 'white',
    marginBottom: 4
  },
  calloutSubtitle: {
    color: 'rgba(255,255,255,0.75)' 
  },
  calloutAction: {
    color: 'rgba(92,225,230,0.85)',
    marginTop: 6
  },
  detailsCard: {
    marginHorizontal: 20,
    marginTop: -36,
    marginBottom: 20
  },
  cardContent: {
    padding: 20
  },
  cardInner: {
    gap: 16
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'flex-start'
  },
  cardEyebrow: {
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.2
  },
  cardTitle: {
    color: 'white',
    marginTop: 6
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(92,225,230,0.14)'
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)'
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(92,225,230,0.9)',
    borderColor: 'rgba(92,225,230,0.9)'
  },
  priceLabel: {
    color: 'white',
    marginLeft: 6
  },
  cardAddress: {
    color: 'rgba(255,255,255,0.75)'
  },
  cardActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16
  },
  primaryAction: {
    backgroundColor: 'rgba(63,111,219,0.9)'
  },
  primaryLabel: {
    color: '#05080F',
    marginRight: 8
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.35)',
    backgroundColor: 'rgba(9,14,24,0.5)'
  },
  secondaryLabel: {
    color: 'white',
    marginLeft: 6
  },
  emptyState: {
    alignItems: 'center',
    gap: 12
  },
  emptyTitle: {
    color: 'white'
  },
  emptyCopy: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center'
  }
});
