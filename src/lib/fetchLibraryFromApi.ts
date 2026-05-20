import type { LibraryState } from '@/state/library/library-types';

import { apiFetch } from './apiBase';

export async function fetchLibraryFromApi(signal?: AbortSignal): Promise<LibraryState> {
  const res = await apiFetch('/api/library', { credentials: 'include', signal });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<LibraryState>;
}
