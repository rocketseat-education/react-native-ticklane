import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { fetchChecklistListPage } from '@/lib/fetchChecklistListPage';
import { useDebouncedValue } from '@/lib/useDebouncedValue';
import { useAuth } from '@/modules/auth/context';
import { useCategoriesCatalog } from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { Category, ChecklistSummary } from '@/types';

import { createStyles } from './search-screen.styles';

const PAGE_SIZE = 20;

export function useSearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ categoryId?: string }>();
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const viewerId = isGuest ? null : currentUser.id;
  const [term, setTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    params.categoryId ?? null,
  );

  const debouncedTerm = useDebouncedValue(term, 350);
  const filterKey = `${debouncedTerm}\0${selectedCategoryId ?? ''}\0${viewerId ?? ''}`;

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ChecklistSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const filterKeyRef = useRef<string | null>(null);

  const copy = COPY.screens.search;
  const stateCopy = COPY.states;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const categories = useCategoriesCatalog();

  useEffect(() => {
    const prevKey = filterKeyRef.current;
    const keyChanged = prevKey !== null && prevKey !== filterKey;
    filterKeyRef.current = filterKey;

    if (keyChanged && page !== 1) {
      setPage(1);
      return;
    }

    const controller = new AbortController();
    const isFirst = page === 1;
    if (isFirst) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setListError(null);

    fetchChecklistListPage(
      {
        page,
        pageSize: PAGE_SIZE,
        q: debouncedTerm,
        categoryId: selectedCategoryId,
        viewerId,
      },
      controller.signal,
    )
      .then((res) => {
        setTotal(res.total);
        if (page === 1) {
          setItems(res.items);
        } else {
          setItems((prev) => [...prev, ...res.items]);
        }
      })
      .catch((err: unknown) => {
        if (
          err &&
          typeof err === 'object' &&
          'name' in err &&
          (err as { name: string }).name === 'AbortError'
        ) {
          return;
        }
        setListError(err instanceof Error ? err.message : 'Erro ao carregar');
        if (page === 1) {
          setItems([]);
          setTotal(0);
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });

    return () => controller.abort();
  }, [filterKey, page, debouncedTerm, selectedCategoryId, viewerId]);

  const loadMore = useCallback(() => {
    if (loading || loadingMore) {
      return;
    }
    if (items.length >= total) {
      return;
    }
    setPage((p) => p + 1);
  }, [loading, loadingMore, items.length, total]);

  const handleCategoryPress = useCallback((category: Category | null) => {
    setSelectedCategoryId((current) => {
      if (!category) {
        return null;
      }

      return current === category.id ? null : category.id;
    });
  }, []);

  const handleChecklistPress = useCallback(
    (checklist: ChecklistSummary) => {
      router.push(ROUTES.checklistDetails(checklist.id));
    },
    [router],
  );

  return {
    styles,
    title: copy.title,
    subtitle: copy.subtitle,
    placeholder: copy.placeholder,
    allCategoriesLabel: copy.allCategoriesLabel,
    listUpdatingLabel: copy.listUpdating,
    emptyTitle: stateCopy.emptyTitle,
    emptyDescription: stateCopy.placeholderDescription,
    term,
    categories,
    selectedCategoryId,
    items,
    total,
    loading,
    loadingMore,
    listError,
    setTerm,
    handleCategoryPress,
    handleChecklistPress,
    loadMore,
  };
}
