import React, { ReactNode, memo } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { GlassSurface, DEFAULT_CORNER_RADIUS } from './Surface';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const GLASS_HEADER_HEIGHT = 96;

type Props = {
  title: string;
  subtitle?: string;
  scrollY: Animated.Value;
  trailing?: ReactNode;
};

export const GlassHeader = memo(({ title, subtitle, scrollY, trailing }: Props) => {
  const insets = useSafeAreaInsets();
  const { colors, glass } = useTheme();
  const headerHeight = GLASS_HEADER_HEIGHT + insets.top;

  const translateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -16],
    extrapolate: 'clamp'
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.88],
    extrapolate: 'clamp'
  });

  const subtitleOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const overlayOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0.38, 0.82],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          height: headerHeight,
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          transform: [{ translateY }]
        }
      ]}
    >
      <GlassSurface contentStyle={styles.surfaceContent}>
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.densityOverlay, { opacity: overlayOpacity, backgroundColor: glass.overlayColor }]}
        />
        <View style={styles.textContainer}>
          <AnimatedText
            numberOfLines={1}
            style={[styles.title, { color: colors.text, transform: [{ scale: titleScale }] }]}
          >
            {title}
          </AnimatedText>
          {subtitle ? (
            <AnimatedText
              numberOfLines={1}
              style={[styles.subtitle, { color: colors.mutedText, opacity: subtitleOpacity }]}
            >
              {subtitle}
            </AnimatedText>
          ) : null}
        </View>
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </GlassSurface>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  surfaceContent: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  densityOverlay: {
    borderRadius: DEFAULT_CORNER_RADIUS
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500'
  },
  trailing: {
    marginLeft: 16,
    alignSelf: 'center'
  }
});
