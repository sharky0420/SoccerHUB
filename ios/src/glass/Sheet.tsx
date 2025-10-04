import React, { ReactNode, memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { GlassSurface } from './Surface';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const SHEET_RADIUS = 28;

export const GlassSheet = memo(({ children, style, contentStyle }: Props) => {
  return (
    <GlassSurface
      style={[styles.sheet, style]}
      contentStyle={[styles.content, contentStyle]}
      borderRadius={SHEET_RADIUS}
    >
      {children}
    </GlassSurface>
  );
});

const styles = StyleSheet.create({
  sheet: {
    borderRadius: SHEET_RADIUS
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20
  }
});
