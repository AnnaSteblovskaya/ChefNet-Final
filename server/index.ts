import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';
import { sendVerificationEmail, sendPasswordResetEmail, verifySmtpConnection, sendReferralNotificationEmail } from './email.js';
import { createAdminRouter, createPublicContentRouter } from './admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN || '';
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY || '';
const SUMSUB_BASE_URL = 'https://api.sumsub.com';
const SUMSUB_LEVEL_NAME = process.env.SUMSUB_LEVEL_NAME || 'basic-kyc-level';

function sumsubSign(method: string, path: string, body: string, ts: number): string {
  const data = ts + method.toUpperCase() + path + body;
  return crypto.createHmac('sha256', SUMSUB_SECRET_KEY).update(data).digest('hex');
}

async function sumsubRequest(method: string, path: string, body?: object): Promise<Response> {
  const ts = Math.floor(Date.now() / 1000);
  const bodyStr = body ? JSON.stringify(body) : '';
  const sig = sumsubSign(method, path, bodyStr, ts);
  return fetch(`${SUMSUB_BASE_URL}${path}`, {
    method,
    headers: {
      'X-App-Token': SUMSUB_APP_TOKEN,
      'X-App-Access-Ts': String(ts),
      'X-App-Access-Sig': sig,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: bodyStr || undefined,
  });
}

const app = express();
app.use(cors());
app.use(express.json());

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64url').toString('utf8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function verifySupabaseToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  const exp = typeof payload.exp === 'number' ? payload.exp : 0;
  if (exp > 0 && exp * 1000 < Date.now()) return null; // token expired
  const sub = typeof payload.sub === 'string' ? payload.sub : null;
  return sub;
}

async function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const userId = verifySupabaseToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  (req as any).userId = userId;
  next();
}

async function ensureDbSchema() {
  const tableMigrations = [
    `CREATE TABLE IF NOT EXISTS rounds (
      id text PRIMARY KEY,
      name text NOT NULL,
      price numeric NOT NULL DEFAULT 0,
      total_shares integer NOT NULL DEFAULT 0,
      sold_shares integer NOT NULL DEFAULT 0,
      status text NOT NULL DEFAULT 'upcoming',
      sort_order integer NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS investments (
      id serial PRIMARY KEY,
      user_id text NOT NULL,
      round text,
      shares integer NOT NULL DEFAULT 0,
      amount numeric NOT NULL DEFAULT 0,
      date timestamptz NOT NULL DEFAULT now(),
      status text NOT NULL DEFAULT 'pending'
    )`,
    `CREATE TABLE IF NOT EXISTS user_rounds (
      id serial PRIMARY KEY,
      user_id text NOT NULL,
      round_id text NOT NULL,
      my_shares integer NOT NULL DEFAULT 0,
      UNIQUE(user_id, round_id)
    )`,
    `CREATE TABLE IF NOT EXISTS kyc_submissions (
      id serial PRIMARY KEY,
      user_id text NOT NULL,
      status text NOT NULL DEFAULT 'pending',
      country text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS referrals (
      id serial PRIMARY KEY,
      user_id text NOT NULL,
      name text,
      level integer NOT NULL DEFAULT 0,
      shares integer NOT NULL DEFAULT 0,
      commission numeric NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS partners (
      id serial PRIMARY KEY,
      name text NOT NULL,
      logo_url text,
      website text,
      description_en text,
      description_ru text,
      status text NOT NULL DEFAULT 'active',
      sort_order integer NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS news (
      id serial PRIMARY KEY,
      title_en text,
      title_ru text,
      title_de text,
      title_es text,
      title_tr text,
      body_en text,
      body_ru text,
      body_de text,
      body_es text,
      body_tr text,
      published boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS documents (
      id serial PRIMARY KEY,
      title_en text,
      title_ru text,
      title_de text,
      title_es text,
      title_tr text,
      file_url text,
      category text,
      visible boolean NOT NULL DEFAULT true,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS site_content (
      id serial PRIMARY KEY,
      key text UNIQUE NOT NULL,
      label text,
      value_en text,
      value_ru text,
      value_de text,
      value_es text,
      value_tr text,
      updated_at timestamptz NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS faq (
      id serial PRIMARY KEY,
      question_en text,
      question_ru text,
      question_de text,
      question_es text,
      question_tr text,
      answer_en text,
      answer_ru text,
      answer_de text,
      answer_es text,
      answer_tr text,
      is_active boolean NOT NULL DEFAULT true,
      sort_order integer NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS payments (
      id serial PRIMARY KEY,
      user_id text,
      amount numeric NOT NULL DEFAULT 0,
      payment_date timestamptz NOT NULL DEFAULT now(),
      contract_number text,
      status text NOT NULL DEFAULT 'pending'
    )`,
    `CREATE TABLE IF NOT EXISTS notifications (
      id serial PRIMARY KEY,
      user_email text,
      type text,
      message text,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS settings (
      id serial PRIMARY KEY,
      key text UNIQUE NOT NULL,
      value text
    )`,
    `CREATE TABLE IF NOT EXISTS email_templates (
      id serial PRIMARY KEY,
      event text UNIQUE NOT NULL,
      email_enabled boolean NOT NULL DEFAULT false,
      account_enabled boolean NOT NULL DEFAULT true,
      subject_en text,
      subject_ru text,
      body_en text,
      body_ru text,
      sort_order integer NOT NULL DEFAULT 0
    )`,
  ];
  for (const sql of tableMigrations) {
    try {
      await pool.query(sql);
    } catch (err: any) {
      console.error('[db-init] Table creation failed:', err.message);
    }
  }

  const migrations = [
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS target_sum numeric DEFAULT 0`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS market_cap numeric DEFAULT 0`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS share_price numeric DEFAULT 0`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS min_order numeric DEFAULT 0`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS active boolean DEFAULT true`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS description_en text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS description_ru text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS description_de text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS description_es text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS description_tr text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS tasks_en text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS tasks_ru text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS tasks_de text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS tasks_es text`,
    `ALTER TABLE rounds ADD COLUMN IF NOT EXISTS tasks_tr text`,
    `ALTER TABLE referrals ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending'`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verification_token text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verification_token_expires timestamptz`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS date_of_birth text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nationality text`,
    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS zip_code text`,
    `ALTER TABLE referrals ADD COLUMN IF NOT EXISTS referred_user_id text`,
    `ALTER TABLE referrals ADD COLUMN IF NOT EXISTS email text`,
    `ALTER TABLE referrals ALTER COLUMN referred_user_id TYPE text USING referred_user_id::text`,
    `ALTER TABLE kyc_submissions ADD COLUMN IF NOT EXISTS sumsub_applicant_id text`,
  ];
  for (const sql of migrations) {
    try {
      await pool.query(sql);
    } catch (err: any) {
      if (!err.message?.includes('already exists')) {
        console.error('[db-init] Migration failed:', sql, err.message);
      }
    }
  }
  // Backfill referred_user_id and email for existing referral records using name matching
  try {
    await pool.query(`
      UPDATE referrals r
      SET referred_user_id = p.id, email = p.email
      FROM profiles p
      WHERE r.referred_user_id IS NULL
        AND LOWER(p.full_name) = LOWER(r.name)
        AND UPPER(p.referred_by) = (
          'CHEF-' || UPPER(SUBSTRING(REPLACE(r.user_id::text, '-', ''), 1, 6))
        )
    `);
    console.log('[db-init] Referral backfill complete');
  } catch (err: any) {
    console.error('[db-init] Referral backfill failed:', err.message);
  }
  // Backfill full_name from Supabase auth metadata for profiles where it is null
  try {
    const nullNames = await pool.query(
      `SELECT id FROM profiles WHERE full_name IS NULL OR full_name = ''`
    );
    if (nullNames.rows.length > 0) {
      let updated = 0;
      for (const row of nullNames.rows) {
        try {
          const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${row.id}`, {
            headers: {
              'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
              'apikey': SUPABASE_SERVICE_ROLE_KEY,
            },
          });
          if (authRes.ok) {
            const authUser = await authRes.json();
            const firstName = authUser.user_metadata?.firstName || '';
            const lastName = authUser.user_metadata?.lastName || '';
            const combinedName = `${firstName} ${lastName}`.trim();
            if (combinedName) {
              await pool.query(
                'UPDATE profiles SET full_name = $1 WHERE id = $2',
                [combinedName, row.id]
              );
              updated++;
            }
          }
        } catch (_e) { /* skip individual failures */ }
      }
      if (updated > 0) console.log(`[db-init] Backfilled full_name for ${updated} profile(s)`);
    }
  } catch (err: any) {
    console.error('[db-init] full_name backfill failed:', err.message);
  }
  // Seed default email templates
  const defaultTemplates = [
    { event: 'User registered', sort_order: 1 },
    { event: 'Need email verification', sort_order: 2 },
    { event: 'Email verified', sort_order: 3 },
    { event: 'Need KYC verification', sort_order: 4 },
    { event: 'Password changed', sort_order: 5 },
    { event: 'Referral registered', sort_order: 6 },
    { event: 'Referral paid', sort_order: 7 },
    { event: 'Referral bonus credited', sort_order: 8 },
  ];
  for (const t of defaultTemplates) {
    try {
      await pool.query(
        `INSERT INTO email_templates (event, email_enabled, account_enabled, sort_order)
         VALUES ($1, false, true, $2)
         ON CONFLICT (event) DO NOTHING`,
        [t.event, t.sort_order]
      );
    } catch { /* skip */ }
  }

  console.log('[db-init] Schema check complete');
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Public endpoint — look up referrer's display name by referral code (no auth required)
app.get('/api/referrer-name', async (req, res) => {
  const { code } = req.query;
  if (!code || typeof code !== 'string' || !/^CHEF-[A-Z0-9]{6}$/i.test(code)) {
    res.status(400).json({ error: 'Invalid code' });
    return;
  }
  try {
    const result = await pool.query(
      `SELECT id, full_name FROM profiles
       WHERE 'CHEF-' || UPPER(SUBSTRING(REPLACE(id::text, '-', ''), 1, 6)) = $1
       LIMIT 1`,
      [code.toUpperCase()]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    const { id: userId, full_name } = result.rows[0];
    // If full_name is already set, return it directly
    if (full_name && full_name.trim()) {
      res.json({ name: full_name.trim() });
      return;
    }
    // Otherwise fetch from Supabase auth metadata (firstName + lastName stored at registration)
    try {
      const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
        },
      });
      if (authRes.ok) {
        const authUser = await authRes.json();
        const firstName = authUser.user_metadata?.firstName || '';
        const lastName = authUser.user_metadata?.lastName || '';
        const combinedName = `${firstName} ${lastName}`.trim();
        if (combinedName) {
          // Backfill full_name in profiles so future lookups are fast
          await pool.query(
            'UPDATE profiles SET full_name = $1 WHERE id = $2',
            [combinedName, userId]
          );
          res.json({ name: combinedName });
          return;
        }
      }
    } catch (_e) {
      // Auth lookup failed, fall through to null
    }
    res.json({ name: null });
  } catch (err) {
    console.error('Error fetching referrer name:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, lang, referralCode } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const cleanReferralCode = typeof referralCode === 'string' && /^CHEF-[A-Z0-9]{6}$/i.test(referralCode.trim())
    ? referralCode.trim().toUpperCase()
    : null;

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
        res.status(409).json({ error: 'User already registered' });
        return;
      }
      console.error('Supabase admin create user error:', msg);
      res.status(400).json({ error: msg });
      return;
    }

    const userData = await createRes.json();
    const userId = userData.id;

    const verifyResult = await sendVerificationForUser(userId, email, firstName || '', lang || 'ru');
    if (!verifyResult.success) {
      console.error('Verification email failed after registration:', verifyResult.error);
    }

    if (cleanReferralCode) {
      try {
        await pool.query(
          `INSERT INTO profiles (id, email, referred_by, full_name)
           VALUES ($3, $4, $1, $2)
           ON CONFLICT (id) DO UPDATE SET
             referred_by = COALESCE(profiles.referred_by, EXCLUDED.referred_by),
             full_name = COALESCE(profiles.full_name, EXCLUDED.full_name)`,
          [cleanReferralCode, `${firstName || ''} ${lastName || ''}`.trim(), userId, email]
        );
        console.log(`[register] Referral code ${cleanReferralCode} saved for user ${userId}`);
      } catch (refErr) {
        console.error('[register] Failed to save referral code:', refErr);
      }
    }

    pool.query('INSERT INTO notifications (user_email, type) VALUES ($1, $2)', [email, 'User registered']).catch(() => {});

    if (cleanReferralCode) {
      (async () => {
        try {
          const refOwner = await pool.query(
            `SELECT email, full_name FROM profiles WHERE UPPER(referral_code) = UPPER($1) OR UPPER(id::text) = UPPER(REPLACE($1, 'CHEF-', ''))`,
            [cleanReferralCode]
          );
          if (!refOwner.rows.length) {
            const ownerByCode = await pool.query(
              `SELECT p.email, p.full_name FROM profiles p WHERE UPPER(CONCAT('CHEF-', LEFT(REPLACE(p.id::text,'-',''), 6))) = UPPER($1)`,
              [cleanReferralCode]
            );
            if (ownerByCode.rows.length) {
              await sendReferralNotificationEmail(
                ownerByCode.rows[0].email,
                'registered',
                `${firstName || ''} ${lastName || ''}`.trim() || email,
                email
              );
            }
          } else {
            await sendReferralNotificationEmail(
              refOwner.rows[0].email,
              'registered',
              `${firstName || ''} ${lastName || ''}`.trim() || email,
              email
            );
          }
        } catch (e) {
          console.error('[referral-notify] register lookup failed:', e);
        }
      })();
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
    const rows = result.rows.map((r: any) => {
      const sharePrice = parseFloat(r.share_price) || parseFloat(r.price) || 0;
      const targetSum = parseFloat(r.target_sum) || 0;
      const minOrder = parseFloat(r.min_order) || 0;
      const totalShares = sharePrice > 0 ? Math.round(targetSum / sharePrice) : (r.total_shares || 0);
      const isActive = r.active === true || r.active === 'true';
      const formattedAmount = targetSum > 0
        ? '$' + targetSum.toLocaleString('en-US')
        : (r.amount || '');
      return {
        ...r,
        price: sharePrice,
        min_investment: minOrder,
        total_shares: totalShares,
        sold_shares: r.sold_shares || 0,
        status: isActive ? 'active' : 'upcoming',
        amount: formattedAmount,
        highlight: isActive,
      };
    });
    res.json(rows);
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

    (async () => {
      try {
        const investorRow = await pool.query(
          `SELECT email, full_name, referred_by FROM profiles WHERE id = $1`,
          [userId]
        );
        if (investorRow.rows.length && investorRow.rows[0].referred_by) {
          const refCode = investorRow.rows[0].referred_by as string;
          const partnerName = investorRow.rows[0].full_name || '';
          const partnerEmail = investorRow.rows[0].email || '';
          const ownerRow = await pool.query(
            `SELECT email FROM profiles p WHERE UPPER(CONCAT('CHEF-', LEFT(REPLACE(p.id::text,'-',''), 6))) = UPPER($1)`,
            [refCode]
          );
          if (ownerRow.rows.length) {
            await sendReferralNotificationEmail(ownerRow.rows[0].email, 'investment', partnerName, partnerEmail, {
              shares: Number(shares),
              amount: Number(amount),
              round: String(round),
            });
            pool.query('INSERT INTO notifications (user_email, type) VALUES ($1, $2)', [ownerRow.rows[0].email, 'Partner investment']).catch(() => {});
          }
        }
      } catch (e) {
        console.error('[referral-notify] investment lookup failed:', e);
      }
    })();

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
    const referralCode = `CHEF-${userId.replace(/-/g, '').substring(0, 6).toUpperCase()}`;

    // Get records from referrals table, join with profiles to get email if missing
    const referralsResult = await pool.query(
      `SELECT r.*, COALESCE(r.email, p.email) as email
       FROM referrals r
       LEFT JOIN profiles p ON r.referred_user_id = p.id
       WHERE r.user_id = $1 ORDER BY r.created_at DESC`,
      [userId]
    );

    // Also get users from profiles who registered with this referral code
    // but may not have a referrals record yet
    const profilesResult = await pool.query(
      `SELECT p.id, p.full_name, p.email, p.referred_by, p.email_verified, p.created_at
       FROM profiles p
       WHERE UPPER(p.referred_by) = $1`,
      [referralCode.toUpperCase()]
    );

    // Merge: profiles-based records that are not yet in referrals table
    const existingUserIds = new Set(referralsResult.rows.map((r: any) => r.referred_user_id).filter(Boolean));
    const existingEmails = new Set(referralsResult.rows.map((r: any) => r.email?.toLowerCase()).filter(Boolean));
    const existingNames = new Set(referralsResult.rows.map((r: any) => r.name?.toLowerCase()).filter(Boolean));
    const extraFromProfiles = profilesResult.rows
      .filter((p: any) =>
        !existingUserIds.has(p.id) &&
        !existingEmails.has(p.email?.toLowerCase()) &&
        !existingNames.has((p.full_name || p.email || '').toLowerCase())
      )
      .map((p: any) => ({
        id: null,
        user_id: userId,
        name: p.full_name || p.email || 'Unknown',
        email: p.email || '',
        referred_user_id: p.id,
        status: 'registered',
        amount: '$0',
        shares: 0,
        commission: '$0',
        date: p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        round: null,
        created_at: p.created_at,
      }));

    const combined = [...referralsResult.rows, ...extraFromProfiles].sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    res.json(combined);
  } catch (err) {
    console.error('Error fetching referrals:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Referral tree - recursive multi-level structure
app.get('/api/referral-tree', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  try {
    // Get all profiles in the entire downline using recursive query
    const treeResult = await pool.query(
      `WITH RECURSIVE downline AS (
        -- Direct referrals (level 1)
        SELECT
          p.id,
          p.email,
          p.full_name,
          p.referred_by,
          p.created_at,
          'CHEF-' || UPPER(SUBSTRING(REPLACE(p.id::text, '-', ''), 1, 6)) as own_ref_code,
          1 as level,
          $2::text as parent_ref_code
        FROM profiles p
        WHERE UPPER(p.referred_by) = $2
        UNION ALL
        -- Deeper levels
        SELECT
          p.id,
          p.email,
          p.full_name,
          p.referred_by,
          p.created_at,
          'CHEF-' || UPPER(SUBSTRING(REPLACE(p.id::text, '-', ''), 1, 6)),
          d.level + 1,
          d.own_ref_code
        FROM profiles p
        INNER JOIN downline d ON UPPER(p.referred_by) = d.own_ref_code
        WHERE d.level < 10
      )
      SELECT d.*, r.shares, r.amount, r.status, r.commission
      FROM downline d
      LEFT JOIN referrals r ON r.referred_user_id = d.id AND r.user_id = (
        SELECT id FROM profiles WHERE 'CHEF-' || UPPER(SUBSTRING(REPLACE(id::text, '-', ''), 1, 6)) = d.parent_ref_code LIMIT 1
      )
      ORDER BY d.level, d.created_at`,
      [userId, `CHEF-${userId.replace(/-/g, '').substring(0, 6).toUpperCase()}`]
    );

    res.json(treeResult.rows);
  } catch (err) {
    console.error('Error fetching referral tree:', err);
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

// Sumsub: generate SDK access token (creates applicant if needed)
app.post('/api/kyc/access-token', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  if (!SUMSUB_APP_TOKEN || !SUMSUB_SECRET_KEY) {
    res.status(503).json({ error: 'Sumsub not configured' });
    return;
  }
  try {
    // Ensure profile exists
    await pool.query(
      `INSERT INTO profiles (id, email) VALUES ($1, '') ON CONFLICT (id) DO NOTHING`,
      [userId]
    );

    // Check if applicant already exists
    let row = await pool.query(
      'SELECT sumsub_applicant_id FROM kyc_submissions WHERE user_id = $1',
      [userId]
    );
    let applicantId: string | null = row.rows[0]?.sumsub_applicant_id || null;

    if (!applicantId) {
      // Create applicant in Sumsub
      const createPath = `/resources/applicants?levelName=${encodeURIComponent(SUMSUB_LEVEL_NAME)}`;
      const createRes = await sumsubRequest('POST', createPath, { externalUserId: userId });
      if (!createRes.ok) {
        const err = await createRes.text();
        console.error('[sumsub] create applicant error:', err);
        res.status(500).json({ error: 'Failed to create Sumsub applicant' });
        return;
      }
      const applicant = await createRes.json();
      applicantId = applicant.id;

      // Upsert kyc_submissions with applicant ID
      await pool.query(
        `INSERT INTO kyc_submissions (user_id, status, sumsub_applicant_id, updated_at)
         VALUES ($1, 'pending', $2, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
           sumsub_applicant_id = EXCLUDED.sumsub_applicant_id,
           status = CASE WHEN kyc_submissions.status = 'not_started' OR kyc_submissions.status IS NULL
                         THEN 'pending' ELSE kyc_submissions.status END,
           updated_at = NOW()`,
        [userId, applicantId]
      );
    }

    // Generate SDK access token
    const tokenPath = `/resources/accessTokens?userId=${encodeURIComponent(userId)}&levelName=${encodeURIComponent(SUMSUB_LEVEL_NAME)}&ttlInSecs=1200`;
    const tokenRes = await sumsubRequest('POST', tokenPath);
    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error('[sumsub] access token error:', err);
      res.status(500).json({ error: 'Failed to generate Sumsub access token' });
      return;
    }
    const tokenData = await tokenRes.json();
    res.json({ token: tokenData.token, userId });
  } catch (err) {
    console.error('[sumsub] access-token error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sumsub webhook — receives status updates (no auth required, verified by signature)
app.post('/api/kyc/webhook', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    const bodyBuf = req.body as Buffer;
    const bodyStr = bodyBuf.toString('utf8');
    // Verify signature
    const digest = req.headers['x-payload-digest'] as string | undefined;
    const alg = (req.headers['x-payload-digest-alg'] as string || '').toUpperCase();
    if (SUMSUB_SECRET_KEY && digest) {
      let expected = '';
      if (alg.includes('SHA256')) {
        expected = crypto.createHmac('sha256', SUMSUB_SECRET_KEY).update(bodyBuf).digest('hex');
      } else {
        expected = crypto.createHmac('sha1', SUMSUB_SECRET_KEY).update(bodyBuf).digest('hex');
      }
      if (expected.toLowerCase() !== digest.toLowerCase()) {
        console.warn('[sumsub] webhook signature mismatch');
        res.status(403).json({ error: 'Invalid signature' });
        return;
      }
    }

    const payload = JSON.parse(bodyStr);
    const { externalUserId, reviewStatus, reviewResult } = payload;
    if (!externalUserId) { res.json({ ok: true }); return; }

    let status = 'pending';
    if (reviewStatus === 'completed') {
      const answer = reviewResult?.reviewAnswer;
      const rejectType = reviewResult?.reviewRejectType;
      if (answer === 'GREEN') status = 'verified';
      else if (answer === 'RED' && rejectType === 'FINAL') status = 'rejected';
      else status = 'pending'; // retry
    }

    await pool.query(
      `INSERT INTO kyc_submissions (user_id, status, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         status = $2,
         verified_date = CASE WHEN $2 = 'verified' THEN NOW()::TEXT ELSE kyc_submissions.verified_date END,
         updated_at = NOW()`,
      [externalUserId, status]
    );
    console.log(`[sumsub] webhook: user ${externalUserId} → ${status}`);

    if (status === 'verified') {
      (async () => {
        try {
          const userRow = await pool.query(
            `SELECT email, full_name, referred_by FROM profiles WHERE id = $1`,
            [externalUserId]
          );
          if (userRow.rows.length && userRow.rows[0].referred_by) {
            const refCode = userRow.rows[0].referred_by as string;
            const partnerName = userRow.rows[0].full_name || '';
            const partnerEmail = userRow.rows[0].email || '';
            const ownerRow = await pool.query(
              `SELECT email FROM profiles p WHERE UPPER(CONCAT('CHEF-', LEFT(REPLACE(p.id::text,'-',''), 6))) = UPPER($1)`,
              [refCode]
            );
            if (ownerRow.rows.length) {
              await sendReferralNotificationEmail(ownerRow.rows[0].email, 'kyc_approved', partnerName, partnerEmail);
              pool.query('INSERT INTO notifications (user_email, type) VALUES ($1, $2)', [ownerRow.rows[0].email, 'Partner KYC verified']).catch(() => {});
            }
          }
        } catch (e) {
          console.error('[referral-notify] kyc_approved lookup failed:', e);
        }
      })();
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[sumsub] webhook error:', err);
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
  // Explicit override takes priority (set VITE_SITE_URL=https://chefnet.replit.app in secrets)
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;
  // In deployment: REPLIT_DOMAINS contains the real production domains (e.g. "chefnet.replit.app")
  if (process.env.REPLIT_DEPLOYMENT === '1') {
    if (process.env.REPLIT_DOMAINS) {
      const firstDomain = process.env.REPLIT_DOMAINS.split(',')[0].trim();
      return `https://${firstDomain}`;
    }
    return 'https://chefnet.replit.app';
  }
  // In dev: use the worf.replit.dev preview domain
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
    userId = verifySupabaseToken(token);
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
    pool.query('INSERT INTO notifications (user_email, type) VALUES ($1, $2)', [user.email || '', 'Email verified']).catch(() => {});
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
      `SELECT id, email, email_verified, verification_token_expires FROM profiles WHERE verification_token = $1`,
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

    // Create referral record if this user was referred
    try {
      const profileRow = await pool.query(
        'SELECT referred_by, full_name FROM profiles WHERE id = $1',
        [row.id]
      );
      const referralCode = profileRow.rows[0]?.referred_by;
      const newUserName = profileRow.rows[0]?.full_name || row.email;
      if (referralCode && /^CHEF-[A-Z0-9]{6}$/i.test(referralCode)) {
        const referrerRow = await pool.query(
          `SELECT id FROM profiles WHERE 'CHEF-' || UPPER(SUBSTRING(REPLACE(id, '-', ''), 1, 6)) = $1 LIMIT 1`,
          [referralCode.toUpperCase()]
        );
        if (referrerRow.rows.length > 0) {
          const referrerId = referrerRow.rows[0].id;
          await pool.query(
            `INSERT INTO referrals (user_id, name, email, referred_user_id, status, amount, shares, commission, date)
             VALUES ($1, $2, $3, $4, 'registered', '$0', 0, '$0', CURRENT_DATE)
             ON CONFLICT DO NOTHING`,
            [referrerId, newUserName, row.email, row.id]
          );
          console.log(`[verify-email] Referral record created: ${referrerId} referred ${row.email}`);
        }
      }
    } catch (refErr) {
      console.error('[verify-email] Failed to create referral record:', refErr);
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

// Admin & public content routes
app.use('/api/admin', createAdminRouter(pool, requireAuth));
app.use('/api/public', createPublicContentRouter(pool));

// Bootstrap: set first admin (requires ADMIN_BOOTSTRAP_SECRET env var)
app.post('/api/admin-bootstrap', requireAuth, async (req, res) => {
  const { secret } = req.body;
  const BOOTSTRAP_SECRET = process.env.ADMIN_BOOTSTRAP_SECRET;
  if (!BOOTSTRAP_SECRET || secret !== BOOTSTRAP_SECRET) {
    res.status(403).json({ error: 'Invalid secret' });
    return;
  }
  const userId = (req as any).userId;
  try {
    await pool.query('UPDATE profiles SET is_admin = true WHERE id = $1', [userId]);
    res.json({ success: true, message: 'You are now an admin!' });
  } catch (err) {
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
  console.log(`[site-url] ${getSiteUrlServer()} (REPLIT_DEPLOYMENT=${process.env.REPLIT_DEPLOYMENT}, REPLIT_DOMAINS=${process.env.REPLIT_DOMAINS || 'not set'})`);
  await ensureDbSchema();
  await verifySmtpConnection();
});
