import { StyleSheet, type TextStyle } from 'react-native';

import type { ColorTokens, Theme, TypographyVariant } from '@/theme';

export type TextColorToken = keyof Pick<
  ColorTokens,
  | 'text'
  | 'textMuted'
  | 'textSubtle'
  | 'textInverse'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent'
  | 'star'
>;

type StylesConfig = {
  variant: TypographyVariant;
  color: TextColorToken;
  align?: TextStyle['textAlign'];
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const variantStyle = theme.typography.variants[config.variant];

  return StyleSheet.create({
    root: {
      ...variantStyle,
      fontFamily: theme.typography.family.sans,
      color: theme.colors[config.color],
      textAlign: config.align,
    } as TextStyle,
  });
};
