import { useMemo } from 'react';
import type { TextStyle } from 'react-native';

import { useTheme } from '@/theme/use-theme';
import type { TypographyVariant } from '@/theme';

import { createStyles, type TextColorToken } from './text.styles';

export type UseTextParams = {
  variant: TypographyVariant;
  color: TextColorToken;
  align?: TextStyle['textAlign'];
};

export function useText({ variant, color, align }: UseTextParams) {
  const { theme } = useTheme();

  const styles = useMemo(
    () => createStyles(theme, { variant, color, align }),
    [theme, variant, color, align],
  );

  return { styles };
}
