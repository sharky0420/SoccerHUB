import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  duschen: 'water-outline',
  dusche: 'water-outline',
  umkleiden: 'shirt-outline',
  parkplätze: 'car-outline',
  parkplatz: 'car-outline',
  gastronomie: 'restaurant-outline',
  verpflegung: 'fast-food-outline',
  shop: 'bag-handle-outline',
  barrierefrei: 'walk-outline',
  klimaanlage: 'snow-outline',
  kartenzahlung: 'card-outline',
  wlan: 'wifi-outline',
  sportsbar: 'beer-outline',
  "3g": 'shield-outline',
  "4g": 'shield-outline',
  freiluft: 'leaf-outline',
  outdoor: 'leaf-outline',
  indoor: 'home-outline'
};

const resolveIcon = (amenity: string): keyof typeof Ionicons.glyphMap => {
  const key = amenity.trim().toLowerCase();
  return iconMap[key] ?? 'checkmark-outline';
};

export const AmenityPill = ({ amenity }: { amenity: string }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={[styles.container, { borderColor: 'rgba(140,255,218,0.25)' }]}>
      <Ionicons name={resolveIcon(amenity)} size={16} color={colors.aqua} style={styles.icon} />
      <Text style={[typography.caption, styles.label]} numberOfLines={1}>
        {amenity}
      </Text>
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
    color: 'white',
    maxWidth: 140
  }
});
