import { Feather } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './tab-bar-create-icon.styles';

export type TabBarCreateIconProps = {
  color: string;
};

export function TabBarCreateIcon({ color }: TabBarCreateIconProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.root}>
      <Feather name="plus" size={theme.sizes.iconTabEmphasized} color={color} strokeWidth={2.4} />
    </View>
  );
}
