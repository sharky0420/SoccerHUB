import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeProvider';

export const FiltersScreen = () => {
  const { typography } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[typography.headingL, styles.title]}>Filters</Text>
        <GlassCard contentStyle={styles.cardContent}>
          <Text style={[typography.caption, styles.copy]}>
            Use the upcoming iterations of this screen to configure complex filters, including price
            sliders, facility features, and advanced scheduling with bottom-sheet interactions.
          </Text>
        </GlassCard>
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
    padding: 20
  },
  title: {
    color: 'white',
    marginBottom: 20
  },
  cardContent: {
    padding: 20
  },
  copy: {
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22
  }
});
