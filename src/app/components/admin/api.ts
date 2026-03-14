const BASE = '/api/admin';

async function req(method: string, path: string, body?: unknown) {
  const token = (window as any).__supabaseSession?.access_token;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const adminApi = {
  stats: () => req('GET', '/stats'),

  users: { list: () => req('GET', '/users'), update: (id: string, d: unknown) => req('PUT', `/users/${id}`, d), remove: (id: string) => req('DELETE', `/users/${id}`) },
  investments: { list: () => req('GET', '/investments'), create: (d: unknown) => req('POST', '/investments', d), update: (id: number, d: unknown) => req('PUT', `/investments/${id}`, d), remove: (id: number) => req('DELETE', `/investments/${id}`) },
  rounds: { list: () => req('GET', '/rounds'), create: (d: unknown) => req('POST', '/rounds', d), update: (id: string, d: unknown) => req('PUT', `/rounds/${id}`, d), remove: (id: string) => req('DELETE', `/rounds/${id}`) },
  kyc: { list: () => req('GET', '/kyc'), update: (id: number, d: unknown) => req('PUT', `/kyc/${id}`, d) },
  partners: { list: () => req('GET', '/partners'), create: (d: unknown) => req('POST', '/partners', d), update: (id: number, d: unknown) => req('PUT', `/partners/${id}`, d), remove: (id: number) => req('DELETE', `/partners/${id}`) },
  news: { list: () => req('GET', '/news'), create: (d: unknown) => req('POST', '/news', d), update: (id: number, d: unknown) => req('PUT', `/news/${id}`, d), remove: (id: number) => req('DELETE', `/news/${id}`) },
  documents: { list: () => req('GET', '/documents'), create: (d: unknown) => req('POST', '/documents', d), update: (id: number, d: unknown) => req('PUT', `/documents/${id}`, d), remove: (id: number) => req('DELETE', `/documents/${id}`) },
  content: { list: () => req('GET', '/content'), save: (key: string, d: unknown) => req('PUT', `/content/${key}`, d) },
};

export function injectToken(token: string) {
  (window as any).__supabaseSession = { access_token: token };
}
