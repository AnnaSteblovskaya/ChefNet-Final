import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';
import { sendVerificationEmail, sendPasswordResetEmail, verifySmtpConnection } from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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

app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, lang, ref } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  try {
    const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { firstName, lastName },
      }),
    });

    if (!createRes.ok) {
      const errData = await createRes.json().catch(() => ({}));
      const msg = errData?.msg || errData?.message || 'Registration failed';
      if (msg.includes('already been registered') || msg.includes('already exists')) {
        // User exists in Supabase — check if they're verified in our DB
        const existingProfile = await pool.query(
          'SELECT id, email_verified FROM profiles WHERE email = $1',
          [email.toLowerCase().trim()]
        );
        if (existingProfile.rows.length > 0 && existingProfile.rows[0].email_verified) {
          res.status(409).json({ error: 'User already registered' });
          return;
        }
        // Not verified in our DB — look up Supabase user and resend verification
        const supabaseUserRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, {
          headers: { 'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'apikey': SUPABASE_SERVICE_ROLE_KEY },
        }).catch(() => null);
        let existingUserId = existingProfile.rows[0]?.id || null;
        if (!existingUserId && supabaseUserRes?.ok) {
          const supabaseData = await supabaseUserRes.json().catch(() => ({}));
          const supabaseUsers = supabaseData.users || [];
          const found = supabaseUsers.find((u: any) => u.email?.toLowerCase() === email.toLowerCase().trim());
          if (found) existingUserId = found.id;
        }
        if (existingUserId) {
          console.log(`[register] Re-sending verification for existing unverified user ${existingUserId}`);
          // Update name metadata if provided
          if (firstName || lastName) {
            await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existingUserId}`, {
              method: 'PUT',
              headers: { 'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'apikey': SUPABASE_SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
              body: JSON.stringify({ user_metadata: { firstName, lastName } }),
            }).catch(() => null);
          }
          const verifyResult = await sendVerificationForUser(existingUserId, email, firstName || '', lang || 'ru', null);
          if (!verifyResult.success) {
            console.error('[register] Resend failed for existing user:', verifyResult.error);
          }
          res.json({ success: true, userId: existingUserId });
          return;
        }
        res.status(409).json({ error: 'User already registered' });
        return;
      }
      console.error('Supabase admin create user error:', msg);
      res.status(400).json({ error: msg });
      return;
    }

    const userData = await createRes.json();
    const userId = userData.id;

    // Resolve referrer from ref code (e.g. "CHEF-C78316" → find profile starting with C78316)
    let referredBy: string | null = null;
    if (ref && typeof ref === 'string') {
      const code = ref.replace(/^CHEF-/i, '').toLowerCase();
      if (code.length === 6) {
        const refResult = await pool.query(
          `SELECT id FROM profiles WHERE REPLACE(LOWER(id), '-', '') LIKE $1 LIMIT 1`,
          [code + '%']
        );
        if (refResult.rows.length > 0) {
          referredBy = refResult.rows[0].id;
          console.log(`[register] Referral code ${ref} → referrer ${referredBy}`);
        }
      }
    }

    console.log(`[register] New user created: ${userId} (${email})`);
    const verifyResult = await sendVerificationForUser(userId, email, firstName || '', lang || 'ru', referredBy);
    if (!verifyResult.success) {
      console.error(`[register] Verification email failed for ${email}:`, verifyResult.error);
    } else {
      console.log(`[register] Verification email sent to ${email}`);
    }

    res.json({ success: true, userId });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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

async function sendVerificationForUser(userId: string, email: string, firstName: string, lang: string, referredBy: string | null = null): Promise<{ success: boolean; error?: string; status?: number }> {
  const now = Date.now();
  const lastSent = verificationRateLimit.get(email);
  if (lastSent && now - lastSent < 60_000) {
    return { success: false, error: 'Please wait before requesting another email', status: 429 };
  }

  try {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(now + 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO profiles (id, email, email_verified, verification_token, verification_token_expires, referred_by)
       VALUES ($1, $2, false, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET
         email = COALESCE(EXCLUDED.email, profiles.email),
         verification_token = $3,
         verification_token_expires = $4,
         referred_by = COALESCE(profiles.referred_by, EXCLUDED.referred_by)`,
      [userId, email, token, expires, referredBy]
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
      'SELECT id FROM profiles WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    if (profileResult.rows.length > 0) {
      userId = profileResult.rows[0].id;
    }
  }

  // If not found in our DB, look up in Supabase admin API
  if (!userId) {
    const supabaseAdminRes = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
      { headers: { 'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'apikey': SUPABASE_SERVICE_ROLE_KEY } }
    ).catch(() => null);
    if (supabaseAdminRes?.ok) {
      const data = await supabaseAdminRes.json().catch(() => ({}));
      const users = data.users || [];
      const found = users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase().trim());
      if (found) {
        userId = found.id;
        console.log(`[send-verification] Found user in Supabase but not in DB: ${userId}`);
      }
    }
  }

  if (!userId && bodyUserId && authHeader?.startsWith('Bearer ')) {
    const supabaseUserRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${authHeader.split(' ')[1]}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    }).catch(() => null);

    if (supabaseUserRes?.ok) {
      const supabaseUser = await supabaseUserRes.json();
      if (supabaseUser?.id === bodyUserId && supabaseUser?.email === email) {
        userId = bodyUserId;
      }
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

const resetPasswordRateLimit = new Map<string, number>();

app.post('/api/reset-password', async (req, res) => {
  const { email, lang } = req.body;

  if (!email || typeof email !== 'string') {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const now = Date.now();
  const lastSent = resetPasswordRateLimit.get(normalizedEmail);
  if (lastSent && now - lastSent < 60_000) {
    res.status(429).json({ error: 'Please wait before requesting another email' });
    return;
  }

  try {
    const profileRow = await pool.query(
      'SELECT id, full_name FROM profiles WHERE email = $1 LIMIT 1',
      [normalizedEmail]
    );

    if (profileRow.rows.length === 0) {
      res.json({ success: true });
      return;
    }

    const { id: userId, full_name: fullName = '' } = profileRow.rows[0];
    const firstName = (fullName || '').split(' ')[0] || '';

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO password_reset_tokens (token, user_id, email, expires_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (token) DO NOTHING`,
      [token, userId, normalizedEmail, expiresAt]
    );

    const siteUrl = getSiteUrlServer();
    const resetUrl = `${siteUrl}/?reset_token=${token}`;

    const sent = await sendPasswordResetEmail(normalizedEmail, firstName, resetUrl, lang || 'ru');
    if (!sent) {
      res.status(500).json({ error: 'Failed to send reset email' });
      return;
    }

    resetPasswordRateLimit.set(normalizedEmail, now);
    res.json({ success: true });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/reset-password-confirm', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ error: 'Token and new password are required' });
    return;
  }

  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters' });
    return;
  }

  try {
    const tokenRow = await pool.query(
      `SELECT user_id, email, expires_at, used_at
       FROM password_reset_tokens
       WHERE token = $1`,
      [token]
    );

    if (tokenRow.rows.length === 0) {
      res.status(400).json({ error: 'Invalid or expired reset token' });
      return;
    }

    const { user_id: userId, expires_at: expiresAt, used_at: usedAt } = tokenRow.rows[0];

    if (usedAt) {
      res.status(400).json({ error: 'This reset link has already been used' });
      return;
    }

    if (new Date(expiresAt) < new Date()) {
      res.status(400).json({ error: 'Reset link has expired' });
      return;
    }

    const updateRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error('Supabase update user error:', updateRes.status, errText);
      res.status(500).json({ error: 'Failed to update password. Service may be temporarily unavailable.' });
      return;
    }

    await pool.query(
      'UPDATE password_reset_tokens SET used_at = NOW() WHERE token = $1',
      [token]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Reset password confirm error:', err);
    res.status(503).json({ error: 'Service temporarily unavailable. Please try again later.' });
  }
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
  const siteUrl = getSiteUrlServer();

  if (!token || typeof token !== 'string') {
    res.redirect(`${siteUrl}/?verify_error=missing`);
    return;
  }

  try {
    // Check if token exists at all (ignoring expiry) for better diagnostics
    const check = await pool.query(
      `SELECT id, email, email_verified, verification_token_expires, referred_by FROM profiles WHERE verification_token = $1`,
      [token]
    );

    if (check.rows.length === 0) {
      console.log(`[verify-email] Token not found in DB. Token prefix: ${token.substring(0, 8)}...`);
      res.redirect(`${siteUrl}/?verify_error=invalid`);
      return;
    }

    const row = check.rows[0];
    if (row.email_verified) {
      // Already verified — just redirect success
      res.redirect(`${siteUrl}/?verified=true`);
      return;
    }

    if (row.verification_token_expires && new Date(row.verification_token_expires) < new Date()) {
      console.log(`[verify-email] Token expired for ${row.email}`);
      res.redirect(`${siteUrl}/?verify_error=expired&email=${encodeURIComponent(row.email)}`);
      return;
    }

    // Token is valid — mark as verified
    await pool.query(
      `UPDATE profiles
       SET email_verified = true, verification_token = NULL, verification_token_expires = NULL
       WHERE id = $1`,
      [row.id]
    );

    console.log(`[verify-email] Successfully verified ${row.email}`);

    // If this user was referred, add them to the referrer's referral list
    if (row.referred_by) {
      try {
        const displayName = row.email.split('@')[0];
        const today = new Date().toISOString().split('T')[0];
        await pool.query(
          `INSERT INTO referrals (user_id, name, status, amount, shares, commission, date, round)
           VALUES ($1, $2, 'registered', '$0', 0, '$0', $3, 'seed')`,
          [row.referred_by, displayName, today]
        );
        console.log(`[verify-email] Added ${row.email} as referral for ${row.referred_by}`);
      } catch (refErr) {
        console.error('[verify-email] Failed to create referral record:', refErr);
      }
    }

    res.redirect(`${siteUrl}/?verified=true`);
  } catch (err) {
    console.error('Error verifying email:', err);
    res.redirect(`${siteUrl}/?verify_error=server`);
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
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`API server running on port ${PORT}${isProduction ? ' (production)' : ''}`);
  await verifySmtpConnection();
});
