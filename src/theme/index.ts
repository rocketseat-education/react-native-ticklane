import { darkColors, lightColors, type ColorTokens } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { sizes } from './sizes';
import { spacing } from './spacing';
import { typography } from './typography';

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  colors: ColorTokens;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: typeof shadows;
  sizes: typeof sizes;
  typography: typeof typography;
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  radii,
  shadows,
  sizes,
  typography,
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  radii,
  shadows,
  sizes,
  typography,
};

export const themes: Record<ThemeMode, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

export { darkColors, lightColors } from './colors';
export type { ColorTokens } from './colors';
export { radii } from './radii';
export type { RadiusToken } from './radii';
export { shadows } from './shadows';
export type { ShadowToken } from './shadows';
export { sizes } from './sizes';
export type { SizeToken } from './sizes';
export { spacing } from './spacing';
export type { SpacingToken } from './spacing';
export { typography } from './typography';
export type { TypographyVariant, TypographyVariantStyle } from './typography';
