import { apiFetch } from './apiBase';

export type RequestEmailOtpResult = { ok: true } | { ok: false; error: string };

export async function requestEmailOtp(
  email: string,
  signal?: AbortSignal,
): Promise<RequestEmailOtpResult> {
  const res = await apiFetch('/api/auth/otp/send', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
    signal,
  });
  if (res.ok) {
    return { ok: true };
  }
  let error = 'Não foi possível enviar o código. Tenta mais tarde.';
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
