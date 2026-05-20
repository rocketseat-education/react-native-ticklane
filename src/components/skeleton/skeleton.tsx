import { Animated, type DimensionValue } from 'react-native';

import type { RadiusToken } from '@/theme';

import { useSkeleton } from './use-skeleton';

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: RadiusToken;
};

export function Skeleton({ width = '100%', height = 20, radius = 'sm' }: SkeletonProps) {
  const { styles, opacity } = useSkeleton({ width, height, radius });

  return <Animated.View style={[styles.root, { opacity }]} />;
}
