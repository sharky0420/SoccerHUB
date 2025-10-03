import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

interface GlassCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  intensity?: number;
}

export const GlassCard = ({ children, style, contentStyle, intensity = 50 }: GlassCardProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.shadowContainer, style]}>
      <BlurView intensity={intensity} tint="dark" style={styles.blurContainer}>
        <LinearGradient
          colors={[colors.surface, 'rgba(94,157,255,0.08)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, contentStyle]}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 6
  },
  blurContainer: {
    flex: 1
  },
  gradient: {
    flex: 1,
    padding: 20
  }
});
