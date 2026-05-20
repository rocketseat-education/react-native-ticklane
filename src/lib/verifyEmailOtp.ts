import type { User } from '@/types';

import { apiFetch } from './apiBase';

export type VerifyEmailOtpResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

export async function verifyEmailOtp(
  email: string,
  code: string,
  signal?: AbortSignal,
): Promise<VerifyEmailOtpResult> {
  const res = await apiFetch('/api/auth/otp/verify', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, code }),
    signal,
  });
  if (res.ok) {
    const data = (await res.json()) as { ok: true; user: User };
    return { ok: true, user: data.user };
  }
  let error = 'Código inválido ou expirado.';
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
