export type ThemeColors = {
  background: string;
  text: string;
  mutedText: string;
  accent: string;
  accentSoft: string;
  border: string;
  elevatedBorder: string;
};

export type GlassTokens = {
  tint: 'light' | 'dark';
  intensity: number;
  blurRadius: number;
  overlayColor: string;
  gradient: [string, string];
  highlightGradient: [string, string];
  fallbackColor: string;
  solidBackground: string;
  borderColor: string;
};

export type DesignPalette = {
  colors: ThemeColors;
  glass: GlassTokens;
};

export const designPalettes: Record<'light' | 'dark', DesignPalette> = {
  light: {
    colors: {
      background: '#E9ECF6',
      text: '#0B1020',
      mutedText: 'rgba(11, 16, 32, 0.6)',
      accent: '#3478F6',
      accentSoft: '#4DD0E1',
      border: 'rgba(11, 16, 32, 0.08)',
      elevatedBorder: 'rgba(11, 16, 32, 0.12)'
    },
    glass: {
      tint: 'light',
      intensity: 65,
      blurRadius: 18,
      overlayColor: 'rgba(255, 255, 255, 0.05)',
      gradient: ['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.03)'],
      highlightGradient: ['rgba(52, 120, 246, 0.24)', 'rgba(77, 208, 225, 0.08)'],
      fallbackColor: 'rgba(255, 255, 255, 0.88)',
      solidBackground: '#FFFFFF',
      borderColor: 'rgba(255, 255, 255, 0.45)'
    }
  },
  dark: {
    colors: {
      background: '#04070F',
      text: '#F5F7FF',
      mutedText: 'rgba(245, 247, 255, 0.64)',
      accent: '#5AC8FA',
      accentSoft: '#7EF0FF',
      border: 'rgba(255, 255, 255, 0.08)',
      elevatedBorder: 'rgba(255, 255, 255, 0.12)'
    },
    glass: {
      tint: 'dark',
      intensity: 70,
      blurRadius: 18,
      overlayColor: 'rgba(2, 9, 20, 0.08)',
      gradient: ['rgba(255, 255, 255, 0.04)', 'rgba(0, 0, 0, 0.18)'],
      highlightGradient: ['rgba(90, 200, 250, 0.14)', 'rgba(126, 240, 255, 0.06)'],
      fallbackColor: 'rgba(9, 12, 24, 0.92)',
      solidBackground: '#0C101E',
      borderColor: 'rgba(255, 255, 255, 0.18)'
    }
  }
};
