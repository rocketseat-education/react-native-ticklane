import { Feather } from '@expo/vector-icons';

import { Input } from '@/components/input';

import { useSearchBar } from './use-search-bar';

export type SearchBarProps = {
  value?: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
};

export function SearchBar({ value, placeholder, onChangeText, onFocus }: SearchBarProps) {
  const { styles, iconSize } = useSearchBar();

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      onFocus={onFocus}
      leftSlot={<Feather name="search" size={iconSize} color={styles.icon.color} />}
    />
  );
}
