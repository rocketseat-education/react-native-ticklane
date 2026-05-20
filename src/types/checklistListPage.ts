import type { ChecklistSummary } from './checklist';

export type ChecklistListPage = {
  items: ChecklistSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type ChecklistListQuery = {
  page: number;
  pageSize?: number;
  q?: string;
  categoryId?: string | null;
  authorId?: string | null;
  minRating?: number;
  favoritesOnly?: boolean;
  viewerId?: string | null;
};
