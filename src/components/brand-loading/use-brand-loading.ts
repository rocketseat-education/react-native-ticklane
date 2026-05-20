import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const LOGO = require('../../../assets/images/logo.png');

export function useBrandLoading() {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.88);
  const dot1 = useSharedValue(0.35);
  const dot2 = useSharedValue(0.35);
  const dot3 = useSharedValue(0.35);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) });
    logoScale.value = withSequence(
      withTiming(1, { duration: 520, easing: Easing.out(Easing.back(1.15)) }),
      withRepeat(
        withSequence(
          withTiming(1.06, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      ),
    );

    const pulse = (delayMs: number) =>
      withDelay(
        delayMs,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 420, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.3, { duration: 420, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          false,
        ),
      );

    dot1.value = pulse(0);
    dot2.value = pulse(180);
    dot3.value = pulse(360);
    // Valores animados: efeito único de arranque + loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const dot1Style = useAnimatedStyle(() => ({ opacity: dot1.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dot2.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dot3.value }));

  return {
    logoSource: LOGO,
    logoAnimatedStyle,
    dot1Style,
    dot2Style,
    dot3Style,
  };
}
