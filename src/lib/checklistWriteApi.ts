import type { Checklist, ChecklistItem, ChecklistLink, ChecklistVisibility } from '@/types';

import { apiFetch } from './apiBase';

export type ChecklistWriteItemInput = {
  title: string;
  description?: string;
  id?: string;
};

export type ChecklistWriteLinkInput = {
  label: string;
  url: string;
};

export type ChecklistWriteBody = {
  title: string;
  description?: string;
  categoryId: string;
  tags?: string[];
  visibility?: ChecklistVisibility;
  items: ChecklistWriteItemInput[];
  links?: ChecklistWriteLinkInput[];
};

export type ChecklistWriteResponse = {
  checklist: Checklist;
  checklistItems: ChecklistItem[];
  checklistLinks: ChecklistLink[];
};

export type ChecklistWriteApiResult =
  | { ok: true; data: ChecklistWriteResponse }
  | { ok: false; error: string };

async function parseError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    if (data?.error) {
      return data.error;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

async function parseWriteResponse(res: Response): Promise<ChecklistWriteApiResult> {
  try {
    const data = (await res.json()) as ChecklistWriteResponse;
    if (data?.checklist && Array.isArray(data.checklistItems)) {
      return {
        ok: true,
        data: {
          checklist: data.checklist,
          checklistItems: data.checklistItems,
          checklistLinks: data.checklistLinks ?? [],
        },
      };
    }
  } catch {
    /* ignore */
  }
  return { ok: false, error: 'Resposta inválida do servidor.' };
}

/** Cria checklist — `POST /api/checklists` (sessão + API key). */
export async function createChecklistRequest(
  body: ChecklistWriteBody,
  signal?: AbortSignal,
): Promise<ChecklistWriteApiResult> {
  const res = await apiFetch('/api/checklists', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (res.status === 201) {
    return parseWriteResponse(res);
  }

  return { ok: false, error: await parseError(res, 'Não foi possível criar a checklist.') };
}

/** Edita checklist — `PUT /api/checklists/:id` (apenas autor). */
export async function updateChecklistRequest(
  checklistId: string,
  body: ChecklistWriteBody & { visibility: ChecklistVisibility; links: ChecklistWriteLinkInput[] },
  signal?: AbortSignal,
): Promise<ChecklistWriteApiResult> {
  const res = await apiFetch(`/api/checklists/${encodeURIComponent(checklistId)}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (res.ok) {
    return parseWriteResponse(res);
  }

  return { ok: false, error: await parseError(res, 'Não foi possível guardar a checklist.') };
}
