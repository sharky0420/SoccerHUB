import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeProvider';
import { useFilters, weekdayLabels } from '../context/FiltersContext';
import { venues } from '../data/venues';
import { filterVenues, weekdayOrder } from '../utils/filtering';
import { VenueCard } from '../components/VenueCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Filters'>;
}

const getUniqueValues = (items: string[]): string[] => Array.from(new Set(items)).sort((a, b) => a.localeCompare(b));

export const FiltersScreen = ({ navigation }: Props) => {
  const { typography, colors } = useTheme();
  const { filters, updateFilters, resetFilters } = useFilters();

  const sportOptions = useMemo(() => getUniqueValues(venues.flatMap((venue) => venue.sports)), []);
  const amenityOptions = useMemo(() => getUniqueValues(venues.flatMap((venue) => venue.amenities)), []);

  const filteredVenues = useMemo(() => filterVenues(venues, filters), [filters]);

  const toggleValue = (value: string, current: string[], onChange: (next: string[]) => void) => {
    const exists = current.includes(value);
    const next = exists ? current.filter((item) => item !== value) : [...current, value];
    onChange(next);
  };

  const handleSportToggle = (sport: string) => toggleValue(sport, filters.sports, (next) => updateFilters({ sports: next }));
  const handleAmenityToggle = (amenity: string) =>
    toggleValue(amenity, filters.amenities, (next) => updateFilters({ amenities: next }));

  const handlePriceChange = (value: string, key: 'priceMin' | 'priceMax') => {
    const numeric = value.trim() === '' ? undefined : Number.parseInt(value, 10);
    updateFilters({ [key]: Number.isNaN(numeric) ? undefined : numeric });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={[typography.caption, styles.caption]}>Filter konfigurieren</Text>
            <Text style={[typography.headingXL, styles.title]}>Feinjustierung</Text>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters} accessibilityRole="button">
            <Ionicons name="refresh" size={18} color={colors.aqua} />
            <Text style={[typography.caption, styles.resetLabel]}>Zurücksetzen</Text>
          </TouchableOpacity>
        </View>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <Text style={[typography.headingM, styles.sectionTitle]}>Standort</Text>
            <Text style={[typography.caption, styles.sectionDescription]}>
              Suche nach Städten oder Stadtteilen in unserem Netzwerk.
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <Ionicons name="search" size={18} color={colors.aqua} />
            <TextInput
              style={[typography.caption, styles.input]}
              placeholder="Stadt suchen"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={filters.city}
              onChangeText={(value) => updateFilters({ city: value })}
            />
          </View>
        </GlassCard>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <Text style={[typography.headingM, styles.sectionTitle]}>Sportarten</Text>
            <Text style={[typography.caption, styles.sectionDescription]}>
              Wähle eine oder mehrere Disziplinen aus.
            </Text>
          </View>
          <View style={styles.chipGrid}>
            {sportOptions.map((sport) => {
              const active = filters.sports.includes(sport);
              return (
                <TouchableOpacity
                  key={sport}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => handleSportToggle(sport)}
                  accessibilityRole="button"
                >
                  <Ionicons
                    name={active ? 'checkmark-circle' : 'ellipse-outline'}
                    size={16}
                    color={active ? '#05080F' : colors.aqua}
                  />
                  <Text
                    style={[typography.caption, styles.chipLabel, active && styles.chipLabelActive]}
                    numberOfLines={1}
                  >
                    {sport}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </GlassCard>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <Text style={[typography.headingM, styles.sectionTitle]}>Preis & Zeitraum</Text>
            <Text style={[typography.caption, styles.sectionDescription]}>
              Definiere Budget und optional einen Wochentag.
            </Text>
          </View>
          <View style={styles.priceRow}>
            <View style={styles.priceColumn}>
              <Text style={[typography.caption, styles.caption]}>Min</Text>
              <TextInput
                style={[typography.caption, styles.priceInput]}
                keyboardType="number-pad"
                placeholder="€"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={filters.priceMin ? String(filters.priceMin) : ''}
                onChangeText={(value) => handlePriceChange(value, 'priceMin')}
              />
            </View>
            <View style={styles.priceColumn}>
              <Text style={[typography.caption, styles.caption]}>Max</Text>
              <TextInput
                style={[typography.caption, styles.priceInput]}
                keyboardType="number-pad"
                placeholder="€"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={filters.priceMax ? String(filters.priceMax) : ''}
                onChangeText={(value) => handlePriceChange(value, 'priceMax')}
              />
            </View>
          </View>
          <View style={styles.dayRow}>
            {weekdayOrder.map((day) => {
              const active = filters.day === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayChip, active && styles.dayChipActive]}
                  onPress={() => updateFilters({ day: active ? '' : day })}
                >
                  <Text
                    style={[typography.caption, styles.dayLabel, active && styles.dayLabelActive]}
                  >
                    {weekdayLabels[day].slice(0, 2)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </GlassCard>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <Text style={[typography.headingM, styles.sectionTitle]}>Ausstattung</Text>
            <Text style={[typography.caption, styles.sectionDescription]}>
              Markiere relevante Extras für dein Team.
            </Text>
          </View>
          <View style={styles.chipGrid}>
            {amenityOptions.map((amenity) => {
              const active = filters.amenities.includes(amenity);
              return (
                <TouchableOpacity
                  key={amenity}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => handleAmenityToggle(amenity)}
                  accessibilityRole="button"
                >
                  <Ionicons
                    name={active ? 'star' : 'star-outline'}
                    size={16}
                    color={active ? '#05080F' : colors.aqua}
                  />
                  <Text
                    style={[typography.caption, styles.chipLabel, active && styles.chipLabelActive]}
                    numberOfLines={1}
                  >
                    {amenity}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </GlassCard>

        <View style={styles.summaryCard}>
          <Text style={[typography.headingM, styles.summaryTitle]}>
            {filteredVenues.length} {filteredVenues.length === 1 ? 'Treffer' : 'Treffer'}
          </Text>
          <Text style={[typography.caption, styles.summaryCaption]}>
            Ergebnisse werden automatisch für Karte und Listenansicht übernommen.
          </Text>
        </View>

        {filteredVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onPress={() => {
              navigation.navigate('VenueDetail', { venueId: venue.id });
            }}
          />
        ))}

        {filteredVenues.length === 0 && (
          <GlassCard contentStyle={styles.emptyContent}>
            <Ionicons name="sparkles-outline" size={28} color={colors.aqua} />
            <Text style={[typography.headingM, styles.emptyTitle]}>Keine Treffer</Text>
            <Text style={[typography.caption, styles.emptyCopy]}>
              Passe die Filter an oder lösche sie, um weitere Standorte einzublenden.
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
    padding: 20,
    paddingBottom: 40,
    gap: 20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  caption: {
    color: 'rgba(255,255,255,0.65)'
  },
  title: {
    color: 'white',
    marginTop: 4
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.35)',
    backgroundColor: 'rgba(9,14,24,0.55)'
  },
  resetLabel: {
    color: 'white',
    marginLeft: 6
  },
  sectionHeader: {
    marginBottom: 14
  },
  sectionTitle: {
    color: 'white'
  },
  sectionDescription: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(9,14,24,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.25)',
    gap: 10
  },
  input: {
    flex: 1,
    color: 'white'
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(9,14,24,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.2)'
  },
  chipActive: {
    backgroundColor: 'rgba(92,225,230,0.85)'
  },
  chipLabel: {
    color: 'white',
    marginLeft: 8,
    maxWidth: 120
  },
  chipLabelActive: {
    color: '#05080F'
  },
  priceRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16
  },
  priceColumn: {
    flex: 1
  },
  priceInput: {
    marginTop: 6,
    backgroundColor: 'rgba(9,14,24,0.6)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.25)',
    color: 'white'
  },
  dayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.25)',
    backgroundColor: 'rgba(9,14,24,0.6)'
  },
  dayChipActive: {
    backgroundColor: 'rgba(63,111,219,0.9)',
    borderColor: 'rgba(63,111,219,0.9)'
  },
  dayLabel: {
    color: 'white'
  },
  dayLabelActive: {
    color: '#05080F'
  },
  summaryCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(9,14,24,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.25)'
  },
  summaryTitle: {
    color: 'white'
  },
  summaryCaption: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6
  },
  emptyContent: {
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
