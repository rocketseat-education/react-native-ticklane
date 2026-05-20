import { View } from 'react-native';

import { useProgressBar } from './use-progress-bar';

export type ProgressBarProps = {
  value: number;
  total: number;
};

export function ProgressBar({ value, total }: ProgressBarProps) {
  const { styles, accessibilityValue } = useProgressBar({ value, total });

  return (
    <View accessibilityRole="progressbar" accessibilityValue={accessibilityValue} style={styles.root}>
      <View style={styles.fill} />
    </View>
  );
}
