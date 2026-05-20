import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './profile-section.styles';

export function useProfileSection() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
