import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { MapPreview } from '../components/MapPreview';
import { VenueCard } from '../components/VenueCard';
import { Venue, venues } from '../data/venues';
import { RootStackParamList, TabParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeProvider';
import { useFilters } from '../context/FiltersContext';
import { filterVenues } from '../utils/filtering';
import { useFavorites } from '../context/FavoritesContext';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

type FilterKey = 'livePricing' | 'showers' | 'catering' | 'accessible';

type FilterConfig = {
  key: FilterKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  predicate: (venue: Venue) => boolean;
};

const quickFilters: FilterConfig[] = [
  {
    key: 'livePricing',
    label: 'Live Preis',
    icon: 'flash-outline',
    predicate: (venue) => venue.tags.livePricing
  },
  {
    key: 'showers',
    label: 'Duschen',
    icon: 'water-outline',
    predicate: (venue) => venue.tags.hasShowers
  },
  {
    key: 'catering',
    label: 'Gastro',
    icon: 'restaurant-outline',
    predicate: (venue) => venue.tags.hasCatering
  },
  {
    key: 'accessible',
    label: 'Barrierefrei',
    icon: 'walk-outline',
    predicate: (venue) => venue.tags.accessible
  }
];

export const HomeScreen = ({ navigation }: Props) => {
  const { typography, colors } = useTheme();
  const { filters } = useFilters();
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites();

  const advancedFiltered = useMemo(() => filterVenues(venues, filters), [filters]);

  const filteredVenues = useMemo(() => {
    if (activeFilters.size === 0) {
      return advancedFiltered;
    }

    return advancedFiltered.filter((venue) =>
      Array.from(activeFilters).every((key) => {
        const filter = quickFilters.find((item) => item.key === key);
        return filter ? filter.predicate(venue) : true;
      })
    );
  }, [activeFilters, advancedFiltered]);

  const visibleVenues = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return filteredVenues;
    }

    return filteredVenues.filter((venue) => {
      const haystacks = [venue.name, venue.city, venue.address, venue.description].filter(Boolean);
      return haystacks.some((item) => item!.toLowerCase().includes(query));
    });
  }, [filteredVenues, searchQuery]);

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set<FilterKey>());

  const featuredVenue = visibleVenues[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[typography.caption, styles.caption]}>Aktuell verfügbar</Text>
            <Text style={[typography.headingXL, styles.title]}>Finde deinen Court</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarButton}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80'
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.aqua} style={styles.searchIcon} />
          <TextInput
            style={[typography.caption, styles.searchInput]}
            placeholder="Suche nach Halle, Stadt oder Adresse"
            placeholderTextColor="rgba(255,255,255,0.45)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              accessibilityRole="button"
              accessibilityLabel="Suche löschen"
            >
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          )}
        </View>

        {featuredVenue && (
          <MapPreview>
            <View style={styles.mapOverlay}>
              <GlassCard contentStyle={styles.mapCalloutContent} intensity={80}>
                <Text style={[typography.caption, styles.caption]}>Spotlight</Text>
                <Text style={[typography.headingM, styles.calloutTitle]} numberOfLines={2}>
                  {featuredVenue.name}
                </Text>
                <View style={styles.calloutMeta}>
                  <Ionicons name="navigate" size={16} color={colors.aqua} />
                  <Text style={[typography.caption, styles.calloutLabel]}>{featuredVenue.city}</Text>
                </View>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => navigation.navigate('VenueDetail', { venueId: featuredVenue.id })}
                >
                  <Text style={[typography.caption, styles.ctaText]}>Details ansehen</Text>
                  <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
              </GlassCard>
            </View>
          </MapPreview>
        )}

        <GlassCard>
          <View style={styles.quickFiltersHeader}>
            <Text style={[typography.headingM, styles.quickFiltersTitle]}>Schnellfilter</Text>
            <TouchableOpacity
              style={[
                styles.manageButton,
                activeFilters.size === 0 && styles.manageButtonDisabled
              ]}
              onPress={clearFilters}
              disabled={activeFilters.size === 0}
            >
              <Ionicons
                name={activeFilters.size === 0 ? 'options-outline' : 'close-circle-outline'}
                size={16}
                color={colors.aqua}
              />
              <Text style={[typography.caption, styles.manageLabel]}>
                {activeFilters.size === 0 ? 'Zurücksetzen' : 'Filter löschen'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quickFiltersRow}>
            {quickFilters.map((filter) => {
              const isActive = activeFilters.has(filter.key);
              return (
                <TouchableOpacity
                  key={filter.label}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => toggleFilter(filter.key)}
                >
                  <Ionicons
                    name={filter.icon}
                    size={16}
                    color={isActive ? '#05080F' : colors.aqua}
                  />
                  <Text
                    style={[
                      typography.caption,
                      styles.filterLabel,
                      isActive && { color: '#05080F' }
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </GlassCard>

        <View style={styles.listHeader}>
          <View>
            <Text style={[typography.headingL, styles.listTitle]}>Standorte</Text>
            <Text style={[typography.caption, styles.listSubtitle]}>
              {visibleVenues.length} {visibleVenues.length === 1 ? 'Treffer' : 'Treffer'}
            </Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('Filters')}>
            <Text style={[typography.caption, styles.viewAllLabel]}>Erweiterte Filter</Text>
          </TouchableOpacity>
        </View>

        {visibleVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onPress={() => navigation.navigate('VenueDetail', { venueId: venue.id })}
            isFavorite={isFavorite(venue.id)}
            onToggleFavorite={() => toggleFavorite(venue.id)}
          />
        ))}

        {visibleVenues.length === 0 && (
          <GlassCard style={styles.emptyStateCard} contentStyle={styles.emptyStateContent}>
            <Ionicons name="sparkles-outline" size={28} color={colors.aqua} />
            <Text style={[typography.headingM, styles.emptyStateTitle]}>Keine passenden Courts</Text>
            <Text style={[typography.caption, styles.emptyStateCopy]}>
              Passe deine Filter an, um weitere Standorte im Rhein-Neckar-Gebiet zu entdecken.
            </Text>
          </GlassCard>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#05080F'
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(9,14,24,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.25)',
    marginBottom: 24,
    gap: 10
  },
  searchIcon: {
    marginRight: 4
  },
  searchInput: {
    flex: 1,
    color: 'white'
  },
  caption: {
    color: 'rgba(255,255,255,0.65)'
  },
  title: {
    color: 'white',
    marginTop: 4
  },
  avatarButton: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.25)'
  },
  avatar: {
    width: 44,
    height: 44
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24
  },
  mapCalloutContent: {
    padding: 18
  },
  calloutTitle: {
    color: 'white',
    marginTop: 6
  },
  calloutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  calloutLabel: {
    color: 'rgba(255,255,255,0.75)',
    marginLeft: 6
  },
  ctaButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(63,111,219,0.85)'
  },
  ctaText: {
    color: 'white',
    marginRight: 8
  },
  quickFiltersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  quickFiltersTitle: {
    color: 'white'
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(92,225,230,0.12)'
  },
  manageButtonDisabled: {
    opacity: 0.6
  },
  manageLabel: {
    color: 'white',
    marginLeft: 6
  },
  quickFiltersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(15,30,48,0.65)'
  },
  filterChipActive: {
    backgroundColor: 'rgba(92,225,230,0.85)'
  },
  filterLabel: {
    color: 'white',
    marginLeft: 6
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 12
  },
  listTitle: {
    color: 'white'
  },
  listSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4
  },
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  viewAllLabel: {
    color: 'rgba(255,255,255,0.7)'
  },
  emptyStateCard: {
    marginTop: 12,
    marginBottom: 40
  },
  emptyStateContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  emptyStateTitle: {
    color: 'white'
  },
  emptyStateCopy: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center'
  }
});
