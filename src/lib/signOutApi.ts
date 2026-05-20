import { apiFetch } from './apiBase';

export async function signOutApi(signal?: AbortSignal): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      signal,
    });
  } catch {
    /* ignore – limpamos a sessão localmente de qualquer forma */
  }
}
