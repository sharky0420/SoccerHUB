import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeProvider';

export const ProfileScreen = () => {
  const { typography } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=256&q=80'
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={[typography.headingL, styles.name]}>Jordan Mercer</Text>
            <Text style={[typography.caption, styles.subtitle]}>Club captain • Skyline Fives</Text>
          </View>
        </View>
        <GlassCard contentStyle={styles.cardContent}>
          <Text style={[typography.caption, styles.copy]}>
            Manage account, payment methods, and your upcoming fixtures. Future updates will connect to
            Apple Wallet passes, Live Activities, and shareable match highlights.
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16
  },
  name: {
    color: 'white'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6
  },
  cardContent: {
    padding: 20
  },
  copy: {
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22
  }
});
