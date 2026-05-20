function trimBase(url: string): string {
  return url.trim().replace(/\/$/, '');
}

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Curso / demo: usa `EXPO_PUBLIC_API_URL_SANDBOX` sem API key. */
export function isSandboxMode(): boolean {
  const flag = readEnv('EXPO_PUBLIC_SANDBOX_MODE');
  return flag === 'true' || flag === '1';
}

export function getApiBaseUrl(): string {
  if (isSandboxMode()) {
    const sandbox = readEnv('EXPO_PUBLIC_API_URL_SANDBOX');
    if (sandbox) {
      return trimBase(sandbox);
    }
    throw new Error(
      'EXPO_PUBLIC_API_URL_SANDBOX é obrigatório quando EXPO_PUBLIC_SANDBOX_MODE está ativo.',
    );
  }

  const url = readEnv('EXPO_PUBLIC_API_URL');
  if (url) {
    return trimBase(url);
  }

  throw new Error('EXPO_PUBLIC_API_URL não está definido no .env');
}

function getApiAccessKey(): string | undefined {
  return readEnv('EXPO_PUBLIC_API_ACCESS_KEY') ?? readEnv('API_ACCESS_KEY');
}

export function getApiAuthHeaders(): Record<string, string> {
  if (isSandboxMode()) {
    return {};
  }

  const key = getApiAccessKey();
  if (!key) {
    throw new Error(
      'EXPO_PUBLIC_API_ACCESS_KEY (ou API_ACCESS_KEY) é obrigatório fora do modo sandbox.',
    );
  }

  return { 'x-api-key': key };
}

function mergeHeaders(
  auth: Record<string, string>,
  extra?: HeadersInit,
): Headers {
  const headers = new Headers(auth);
  if (extra) {
    new Headers(extra).forEach((value, key) => {
      headers.set(key, value);
    });
  }
  return headers;
}

/** `path` relativo à base (ex.: `/api/library`) ou URL absoluta. */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = getApiBaseUrl();
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = mergeHeaders(getApiAuthHeaders(), init?.headers);
  return fetch(url, { ...init, headers });
}
