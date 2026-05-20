import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import type { TypographyVariant } from '@/theme';

import { useText } from './use-text';
import type { TextColorToken } from './text.styles';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: TextColorToken;
  align?: TextStyle['textAlign'];
};

export function Text({
  variant = 'body',
  color = 'text',
  align,
  style,
  children,
  ...rest
}: TextProps) {
  const { styles } = useText({ variant, color, align });

  return (
    <RNText {...rest} style={[styles.root, style]}>
      {children}
    </RNText>
  );
}
