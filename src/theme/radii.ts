export const radii = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  pill: 999,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
