import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTabBarIcon } from './use-tab-bar-icon';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

export type TabBarIconProps = {
  name: FeatherIconName;
  color: string;
};

export function TabBarIcon({ name, color }: TabBarIconProps) {
  const { styles, iconSize } = useTabBarIcon();

  return (
    <View style={styles.root}>
      <Feather name={name} size={iconSize} color={color} />
    </View>
  );
}
