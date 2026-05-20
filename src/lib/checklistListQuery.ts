import type { ChecklistListQuery } from '@/types';

export function checklistListToUrlSearchParams(query: ChecklistListQuery): URLSearchParams {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('pageSize', String(query.pageSize ?? 20));
  if (query.q?.trim()) {
    params.set('q', query.q.trim());
  }
  if (query.categoryId) {
    params.set('categoryId', query.categoryId);
  }
  if (query.authorId) {
    params.set('authorId', query.authorId);
  }
  if (query.minRating && query.minRating > 0) {
    params.set('minRating', String(query.minRating));
  }
  if (query.favoritesOnly) {
    params.set('favoritesOnly', 'true');
  }
  if (query.viewerId) {
    params.set('viewerId', query.viewerId);
  }
  return params;
}
