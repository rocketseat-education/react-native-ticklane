import { useCallback, useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles, type CheckboxSize } from './checkbox.styles';

export type UseCheckboxParams = {
  size: CheckboxSize;
  isChecked: boolean;
  isDisabled: boolean;
  onChange?: (next: boolean) => void;
};

export function useCheckbox({ size, isChecked, isDisabled, onChange }: UseCheckboxParams) {
  const { theme } = useTheme();

  const computed = useMemo(
    () => createStyles(theme, { size, isChecked, isDisabled }),
    [theme, size, isChecked, isDisabled],
  );

  const handlePress = useCallback(() => {
    if (isDisabled) {
      return;
    }

    onChange?.(!isChecked);
  }, [isDisabled, isChecked, onChange]);

  return { ...computed, handlePress };
}
