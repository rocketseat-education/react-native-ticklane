import { useCallback, useMemo, useState } from 'react';
import type { GestureResponderEvent } from 'react-native';

import { useTheme } from '@/theme/use-theme';

import { createStyles, type ButtonSize, type ButtonVariant } from './button.styles';

export type UseButtonParams = {
  variant: ButtonVariant;
  size: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export function useButton({
  variant,
  size,
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  onPress,
}: UseButtonParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const isInteractive = !isDisabled && !isLoading;

  const handlePressIn = useCallback(() => {
    if (!isInteractive) {
      return;
    }

    setIsPressed(true);
  }, [isInteractive]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (!isInteractive) {
        return;
      }

      onPress?.(event);
    },
    [isInteractive, onPress],
  );

  const styles = useMemo(
    () =>
      createStyles(theme, {
        variant,
        size,
        isPressed,
        isDisabled: !isInteractive,
        isFullWidth,
      }),
    [theme, variant, size, isPressed, isInteractive, isFullWidth],
  );

  return {
    styles,
    handlePress,
    handlePressIn,
    handlePressOut,
    isInteractive,
    isLoading,
  };
}
