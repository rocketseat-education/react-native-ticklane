import type {
  Category,
  Checklist,
  ChecklistItem,
  ChecklistLink,
  ChecklistRating,
  ChecklistVisibility,
  Comment,
  FavoriteChecklist,
  User,
} from '@/types';

export type LibraryState = {
  checklists: Checklist[];
  checklistItems: ChecklistItem[];
  checklistLinks: ChecklistLink[];
  comments: Comment[];
  favorites: FavoriteChecklist[];
  ratings: ChecklistRating[];
  categories: Category[];
  users: User[];
};

export type CreateChecklistInputItem = {
  title: string;
  description?: string;
};

export type CreateChecklistInput = {
  title: string;
  description?: string;
  categoryId: string;
  tags: string[];
  visibility?: ChecklistVisibility;
  items: CreateChecklistInputItem[];
};

export type CommentTarget =
  | { type: 'checklist'; checklistId: string }
  | { type: 'item'; itemId: string; checklistId: string };

export type AddCommentResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export type LibraryActions = {
  createChecklist: (input: CreateChecklistInput, authorId: string) => string;
  toggleFavorite: (checklistId: string, userId: string) => boolean;
  isFavorite: (checklistId: string, userId: string | null) => boolean;
  addComment: (target: CommentTarget, content: string, authorId: string) => Promise<AddCommentResult>;
  rateChecklist: (checklistId: string, score: number, userId: string) => void;
  /** Refaz o fetch do catálogo (`/api/library`). Útil após login/logout. */
  reload: () => Promise<void>;
};

export type LibraryContextValue = LibraryState & LibraryActions;
