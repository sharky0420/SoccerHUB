import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { MapPreview } from '../components/MapPreview';
import { VenueCard } from '../components/VenueCard';
import { venues } from '../data/venues';
import { RootStackParamList, TabParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeProvider';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen = ({ navigation }: Props) => {
  const { typography, colors } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[typography.caption, styles.caption]}>Tonight in NYC</Text>
            <Text style={[typography.headingXL, styles.title]}>Find your match</Text>
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

        <MapPreview>
          <View style={styles.mapOverlay}>
            <GlassCard style={styles.mapCallout} intensity={80}>
              <Text style={[typography.headingM, styles.calloutTitle]}>Liquid Glass Pavilion</Text>
              <View style={styles.calloutMeta}>
                <Ionicons name="navigate" size={16} color={colors.aqua} />
                <Text style={[typography.caption, styles.calloutLabel]}>2.5 mi • Slots at 9:30 PM</Text>
              </View>
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => navigation.navigate('VenueDetail', { venueId: '2' })}
              >
                <Text style={[typography.caption, styles.ctaText]}>View detail</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </TouchableOpacity>
            </GlassCard>
          </View>
        </MapPreview>

        <GlassCard>
          <View style={styles.quickFiltersHeader}>
            <Text style={[typography.headingM, styles.quickFiltersTitle]}>Quick filters</Text>
            <TouchableOpacity style={styles.manageButton}>
              <Ionicons name="options-outline" size={16} color={colors.aqua} />
              <Text style={[typography.caption, styles.manageLabel]}>Manage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quickFiltersRow}>
            {quickFilters.map((filter) => (
              <TouchableOpacity key={filter.label} style={styles.filterChip}>
                <Ionicons name={filter.icon} size={16} color={colors.aqua} />
                <Text style={[typography.caption, styles.filterLabel]}>{filter.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        <View style={styles.listHeader}>
          <Text style={[typography.headingL, styles.listTitle]}>Available tonight</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={[typography.caption, styles.viewAllLabel]}>View all</Text>
          </TouchableOpacity>
        </View>

        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} onPress={() => navigation.navigate('VenueDetail', { venueId: venue.id })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const quickFilters = [
  { label: 'Tonight only', icon: 'time-outline' as const },
  { label: 'Roof access', icon: 'cloud-outline' as const },
  { label: 'Locker rooms', icon: 'lock-closed-outline' as const },
  { label: 'Under $120', icon: 'cash-outline' as const }
];

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
  mapCallout: {
    padding: 18
  },
  calloutTitle: {
    color: 'white'
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
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  viewAllLabel: {
    color: 'rgba(255,255,255,0.7)'
  }
});
