import type { User } from '@/types';

import { apiFetch } from './apiBase';

export type AvatarFile = {
  uri: string;
  name: string;
  type: string;
};

export type UploadAvatarResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

/**
 * Envia o avatar para o backend (multipart/form-data).
 *
 * No React Native, o objecto passado a `FormData.append` segue a forma
 * `{ uri, name, type }` (e não um `File`/`Blob` do DOM).
 */
export async function uploadAvatar(
  file: AvatarFile,
  signal?: AbortSignal,
): Promise<UploadAvatarResult> {
  const form = new FormData();
  // `as unknown as Blob` para satisfazer o tipo do TS — o runtime do RN aceita {uri,name,type}.
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as unknown as Blob);

  const res = await apiFetch('/api/users/me/avatar', {
    method: 'PUT',
    credentials: 'include',
    body: form,
    signal,
  });
  if (res.ok) {
    const data = (await res.json()) as { user: User };
    return { ok: true, user: data.user };
  }
  let error = 'Não foi possível carregar a imagem.';
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

export async function deleteAvatar(signal?: AbortSignal): Promise<UploadAvatarResult> {
  const res = await apiFetch('/api/users/me/avatar', {
    method: 'DELETE',
    credentials: 'include',
    signal,
  });
  if (res.ok) {
    const data = (await res.json()) as { user: User };
    return { ok: true, user: data.user };
  }
  let error = 'Não foi possível remover o avatar.';
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
