import type { ChecklistListPage, ChecklistListQuery } from '@/types';

import { checklistListToUrlSearchParams } from './checklistListQuery';
import { apiFetch } from './apiBase';

export async function fetchChecklistListPage(
  query: ChecklistListQuery,
  signal?: AbortSignal,
): Promise<ChecklistListPage> {
  const params = checklistListToUrlSearchParams(query);
  const res = await apiFetch(`/api/checklists?${params.toString()}`, { signal });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<ChecklistListPage>;
}
