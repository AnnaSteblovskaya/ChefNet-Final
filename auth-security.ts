// In-memory brute-force protection
// For production: replace with Redis-backed store

interface LoginAttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, LoginAttemptRecord>();

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes

// Clean up stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (now - record.firstAttempt > WINDOW_MS * 2) {
      loginAttempts.delete(key);
    }
  }
}, 10 * 60 * 1000);

export function checkLoginAttempt(identifier: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockedUntil?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (record.lockedUntil && now < record.lockedUntil) {
    return { allowed: false, remainingAttempts: 0, lockedUntil: record.lockedUntil };
  }

  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  return { allowed: remaining > 0, remainingAttempts: remaining };
}

export function recordFailedLogin(identifier: string): void {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record || now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now });
    return;
  }

  record.count++;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }
  loginAttempts.set(identifier, record);
}

export function resetLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

// ─── Session management ────────────────────────────────────────────────────

interface SessionRecord {
  userId: string;
  ip: string;
  userAgent: string;
  createdAt: number;
  lastSeen: number;
}

const sessions = new Map<string, SessionRecord>();

// Clean up expired sessions every 30 minutes (session TTL: 7 days)
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.lastSeen > SESSION_TTL) {
      sessions.delete(id);
    }
  }
}, 30 * 60 * 1000);

export function registerSession(
  sessionId: string,
  userId: string,
  ip: string,
  userAgent: string
): void {
  sessions.set(sessionId, {
    userId,
    ip,
    userAgent,
    createdAt: Date.now(),
    lastSeen: Date.now(),
  });
}

export function validateSession(sessionId: string): SessionRecord | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (Date.now() - session.lastSeen > SESSION_TTL) {
    sessions.delete(sessionId);
    return null;
  }
  session.lastSeen = Date.now();
  return session;
}

export function invalidateSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function invalidateUserSessions(userId: string): void {
  for (const [id, session] of sessions.entries()) {
    if (session.userId === userId) {
      sessions.delete(id);
    }
  }
}

// ─── Input sanitization helpers ────────────────────────────────────────────

export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
    .slice(0, 10000);
}

export function sanitizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null;
  const cleaned = email.toLowerCase().trim();
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : null;
}

export function sanitizeUuid(id: unknown): string | null {
  if (typeof id !== 'string') return null;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id.trim()) ? id.trim() : null;
}

export function sanitizePositiveInt(value: unknown): number | null {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

export function sanitizePositiveNumber(value: unknown): number | null {
  const n = Number(value);
  if (isNaN(n) || n <= 0) return null;
  return n;
}
