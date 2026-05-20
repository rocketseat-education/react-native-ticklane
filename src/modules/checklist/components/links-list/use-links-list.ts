import { useCallback, useMemo } from 'react';
import { Linking } from 'react-native';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './links-list.styles';

export function useLinksList() {
  const { theme } = useTheme();

  const computed = useMemo(() => createStyles(theme), [theme]);

  const handleOpenLink = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  return {
    ...computed,
    handleOpenLink,
  };
}
