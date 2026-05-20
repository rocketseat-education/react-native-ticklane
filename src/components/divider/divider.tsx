import { View } from 'react-native';

import { useDivider } from './use-divider';
import type { DividerOrientation } from './divider.styles';

export type DividerProps = {
  orientation?: DividerOrientation;
};

export function Divider({ orientation = 'horizontal' }: DividerProps) {
  const { styles } = useDivider({ orientation });

  return <View style={styles.root} />;
}
