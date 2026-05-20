import { useMemo } from 'react';
import type { Edge } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/use-theme';
import type { SpacingToken } from '@/theme';

import { createStyles } from './container.styles';

export type UseContainerParams = {
  paddingHorizontal: SpacingToken;
  paddingVertical: SpacingToken;
  gap: SpacingToken | 'none';
  fillBackground: boolean;
  edges?: Edge[];
};

const DEFAULT_EDGES: Edge[] = ['top', 'left', 'right'];

export function useContainer({
  paddingHorizontal,
  paddingVertical,
  gap,
  fillBackground,
  edges = DEFAULT_EDGES,
}: UseContainerParams) {
  const { theme } = useTheme();

  const styles = useMemo(
    () => createStyles(theme, { paddingHorizontal, paddingVertical, gap, fillBackground }),
    [theme, paddingHorizontal, paddingVertical, gap, fillBackground],
  );

  return { styles, edges };
}
