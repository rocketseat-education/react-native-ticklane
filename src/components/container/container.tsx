import type { ReactNode } from 'react';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import type { SpacingToken } from '@/theme';

import { useContainer } from './use-container';

export type ContainerProps = {
  children: ReactNode;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  gap?: SpacingToken | 'none';
  fillBackground?: boolean;
  edges?: Edge[];
};

export function Container({
  children,
  paddingHorizontal = 'lg',
  paddingVertical = 'lg',
  gap = 'lg',
  fillBackground = true,
  edges,
}: ContainerProps) {
  const { styles, edges: resolvedEdges } = useContainer({
    paddingHorizontal,
    paddingVertical,
    gap,
    fillBackground,
    edges,
  });

  return (
    <SafeAreaView edges={resolvedEdges} style={styles.root}>
      {children}
    </SafeAreaView>
  );
}
