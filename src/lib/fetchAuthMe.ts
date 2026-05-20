import type { User } from '@/types';

import { apiFetch } from './apiBase';

export type AuthMeResponse = {
  user: User | null;
};

export async function fetchAuthMe(signal?: AbortSignal): Promise<User | null> {
  const res = await apiFetch('/api/auth/me', { credentials: 'include', signal });
  if (!res.ok) {
    return null;
  }
  const data = (await res.json()) as AuthMeResponse;
  return data.user ?? null;
}
