import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard, GlassHeader, GLASS_HEADER_HEIGHT, GlassSheet } from '../glass';
import { useTheme } from '../theme/ThemeProvider';

type Highlight = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const highlights: Highlight[] = [
  {
    title: 'Play instantly',
    description: 'Drop-in matches open all day with live availability.',
    icon: 'flash-outline'
  },
  {
    title: 'Team management',
    description: 'Invite friends and lock squads with one tap.',
    icon: 'people-outline'
  },
  {
    title: 'Advanced analytics',
    description: 'Track form, fatigue and game rhythm in real time.',
    icon: 'analytics-outline'
  }
];

const upcomingMatches = [
  { id: '1', opponent: 'Urban Strikers', location: 'Arena Nord', time: 'Heute · 19:30' },
  { id: '2', opponent: 'FC Südwind', location: 'City Dome', time: 'Sa · 17:00' }
];

export const HomeScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const contentTop = GLASS_HEADER_HEIGHT + insets.top + 32;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GlassHeader title="SoccerHUB" subtitle="Liquid Glass experience" scrollY={scrollY} />
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
          <Text style={[styles.cardTitle, { color: colors.text }]}>Match readiness</Text>
          <Text style={[styles.body, { color: colors.mutedText }]}>Stay hydrated, arrive 10 minutes early and sync your wearables for richer stats.</Text>
          <View style={styles.statRow}>
            <View style={[styles.statPill, { backgroundColor: `${colors.accent}1A` }]}> 
              <Ionicons name="pulse-outline" size={18} color={colors.accent} />
              <Text style={[styles.statLabel, { color: colors.accent }]}>Peak form</Text>
            </View>
            <View style={[styles.statPill, { backgroundColor: `${colors.accentSoft}1A` }]}> 
              <Ionicons name="cloud-outline" size={18} color={colors.accentSoft} />
              <Text style={[styles.statLabel, { color: colors.accentSoft }]}>Indoor climate</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Why players love SoccerHUB</Text>
          <View style={styles.highlightList}>
            {highlights.map((item) => (
              <View key={item.title} style={styles.highlightItem}>
                <View style={[styles.iconBadge, { backgroundColor: `${colors.accent}14` }]}> 
                  <Ionicons name={item.icon} size={18} color={colors.accent} />
                </View>
                <View style={styles.highlightCopy}>
                  <Text style={[styles.highlightTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.body, { color: colors.mutedText }]}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </GlassCard>

        <GlassSheet>
          <Text style={[styles.sheetTitle, { color: colors.text }]}>Nächste Matches</Text>
          {upcomingMatches.map((match) => (
            <View key={match.id} style={[styles.matchRow, { borderColor: colors.elevatedBorder }]}>
              <View style={styles.matchInfo}>
                <Text style={[styles.matchOpponent, { color: colors.text }]}>{match.opponent}</Text>
                <Text style={[styles.matchMeta, { color: colors.mutedText }]}>{match.location}</Text>
              </View>
              <Text style={[styles.matchTime, { color: colors.accent }]}>{match.time}</Text>
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
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12
  },
  body: {
    fontSize: 15,
    lineHeight: 20
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16
  },
  statPill: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600'
  },
  highlightList: {
    gap: 16
  },
  highlightItem: {
    flexDirection: 'row',
    gap: 12
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  highlightCopy: {
    flex: 1,
    gap: 4
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent'
  },
  matchInfo: {
    flex: 1
  },
  matchOpponent: {
    fontSize: 16,
    fontWeight: '600'
  },
  matchMeta: {
    marginTop: 4,
    fontSize: 13
  },
  matchTime: {
    fontSize: 13,
    fontWeight: '600'
  }
});
