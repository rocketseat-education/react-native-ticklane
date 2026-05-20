import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';
import {
  ChecklistHeader,
  ChecklistItemRow,
  CommentComposer,
  CommentsList,
  LinksList,
  RateChecklistSheet,
} from '@/modules/checklist/components';

import { useDetailsScreen, type UseDetailsScreenParams } from './use-details-screen';

export type DetailsScreenProps = UseDetailsScreenParams;

export function DetailsScreen({ id }: DetailsScreenProps) {
  const {
    styles,
    ctaLabel,
    itemsTitle,
    linksTitle,
    commentsTitle,
    emptyTitle,
    emptyDescription,
    checklist,
    comments,
    isRateSheetVisible,
    handleBack,
    handleStartExecution,
    handleItemPress,
    handleRatePress,
    handleRateSheetClose,
  } = useDetailsScreen({ id });

  if (!checklist) {
    return (
      <Container>
        <View style={styles.topBar}>
          <IconButton
            variant="ghost"
            accessibilityLabel={COPY.actions.back}
            onPress={handleBack}
            renderIcon={({ size, color }) => <Feather name="arrow-left" size={size} color={color} />}
          />
        </View>
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          renderIcon={({ size, color }) => <Feather name="alert-circle" size={size} color={color} />}
        />
      </Container>
    );
  }

  return (
    <Container paddingVertical="none">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <IconButton
            variant="ghost"
            accessibilityLabel={COPY.actions.back}
            onPress={handleBack}
            renderIcon={({ size, color }) => <Feather name="arrow-left" size={size} color={color} />}
          />
        </View>

        <ChecklistHeader checklist={checklist} onRatePress={handleRatePress} />

        {checklist.links.length ? (
          <View style={styles.section}>
            <SectionHeader title={linksTitle} />
            <LinksList links={checklist.links} />
          </View>
        ) : null}

        <View style={styles.section}>
          <SectionHeader title={itemsTitle} />
          <View style={styles.list}>
            {checklist.items.map((item) => (
              <ChecklistItemRow key={item.id} item={item} onPress={handleItemPress} />
            ))}
          </View>
        </View>

        <Button label={ctaLabel} onPress={handleStartExecution} isFullWidth />

        <View style={styles.section}>
          <SectionHeader title={commentsTitle} />
          <CommentComposer target={{ type: 'checklist', checklistId: checklist.id }} />
          {comments.length ? (
            <CommentsList comments={comments} />
          ) : (
            <View style={styles.emptyComments}>
              <Text variant="bodyMedium">
                {COPY.screens.checklistDetails.noCommentsTitle}
              </Text>
              <Text variant="bodySm" color="textMuted">
                {COPY.screens.checklistDetails.noCommentsDescription}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <RateChecklistSheet
        visible={isRateSheetVisible}
        onClose={handleRateSheetClose}
        checklistId={checklist.id}
        checklistTitle={checklist.title}
      />
    </Container>
  );
}
