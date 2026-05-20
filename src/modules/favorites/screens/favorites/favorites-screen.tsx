import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { ScreenHeader } from '@/components/screen-header';
import { ChecklistListItem } from '@/modules/checklist/components';

import { useFavoritesScreen } from './use-favorites-screen';

export function FavoritesScreen() {
  const {
    styles,
    title,
    subtitle,
    emptyTitle,
    emptyDescription,
    connectLabel,
    favorites,
    isGuest,
    handleChecklistPress,
    handleConnectPress,
  } = useFavoritesScreen();

  return (
    <Container paddingVertical="none">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ScreenHeader title={title} subtitle={subtitle} />

        {favorites.length ? (
          <View style={styles.list}>
            {favorites.map((checklist) => (
              <ChecklistListItem
                key={checklist.id}
                checklist={checklist}
                onPress={handleChecklistPress}
              />
            ))}
          </View>
        ) : (
          <>
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              renderIcon={({ size, color }) => <Feather name="bookmark" size={size} color={color} />}
            />
            {isGuest ? (
              <View style={styles.guestCta}>
                <Button
                  variant="primary"
                  size="md"
                  isFullWidth
                  label={connectLabel}
                  onPress={handleConnectPress}
                />
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </Container>
  );
}
