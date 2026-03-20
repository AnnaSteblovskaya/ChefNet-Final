import { getSupabaseClient } from '@/utils/supabase/client';

// The Supabase client is configured with storageKey: 'chefnet-auth-storage'
// so the session is stored under this key in localStorage
const SUPABASE_STORAGE_KEY = 'chefnet-auth-storage';

function getTokenFromStorage(): string | null {
  // Try the custom storageKey first (fastest, no async)
  const tryKey = (key: string): string | null => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Supabase v2: { currentSession: { access_token } } or { access_token }
      return parsed?.currentSession?.access_token
        || parsed?.access_token
        || null;
    } catch { return null; }
  };

  return tryKey(SUPABASE_STORAGE_KEY)
    || tryKey('sb-sdwlngwkeipgwelzxfai-auth-token')
    || null;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  // 1. Try localStorage first (instant, no async)
  const stored = getTokenFromStorage();
  if (stored) {
    return {
      'Authorization': `Bearer ${stored}`,
      'Content-Type': 'application/json',
    };
  }

  // 2. Fallback: ask Supabase client (may trigger network refresh)
  try {
    const supabase = getSupabaseClient();
    const sessionResult = await Promise.race([
      supabase.auth.getSession(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('getSession timeout')), 5000)
      ),
    ]);
    const session = (sessionResult as any)?.data?.session;
    if (session?.access_token) {
      return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      };
    }
  } catch {
    // timeout or error
  }

  return { 'Content-Type': 'application/json' };
}

async function apiGet<T>(path: string): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(path, { headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPost<T>(path: string, body: any): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(path, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPut<T>(path: string, body: any): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(path, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export { apiGet, apiPost, apiPut, getAuthHeaders };
