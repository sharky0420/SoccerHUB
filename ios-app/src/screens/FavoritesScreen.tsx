import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeProvider';

export const FavoritesScreen = () => {
  const { typography } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={[typography.headingL, styles.title]}>Favorites</Text>
        <GlassCard style={styles.card}>
          <Text style={[typography.caption, styles.copy]}>
            Save your go-to pitches here. Booked venues will surface with upcoming reservations,
            loyalty perks, and instant re-booking actions.
          </Text>
        </GlassCard>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#05080F'
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    color: 'white',
    marginBottom: 20
  },
  card: {
    padding: 20
  },
  copy: {
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22
  }
});
