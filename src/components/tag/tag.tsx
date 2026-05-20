import { View } from 'react-native';

import { Text } from '@/components/text';

import { useTag } from './use-tag';
import type { TagTone } from './tag.styles';

export type TagProps = {
  label: string;
  tone?: TagTone;
};

export function Tag({ label, tone = 'neutral' }: TagProps) {
  const { styles, labelColor } = useTag({ tone });

  return (
    <View style={styles.root}>
      <Text variant="caption" style={{ color: labelColor }}>
        {label}
      </Text>
    </View>
  );
}
