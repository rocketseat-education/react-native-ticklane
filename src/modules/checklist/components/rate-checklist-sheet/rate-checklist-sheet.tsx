import { View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';
import { Button } from '@/components/button';
import { InteractiveRatingStars } from '@/components/interactive-rating-stars';
import { Text } from '@/components/text';

import { useRateChecklistSheet } from './use-rate-checklist-sheet';

export type RateChecklistSheetProps = {
  visible: boolean;
  onClose: () => void;
  checklistId: string;
  checklistTitle: string;
};

export function RateChecklistSheet({
  visible,
  onClose,
  checklistId,
  checklistTitle,
}: RateChecklistSheetProps) {
  const {
    styles,
    title,
    description,
    helperLabel,
    selectedScore,
    canSave,
    saveLabel,
    unrateLabel,
    starsLabel,
    handleScoreChange,
    handleSave,
    handleUnrate,
  } = useRateChecklistSheet({ checklistId, checklistTitle, visible, onClose });

  return (
    <BottomSheet visible={visible} onRequestClose={onClose}>
      <View style={styles.header}>
        <Text variant="h2" align="center">
          {title}
        </Text>
        <Text variant="body" color="textMuted" align="center">
          {description}
        </Text>
      </View>

      <InteractiveRatingStars
        value={selectedScore}
        onChange={handleScoreChange}
        accessibilityLabel={starsLabel}
      />

      <Text variant="bodySm" color="textMuted" align="center">
        {helperLabel}
      </Text>

      <View style={styles.actions}>
        {selectedScore > 0 ? (
          <Button
            variant="ghost"
            size="md"
            label={unrateLabel}
            onPress={handleUnrate}
            isFullWidth
          />
        ) : null}
        <Button
          variant="primary"
          size="md"
          label={saveLabel}
          isDisabled={!canSave}
          onPress={handleSave}
          isFullWidth
        />
      </View>
    </BottomSheet>
  );
}
