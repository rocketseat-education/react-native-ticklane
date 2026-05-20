import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './setting-row.styles';

export function useSettingRow() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
