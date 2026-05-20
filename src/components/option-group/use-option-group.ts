import { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createOptionStyles, createStyles } from './option-group.styles';

export type OptionItem<TValue extends string> = {
  value: TValue;
  label: string;
};

export type UseOptionGroupParams<TValue extends string> = {
  value: TValue;
  onChange: (next: TValue) => void;
};

export function useOptionGroup<TValue extends string>({
  value,
  onChange,
}: UseOptionGroupParams<TValue>) {
  const { theme } = useTheme();
  const [pressedValue, setPressedValue] = useState<TValue | null>(null);

  const containerStyles = useMemo(() => createStyles(theme), [theme]);

  const getOptionState = useCallback(
    (optionValue: TValue) =>
      createOptionStyles(theme, {
        isSelected: optionValue === value,
        isPressed: optionValue === pressedValue,
      }),
    [theme, value, pressedValue],
  );

  const handlePressIn = useCallback((optionValue: TValue) => {
    setPressedValue(optionValue);
  }, []);

  const handlePressOut = useCallback(() => {
    setPressedValue(null);
  }, []);

  const handlePress = useCallback(
    (optionValue: TValue) => {
      if (optionValue !== value) {
        onChange(optionValue);
      }
    },
    [value, onChange],
  );

  return {
    containerStyles,
    getOptionState,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
