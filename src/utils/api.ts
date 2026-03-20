import { getSupabaseClient } from '@/utils/supabase/client';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const supabase = getSupabaseClient();
  try {
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
    // timeout or error — proceed without auth header
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
