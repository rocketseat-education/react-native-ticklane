import { useCallback, useMemo, useState } from 'react';
import type { GestureResponderEvent } from 'react-native';

import { useTheme } from '@/theme/use-theme';

import {
  createStyles,
  type IconButtonSize,
  type IconButtonVariant,
} from './icon-button.styles';

export type UseIconButtonParams = {
  variant: IconButtonVariant;
  size: IconButtonSize;
  isDisabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export function useIconButton({
  variant,
  size,
  isDisabled = false,
  onPress,
}: UseIconButtonParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    if (isDisabled) {
      return;
    }

    setIsPressed(true);
  }, [isDisabled]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) {
        return;
      }

      onPress?.(event);
    },
    [isDisabled, onPress],
  );

  const computed = useMemo(
    () => createStyles(theme, { variant, size, isPressed, isDisabled }),
    [theme, variant, size, isPressed, isDisabled],
  );

  return {
    ...computed,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
