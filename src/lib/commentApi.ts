import type { Comment } from '@/types';

import { apiFetch } from './apiBase';

export type CreateCommentApiResult =
  | { ok: true; comment: Comment }
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

function normalizeComment(comment: Comment, checklistId: string): Comment {
  return {
    ...comment,
    checklistId: comment.checklistId ?? checklistId,
    itemId:
      comment.itemId && String(comment.itemId).trim().length > 0
        ? comment.itemId
        : undefined,
  };
}

/**
 * Cria comentário na checklist ou num passo (`itemId`).
 * Sessão: cookie `tl_session` (mesmo padrão que favoritos).
 */
export async function createCommentRequest(
  checklistId: string,
  content: string,
  itemId: string | undefined,
  signal?: AbortSignal,
): Promise<CreateCommentApiResult> {
  const body =
    itemId !== undefined && itemId.length > 0
      ? { content, itemId }
      : { content };

  const res = await apiFetch(
    `/api/checklists/${encodeURIComponent(checklistId)}/comments`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    },
  );

  if (res.status === 201) {
    try {
      const data = (await res.json()) as { comment?: Comment };
      if (data?.comment) {
        return { ok: true, comment: normalizeComment(data.comment, checklistId) };
      }
    } catch {
      return { ok: false, error: 'Resposta inválida do servidor.' };
    }
    return { ok: false, error: 'Resposta inválida do servidor.' };
  }

  return { ok: false, error: await parseError(res, 'Não foi possível enviar o comentário.') };
}
