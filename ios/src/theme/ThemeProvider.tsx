import { DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';
import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { gradients, palette } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export type Theme = {
  colors: typeof palette;
  gradients: typeof gradients;
  spacing: typeof spacing;
  typography: typeof typography;
  scheme: ColorSchemeName;
  navigationTheme: NavigationTheme;
};

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const scheme = useColorScheme() ?? 'dark';

  const navigationTheme = useMemo<NavigationTheme>(
    () => ({
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: palette.cerulean,
        background: palette.midnight,
        card: palette.surface,
        text: palette.white,
        border: 'rgba(255, 255, 255, 0.1)',
        notification: palette.aqua
      }
    }),
    []
  );

  const value = useMemo(
    () => ({
      colors: palette,
      gradients,
      spacing,
      typography,
      scheme,
      navigationTheme
    }),
    [scheme, navigationTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
