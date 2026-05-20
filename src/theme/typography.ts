import { Platform, type TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: {
    sans: 'System',
    rounded: 'System',
    mono: 'Menlo',
  },
  android: {
    sans: 'sans-serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  default: {
    sans: 'System',
    rounded: 'System',
    mono: 'monospace',
  },
})!;

export const typography = {
  family: fontFamily,
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  variants: {
    display: {
      fontSize: 32,
      lineHeight: 38,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    h1: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '700',
      letterSpacing: -0.3,
    },
    h2: {
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    h3: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '600',
    },
    body: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: '400',
    },
    bodyMedium: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: '500',
    },
    bodySm: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
    },
    mono: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '400',
    },
  },
} as const;

export type TypographyVariant = keyof typeof typography.variants;

export type TypographyVariantStyle = TextStyle;
