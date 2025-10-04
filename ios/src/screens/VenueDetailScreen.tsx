import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  ImageBackground,
  Linking,
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

const priceFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0
});

const formatDay = (day: string) => {
  switch (day) {
    case 'monday':
      return 'Montag';
    case 'tuesday':
      return 'Dienstag';
    case 'wednesday':
      return 'Mittwoch';
    case 'thursday':
      return 'Donnerstag';
    case 'friday':
      return 'Freitag';
    case 'saturday':
      return 'Samstag';
    case 'sunday':
      return 'Sonntag';
    default:
      return day;
  }
};

export const VenueDetailScreen = ({ navigation }: Props) => {
  const { typography, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<VenueDetailRouteProp>();

  const venue = useMemo(() => {
    const id = route.params?.venueId ?? venues[0].id;
    return venues.find((item) => item.id === id) ?? venues[0];
  }, [route.params?.venueId]);

  const priceLabel =
    typeof venue.pricePerHour === 'number'
      ? `${priceFormatter.format(venue.pricePerHour)} / Stunde`
      : 'Preis auf Anfrage';

  const openingHours = useMemo(() => {
    if (!venue.openingHours) {
      return [] as Array<[string, { open: string; close: string }]>;
    }
    return Object.entries(venue.openingHours).filter(
      (entry): entry is [string, { open: string; close: string }] => Boolean(entry[1])
    );
  }, [venue.openingHours]);

  const handleOpenWebsite = () => {
    if (venue.externalUrl) {
      Linking.openURL(venue.externalUrl).catch(() => undefined);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: venue.heroImage }} style={styles.hero}>
        <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
          <View style={[styles.heroHeader, { paddingTop: insets.top + 12 }]}>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Zurück"
            >
              <Ionicons name="chevron-back" size={22} color="white" />
            </TouchableOpacity>
            {venue.externalUrl && (
              <TouchableOpacity
                style={styles.heroButton}
                accessibilityLabel="Website öffnen"
                onPress={handleOpenWebsite}
              >
                <Ionicons name="open-outline" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
        <View style={styles.heroOverlay}>
          <Text style={[typography.headingXL, styles.heroTitle]} numberOfLines={2}>
            {venue.name}
          </Text>
          <View style={styles.heroMeta}>
            <Ionicons name="location-outline" size={18} color={colors.aqua} />
            <Text style={[typography.caption, styles.heroMetaLabel]}>
              {venue.address ?? venue.city}
            </Text>
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
              <Text style={[typography.caption, styles.infoLabel]}>Preis</Text>
              <Text style={[typography.headingL, styles.infoTitle]}>{priceLabel}</Text>
            </View>
            <View>
              <Text style={[typography.caption, styles.infoLabel]}>Sportarten</Text>
              <Text style={[typography.caption, styles.infoText]}>
                {venue.sports.length > 0 ? venue.sports.join(', ') : 'Nach Anfrage'}
              </Text>
            </View>
          </View>
          {venue.notes && (
            <View style={styles.infoRow}>
              <Ionicons name="information-circle-outline" size={18} color={colors.aqua} />
              <Text style={[typography.caption, styles.infoText]}>{venue.notes}</Text>
            </View>
          )}
          {venue.externalUrl && (
            <TouchableOpacity style={styles.infoRow} onPress={handleOpenWebsite}>
              <Ionicons name="globe-outline" size={18} color={colors.aqua} />
              <Text style={[typography.caption, styles.linkText]}>Zur Website</Text>
            </TouchableOpacity>
          )}
        </GlassCard>

        <View style={styles.section}>
          <Text style={[typography.headingM, styles.sectionTitle]}>Beschreibung</Text>
          <Text style={[typography.body, styles.sectionCopy]}>{venue.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[typography.headingM, styles.sectionTitle]}>Ausstattung</Text>
          <View style={styles.amenitiesWrap}>
            {venue.amenities.length > 0 ? (
              venue.amenities.map((amenity) => <AmenityPill key={amenity} amenity={amenity} />)
            ) : (
              <Text style={[typography.caption, styles.sectionCopy]}>Keine Angaben verfügbar.</Text>
            )}
          </View>
        </View>

        {openingHours.length > 0 && (
          <View style={styles.section}>
            <Text style={[typography.headingM, styles.sectionTitle]}>Öffnungszeiten</Text>
            <GlassCard contentStyle={styles.hoursCard}>
              {openingHours.map(([day, hours]) => (
                <View key={day} style={styles.hoursRow}>
                  <Text style={[typography.caption, styles.hoursDay]}>{formatDay(day)}</Text>
                  <Text style={[typography.caption, styles.hoursValue]}>
                    {hours.open} – {hours.close}
                  </Text>
                </View>
              ))}
            </GlassCard>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[typography.headingM, styles.sectionTitle]}>Standort</Text>
          <GlassCard contentStyle={styles.mapCardContent}>
            <View style={styles.mapRow}>
              <Ionicons name="navigate" size={20} color={colors.aqua} />
              <Text style={[typography.caption, styles.mapLabel]} numberOfLines={2}>
                {venue.address ? `${venue.address}, ${venue.city}` : venue.city}
              </Text>
            </View>
            <Text style={[typography.caption, styles.mapHint]}>Adresse für Navigation kopieren</Text>
          </GlassCard>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.bookingBarSafeArea}>
        <View style={styles.bookingBar}>
          <View>
            <Text style={[typography.caption, styles.bookingLabel]}>Kontakt</Text>
            <Text style={[typography.headingM, styles.bookingValue]} numberOfLines={1}>
              {venue.externalUrl ? 'Online buchen' : 'Verfügbarkeit anfragen'}
            </Text>
          </View>
          <TouchableOpacity style={styles.bookingButton} onPress={handleOpenWebsite}>
            <Text style={[typography.caption, styles.bookingButtonLabel]}>
              {venue.externalUrl ? 'Website öffnen' : 'Infos anfordern'}
            </Text>
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
    backgroundColor: 'rgba(5,8,15,0.35)'
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
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 18
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4
  },
  infoTitle: {
    color: 'white'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  infoText: {
    color: 'rgba(255,255,255,0.75)',
    marginLeft: 10,
    flex: 1
  },
  linkText: {
    color: '#5CE1E6',
    marginLeft: 10
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    color: 'white',
    marginBottom: 12
  },
  sectionCopy: {
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22
  },
  amenitiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  hoursCard: {
    padding: 18,
    gap: 12
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hoursDay: {
    color: 'rgba(255,255,255,0.75)'
  },
  hoursValue: {
    color: 'white'
  },
  mapCardContent: {
    padding: 20,
    gap: 8
  },
  mapRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mapLabel: {
    color: 'rgba(255,255,255,0.85)',
    marginLeft: 8,
    flex: 1
  },
  mapHint: {
    color: 'rgba(255,255,255,0.6)'
  },
  bookingBarSafeArea: {
    backgroundColor: '#05080F'
  },
  bookingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  bookingLabel: {
    color: 'rgba(255,255,255,0.65)'
  },
  bookingValue: {
    color: 'white'
  },
  bookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(63,111,219,0.85)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  bookingButtonLabel: {
    color: 'white'
  }
});
