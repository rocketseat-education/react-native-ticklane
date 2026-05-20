import { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { ChecklistItem } from '@/types';

import { createStyles } from './checklist-item-row.styles';

type UseChecklistItemRowParams = {
  item: ChecklistItem;
  onPress?: (item: ChecklistItem) => void;
};

export function useChecklistItemRow({ item, onPress }: UseChecklistItemRowParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(() => createStyles(theme, { isPressed }), [theme, isPressed]);

  const handlePress = useCallback(() => {
    onPress?.(item);
  }, [item, onPress]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  return {
    styles,
    isInteractive: Boolean(onPress),
    chevronSize: theme.sizes.iconSm,
    chevronColor: theme.colors.textSubtle,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
