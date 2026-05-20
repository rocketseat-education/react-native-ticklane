import type { ChecklistItem, ChecklistLink } from './checklist';

export type OfflineExecutionSummary = {
  id: string;
  sourceChecklistId: string;
  title: string;
  categoryName: string;
  doneCount: number;
  totalCount: number;
  /** Momento em que a cópia local foi criada */
  startedAt: string;
  updatedAt: string;
};

export type OfflineExecutionItemRow = ChecklistItem & {
  checked: boolean;
  checkedAt?: string;
};

export type OfflineExecutionDetail = {
  id: string;
  sourceChecklistId: string;
  title: string;
  description: string;
  categoryName: string;
  links: ChecklistLink[];
  items: OfflineExecutionItemRow[];
};
