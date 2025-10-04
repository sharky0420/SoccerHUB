import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeProvider';
import { useFavorites } from '../context/FavoritesContext';
import { VenueCard } from '../components/VenueCard';
import { RootStackParamList, TabParamList } from '../types/navigation';

type FavoritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Favorites'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const FavoritesScreen = () => {
  const { typography } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[typography.headingL, styles.title]}>Favoriten</Text>
          <Text style={[typography.caption, styles.subtitle]}>
            {favorites.length} {favorites.length === 1 ? 'gespeicherte Halle' : 'gespeicherte Hallen'}
          </Text>
        </View>

        {favorites.length === 0 ? (
          <GlassCard contentStyle={styles.cardContent}>
            <Text style={[typography.headingM, styles.emptyTitle]}>Noch keine Favoriten</Text>
            <Text style={[typography.caption, styles.copy]}>
              Tippe auf das Herzsymbol bei einer Halle, um sie hier zu speichern und schneller
              wiederzufinden.
            </Text>
          </GlassCard>
        ) : (
          favorites.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onPress={() => navigation.navigate('VenueDetail', { venueId: venue.id })}
              isFavorite={isFavorite(venue.id)}
              onToggleFavorite={() => toggleFavorite(venue.id)}
            />
          ))
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
    flex: 1
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
    gap: 20
  },
  header: {
    gap: 6
  },
  title: {
    color: 'white'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)'
  },
  cardContent: {
    padding: 20,
    gap: 12
  },
  copy: {
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22
  },
  emptyTitle: {
    color: 'white'
  }
});
