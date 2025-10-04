import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Venue } from '../data/venues';
import { useTheme } from '../theme/ThemeProvider';
import { AmenityPill } from './AmenityPill';

interface VenueCardProps {
  venue: Venue;
  onPress: () => void;
}

const priceFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0
});

export const VenueCard = ({ venue, onPress }: VenueCardProps) => {
  const { typography, colors } = useTheme();

  const priceLabel = useMemo(() => {
    if (typeof venue.pricePerHour === 'number') {
      return priceFormatter.format(venue.pricePerHour);
    }
    return 'Preis auf Anfrage';
  }, [venue.pricePerHour]);

  const amenities = venue.amenities.slice(0, 3);

  return (
    <Pressable style={styles.container} onPress={onPress} accessibilityRole="button">
      <ImageBackground
        source={{ uri: venue.heroImage }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay}>
          <View style={styles.badgeRow}>
            {venue.tags.livePricing && (
              <View style={styles.badge}>
                <Ionicons name="flash" size={16} color={colors.neon} />
                <Text style={[typography.caption, styles.badgeLabel]}>Live Preis</Text>
              </View>
            )}
            <View style={[styles.badge, styles.locationBadge]}>
              <Ionicons name="navigate" size={16} color={colors.aqua} />
              <Text style={[typography.caption, styles.badgeLabel]}>{venue.city}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={[typography.headingM, styles.title]} numberOfLines={2}>
              {venue.name}
            </Text>
            <Text style={[typography.caption, styles.subtitle]} numberOfLines={1}>
              {venue.address ?? venue.notes ?? 'Adresse auf Anfrage'}
            </Text>
          </View>
          <View style={styles.pricePill}>
            <Ionicons name="cash-outline" size={16} color={colors.aqua} />
            <Text style={[typography.caption, styles.priceLabel]}>{priceLabel}</Text>
          </View>
        </View>
        <Text style={[typography.caption, styles.description]} numberOfLines={2}>
          {venue.description}
        </Text>
        <View style={styles.amenitiesRow}>
          {amenities.map((amenity) => (
            <AmenityPill key={amenity} amenity={amenity} />
          ))}
          {amenities.length === 0 && (
            <Text style={[typography.caption, styles.placeholder]}>Keine Angaben zu Ausstattungen</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'rgba(9,14,24,0.68)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.18)'
  },
  image: {
    height: 200
  },
  imageRadius: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(9,14,24,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.35)',
    marginRight: 8
  },
  locationBadge: {
    backgroundColor: 'rgba(9,14,24,0.55)'
  },
  badgeLabel: {
    marginLeft: 6,
    color: 'white'
  },
  body: {
    padding: 20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  titleBlock: {
    flex: 1,
    marginRight: 12
  },
  title: {
    color: 'white'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(92,225,230,0.12)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  priceLabel: {
    color: 'white',
    marginLeft: 6
  },
  description: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 12
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14
  },
  placeholder: {
    color: 'rgba(255,255,255,0.55)'
  }
});
