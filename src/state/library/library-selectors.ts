import type {
  Category,
  Checklist,
  ChecklistDetails,
  ChecklistItem,
  ChecklistSummary,
  CommentWithAuthor,
  User,
} from '@/types';

import type { LibraryState } from './library-types';

const MS_IN_DAY = 86_400_000;

const compareDesc = (left: number, right: number) => right - left;

export const sortCopy = <TItem>(items: TItem[], compare: (left: TItem, right: TItem) => number) =>
  [...items].sort(compare);

export const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const findCategory = (state: LibraryState, categoryId: string): Category | undefined =>
  state.categories.find((category) => category.id === categoryId);

const findUser = (state: LibraryState, userId: string): User | undefined =>
  state.users.find((user) => user.id === userId);

const isFavoriteRecord = (state: LibraryState, checklistId: string, userId: string | null) =>
  userId
    ? state.favorites.some(
        (favorite) => favorite.userId === userId && favorite.checklistId === checklistId,
      )
    : false;

const getItemsCount = (state: LibraryState, checklistId: string) =>
  state.checklistItems.filter((item) => item.checklistId === checklistId).length;

export const toChecklistSummary = (
  state: LibraryState,
  checklist: Checklist,
  viewerId: string | null,
): ChecklistSummary => {
  const category = findCategory(state, checklist.categoryId);
  const author = findUser(state, checklist.authorId);

  return {
    ...checklist,
    categoryName: category?.name ?? '',
    authorName: author?.displayName ?? '',
    authorInitials: author?.initials,
    itemsCount: getItemsCount(state, checklist.id),
    isFavorite: isFavoriteRecord(state, checklist.id, viewerId),
  };
};

const sortByDateDesc = (left: ChecklistSummary, right: ChecklistSummary) =>
  compareDesc(new Date(left.updatedAt).getTime(), new Date(right.updatedAt).getTime());

const sortByPopularityDesc = (left: ChecklistSummary, right: ChecklistSummary) =>
  compareDesc(
    left.favoritesCount + left.executionsCount + left.averageRating * 100,
    right.favoritesCount + right.executionsCount + right.averageRating * 100,
  );

const sortByEngagementDesc = (left: ChecklistSummary, right: ChecklistSummary) =>
  compareDesc(
    left.commentsCount + left.favoritesCount,
    right.commentsCount + right.favoritesCount,
  );

const POPULAR_LIMIT = 5;
const RECENT_LIMIT = 4;
const TRENDING_LIMIT = 4;
const FAVORITE_LIMIT = 10;

export const selectChecklists = (state: LibraryState, viewerId: string | null) =>
  state.checklists.map((checklist) => toChecklistSummary(state, checklist, viewerId));

export const selectPopularChecklists = (state: LibraryState, viewerId: string | null) =>
  sortCopy(selectChecklists(state, viewerId), sortByPopularityDesc).slice(0, POPULAR_LIMIT);

export const selectRecentChecklists = (state: LibraryState, viewerId: string | null) =>
  sortCopy(selectChecklists(state, viewerId), sortByDateDesc).slice(0, RECENT_LIMIT);

export const selectTrendingChecklists = (state: LibraryState, viewerId: string | null) =>
  sortCopy(selectChecklists(state, viewerId), sortByEngagementDesc).slice(0, TRENDING_LIMIT);

export const selectFavoriteChecklists = (state: LibraryState, viewerId: string | null) => {
  if (!viewerId) {
    return [];
  }

  const favoriteIds = new Set(
    state.favorites
      .filter((favorite) => favorite.userId === viewerId)
      .map((favorite) => favorite.checklistId),
  );

  return sortCopy(
    selectChecklists(state, viewerId).filter((checklist) => favoriteIds.has(checklist.id)),
    sortByDateDesc,
  ).slice(0, FAVORITE_LIMIT);
};

export const selectChecklistsByAuthor = (
  state: LibraryState,
  authorId: string,
  viewerId: string | null,
) =>
  sortCopy(
    selectChecklists(state, viewerId).filter((checklist) => checklist.authorId === authorId),
    sortByDateDesc,
  );

export const selectChecklistById = (
  state: LibraryState,
  id: string,
  viewerId: string | null,
): ChecklistDetails | null => {
  const checklist = state.checklists.find((item) => item.id === id);

  if (!checklist) {
    return null;
  }

  return {
    ...toChecklistSummary(state, checklist, viewerId),
    description: checklist.description ?? '',
    items: sortCopy(
      state.checklistItems.filter((item) => item.checklistId === id),
      (left: ChecklistItem, right: ChecklistItem) => left.order - right.order,
    ),
    links: state.checklistLinks.filter((link) => link.checklistId === id),
  };
};

export const selectChecklistItems = (state: LibraryState, checklistId: string): ChecklistItem[] =>
  sortCopy(
    state.checklistItems.filter((item) => item.checklistId === checklistId),
    (left, right) => left.order - right.order,
  );

const getRelativeCreatedAt = (date: string) => {
  const days = Math.max(1, Math.round((Date.now() - new Date(date).getTime()) / MS_IN_DAY));

  if (days === 1) {
    return 'há 1 dia';
  }

  return `há ${days} dias`;
};

export const selectCommentsByChecklist = (
  state: LibraryState,
  checklistId: string,
): CommentWithAuthor[] =>
  sortCopy(
    state.comments.filter(
      (comment) => comment.checklistId === checklistId && !comment.itemId,
    ),
    (left, right) =>
      compareDesc(new Date(left.createdAt).getTime(), new Date(right.createdAt).getTime()),
  ).map((comment) => {
    const author = findUser(state, comment.authorId);

    return {
      ...comment,
      authorName: author?.displayName ?? '',
      authorInitials: author?.initials,
      relativeCreatedAt: getRelativeCreatedAt(comment.createdAt),
    };
  });

export const selectCommentsByItem = (
  state: LibraryState,
  itemId: string,
): CommentWithAuthor[] =>
  sortCopy(
    state.comments.filter((comment) => comment.itemId === itemId),
    (left, right) =>
      compareDesc(new Date(left.createdAt).getTime(), new Date(right.createdAt).getTime()),
  ).map((comment) => {
    const author = findUser(state, comment.authorId);

    return {
      ...comment,
      authorName: author?.displayName ?? '',
      authorInitials: author?.initials,
      relativeCreatedAt: getRelativeCreatedAt(comment.createdAt),
    };
  });

export const selectChecklistItemById = (
  state: LibraryState,
  checklistId: string,
  itemId: string,
): ChecklistItem | null =>
  state.checklistItems.find(
    (item) => item.id === itemId && item.checklistId === checklistId,
  ) ?? null;

export const selectCommentsByAuthor = (state: LibraryState, authorId: string): CommentWithAuthor[] =>
  sortCopy(
    state.comments.filter((comment) => comment.authorId === authorId),
    (left, right) =>
      compareDesc(new Date(left.createdAt).getTime(), new Date(right.createdAt).getTime()),
  ).map((comment) => {
    const author = findUser(state, comment.authorId);

    return {
      ...comment,
      authorName: author?.displayName ?? '',
      authorInitials: author?.initials,
      relativeCreatedAt: getRelativeCreatedAt(comment.createdAt),
    };
  });

export const selectAuthorById = (state: LibraryState, authorId: string): User | null =>
  state.users.find((user) => user.id === authorId) ?? null;

export const countCommentsByAuthor = (state: LibraryState, authorId: string): number =>
  state.comments.filter((comment) => comment.authorId === authorId).length;

export const sumFavoritesByAuthor = (state: LibraryState, authorId: string): number => {
  const authoredChecklistIds = new Set(
    state.checklists
      .filter((checklist) => checklist.authorId === authorId)
      .map((checklist) => checklist.id),
  );

  return state.checklists
    .filter((checklist) => authoredChecklistIds.has(checklist.id))
    .reduce((total, checklist) => total + checklist.favoritesCount, 0);
};

export const selectUserRating = (
  state: LibraryState,
  checklistId: string,
  userId: string | null,
): number => {
  if (!userId) {
    return 0;
  }

  const rating = state.ratings.find(
    (record) => record.checklistId === checklistId && record.userId === userId,
  );

  return rating?.score ?? 0;
};

export const selectCategories = (state: LibraryState): Category[] => state.categories;

export const selectSearchedChecklists = (
  state: LibraryState,
  term: string,
  categoryId: string | null,
  viewerId: string | null,
) => {
  const query = normalize(term.trim());

  return selectChecklists(state, viewerId).filter((checklist) => {
    const categoryMatches = categoryId ? checklist.categoryId === categoryId : true;

    if (!query) {
      return categoryMatches;
    }

    const searchable = normalize(
      [
        checklist.title,
        checklist.description ?? '',
        checklist.categoryName,
        checklist.authorName,
        ...checklist.tags,
      ].join(' '),
    );

    return categoryMatches && searchable.includes(query);
  });
};
