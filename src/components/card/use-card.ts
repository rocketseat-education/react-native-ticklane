import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { RadiusToken, ShadowToken, SpacingToken } from '@/theme';

import { createStyles, type CardSurface } from './card.styles';

export type UseCardParams = {
  surface: CardSurface;
  padding: SpacingToken;
  radius: RadiusToken;
  shadow: ShadowToken;
  withBorder: boolean;
};

export function useCard(params: UseCardParams) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme, params), [theme, params]);

  return { styles };
}
