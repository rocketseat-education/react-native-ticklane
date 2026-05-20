export type ColorTokens = {
  bg: string;
  surface: string;
  surfaceMuted: string;
  surfaceElevated: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  textInverse: string;
  primary: string;
  primaryMuted: string;
  primaryContrast: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  overlay: string;
  transparent: string;
  star: string;
};

export const darkColors: ColorTokens = {
  bg: '#0B0C0F',
  surface: '#121418',
  surfaceMuted: '#16191F',
  surfaceElevated: '#1B1E25',
  border: '#1F232B',
  borderStrong: '#2A2F39',
  text: '#F4F5F7',
  textMuted: '#A8AEB8',
  textSubtle: '#6B7280',
  textInverse: '#0B0C0F',
  primary: '#6366F1',
  primaryMuted: '#4F46E5',
  primaryContrast: '#FFFFFF',
  accent: '#22D3EE',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  overlay: 'rgba(0, 0, 0, 0.6)',
  transparent: 'transparent',
  star: '#FBBF24',
};

export const lightColors: ColorTokens = {
  bg: '#FFFFFF',
  surface: '#FAFAFB',
  surfaceMuted: '#F2F3F5',
  surfaceElevated: '#FFFFFF',
  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
  text: '#0F1115',
  textMuted: '#4B5563',
  textSubtle: '#9CA3AF',
  textInverse: '#FFFFFF',
  primary: '#4F46E5',
  primaryMuted: '#6366F1',
  primaryContrast: '#FFFFFF',
  accent: '#0891B2',
  success: '#059669',
  warning: '#D97706',
  danger: '#DC2626',
  overlay: 'rgba(15, 17, 21, 0.5)',
  transparent: 'transparent',
  star: '#F59E0B',
};
