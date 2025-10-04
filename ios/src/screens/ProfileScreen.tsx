import React, { useMemo } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard, GlassHeader, GLASS_HEADER_HEIGHT, GlassSheet } from '../glass';
import { useTheme } from '../theme/ThemeProvider';

const preferences = [
  { id: 'notif', label: 'Live Alerts', description: 'Push when teammates join or reschedule.' },
  { id: 'calendar', label: 'Calendar Sync', description: 'Sync to system calendar automatically.' },
  { id: 'health', label: 'Health Bridge', description: 'Share heart-rate & recovery metrics.' }
];

export const ProfileScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const contentTop = GLASS_HEADER_HEIGHT + insets.top + 32;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GlassHeader title="Profil" subtitle="Synchronisiert mit Apple Health" scrollY={scrollY} />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false
        })}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: contentTop,
            paddingBottom: Math.max(insets.bottom, 20) + 96
          }
        ]}
      >
        <GlassCard>
          <View style={styles.profileRow}>
            <View style={[styles.avatarRing, { borderColor: `${colors.accent}4D` }]}> 
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1502720705749-3c8f62f741b4?auto=format&fit=crop&w=160&q=80'
                }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.profileCopy}>
              <Text style={[styles.profileName, { color: colors.text }]}>Leonie Hartmann</Text>
              <Text style={[styles.profileMeta, { color: colors.mutedText }]}>Club Captain · since 2021</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: `${colors.accent}1A` }]}> 
              <Ionicons name="shield-checkmark" size={16} color={colors.accent} />
              <Text style={[styles.statusLabel, { color: colors.accent }]}>Elite</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Aktivität</Text>
          <View style={styles.activityRow}>
            <View style={styles.activityItem}>
              <Text style={[styles.activityValue, { color: colors.text }]}>23</Text>
              <Text style={[styles.activityLabel, { color: colors.mutedText }]}>Matches</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={[styles.activityValue, { color: colors.text }]}>12.4 km</Text>
              <Text style={[styles.activityLabel, { color: colors.mutedText }]}>Ø Laufdistanz</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={[styles.activityValue, { color: colors.text }]}>98%</Text>
              <Text style={[styles.activityLabel, { color: colors.mutedText }]}>Attendance</Text>
            </View>
          </View>
        </GlassCard>

        <GlassSheet>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Verknüpfte Dienste</Text>
          {preferences.map((preference) => (
            <View key={preference.id} style={[styles.preferenceRow, { borderColor: colors.elevatedBorder }]}>
              <View style={styles.preferenceCopy}>
                <Text style={[styles.preferenceLabel, { color: colors.text }]}>{preference.label}</Text>
                <Text style={[styles.preferenceDescription, { color: colors.mutedText }]}>{preference.description}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
            </View>
          ))}
        </GlassSheet>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 18
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  avatarRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27
  },
  profileCopy: {
    flex: 1,
    gap: 4
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700'
  },
  profileMeta: {
    fontSize: 14
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activityItem: {
    alignItems: 'center',
    gap: 6
  },
  activityValue: {
    fontSize: 20,
    fontWeight: '700'
  },
  activityLabel: {
    fontSize: 12
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  preferenceCopy: {
    flex: 1,
    gap: 6,
    paddingRight: 16
  },
  preferenceLabel: {
    fontSize: 15,
    fontWeight: '600'
  },
  preferenceDescription: {
    fontSize: 13,
    lineHeight: 18
  },
});
