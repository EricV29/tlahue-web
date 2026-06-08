const API_URL = import.meta.env.VITE_API_URL;
const CACHE_TTL = 60_000;

interface CacheEntry {
  data: unknown;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

export async function apiGet<T>(
  endpoint: string,
  signal?: AbortSignal,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const cached = cache.get(url);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data as T;
  }

  const response = await fetch(url, { signal });
  if (!response.ok)
    throw { status: response.status, message: "Error in the request" };
  const data: T = await response.json();
  cache.set(url, { data, expiresAt: Date.now() + CACHE_TTL });
  return data;
}

export function clearCache() {
  cache.clear();
}
