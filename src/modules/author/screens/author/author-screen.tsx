import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { SectionHeader } from '@/components/section-header';
import { COPY } from '@/constants/copy';
import { ChecklistListItem } from '@/modules/checklist/components';

import { AuthorHeader } from '../../components/author-header';
import { useAuthorScreen, type UseAuthorScreenParams } from './use-author-screen';

export type AuthorScreenProps = UseAuthorScreenParams;

export function AuthorScreen({ id }: AuthorScreenProps) {
  const {
    styles,
    author,
    checklists,
    stats,
    checklistsTitle,
    emptyTitle,
    emptyDescription,
    notFoundTitle,
    notFoundDescription,
    handleBack,
    handleChecklistPress,
  } = useAuthorScreen({ id });

  if (!author) {
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
          renderIcon={({ size, color }) => <Feather name="user-x" size={size} color={color} />}
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

        <AuthorHeader user={author} stats={stats} />

        <View style={styles.section}>
          <SectionHeader title={checklistsTitle} />
          {checklists.length ? (
            <View style={styles.list}>
              {checklists.map((checklist) => (
                <ChecklistListItem
                  key={checklist.id}
                  checklist={checklist}
                  onPress={handleChecklistPress}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              renderIcon={({ size, color }) => <Feather name="inbox" size={size} color={color} />}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
}
