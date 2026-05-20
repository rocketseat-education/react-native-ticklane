import { useCallback, useMemo, useState } from 'react';
import type { TextInputProps } from 'react-native';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './input.styles';

type TextInputFocusHandler = NonNullable<TextInputProps['onFocus']>;
type TextInputBlurHandler = NonNullable<TextInputProps['onBlur']>;
type TextInputFocusEvent = Parameters<TextInputFocusHandler>[0];
type TextInputBlurEvent = Parameters<TextInputBlurHandler>[0];

export type UseInputParams = {
  hasError: boolean;
  isDisabled: boolean;
  onFocus?: TextInputFocusHandler;
  onBlur?: TextInputBlurHandler;
};

export function useInput({ hasError, isDisabled, onFocus, onBlur }: UseInputParams) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (event: TextInputFocusEvent) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: TextInputBlurEvent) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const styles = useMemo(
    () => createStyles(theme, { isFocused, hasError, isDisabled }),
    [theme, isFocused, hasError, isDisabled],
  );

  const placeholderColor = theme.colors.textSubtle;

  return { styles, placeholderColor, handleFocus, handleBlur };
}
