import { Pressable, View } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/text';
import type { OfflineExecutionSummary } from '@/types';

import {
  useOfflineExecutionCard,
  type OfflineExecutionCardVariant,
  type UseOfflineExecutionCardParams,
} from './use-offline-execution-card';

export type OfflineExecutionCardProps = Omit<UseOfflineExecutionCardParams, 'execution'> & {
  execution: OfflineExecutionSummary;
  variant?: OfflineExecutionCardVariant;
};

export function OfflineExecutionCard({
  execution,
  progressCaption,
  dateCaption,
  variant = 'strip',
  onPress,
}: OfflineExecutionCardProps) {
  const { styles, progressCaption: progress, dateCaption: date, handlePress, handlePressIn, handlePressOut } =
    useOfflineExecutionCard({ execution, progressCaption, dateCaption, variant, onPress });

  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Card style={styles.root} surface="surfaceElevated">
        <View style={styles.metaRow}>
          <Text variant="caption" color="primary" numberOfLines={1}>
            {execution.categoryName}
          </Text>
          <Text variant="caption" color="textMuted" numberOfLines={1}>
            {progress}
          </Text>
        </View>

        <View style={styles.content}>
          <Text variant="h3" numberOfLines={2}>
            {execution.title}
          </Text>
        </View>

        <View style={styles.dateRow}>
          <Text variant="caption" color="textMuted" numberOfLines={1}>
            {date}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}
