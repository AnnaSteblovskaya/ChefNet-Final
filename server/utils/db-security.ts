import type { Pool } from 'pg';

// ─── Audit log ────────────────────────────────────────────────────────────

export interface AuditEvent {
  userId?: string | null;
  action: string;
  table?: string;
  recordId?: string | number;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export async function logAuditEvent(pool: Pool, event: AuditEvent): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO audit_log (user_id, action, table_name, record_id, ip, user_agent, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, NOW())`,
      [
        event.userId ?? null,
        event.action,
        event.table ?? null,
        event.recordId != null ? String(event.recordId) : null,
        event.ip ?? null,
        event.userAgent ?? null,
        JSON.stringify(event.metadata ?? {}),
      ]
    );
  } catch {
    // Audit log failures are non-fatal — table may not exist yet
  }
}

export const AUDIT_TABLE_MIGRATION = `
CREATE TABLE IF NOT EXISTS audit_log (
  id          bigserial PRIMARY KEY,
  user_id     text,
  action      text NOT NULL,
  table_name  text,
  record_id   text,
  ip          text,
  user_agent  text,
  metadata    jsonb DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_log_user_id_idx ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS audit_log_action_idx  ON audit_log(action);
CREATE INDEX IF NOT EXISTS audit_log_created_idx ON audit_log(created_at DESC);
`;

// ─── Safe query builder ───────────────────────────────────────────────────

type QueryResult<T = Record<string, unknown>> = {
  rows: T[];
  rowCount: number;
};

/**
 * Always uses parameterised queries — never string interpolation.
 * Column / table names must come from an allowlist, never from user input.
 */
export async function safeQuery<T = Record<string, unknown>>(
  pool: Pool,
  text: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  const result = await pool.query(text, params);
  return { rows: result.rows as T[], rowCount: result.rowCount ?? 0 };
}

// ─── Allowlist helpers ────────────────────────────────────────────────────

const ALLOWED_SORT_COLUMNS: Record<string, readonly string[]> = {
  investments: ['created_at', 'amount', 'shares', 'status', 'date'],
  users: ['created_at', 'email', 'full_name'],
  news: ['created_at', 'updated_at'],
  rounds: ['sort_order', 'name', 'status'],
  referrals: ['created_at', 'shares', 'commission'],
};

export function safeSortColumn(table: string, column: unknown): string {
  const allowed = ALLOWED_SORT_COLUMNS[table];
  if (!allowed) return 'id';
  if (typeof column !== 'string') return allowed[0] ?? 'id';
  return allowed.includes(column) ? column : allowed[0] ?? 'id';
}

export function safeSortDir(dir: unknown): 'ASC' | 'DESC' {
  return dir === 'asc' || dir === 'ASC' ? 'ASC' : 'DESC';
}

export function safePaginationParams(
  page: unknown,
  limit: unknown,
  maxLimit = 100
): { offset: number; limit: number } {
  const p = Math.max(1, parseInt(String(page || 1), 10) || 1);
  const l = Math.min(maxLimit, Math.max(1, parseInt(String(limit || 20), 10) || 20));
  return { offset: (p - 1) * l, limit: l };
}

// ─── RLS migration helpers (reference only) ───────────────────────────────

export const RLS_MIGRATIONS = `
-- Enable Row Level Security
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals     ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- profiles: users can only see and update their own row
CREATE POLICY IF NOT EXISTS profiles_owner ON profiles
  FOR ALL USING (auth.uid()::text = id);

-- investments: users see only their own
CREATE POLICY IF NOT EXISTS investments_owner ON investments
  FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY IF NOT EXISTS investments_insert ON investments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- referrals: read-only own
CREATE POLICY IF NOT EXISTS referrals_owner ON referrals
  FOR SELECT USING (auth.uid()::text = user_id);

-- kyc_submissions: own only
CREATE POLICY IF NOT EXISTS kyc_owner ON kyc_submissions
  FOR ALL USING (auth.uid()::text = user_id);

-- notifications: own only
CREATE POLICY IF NOT EXISTS notifications_owner ON notifications
  FOR SELECT USING (auth.uid()::text = user_email OR user_email = current_user);
`;
