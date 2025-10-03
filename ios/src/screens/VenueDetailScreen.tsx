import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AmenityPill } from '../components/AmenityPill';
import { GlassCard } from '../components/GlassCard';
import { venues } from '../data/venues';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeProvider';

type VenueDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VenueDetail'>;
type VenueDetailRouteProp = RouteProp<RootStackParamList, 'VenueDetail'>;

interface Props {
  navigation: VenueDetailNavigationProp;
}

export const VenueDetailScreen = ({ navigation }: Props) => {
  const { typography, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<VenueDetailRouteProp>();

  const venue = useMemo(() => {
    const id = route.params?.venueId ?? venues[0].id;
    return venues.find((item) => item.id === id) ?? venues[0];
  }, [route.params?.venueId]);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: venue.heroImage }} style={styles.hero}>
        <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
          <View style={[styles.heroHeader, { paddingTop: insets.top + 12 }]}>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go back"
            >
              <Ionicons name="chevron-back" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroButton} accessibilityLabel="Save to favorites">
              <Ionicons name="heart-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.heroOverlay}>
          <Text style={[typography.headingXL, styles.heroTitle]}>{venue.name}</Text>
          <View style={styles.heroMeta}>
            <Ionicons name="location-outline" size={18} color={colors.aqua} />
            <Text style={[typography.caption, styles.heroMetaLabel]}>{venue.neighborhood}</Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.infoCard} contentStyle={styles.infoCardContent}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={[typography.headingL, styles.infoTitle]}>${venue.hourlyRate}/hr</Text>
              <Text style={[typography.caption, styles.infoSubhead]}>{venue.surface}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={18} color={colors.neon} />
              <Text style={[typography.caption, styles.ratingLabel]}>{venue.rating.toFixed(1)}</Text>
              <Text style={[typography.caption, styles.ratingCount]}>({venue.reviewCount})</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={colors.aqua} />
            <Text style={[typography.caption, styles.infoText]}>{venue.availability}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="flash-outline" size={18} color={colors.aqua} />
            <Text style={[typography.caption, styles.infoText]}>{venue.nextAvailable}</Text>
          </View>
        </GlassCard>

        <View style={styles.section}>
          <Text style={[typography.headingM, styles.sectionTitle]}>Overview</Text>
          <Text style={[typography.body, styles.sectionCopy]}>{venue.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[typography.headingM, styles.sectionTitle]}>Amenities</Text>
          <View style={styles.amenitiesWrap}>
            {venue.amenities.map((amenity) => (
              <AmenityPill key={amenity} amenity={amenity} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[typography.headingM, styles.sectionTitle]}>Location</Text>
          <GlassCard contentStyle={styles.mapCardContent}>
            <View style={styles.mapRow}>
              <Ionicons name="navigate" size={20} color={colors.aqua} />
              <Text style={[typography.caption, styles.mapLabel]}>
                {venue.coordinates.latitude.toFixed(4)}° N, {venue.coordinates.longitude.toFixed(4)}° W
              </Text>
            </View>
            <Text style={[typography.caption, styles.mapHint]}>Tap to open in Maps</Text>
          </GlassCard>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.bookingBarSafeArea}>
        <View style={styles.bookingBar}>
          <View>
            <Text style={[typography.caption, styles.bookingLabel]}>Next slot</Text>
            <Text style={[typography.headingM, styles.bookingValue]}>{venue.nextAvailable}</Text>
          </View>
          <TouchableOpacity style={styles.bookingButton}>
            <Text style={[typography.caption, styles.bookingButtonLabel]}>Request booking</Text>
            <Ionicons name="arrow-forward" size={18} color="white" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05080F'
  },
  hero: {
    height: 380
  },
  heroSafeArea: {
    flex: 1
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  heroButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)'
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'rgba(5,8,15,0.25)'
  },
  heroTitle: {
    color: 'white'
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  heroMetaLabel: {
    color: 'rgba(255,255,255,0.85)',
    marginLeft: 6
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -32
  },
  infoCard: {
    marginBottom: 24
  },
  infoCardContent: {
    padding: 20
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  infoTitle: {
    color: 'white'
  },
  infoSubhead: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(140,255,218,0.15)'
  },
  ratingLabel: {
    color: 'white',
    marginLeft: 6
  },
  ratingCount: {
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 4
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  infoText: {
    marginLeft: 10,
    color: 'rgba(255,255,255,0.8)'
  },
  section: {
    marginBottom: 28
  },
  sectionTitle: {
    color: 'white',
    marginBottom: 12
  },
  sectionCopy: {
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 24
  },
  amenitiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  mapCardContent: {
    padding: 20
  },
  mapRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mapLabel: {
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 10
  },
  mapHint: {
    color: 'rgba(255,255,255,0.55)',
    marginTop: 12
  },
  bookingBarSafeArea: {
    backgroundColor: 'transparent'
  },
  bookingBar: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(15,30,48,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(92,225,230,0.18)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bookingLabel: {
    color: 'rgba(255,255,255,0.6)'
  },
  bookingValue: {
    color: 'white',
    marginTop: 4
  },
  bookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(63,111,219,0.9)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  bookingButtonLabel: {
    color: 'white'
  }
});
