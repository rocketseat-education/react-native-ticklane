import { getApiBaseUrl } from './apiBase';

/**
 * Converte um caminho relativo (ex.: `/api/uploads/avatars/x.jpg`) na URL absoluta
 * apontando para o backend. URLs absolutos são devolvidos sem alteração.
 */
export function resolveAssetUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) {
    return null;
  }
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const base = getApiBaseUrl();
  return `${base}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}
