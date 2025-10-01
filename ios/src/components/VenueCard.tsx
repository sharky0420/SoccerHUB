import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Venue } from '../data/venues';
import { useTheme } from '../theme/ThemeProvider';
import { AmenityPill } from './AmenityPill';

interface VenueCardProps {
  venue: Venue;
  onPress: () => void;
}

export const VenueCard = ({ venue, onPress }: VenueCardProps) => {
  const { typography, colors } = useTheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <ImageBackground
        source={{ uri: venue.heroImage }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay}>
          <View style={styles.badge}>
            <Ionicons name="flash" size={16} color={colors.neon} />
            <Text style={[typography.caption, styles.badgeLabel]}>{venue.nextAvailable}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={[typography.headingM, styles.title]}>{venue.name}</Text>
            <Text style={[typography.caption, styles.subtitle]}>{venue.neighborhood}</Text>
          </View>
          <View style={styles.ratingBlock}>
            <Ionicons name="star" size={16} color={colors.neon} />
            <Text style={[typography.caption, styles.rating]}>
              {venue.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <Text style={[typography.caption, styles.meta]}>{venue.surface}</Text>
          <View style={styles.dot} />
          <Text style={[typography.caption, styles.meta]}>{venue.distance.toFixed(1)} mi</Text>
          <View style={styles.dot} />
          <Text style={[typography.caption, styles.meta]}>${venue.hourlyRate}/hr</Text>
        </View>
        <View style={styles.amenitiesRow}>
          {venue.amenities.slice(0, 3).map((amenity) => (
            <AmenityPill key={amenity} amenity={amenity} />
          ))}
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
    borderColor: 'rgba(92,225,230,0.12)'
  },
  image: {
    height: 180
  },
  imageRadius: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(9,14,24,0.75)'
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
    alignItems: 'center'
  },
  titleBlock: {
    flex: 1,
    marginRight: 12
  },
  title: {
    color: 'white'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2
  },
  ratingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(140,255,218,0.15)',
    borderRadius: 16
  },
  rating: {
    color: 'white',
    marginLeft: 4
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  meta: {
    color: 'rgba(255,255,255,0.75)'
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 8
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14
  }
});
