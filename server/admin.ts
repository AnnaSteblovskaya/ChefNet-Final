import express from 'express';
import { Pool } from 'pg';
import crypto from 'crypto';
import { sendVerificationEmail } from './email.js';

function getAdminSiteUrl(): string {
  const domains = process.env.REPLIT_DOMAINS;
  if (domains) return `https://${domains.split(',')[0].trim()}`;
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return 'http://localhost:3001';
}

export function createAdminRouter(pool: Pool, requireAuth: express.RequestHandler) {
  const router = express.Router();

  const requireAdmin: express.RequestHandler = async (req, res, next) => {
    const userId = (req as any).userId;
    try {
      const result = await pool.query('SELECT is_admin FROM profiles WHERE id = $1', [userId]);
      const isAdmin = result.rows[0]?.is_admin;
      console.log(`[requireAdmin] userId=${userId} rows=${result.rows.length} is_admin=${isAdmin} path=${req.path}`);
      if (!isAdmin) {
        res.status(403).json({ error: 'Admin access required' });
        return;
      }
      next();
    } catch (err) {
      console.error('[requireAdmin] DB error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const auth = [requireAuth, requireAdmin];

  // ─── STATS ───────────────────────────────────────────────────────────────
  router.get('/stats', ...auth, async (_req, res) => {
    try {
      const [users, investments, kyc, payments, faq] = await Promise.all([
        pool.query('SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE email_verified) as verified FROM profiles WHERE is_admin = false OR is_admin IS NULL'),
        pool.query("SELECT COUNT(*) as count, COALESCE(SUM(shares),0) as total_shares, COUNT(*) FILTER (WHERE status='pending') as pending FROM investments"),
        pool.query("SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE status='pending') as pending FROM kyc_submissions"),
        pool.query("SELECT COUNT(*) as count FROM payments"),
        pool.query("SELECT COUNT(*) as count FROM faq WHERE is_active=true"),
      ]);
      res.json({
        users: { total: +users.rows[0].count, verified: +users.rows[0].verified },
        investments: { total: +investments.rows[0].count, totalShares: +investments.rows[0].total_shares, pending: +investments.rows[0].pending },
        kyc: { total: +kyc.rows[0].count, pending: +kyc.rows[0].pending },
        payments: { total: +payments.rows[0].count },
        faq: { active: +faq.rows[0].count },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── USERS ───────────────────────────────────────────────────────────────
  router.get('/users', ...auth, async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT p.id, p.email, p.full_name, p.phone, p.country, p.email_verified, p.is_admin, p.created_at,
          COALESCE(SUM(i.shares), 0) as total_shares,
          COALESCE(SUM(CAST(i.amount AS numeric)), 0) as total_amount,
          k.status as kyc_status
        FROM profiles p
        LEFT JOIN investments i ON i.user_id = p.id
        LEFT JOIN kyc_submissions k ON k.user_id = p.id
        GROUP BY p.id, k.status
        ORDER BY p.created_at DESC
      `);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/users/:id', ...auth, async (req, res) => {
    const { id } = req.params;
    const { is_admin, email_verified, full_name, phone, country } = req.body;
    try {
      const fields: string[] = [];
      const values: unknown[] = [];
      let idx = 1;
      if (is_admin !== undefined) { fields.push(`is_admin = $${idx++}`); values.push(is_admin); }
      if (email_verified !== undefined) { fields.push(`email_verified = $${idx++}`); values.push(email_verified); }
      if (full_name !== undefined) { fields.push(`full_name = $${idx++}`); values.push(full_name); }
      if (phone !== undefined) { fields.push(`phone = $${idx++}`); values.push(phone); }
      if (country !== undefined) { fields.push(`country = $${idx++}`); values.push(country); }
      if (!fields.length) { res.status(400).json({ error: 'No fields to update' }); return; }
      values.push(id);
      await pool.query(`UPDATE profiles SET ${fields.join(', ')} WHERE id = $${idx}`, values);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/users/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM profiles WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── INVESTMENTS ─────────────────────────────────────────────────────────
  router.get('/investments', ...auth, async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT i.*, p.email, p.full_name
        FROM investments i
        LEFT JOIN profiles p ON p.id = i.user_id
        ORDER BY i.created_at DESC
      `);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/investments', ...auth, async (req, res) => {
    const { user_id, round, shares, amount, date, status } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO investments (user_id, round, shares, amount, date, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [user_id, round, shares, amount, date || new Date().toISOString().split('T')[0], status || 'pending']
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/investments/:id', ...auth, async (req, res) => {
    const { status, shares, amount, round } = req.body;
    try {
      const fields: string[] = [];
      const values: unknown[] = [];
      let idx = 1;
      if (status !== undefined) { fields.push(`status = $${idx++}`); values.push(status); }
      if (shares !== undefined) { fields.push(`shares = $${idx++}`); values.push(shares); }
      if (amount !== undefined) { fields.push(`amount = $${idx++}`); values.push(amount); }
      if (round !== undefined) { fields.push(`round = $${idx++}`); values.push(round); }
      if (!fields.length) { res.status(400).json({ error: 'No fields to update' }); return; }
      values.push(req.params.id);
      await pool.query(`UPDATE investments SET ${fields.join(', ')} WHERE id = $${idx}`, values);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/investments/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM investments WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── ROUNDS ──────────────────────────────────────────────────────────────
  router.get('/rounds', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM rounds ORDER BY sort_order');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/rounds', ...auth, async (req, res) => {
    const { id, name, target_sum, market_cap, share_price, min_order, active, sort_order,
      description_en, description_ru, description_de, description_es, description_tr,
      tasks_en, tasks_ru, tasks_de, tasks_es, tasks_tr } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO rounds (id, name, target_sum, market_cap, share_price, min_order, active, sort_order,
          description_en, description_ru, description_de, description_es, description_tr,
          tasks_en, tasks_ru, tasks_de, tasks_es, tasks_tr)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *`,
        [id, name, target_sum||0, market_cap||0, share_price||0, min_order||0, active !== false, sort_order||0,
          description_en||'', description_ru||'', description_de||'', description_es||'', description_tr||'',
          tasks_en||'', tasks_ru||'', tasks_de||'', tasks_es||'', tasks_tr||'']
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/rounds/:id', ...auth, async (req, res) => {
    const { name, target_sum, market_cap, share_price, min_order, active, sort_order,
      description_en, description_ru, description_de, description_es, description_tr,
      tasks_en, tasks_ru, tasks_de, tasks_es, tasks_tr } = req.body;
    try {
      await pool.query(
        `UPDATE rounds SET name=$1, target_sum=$2, market_cap=$3, share_price=$4, min_order=$5,
          active=$6, sort_order=$7,
          description_en=$8, description_ru=$9, description_de=$10, description_es=$11, description_tr=$12,
          tasks_en=$13, tasks_ru=$14, tasks_de=$15, tasks_es=$16, tasks_tr=$17
         WHERE id=$18`,
        [name, target_sum||0, market_cap||0, share_price||0, min_order||0, active !== false, sort_order||0,
          description_en||'', description_ru||'', description_de||'', description_es||'', description_tr||'',
          tasks_en||'', tasks_ru||'', tasks_de||'', tasks_es||'', tasks_tr||'', req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/rounds/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM rounds WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── KYC ─────────────────────────────────────────────────────────────────
  router.get('/kyc', ...auth, async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT k.*, p.email, p.full_name
        FROM kyc_submissions k
        LEFT JOIN profiles p ON p.id = k.user_id
        ORDER BY k.created_at DESC
      `);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/kyc/:id', ...auth, async (req, res) => {
    const { status, notes } = req.body;
    try {
      await pool.query('UPDATE kyc_submissions SET status=$1, notes=$2, updated_at=now() WHERE id=$3', [status, notes, req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── PARTNERS ─────────────────────────────────────────────────────────────
  router.get('/partners', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM partners ORDER BY sort_order, id');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/partners', ...auth, async (req, res) => {
    const { name, logo_url, website, description_en, description_ru, status, sort_order } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO partners (name, logo_url, website, description_en, description_ru, status, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [name, logo_url || '', website || '', description_en || '', description_ru || '', status || 'active', sort_order || 0]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/partners/:id', ...auth, async (req, res) => {
    const { name, logo_url, website, description_en, description_ru, status, sort_order } = req.body;
    try {
      await pool.query(
        'UPDATE partners SET name=$1, logo_url=$2, website=$3, description_en=$4, description_ru=$5, status=$6, sort_order=$7 WHERE id=$8',
        [name, logo_url, website, description_en, description_ru, status, sort_order, req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/partners/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM partners WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── NEWS ─────────────────────────────────────────────────────────────────
  router.get('/news', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/news', ...auth, async (req, res) => {
    const { title_en, title_ru, title_de, title_es, title_tr, body_en, body_ru, body_de, body_es, body_tr, published } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO news (title_en,title_ru,title_de,title_es,title_tr,body_en,body_ru,body_de,body_es,body_tr,published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
        [title_en||'', title_ru||'', title_de||'', title_es||'', title_tr||'', body_en||'', body_ru||'', body_de||'', body_es||'', body_tr||'', published||false]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/news/:id', ...auth, async (req, res) => {
    const { title_en, title_ru, title_de, title_es, title_tr, body_en, body_ru, body_de, body_es, body_tr, published } = req.body;
    try {
      await pool.query(
        'UPDATE news SET title_en=$1,title_ru=$2,title_de=$3,title_es=$4,title_tr=$5,body_en=$6,body_ru=$7,body_de=$8,body_es=$9,body_tr=$10,published=$11,updated_at=now() WHERE id=$12',
        [title_en||'', title_ru||'', title_de||'', title_es||'', title_tr||'', body_en||'', body_ru||'', body_de||'', body_es||'', body_tr||'', published||false, req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/news/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM news WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── DOCUMENTS ────────────────────────────────────────────────────────────
  router.get('/documents', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/documents', ...auth, async (req, res) => {
    const { title_en, title_ru, title_de, title_es, title_tr, file_url, category, visible } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO documents (title_en,title_ru,title_de,title_es,title_tr,file_url,category,visible) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [title_en||'', title_ru||'', title_de||'', title_es||'', title_tr||'', file_url||'', category||'general', visible !== false]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/documents/:id', ...auth, async (req, res) => {
    const { title_en, title_ru, title_de, title_es, title_tr, file_url, category, visible } = req.body;
    try {
      await pool.query(
        'UPDATE documents SET title_en=$1,title_ru=$2,title_de=$3,title_es=$4,title_tr=$5,file_url=$6,category=$7,visible=$8 WHERE id=$9',
        [title_en||'', title_ru||'', title_de||'', title_es||'', title_tr||'', file_url||'', category||'general', visible !== false, req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/documents/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM documents WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── SITE CONTENT ─────────────────────────────────────────────────────────
  router.get('/content', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM site_content ORDER BY id');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/content/:key', ...auth, async (req, res) => {
    const { value_en, value_ru, value_de, value_es, value_tr, label, type, section } = req.body;
    try {
      await pool.query(
        `INSERT INTO site_content (key, label, value_en, value_ru, value_de, value_es, value_tr, type, section, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,now())
         ON CONFLICT (key) DO UPDATE SET
           label=EXCLUDED.label, value_en=EXCLUDED.value_en, value_ru=EXCLUDED.value_ru,
           value_de=EXCLUDED.value_de, value_es=EXCLUDED.value_es, value_tr=EXCLUDED.value_tr,
           type=EXCLUDED.type, section=EXCLUDED.section, updated_at=now()`,
        [req.params.key, label||'', value_en||'', value_ru||'', value_de||'', value_es||'', value_tr||'', type||'text', section||'']
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── FAQ / QUESTIONS ──────────────────────────────────────────────────────
  router.get('/faq', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM faq ORDER BY sort_order, id');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/faq', ...auth, async (req, res) => {
    const { question_en, question_ru, question_de, question_es, question_tr,
            answer_en, answer_ru, answer_de, answer_es, answer_tr, is_active, sort_order } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO faq (question_en,question_ru,question_de,question_es,question_tr,
           answer_en,answer_ru,answer_de,answer_es,answer_tr,is_active,sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
        [question_en||'', question_ru||'', question_de||'', question_es||'', question_tr||'',
         answer_en||'', answer_ru||'', answer_de||'', answer_es||'', answer_tr||'',
         is_active !== false, sort_order||0]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/faq/:id', ...auth, async (req, res) => {
    const { question_en, question_ru, question_de, question_es, question_tr,
            answer_en, answer_ru, answer_de, answer_es, answer_tr, is_active, sort_order } = req.body;
    try {
      await pool.query(
        `UPDATE faq SET question_en=$1,question_ru=$2,question_de=$3,question_es=$4,question_tr=$5,
           answer_en=$6,answer_ru=$7,answer_de=$8,answer_es=$9,answer_tr=$10,
           is_active=$11,sort_order=$12 WHERE id=$13`,
        [question_en||'', question_ru||'', question_de||'', question_es||'', question_tr||'',
         answer_en||'', answer_ru||'', answer_de||'', answer_es||'', answer_tr||'',
         is_active !== false, sort_order||0, req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/faq/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM faq WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── PAYMENTS ─────────────────────────────────────────────────────────────
  router.get('/payments', ...auth, async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT pay.*, p.email, p.full_name
        FROM payments pay
        LEFT JOIN profiles p ON p.id = pay.user_id
        ORDER BY pay.payment_date DESC
      `);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/payments', ...auth, async (req, res) => {
    const { user_id, amount, payment_date, contract_number, status } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO payments (user_id, amount, payment_date, contract_number, status) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [user_id, amount||0, payment_date||new Date().toISOString(), contract_number||'', status||'pending']
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/payments/:id', ...auth, async (req, res) => {
    const { amount, payment_date, contract_number, status } = req.body;
    try {
      await pool.query(
        'UPDATE payments SET amount=$1, payment_date=$2, contract_number=$3, status=$4 WHERE id=$5',
        [amount, payment_date, contract_number, status, req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/payments/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM payments WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── NOTIFICATIONS ────────────────────────────────────────────────────────
  router.get('/notifications', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 1000');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/notifications', ...auth, async (req, res) => {
    const { user_email, type, message } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO notifications (user_email, type, message) VALUES ($1,$2,$3) RETURNING *',
        [user_email||'', type||'', message||'']
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/notifications/:id/status', ...auth, async (req, res) => {
    const { status } = req.body;
    try {
      await pool.query('UPDATE notifications SET status=$1 WHERE id=$2', [status || 'active', req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/notifications/bulk-status', ...auth, async (req, res) => {
    const { ids, status } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.json({ success: true });
    try {
      await pool.query(
        `UPDATE notifications SET status=$1 WHERE id = ANY($2::int[])`,
        [status || 'active', ids]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/notifications/bulk', ...auth, async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.json({ success: true });
    try {
      await pool.query('DELETE FROM notifications WHERE id = ANY($1::int[])', [ids]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/notifications/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM notifications WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── SETTINGS ─────────────────────────────────────────────────────────────
  router.get('/settings', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM settings ORDER BY key');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/settings', ...auth, async (req, res) => {
    const settings: Record<string, string> = req.body;
    try {
      for (const [key, value] of Object.entries(settings)) {
        await pool.query(
          `INSERT INTO settings (key, value) VALUES ($1,$2)
           ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value`,
          [key, value || '']
        );
      }
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── TEMPLATES ────────────────────────────────────────────────────────────
  router.get('/templates', ...auth, async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM email_templates ORDER BY sort_order, id');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/templates/:id', ...auth, async (req, res) => {
    const { email_enabled, account_enabled, subject_en, subject_ru, body_en, body_ru } = req.body;
    try {
      await pool.query(
        'UPDATE email_templates SET email_enabled=$1, account_enabled=$2, subject_en=$3, subject_ru=$4, body_en=$5, body_ru=$6 WHERE id=$7',
        [email_enabled, account_enabled, subject_en||'', subject_ru||'', body_en||'', body_ru||'', req.params.id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── PARTNER USERS (referral network management) ─────────────────────────
  router.get('/partner-users', ...auth, async (req, res) => {
    const userId = (req as any).userId;
    console.log('[admin] partner-users called by userId:', userId);
    try {
      // Quick sanity check
      const profileCount = await pool.query('SELECT COUNT(*) FROM profiles');
      const referralCount = await pool.query('SELECT COUNT(*) FROM referrals');
      console.log('[admin] partner-users DB state: profiles=', profileCount.rows[0].count, 'referrals=', referralCount.rows[0].count);
      
      const result = await pool.query(`
        SELECT
          'profile' AS source,
          p.id,
          p.email,
          p.full_name,
          p.created_at,
          p.email_verified,
          p.is_admin,
          p.referred_by,
          UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(p.id::text, '-', '')), 1, 6))) AS own_ref_code,
          ref.id AS referrer_id,
          ref.email AS referrer_email,
          ref.full_name AS referrer_name,
          UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(ref.id::text, '-', '')), 1, 6))) AS referrer_ref_code,
          COALESCE(inv_agg.total_shares, 0) AS total_shares,
          COALESCE(inv_agg.total_amount, 0) AS total_amount,
          COALESCE(inv_agg.pending_count, 0) AS pending_investments,
          COALESCE(inv_agg.confirmed_count, 0) AS confirmed_investments,
          COALESCE(direct_agg.direct_count, 0) + COALESCE(legacy_agg.legacy_count, 0) AS direct_referrals_count
        FROM profiles p
        LEFT JOIN profiles ref
          ON p.referred_by IS NOT NULL
          AND UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(ref.id::text, '-', '')), 1, 6))) = UPPER(p.referred_by)
        LEFT JOIN (
          SELECT user_id,
            COALESCE(SUM(shares), 0) AS total_shares,
            COALESCE(SUM(REPLACE(REPLACE(amount::text, '$', ''), ',', '')::numeric), 0) AS total_amount,
            COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
            COUNT(*) FILTER (WHERE status = 'confirmed') AS confirmed_count
          FROM investments
          GROUP BY user_id
        ) inv_agg ON inv_agg.user_id = p.id
        LEFT JOIN (
          SELECT referred_by, COUNT(*) AS direct_count
          FROM profiles
          WHERE referred_by IS NOT NULL
          GROUP BY referred_by
        ) direct_agg ON UPPER(direct_agg.referred_by) = UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(p.id::text, '-', '')), 1, 6)))
        LEFT JOIN (
          SELECT user_id::text, COUNT(*) AS legacy_count
          FROM referrals
          WHERE referred_user_id IS NULL
          GROUP BY user_id
        ) legacy_agg ON legacy_agg.user_id = p.id::text

        UNION ALL

        SELECT
          'referral' AS source,
          'ref_' || r.id::text AS id,
          COALESCE(r.email, '') AS email,
          r.name AS full_name,
          r.created_at,
          false AS email_verified,
          false AS is_admin,
          UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(r.user_id::text, '-', '')), 1, 6))) AS referred_by,
          NULL AS own_ref_code,
          r.user_id::text AS referrer_id,
          sponsor.email AS referrer_email,
          sponsor.full_name AS referrer_name,
          UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(r.user_id::text, '-', '')), 1, 6))) AS referrer_ref_code,
          COALESCE(r.shares, 0)::numeric AS total_shares,
          0 AS total_amount,
          0 AS pending_investments,
          0 AS confirmed_investments,
          0 AS direct_referrals_count
        FROM referrals r
        JOIN profiles sponsor ON sponsor.id::text = r.user_id::text
        WHERE r.referred_user_id IS NULL

        ORDER BY created_at ASC
      `);
      console.log('[admin] partner-users result rows:', result.rows.length);
      res.json(result.rows);
    } catch (err) {
      console.error('[admin] partner-users error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Change user email + send verification email
  router.put('/users/:id/change-email', ...auth, async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ error: 'Valid email required' });
      return;
    }
    try {
      const profileResult = await pool.query('SELECT full_name FROM profiles WHERE id = $1', [id]);
      if (!profileResult.rows.length) { res.status(404).json({ error: 'User not found' }); return; }
      const firstName = (profileResult.rows[0].full_name || '').split(' ')[0] || '';

      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await pool.query(
        `UPDATE profiles SET email = $1, email_verified = false, verification_token = $2, verification_token_expires = $3 WHERE id = $4`,
        [email, token, expires, id]
      );

      const siteUrl = getAdminSiteUrl();
      const verifyUrl = `${siteUrl}/verify-email?token=${token}`;
      const sent = await sendVerificationEmail(email, firstName, verifyUrl, 'ru');

      res.json({ success: true, emailSent: sent });
    } catch (err) {
      console.error('[admin] change-email error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Change user sponsor (referred_by code)
  router.put('/users/:id/change-sponsor', ...auth, async (req, res) => {
    const { id } = req.params;
    const { sponsor_code } = req.body;
    const cleanCode = sponsor_code ? String(sponsor_code).trim().toUpperCase() : null;
    try {
      if (cleanCode) {
        const sponsorExists = await pool.query(
          `SELECT id FROM profiles WHERE UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(id::text, '-', '')), 1, 6))) = $1`,
          [cleanCode]
        );
        if (!sponsorExists.rows.length) {
          res.status(404).json({ error: 'Спонсор с таким кодом не найден' });
          return;
        }
        const sponsorId = sponsorExists.rows[0].id;
        if (sponsorId === id) {
          res.status(400).json({ error: 'Нельзя назначить пользователя спонсором самого себя' });
          return;
        }
      }
      await pool.query('UPDATE profiles SET referred_by = $1 WHERE id = $2', [cleanCode, id]);
      // Update referrals table: remove old referral record and create new one if sponsor set
      await pool.query('DELETE FROM referrals WHERE referred_user_id = $1', [id]);
      if (cleanCode) {
        const sponsorResult = await pool.query(
          `SELECT id FROM profiles WHERE UPPER(CONCAT('CHEF-', SUBSTRING(UPPER(REPLACE(id::text, '-', '')), 1, 6))) = $1`,
          [cleanCode]
        );
        if (sponsorResult.rows.length) {
          const sponsorId = sponsorResult.rows[0].id;
          const userResult = await pool.query('SELECT full_name, email FROM profiles WHERE id = $1', [id]);
          const user = userResult.rows[0] || {};
          await pool.query(
            `INSERT INTO referrals (user_id, referred_user_id, name, email, level, status)
             VALUES ($1, $2, $3, $4, 1, 'registered')
             ON CONFLICT DO NOTHING`,
            [sponsorId, id, user.full_name || '', user.email || '']
          );
        }
      }
      res.json({ success: true });
    } catch (err) {
      console.error('[admin] change-sponsor error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get investments for a specific user (for admin partner panel)
  router.get('/users/:id/investments', ...auth, async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT i.*, r.name as round_name FROM investments i
         LEFT JOIN rounds r ON r.id = i.round
         WHERE i.user_id = $1 ORDER BY i.created_at DESC`,
        [req.params.id]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('[admin] user investments error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete a referral record (legacy partner without profile)
  router.delete('/referrals/:id', ...auth, async (req, res) => {
    try {
      await pool.query('DELETE FROM referrals WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error('[admin] delete referral error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ─── BONUSES ─────────────────────────────────────────────────────────────
  router.get('/bonuses', ...auth, async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT r.id, r.commission as amount, r.shares, r.created_at,
          p_referrer.email as referrer_email, p_referrer.full_name as referrer_name,
          p_ref.email as referral_email, p_ref.full_name as referral_name,
          r.user_id as referrer_id, r.referred_user_id,
          r.level, r.status
        FROM referrals r
        LEFT JOIN profiles p_referrer ON p_referrer.id = r.user_id
        LEFT JOIN profiles p_ref ON p_ref.id = r.referred_user_id
        ORDER BY r.created_at DESC
      `);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/bonuses/:id', ...auth, async (req, res) => {
    const { status } = req.body;
    try {
      await pool.query('UPDATE referrals SET status=$1 WHERE id=$2', [status, req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}

// Public endpoints
export function createPublicContentRouter(pool: Pool) {
  const router = express.Router();

  router.get('/news', async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM news WHERE published=true ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/documents', async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM documents WHERE visible=true ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/site-content', async (_req, res) => {
    try {
      const result = await pool.query('SELECT key, value_en, value_ru, value_de, value_es, value_tr FROM site_content');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/partners/public', async (_req, res) => {
    try {
      const result = await pool.query("SELECT * FROM partners WHERE status='active' ORDER BY sort_order, id");
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/faq/public', async (_req, res) => {
    try {
      const result = await pool.query('SELECT * FROM faq WHERE is_active=true ORDER BY sort_order, id');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/settings/public', async (_req, res) => {
    try {
      const result = await pool.query('SELECT key, value FROM settings');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
