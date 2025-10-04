import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

type WebViewStyle = ViewStyle & {
  backdropFilter?: string;
  WebkitBackdropFilter?: string;
};

type Props = ViewProps & {
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark';
  gradient?: [string, string];
  borderRadius?: number;
};

type CSSSupports = {
  supports?: (property: string, value?: string) => boolean;
};

const useBackdropFilterSupport = () => {
  const [supported, setSupported] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    let mounted = true;
    const detect = () => {
      if (typeof window === 'undefined') {
        return;
      }
      const css = (window as typeof window & { CSS?: CSSSupports }).CSS;
      const hasSupport = Boolean(
        css &&
          (css.supports?.('backdrop-filter', 'blur(12px)') ||
            css.supports?.('-webkit-backdrop-filter', 'blur(12px)'))
      );
      if (mounted) {
        setSupported(hasSupport);
      }
    };

    if (typeof document === 'undefined') {
      detect();
      return () => {
        mounted = false;
      };
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      detect();
      return () => {
        mounted = false;
      };
    }

    const listener = () => detect();
    window.addEventListener('DOMContentLoaded', listener, { once: true });

    return () => {
      window.removeEventListener('DOMContentLoaded', listener);
      mounted = false;
    };
  }, []);

  return supported;
};

export const DEFAULT_CORNER_RADIUS = 22;

export const GlassSurface = ({
  style,
  contentStyle,
  children,
  intensity,
  tint,
  gradient,
  borderRadius = DEFAULT_CORNER_RADIUS,
  ...props
}: Props) => {
  const { glass, reduceTransparency } = useTheme();
  const supportsBackdrop = useBackdropFilterSupport();
  const effectiveTint = tint ?? glass.tint;
  const blurIntensity = intensity ?? glass.intensity;
  const gradientColors = gradient ?? glass.gradient;

  const showGlass = !reduceTransparency;
  const shouldUseNativeBlur = showGlass && Platform.OS === 'ios';
  const shouldUseWebBlur = showGlass && Platform.OS === 'web' && supportsBackdrop;
  const fallbackBackground = reduceTransparency ? glass.solidBackground : glass.fallbackColor;

  const webBlurStyle = useMemo<WebViewStyle>(() => {
    if (!shouldUseWebBlur) {
      return { backgroundColor: fallbackBackground, borderRadius };
    }

    return {
      backgroundColor: glass.overlayColor,
      backdropFilter: `blur(${glass.blurRadius}px)`,
      WebkitBackdropFilter: `blur(${glass.blurRadius}px)`,
      borderRadius
    };
  }, [fallbackBackground, glass.blurRadius, glass.overlayColor, borderRadius, shouldUseWebBlur]);

  return (
    <View {...props} style={[styles.container, { borderRadius, borderColor: glass.borderColor }, style]}>
      {shouldUseNativeBlur && (
        <BlurView
          pointerEvents="none"
          tint={effectiveTint}
          intensity={blurIntensity}
          style={[StyleSheet.absoluteFill, styles.blurLayer, { borderRadius }]}
        />
      )}
      {Platform.OS === 'android' && (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.androidFallback, { borderRadius, backgroundColor: fallbackBackground }]}
        />
      )}
      {Platform.OS === 'web' && (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.webFallback, webBlurStyle]} />
      )}
      {!shouldUseNativeBlur && Platform.OS === 'ios' && (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.iosFallback, { borderRadius, backgroundColor: fallbackBackground }]}
        />
      )}
      {showGlass && (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.overlay, { borderRadius, backgroundColor: glass.overlayColor }]}
        />
      )}
      {showGlass && (
        <LinearGradient
          pointerEvents="none"
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
        />
      )}
      <View style={[styles.content, { borderRadius }, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth
  },
  content: {
    borderRadius: DEFAULT_CORNER_RADIUS,
    padding: 0
  },
  blurLayer: {
    borderRadius: DEFAULT_CORNER_RADIUS
  },
  overlay: {
    borderRadius: DEFAULT_CORNER_RADIUS
  },
  androidFallback: {
    borderRadius: DEFAULT_CORNER_RADIUS
  },
  iosFallback: {
    borderRadius: DEFAULT_CORNER_RADIUS
  },
  webFallback: {
    borderRadius: DEFAULT_CORNER_RADIUS
  }
});
