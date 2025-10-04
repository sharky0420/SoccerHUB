import { DarkTheme, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, ColorSchemeName, useColorScheme } from 'react-native';
import { DesignPalette, designPalettes } from './colors';

export type Theme = {
  scheme: ColorSchemeName;
  reduceTransparency: boolean;
  colors: DesignPalette['colors'];
  glass: DesignPalette['glass'];
  navigationTheme: NavigationTheme;
  statusBarStyle: 'light' | 'dark';
};

const ThemeContext = createContext<Theme | null>(null);

const resolvePalette = (scheme: ColorSchemeName | null | undefined): DesignPalette => {
  if (scheme === 'dark') {
    return designPalettes.dark;
  }
  if (scheme === 'light') {
    return designPalettes.light;
  }
  return designPalettes.dark;
};

const createNavigationTheme = (scheme: ColorSchemeName, palette: DesignPalette): NavigationTheme => {
  if (scheme === 'light') {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: palette.colors.background,
        card: palette.glass.solidBackground,
        primary: palette.colors.accent,
        text: palette.colors.text,
        border: palette.colors.border,
        notification: palette.colors.accentSoft
      }
    };
  }

  return {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: palette.colors.background,
      card: palette.glass.solidBackground,
      primary: palette.colors.accent,
      text: palette.colors.text,
      border: palette.colors.border,
      notification: palette.colors.accentSoft
    }
  };
};

const useReduceTransparency = () => {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceTransparencyEnabled()
      .then((value) => {
        if (mounted) {
          setIsReduced(Boolean(value));
        }
      })
      .catch(() => {});

    const subscription = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      (value) => {
        if (typeof value === 'boolean') {
          setIsReduced(value);
          return;
        }

        if (typeof (value as { reduceTransparencyEnabled?: boolean })?.reduceTransparencyEnabled === 'boolean') {
          setIsReduced(Boolean((value as { reduceTransparencyEnabled?: boolean }).reduceTransparencyEnabled));
        }
      }
    );

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return isReduced;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const scheme = useColorScheme() ?? 'dark';
  const reduceTransparency = useReduceTransparency();
  const palette = useMemo(() => resolvePalette(scheme), [scheme]);

  const navigationTheme = useMemo(() => createNavigationTheme(scheme, palette), [palette, scheme]);

  const value = useMemo<Theme>(
    () => ({
      scheme,
      reduceTransparency,
      colors: palette.colors,
      glass: palette.glass,
      navigationTheme,
      statusBarStyle: scheme === 'dark' ? 'light' : 'dark'
    }),
    [navigationTheme, palette, reduceTransparency, scheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
