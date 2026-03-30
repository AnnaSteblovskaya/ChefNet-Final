// ─── XSS / HTML escaping ──────────────────────────────────────────────────

export function escapeHtml(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function stripHtmlTags(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

// ─── Input sanitization ───────────────────────────────────────────────────

export function sanitizeInput(value: unknown, maxLength = 1000): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // control chars
    .slice(0, maxLength)
    .trim();
}

export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  return email.toLowerCase().trim().slice(0, 254);
}

export function sanitizeUrl(url: unknown): string {
  if (typeof url !== 'string') return '#';
  const trimmed = url.trim();
  // Allow only http/https/relative URLs
  if (/^(https?:\/\/|\/)/i.test(trimmed)) return trimmed;
  if (/^javascript:/i.test(trimmed)) return '#';
  return '#';
}

// ─── Token manager (in-memory, not localStorage for sensitive data) ────────

class TokenManager {
  private accessToken: string | null = null;
  private expiresAt: number = 0;

  setAccessToken(token: string, expiresInSeconds = 900): void {
    this.accessToken = token;
    this.expiresAt = Date.now() + expiresInSeconds * 1000 - 30_000; // 30s buffer
  }

  getAccessToken(): string | null {
    if (!this.accessToken) return null;
    if (Date.now() > this.expiresAt) {
      this.accessToken = null;
      return null;
    }
    return this.accessToken;
  }

  clearTokens(): void {
    this.accessToken = null;
    this.expiresAt = 0;
  }

  isExpired(): boolean {
    return !this.accessToken || Date.now() > this.expiresAt;
  }
}

export const tokenManager = new TokenManager();

// ─── CSRF token helpers ───────────────────────────────────────────────────

function generateCsrfToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

let _csrfToken: string | null = null;

export function getCsrfToken(): string {
  if (!_csrfToken) {
    _csrfToken = sessionStorage.getItem('csrf_token') || generateCsrfToken();
    sessionStorage.setItem('csrf_token', _csrfToken);
  }
  return _csrfToken;
}

// ─── Secure API client ────────────────────────────────────────────────────

interface SecureApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  timeout?: number;
}

interface SecureApiResult<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

export async function secureApiCall<T = unknown>(
  path: string,
  options: SecureApiOptions = {}
): Promise<SecureApiResult<T>> {
  const { method = 'GET', body, headers = {}, timeout = 30_000 } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...headers,
  };

  // Add auth token if available
  const token = tokenManager.getAccessToken();
  if (token && !options.skipAuth) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  } else if (!options.skipAuth) {
    // Fallback to localStorage (Supabase session)
    try {
      const storedRaw =
        localStorage.getItem('chefnet-auth-storage') ||
        localStorage.getItem('sb-sdwlngwkeipgwelzxfai-auth-token');
      if (storedRaw) {
        const parsed = JSON.parse(storedRaw);
        const fallbackToken =
          parsed?.currentSession?.access_token || parsed?.access_token;
        if (fallbackToken) {
          requestHeaders['Authorization'] = `Bearer ${fallbackToken}`;
        }
      }
    } catch {
      // ignore
    }
  }

  try {
    const url = path.startsWith('/') ? `/api${path}` : path;
    const res = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: 'same-origin',
    });

    clearTimeout(timer);

    let data: T | null = null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
    }

    if (!res.ok) {
      const errMsg =
        (data as any)?.error ||
        (data as any)?.message ||
        `Request failed with status ${res.status}`;
      return { data: null, error: errMsg, status: res.status };
    }

    return { data, error: null, status: res.status };
  } catch (err: unknown) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === 'AbortError') {
      return { data: null, error: 'Request timed out', status: 0 };
    }
    return { data: null, error: 'Network error', status: 0 };
  }
}

// ─── Content Security helpers ─────────────────────────────────────────────

/**
 * Safe version of dangerouslySetInnerHTML — strips all tags.
 * Use only for plain text that was originally rich text.
 */
export function safeText(html: unknown): string {
  return stripHtmlTags(String(html ?? ''));
}

/**
 * Validate that a string looks like a UUID (v4).
 */
export function isValidUuid(id: unknown): boolean {
  if (typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
