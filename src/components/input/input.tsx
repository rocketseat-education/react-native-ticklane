import { TextInput, View, type TextInputProps } from 'react-native';

import { Text } from '@/components/text';

import { useInput } from './use-input';

export type InputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export function Input({
  label,
  helperText,
  errorText,
  isDisabled = false,
  leftSlot,
  rightSlot,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const hasError = Boolean(errorText);
  const { styles, placeholderColor, handleFocus, handleBlur } = useInput({
    hasError,
    isDisabled,
    onFocus,
    onBlur,
  });

  return (
    <View style={styles.root}>
      {label ? (
        <Text variant="caption" color="textMuted">
          {label}
        </Text>
      ) : null}

      <View style={styles.field}>
        {leftSlot}
        <TextInput
          {...rest}
          editable={!isDisabled && rest.editable !== false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderColor}
          style={styles.input}
        />
        {rightSlot}
      </View>

      {hasError ? (
        <Text variant="caption" color="danger">
          {errorText}
        </Text>
      ) : helperText ? (
        <Text variant="caption" color="textSubtle">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
