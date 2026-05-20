import type { ChecklistWriteResponse } from '@/lib/checklistWriteApi';

import type { LibraryState } from './library-types';

/** Integra a resposta de POST/PUT de checklist no estado da biblioteca. */
export function applyChecklistWriteResponse(
  state: LibraryState,
  { checklist, checklistItems, checklistLinks }: ChecklistWriteResponse,
): LibraryState {
  const checklistId = checklist.id;

  const nextChecklists = [
    ...state.checklists.filter((entry) => entry.id !== checklistId),
    checklist,
  ];

  const nextItems = [
    ...state.checklistItems.filter((item) => item.checklistId !== checklistId),
    ...checklistItems,
  ];

  const nextLinks = [
    ...state.checklistLinks.filter((link) => link.checklistId !== checklistId),
    ...checklistLinks,
  ];

  return {
    ...state,
    checklists: nextChecklists,
    checklistItems: nextItems,
    checklistLinks: nextLinks,
  };
}
