import type { User } from '@/types';

import { apiFetch } from './apiBase';

export type UpdateProfileInput = {
  displayName: string;
  bio: string | null;
};

export type UpdateProfileResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

export async function updateProfile(
  input: UpdateProfileInput,
  signal?: AbortSignal,
): Promise<UpdateProfileResult> {
  const res = await apiFetch('/api/users/me', {
    method: 'PUT',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    signal,
  });
  if (res.ok) {
    const data = (await res.json()) as { user: User };
    return { ok: true, user: data.user };
  }
  let error = 'Não foi possível guardar.';
  try {
    const data = (await res.json()) as { error?: string };
    if (data?.error) {
      error = data.error;
    }
  } catch {
    /* ignore */
  }
  return { ok: false, error };
}
