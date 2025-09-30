import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Amenity } from '../data/venues';
import { useTheme } from '../theme/ThemeProvider';

const iconMap: Record<Amenity, keyof typeof Ionicons.glyphMap> = {
  lights: 'bulb-outline',
  locker: 'lock-closed-outline',
  parking: 'car-outline',
  refreshments: 'cafe-outline',
  indoor: 'home-outline',
  outdoor: 'leaf-outline',
  coaching: 'school-outline'
};

const labelMap: Record<Amenity, string> = {
  lights: 'Pro lighting',
  locker: 'Locker rooms',
  parking: 'Parking',
  refreshments: 'Fuel bar',
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  coaching: 'Pro coaching'
};

export const AmenityPill = ({ amenity }: { amenity: Amenity }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={[styles.container, { borderColor: 'rgba(140,255,218,0.25)' }]}> 
      <Ionicons name={iconMap[amenity]} size={16} color={colors.aqua} style={styles.icon} />
      <Text style={[typography.caption, styles.label]}>{labelMap[amenity]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(92,225,230,0.08)',
    marginRight: 8,
    marginBottom: 8
  },
  icon: {
    marginRight: 6
  },
  label: {
    color: 'white'
  }
});
