import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles, type DividerOrientation } from './divider.styles';

export type UseDividerParams = {
  orientation: DividerOrientation;
};

export function useDivider({ orientation }: UseDividerParams) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme, { orientation }), [theme, orientation]);

  return { styles };
}
