import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';
import { sendVerificationEmail, verifySmtpConnection } from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

const app = express();
app.use(cors());
app.use(express.json());

const tokenCache = new Map<string, { userId: string; expiresAt: number }>();

async function verifySupabaseToken(token: string): Promise<string | null> {
  const cached = tokenCache.get(token);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.userId;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) return null;

    const user = await response.json();
    if (!user?.id) return null;

    tokenCache.set(token, { userId: user.id, expiresAt: Date.now() + 60_000 });

    if (tokenCache.size > 1000) {
      const now = Date.now();
      for (const [key, val] of tokenCache) {
        if (val.expiresAt < now) tokenCache.delete(key);
      }
    }

    return user.id;
  } catch {
    return null;
  }
}

async function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const userId = await verifySupabaseToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  (req as any).userId = userId;
  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/profile', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const result = await pool.query('SELECT * FROM profiles WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      res.json(null);
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/profile', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const { email, full_name, phone, country, address, date_of_birth, nationality, zip_code } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO profiles (id, email, full_name, phone, country, address, date_of_birth, nationality, zip_code, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       ON CONFLICT (id) DO UPDATE SET
         email = COALESCE(EXCLUDED.email, profiles.email),
         full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
         phone = COALESCE(EXCLUDED.phone, profiles.phone),
         country = COALESCE(EXCLUDED.country, profiles.country),
         address = COALESCE(EXCLUDED.address, profiles.address),
         date_of_birth = COALESCE(EXCLUDED.date_of_birth, profiles.date_of_birth),
         nationality = COALESCE(EXCLUDED.nationality, profiles.nationality),
         zip_code = COALESCE(EXCLUDED.zip_code, profiles.zip_code),
         updated_at = NOW()
       RETURNING *`,
      [userId, email, full_name, phone, country, address, date_of_birth, nationality, zip_code]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/rounds', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rounds ORDER BY sort_order');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching rounds:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/investments', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const investments = await pool.query(
      'SELECT * FROM investments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    const userRounds = await pool.query(
      'SELECT ur.*, r.name, r.price, r.status as round_status FROM user_rounds ur JOIN rounds r ON ur.round_id = r.id WHERE ur.user_id = $1',
      [userId]
    );
    res.json({ investments: investments.rows, userRounds: userRounds.rows });
  } catch (err) {
    console.error('Error fetching investments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/investments', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const { round, shares, amount } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO profiles (id, email) VALUES ($1, '') ON CONFLICT (id) DO NOTHING`,
      [userId]
    );

    await client.query(
      `INSERT INTO investments (user_id, round, shares, amount, date, status)
       VALUES ($1, $2, $3, $4, $5, 'completed')`,
      [userId, round, shares, amount, new Date().toISOString().split('T')[0]]
    );

    await client.query(
      `INSERT INTO user_rounds (user_id, round_id, my_shares)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, round_id) DO UPDATE SET my_shares = user_rounds.my_shares + $3`,
      [userId, round, shares]
    );

    await client.query(
      `UPDATE rounds SET sold_shares = sold_shares + $1 WHERE id = $2`,
      [shares, round]
    );

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating investment:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.get('/api/referrals', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      'SELECT * FROM referrals WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching referrals:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/kyc', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      'SELECT * FROM kyc_submissions WHERE user_id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      res.json({ status: 'not_started' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching KYC:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/kyc', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const { status, full_name, date_of_birth, country, address, email, phone } = req.body;
  try {
    await pool.query(
      `INSERT INTO profiles (id, email) VALUES ($1, COALESCE($2, '')) ON CONFLICT (id) DO NOTHING`,
      [userId, email]
    );

    const result = await pool.query(
      `INSERT INTO kyc_submissions (user_id, status, full_name, date_of_birth, country, address, email, phone, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         status = EXCLUDED.status,
         full_name = EXCLUDED.full_name,
         date_of_birth = EXCLUDED.date_of_birth,
         country = EXCLUDED.country,
         address = EXCLUDED.address,
         email = EXCLUDED.email,
         phone = EXCLUDED.phone,
         verified_date = CASE WHEN EXCLUDED.status = 'verified' THEN NOW()::TEXT ELSE kyc_submissions.verified_date END,
         updated_at = NOW()
       RETURNING *`,
      [userId, status, full_name, date_of_birth, country, address, email, phone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating KYC:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/seed-demo-data', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const existing = await client.query('SELECT COUNT(*) FROM referrals WHERE user_id = $1', [userId]);
    if (parseInt(existing.rows[0].count) > 0) {
      await client.query('COMMIT');
      res.json({ success: true, message: 'Demo data already exists' });
      return;
    }

    await client.query(
      `INSERT INTO referrals (user_id, name, status, amount, shares, commission, date, round) VALUES
        ($1, 'John Doe', 'invested', '$150', 2000, '$15', '2026-01-15', 'seed'),
        ($1, 'Jane Smith', 'registered', '$0', 0, '$0', '2026-01-20', NULL),
        ($1, 'Peter Jones', 'invested', '$300', 4000, '$30', '2026-01-22', 'seed'),
        ($1, 'Alice Williams', 'invested', '$75', 1000, '$7.50', '2026-01-28', 'seed'),
        ($1, 'John Doe', 'invested', '$7500', 100000, '$750', '2026-02-09', 'seed')`,
      [userId]
    );

    await client.query(
      `INSERT INTO investments (user_id, round, shares, amount, date, status) VALUES
        ($1, 'seed', 2000, '$150', '2026-01-15', 'completed'),
        ($1, 'seed', 4000, '$300', '2026-01-22', 'completed')`,
      [userId]
    );

    await client.query(
      `INSERT INTO user_rounds (user_id, round_id, my_shares) VALUES ($1, 'seed', 6000)
       ON CONFLICT (user_id, round_id) DO UPDATE SET my_shares = 6000`,
      [userId]
    );

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error seeding demo data:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

function getSiteUrlServer(): string {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;
  if (process.env.REPLIT_DEPLOYMENT === '1' && process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN.replace('-00-', '.')}`;
  }
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return 'https://chefnet.replit.app';
}

const verificationRateLimit = new Map<string, number>();

async function sendVerificationForUser(userId: string, email: string, firstName: string, lang: string): Promise<{ success: boolean; error?: string; status?: number }> {
  const now = Date.now();
  const lastSent = verificationRateLimit.get(email);
  if (lastSent && now - lastSent < 60_000) {
    return { success: false, error: 'Please wait before requesting another email', status: 429 };
  }

  try {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(now + 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO profiles (id, email, email_verified, verification_token, verification_token_expires)
       VALUES ($1, $2, false, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
         email = COALESCE(EXCLUDED.email, profiles.email),
         verification_token = $3,
         verification_token_expires = $4`,
      [userId, email, token, expires]
    );

    const siteUrl = getSiteUrlServer();
    const verifyUrl = `${siteUrl}/verify-email?token=${token}`;

    const sent = await sendVerificationEmail(email, firstName || '', verifyUrl, lang || 'ru');
    if (!sent) {
      return { success: false, error: 'Failed to send email', status: 500 };
    }

    verificationRateLimit.set(email, now);
    return { success: true };
  } catch (err) {
    console.error('Error sending verification email:', err);
    return { success: false, error: 'Internal server error', status: 500 };
  }
}

app.post('/api/send-verification', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { email, firstName, lang, userId: bodyUserId } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  let userId: string | null = null;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    userId = await verifySupabaseToken(token);
  }

  if (!userId) {
    const profileResult = await pool.query(
      'SELECT id FROM profiles WHERE email = $1',
      [email]
    );
    if (profileResult.rows.length > 0) {
      userId = profileResult.rows[0].id;
    }
  }

  if (!userId && bodyUserId) {
    const supabaseUserRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${authHeader?.split(' ')[1] || ''}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    }).catch(() => null);

    if (supabaseUserRes?.ok) {
      const supabaseUser = await supabaseUserRes.json();
      if (supabaseUser?.id === bodyUserId && supabaseUser?.email === email) {
        userId = bodyUserId;
      }
    } else {
      userId = bodyUserId;
    }
  }

  if (!userId) {
    res.status(400).json({ error: 'User not found for this email' });
    return;
  }

  const result = await sendVerificationForUser(userId, email, firstName || '', lang || 'ru');
  if (!result.success) {
    res.status(result.status || 500).json({ error: result.error });
    return;
  }
  res.json({ success: true });
});

app.post('/api/confirm-supabase-verified', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const token = authHeader.split(' ')[1];

  try {
    const supabaseRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });
    if (!supabaseRes.ok) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    const user = await supabaseRes.json();
    if (!user?.id || !user?.email_confirmed_at) {
      res.status(403).json({ error: 'Email not confirmed in Supabase' });
      return;
    }

    await pool.query(
      `UPDATE profiles SET email_verified = true, verification_token = NULL, verification_token_expires = NULL
       WHERE id = $1 AND email_verified = false`,
      [user.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error confirming supabase verified:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/verify-email', handleVerifyEmail);
app.get('/verify-email', handleVerifyEmail);

async function handleVerifyEmail(req: express.Request, res: express.Response) {
  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Token is required' });
    return;
  }

  try {
    const result = await pool.query(
      `UPDATE profiles
       SET email_verified = true, verification_token = NULL, verification_token_expires = NULL
       WHERE verification_token = $1 AND verification_token_expires > NOW()
       RETURNING id, email`,
      [token]
    );

    if (result.rows.length === 0) {
      res.status(400).json({ error: 'Invalid or expired token' });
      return;
    }

    const siteUrl = getSiteUrlServer();
    res.redirect(`${siteUrl}/?verified=true`);
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

app.get('/api/email-status', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      'SELECT email_verified, verification_token FROM profiles WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      res.json({ verified: true });
      return;
    }
    const row = result.rows[0];
    if (row.email_verified === true) {
      res.json({ verified: true });
    } else if (row.verification_token !== null) {
      res.json({ verified: false });
    } else {
      res.json({ verified: true });
    }
  } catch (err) {
    console.error('Error checking email status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? 5000 : parseInt(process.env.API_PORT || '3001');

if (isProduction) {
  const distPath = path.resolve(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`API server running on port ${PORT}${isProduction ? ' (production)' : ''}`);
  await verifySmtpConnection();
});
