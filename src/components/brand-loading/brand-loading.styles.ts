import { StyleSheet, type ViewStyle } from 'react-native';

const BRAND_BG = '#000000';

export const brandLoadingColors = {
  background: BRAND_BG,
  dot: '#0066FF',
} as const;

export const createStyles = (backgroundColor: string) => {
  const root: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    paddingHorizontal: 32,
  };

  const logoWrap: ViewStyle = {
    width: 280,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dotsRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 36,
  };

  const dot: ViewStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
  };

  return StyleSheet.create({ root, logoWrap, dotsRow, dot });
};
