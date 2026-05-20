export type ChecklistVisibility = 'public' | 'private';

export type ChecklistItemPriority = 'low' | 'medium' | 'high';

export type ItemLinkType = 'doc' | 'video' | 'github' | 'blog' | 'other';

export type ItemLink = {
  id: string;
  itemId: string;
  label: string;
  url: string;
  type: ItemLinkType;
};

export type ChecklistLink = {
  id: string;
  checklistId: string;
  label: string;
  url: string;
};

export type ChecklistItem = {
  id: string;
  checklistId: string;
  title: string;
  description?: string;
  order: number;
  priority?: ChecklistItemPriority;
  links?: ItemLink[];
};

export type Checklist = {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  visibility: ChecklistVisibility;
  authorId: string;
  tags: string[];
  averageRating: number;
  favoritesCount: number;
  executionsCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ChecklistSummary = Checklist & {
  categoryName: string;
  authorName: string;
  authorInitials?: string;
  itemsCount: number;
  isFavorite: boolean;
};

export type ChecklistDetails = ChecklistSummary & {
  description: string;
  items: ChecklistItem[];
  links: ChecklistLink[];
};
