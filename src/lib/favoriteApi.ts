import { apiFetch } from './apiBase';

export type FavoriteApiResult = { ok: true } | { ok: false; error: string };

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

/** Adiciona o checklist aos favoritos do utilizador autenticado. */
export async function addFavoriteRequest(
  checklistId: string,
  signal?: AbortSignal,
): Promise<FavoriteApiResult> {
  const res = await apiFetch(`/api/checklists/${encodeURIComponent(checklistId)}/favorite`, {
    method: 'PUT',
    credentials: 'include',
    signal,
  });
  if (res.ok) {
    return { ok: true };
  }
  return { ok: false, error: await parseError(res, 'Não foi possível favoritar.') };
}

/** Remove o checklist dos favoritos do utilizador autenticado. */
export async function removeFavoriteRequest(
  checklistId: string,
  signal?: AbortSignal,
): Promise<FavoriteApiResult> {
  const res = await apiFetch(`/api/checklists/${encodeURIComponent(checklistId)}/favorite`, {
    method: 'DELETE',
    credentials: 'include',
    signal,
  });
  if (res.ok) {
    return { ok: true };
  }
  return { ok: false, error: await parseError(res, 'Não foi possível remover dos favoritos.') };
}
