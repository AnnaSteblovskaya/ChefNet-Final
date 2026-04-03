import pg from 'pg';

// Strip sslmode from connection string to avoid conflicts with explicit ssl config
const rawUrl = process.env.DATABASE_URL || '';
const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, '').replace(/\?$/, '');

const needsSsl = rawUrl.includes('sslmode=require') ||
  rawUrl.includes('pooler.supabase.com') ||
  process.env.NODE_ENV === 'production';

const pool = new pg.Pool({
  connectionString,
  ssl: needsSsl ? { rejectUnauthorized: true } : false,
  connectionTimeoutMillis: 15000,
});

pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message);
});

export default pool;
