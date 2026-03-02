import { getSupabaseClient } from '@/utils/supabase/client';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const supabase = getSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
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

export { apiGet, apiPost, apiPut };
