import { useContext, useMemo } from 'react';

import { LibraryContext } from './library-context';
import {
  countCommentsByAuthor,
  selectAuthorById,
  selectCategories,
  selectChecklistById,
  selectChecklistItemById,
  selectChecklists,
  selectChecklistItems,
  selectChecklistsByAuthor,
  selectCommentsByAuthor,
  selectCommentsByChecklist,
  selectCommentsByItem,
  selectFavoriteChecklists,
  selectPopularChecklists,
  selectRecentChecklists,
  selectSearchedChecklists,
  selectTrendingChecklists,
  selectUserRating,
  sumFavoritesByAuthor,
} from './library-selectors';

export function useLibrary() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }

  return context;
}

export function useAllChecklists(viewerId: string | null) {
  const library = useLibrary();
  return useMemo(() => selectChecklists(library, viewerId), [library, viewerId]);
}

export function useChecklist(id: string, viewerId: string | null) {
  const library = useLibrary();
  return useMemo(() => selectChecklistById(library, id, viewerId), [library, id, viewerId]);
}

export function useChecklistItems(checklistId: string) {
  const library = useLibrary();
  return useMemo(() => selectChecklistItems(library, checklistId), [library, checklistId]);
}

export function usePopularChecklists(viewerId: string | null) {
  const library = useLibrary();
  return useMemo(() => selectPopularChecklists(library, viewerId), [library, viewerId]);
}

export function useRecentChecklists(viewerId: string | null) {
  const library = useLibrary();
  return useMemo(() => selectRecentChecklists(library, viewerId), [library, viewerId]);
}

export function useTrendingChecklists(viewerId: string | null) {
  const library = useLibrary();
  return useMemo(() => selectTrendingChecklists(library, viewerId), [library, viewerId]);
}

export function useFavoriteChecklists(viewerId: string | null) {
  const library = useLibrary();
  return useMemo(() => selectFavoriteChecklists(library, viewerId), [library, viewerId]);
}

export function useChecklistsByAuthor(authorId: string, viewerId: string | null) {
  const library = useLibrary();
  return useMemo(
    () => selectChecklistsByAuthor(library, authorId, viewerId),
    [library, authorId, viewerId],
  );
}

export function useCommentsByChecklist(checklistId: string) {
  const library = useLibrary();
  return useMemo(() => selectCommentsByChecklist(library, checklistId), [library, checklistId]);
}

export function useCommentsByItem(itemId: string) {
  const library = useLibrary();
  return useMemo(() => selectCommentsByItem(library, itemId), [library, itemId]);
}

export function useChecklistItem(checklistId: string, itemId: string) {
  const library = useLibrary();
  return useMemo(
    () => selectChecklistItemById(library, checklistId, itemId),
    [library, checklistId, itemId],
  );
}

export function useCommentsByAuthor(authorId: string) {
  const library = useLibrary();
  return useMemo(() => selectCommentsByAuthor(library, authorId), [library, authorId]);
}

export function useAuthorById(authorId: string) {
  const library = useLibrary();
  return useMemo(
    () => selectAuthorById(library, authorId),
    [library, authorId],
  );
}

export function useAuthorStats(authorId: string) {
  const library = useLibrary();
  return useMemo(
    () => ({
      commentsCount: countCommentsByAuthor(library, authorId),
      favoritesSum: sumFavoritesByAuthor(library, authorId),
    }),
    [library, authorId],
  );
}

export function useUserRating(checklistId: string, viewerId: string | null) {
  const library = useLibrary();
  return useMemo(
    () => selectUserRating(library, checklistId, viewerId),
    [library, checklistId, viewerId],
  );
}

export function useSearchChecklists(
  term: string,
  categoryId: string | null,
  viewerId: string | null,
) {
  const library = useLibrary();
  return useMemo(
    () => selectSearchedChecklists(library, term, categoryId, viewerId),
    [library, term, categoryId, viewerId],
  );
}

export function useCategoriesCatalog() {
  const library = useLibrary();
  return useMemo(() => selectCategories(library), [library]);
}
