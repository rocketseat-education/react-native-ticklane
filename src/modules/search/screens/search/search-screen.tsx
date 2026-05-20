import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { ScreenHeader } from '@/components/screen-header';
import { SearchBar } from '@/components/search-bar';
import { Text } from '@/components/text';
import { CategoryFilter } from '@/modules/categories/components';
import { ChecklistListItem } from '@/modules/checklist/components';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { useSearchScreen } from './use-search-screen';

export function SearchScreen() {
  const { theme } = useTheme();
  const {
    styles,
    title,
    subtitle,
    placeholder,
    allCategoriesLabel,
    emptyTitle,
    emptyDescription,
    listUpdatingLabel,
    term,
    categories,
    selectedCategoryId,
    items,
    loading,
    loadingMore,
    listError,
    setTerm,
    handleCategoryPress,
    handleChecklistPress,
    loadMore,
  } = useSearchScreen();

  const showListRefreshBanner = Boolean(loading && items.length > 0 && !listError);

  const listHeader = (
    <>
      <ScreenHeader title={title} subtitle={subtitle} />

      <View style={styles.controls}>
        <SearchBar value={term} placeholder={placeholder} onChangeText={setTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          allLabel={allCategoriesLabel}
          onCategoryPress={handleCategoryPress}
        />
      </View>

      {listError ? (
        <View style={styles.inlineMessage}>
          <EmptyState
            title="Erro"
            description={listError}
            renderIcon={({ size, color }) => <Feather name="alert-circle" size={size} color={color} />}
          />
        </View>
      ) : null}

      {showListRefreshBanner ? (
        <View
          style={styles.listRefreshBanner}
          accessibilityRole="progressbar"
          accessibilityLabel={listUpdatingLabel}
        >
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text variant="bodySm" color="textMuted">
            {listUpdatingLabel}
          </Text>
        </View>
      ) : null}

      {loading && items.length === 0 ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </>
  );

  const listFooter =
    loadingMore && items.length > 0 ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator />
      </View>
    ) : null;

  return (
    <Container paddingVertical="none">
      <FlatList
        data={items}
        keyExtractor={(item: ChecklistSummary) => item.id}
        renderItem={({ item }) => (
          <ChecklistListItem checklist={item} onPress={handleChecklistPress} />
        )}
        ListHeaderComponent={listHeader}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.itemGap} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={listFooter}
        ListEmptyComponent={
          !loading && !listError ? (
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              renderIcon={({ size, color }) => <Feather name="search" size={size} color={color} />}
            />
          ) : null
        }
        keyboardShouldPersistTaps="handled"
      />
    </Container>
  );
}
