import React, { ReactNode, memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { GlassSurface, DEFAULT_CORNER_RADIUS } from './Surface';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export const GlassCard = memo(({ children, style, contentStyle }: Props) => {
  return (
    <GlassSurface
      style={[styles.card, style]}
      contentStyle={[styles.content, contentStyle]}
      borderRadius={DEFAULT_CORNER_RADIUS}
    >
      {children}
    </GlassSurface>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: DEFAULT_CORNER_RADIUS
  },
  content: {
    padding: 20
  }
});
