import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';
import {
  CommentComposer,
  CommentsList,
  ItemHeader,
} from '@/modules/checklist/components';

import {
  useItemDetailsScreen,
  type UseItemDetailsScreenParams,
} from './use-item-details-screen';

export type ItemDetailsScreenProps = UseItemDetailsScreenParams;

export function ItemDetailsScreen({ checklistId, itemId }: ItemDetailsScreenProps) {
  const {
    styles,
    item,
    comments,
    itemLabel,
    commentsTitle,
    noCommentsTitle,
    noCommentsDescription,
    notFoundTitle,
    notFoundDescription,
    handleBack,
  } = useItemDetailsScreen({ checklistId, itemId });

  if (!item) {
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
          title={notFoundTitle}
          description={notFoundDescription}
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

        <ItemHeader item={item} itemLabel={itemLabel} />

        <View style={styles.section}>
          <SectionHeader title={commentsTitle} />
          <CommentComposer target={{ type: 'item', itemId: item.id, checklistId }} />
          {comments.length ? (
            <CommentsList comments={comments} />
          ) : (
            <View style={styles.emptyComments}>
              <Text variant="bodyMedium">{noCommentsTitle}</Text>
              <Text variant="bodySm" color="textMuted">
                {noCommentsDescription}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}
