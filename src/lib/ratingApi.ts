import { apiFetch } from './apiBase';

export type SetRatingApiResult =
  | { ok: true; averageRating?: number }
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

/**
 * Define ou atualiza a avaliação do utilizador autenticado (1–5).
 * Remover avaliação: `score` 0 (não existe DELETE nesta API).
 * Sessão: cookie `tl_session` (mesmo padrão que favoritos e comentários).
 */
export async function setRatingRequest(
  checklistId: string,
  score: number,
  signal?: AbortSignal,
): Promise<SetRatingApiResult> {
  const res = await apiFetch(`/api/checklists/${encodeURIComponent(checklistId)}/rating`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
    signal,
  });

  if (res.ok) {
    try {
      const data = (await res.json()) as { averageRating?: number };
      return {
        ok: true,
        averageRating:
          typeof data?.averageRating === 'number' ? data.averageRating : undefined,
      };
    } catch {
      return { ok: true };
    }
  }

  return { ok: false, error: await parseError(res, 'Não foi possível salvar a avaliação.') };
}
