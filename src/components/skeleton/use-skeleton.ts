import { useEffect, useMemo, useRef } from 'react';
import { Animated, type DimensionValue } from 'react-native';

import { useTheme } from '@/theme/use-theme';
import type { RadiusToken } from '@/theme';

import { createStyles } from './skeleton.styles';

export type UseSkeletonParams = {
  width: DimensionValue;
  height: DimensionValue;
  radius: RadiusToken;
};

const PULSE_DURATION_MS = 900;
const MIN_OPACITY = 0.5;
const MAX_OPACITY = 1;

export function useSkeleton({ width, height, radius }: UseSkeletonParams) {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(MIN_OPACITY)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: MAX_OPACITY,
          duration: PULSE_DURATION_MS,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: MIN_OPACITY,
          duration: PULSE_DURATION_MS,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [opacity]);

  const styles = useMemo(
    () => createStyles(theme, { width, height, radius }),
    [theme, width, height, radius],
  );

  return { styles, opacity };
}
