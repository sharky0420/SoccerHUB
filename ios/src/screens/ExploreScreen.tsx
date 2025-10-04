import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard, GlassHeader, GLASS_HEADER_HEIGHT, GlassSheet } from '../glass';
import { useTheme } from '../theme/ThemeProvider';

type Collection = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const collections: Collection[] = [
  { id: 'a', label: 'Premium Arena', icon: 'sparkles-outline' },
  { id: 'b', label: 'Rooftop Turf', icon: 'cloud-outline' },
  { id: 'c', label: 'Night League', icon: 'moon-outline' },
  { id: 'd', label: 'Youth Clinics', icon: 'ribbon-outline' }
];

type Experience = {
  id: string;
  title: string;
  distance: string;
  rating: string;
  surface: string;
};

const experiences: Experience[] = [
  { id: '1', title: 'Velocity Hub', distance: '2.1 km', rating: '4.9', surface: 'Indoor' },
  { id: '2', title: 'Skyline Pitch', distance: '4.5 km', rating: '4.8', surface: 'Outdoor' },
  { id: '3', title: 'Coastal Grounds', distance: '6.3 km', rating: '4.7', surface: 'Hybrid' }
];

export const ExploreScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const contentTop = GLASS_HEADER_HEIGHT + insets.top + 32;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GlassHeader title="Entdecken" subtitle="Kuratiertes Liquid Glass Netzwerk" scrollY={scrollY} />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false
        })}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: contentTop,
            paddingBottom: Math.max(insets.bottom, 20) + 96
          }
        ]}
      >
        <GlassCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Kollektionen</Text>
          <View style={styles.collectionGrid}>
            {collections.map((collection) => (
              <View
                key={collection.id}
                style={[styles.collectionTile, { borderColor: colors.elevatedBorder, backgroundColor: `${colors.accent}0D` }]}
              >
                <Ionicons name={collection.icon} size={20} color={colors.accent} />
                <Text style={[styles.collectionLabel, { color: colors.text }]}>{collection.label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <GlassCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Filtern nach</Text>
          <View style={styles.filterRow}>
            {['Live-Scoring', 'Barrierefrei', 'Hydro-Refill', 'LED-Lights'].map((filter) => (
              <View key={filter} style={[styles.filterChip, { borderColor: colors.elevatedBorder }]}> 
                <Text style={[styles.filterLabel, { color: colors.mutedText }]}>{filter}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <GlassSheet>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Beliebte Orte</Text>
          {experiences.map((experience) => (
            <View key={experience.id} style={[styles.experienceRow, { borderColor: colors.elevatedBorder }]}>
              <View style={styles.experienceCopy}>
                <Text style={[styles.experienceTitle, { color: colors.text }]}>{experience.title}</Text>
                <Text style={[styles.experienceMeta, { color: colors.mutedText }]}>
                  {experience.surface} · {experience.distance} entfernt
                </Text>
              </View>
              <View style={[styles.ratingBadge, { backgroundColor: `${colors.accent}1A` }]}> 
                <Ionicons name="star" size={14} color={colors.accent} />
                <Text style={[styles.ratingValue, { color: colors.accent }]}>{experience.rating}</Text>
              </View>
            </View>
          ))}
        </GlassSheet>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 18
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16
  },
  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  collectionTile: {
    width: '47%',
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 12
  },
  collectionLabel: {
    fontSize: 15,
    fontWeight: '600'
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  filterChip: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500'
  },
  experienceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  experienceCopy: {
    flex: 1,
    gap: 4
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  experienceMeta: {
    fontSize: 13
  },
  ratingBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '600'
  }
});
