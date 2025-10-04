import React, { ReactNode, memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { GlassSurface } from './Surface';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const TAB_RADIUS = 24;

export const GlassTabBarBackground = memo(({ children, style }: Props) => {
  const { glass } = useTheme();

  return (
    <GlassSurface
      style={[styles.surface, style]}
      contentStyle={styles.content}
      borderRadius={TAB_RADIUS}
      gradient={glass.highlightGradient}
    >
      {children}
    </GlassSurface>
  );
});

const styles = StyleSheet.create({
  surface: {
    borderRadius: TAB_RADIUS
  },
  content: {
    borderRadius: TAB_RADIUS,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
