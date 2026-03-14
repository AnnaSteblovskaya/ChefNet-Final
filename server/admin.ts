import express from 'express';
import { Pool } from 'pg';

export function createAdminRouter(pool: Pool, requireAuth: express.RequestHandler) {
  const router = express.Router();

  // Middleware: check admin flag
  const requireAdmin: express.RequestHandler = async (req, res, next) => {
    const userId = (req as any).userId;
    try {
      const result = await pool.query('SELECT is_admin FROM profiles WHERE id = $1', [userId]);
      if (!result.rows[0]?.is_admin) {
        res.status(403).json({ error: 'Admin access required' });
        return;
      }
      next();
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const auth = [requireAuth, requireAdmin];

  // ─── STATS ───────────────────────────────────────────────────────────────
  router.get('/stats', ...auth, async (_req, res) => {
    try {
      const [users, investments, kyc, news, partners] = await Promise.all([
        pool.query('SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE email_verified) as verified FROM profiles WHERE is_admin = false OR is_admin IS NULL'),
        pool.query("SELECT COUNT(*) as count, COALESCE(SUM(shares),0) as total_shares, COUNT(*) FILTER (WHERE status='pending') as pending FROM investments"),
        pool.query("SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE status='pending') as pending FROM kyc_submissions"),
        pool.query('SELECT COUNT(*) as count FROM news WHERE published=true'),
        pool.query("SELECT COUNT(*) as count FROM partners WHERE status='active'"),
      ]);
      res.json({
        users: { total: +users.rows[0].count, verified: +users.rows[0].verified },
        investments: { total: +investments.rows[0].count, totalShares: +investments.rows[0].total_shares, pending: +investments.rows[0].pending },
        kyc: { total: +kyc.rows[0].count, pending: +kyc.rows[0].pending },
        news: { published: +news.rows[0].count },
        partners: { active: +partners.rows[0].count },
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
    const { id, name, price, min_investment, total_shares, status, amount, highlight, sort_order } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO rounds (id, name, price, min_investment, total_shares, status, amount, highlight, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
        [id, name, price, min_investment, total_shares, status || 'active', amount || '0', highlight || false, sort_order || 0]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/rounds/:id', ...auth, async (req, res) => {
    const { name, price, min_investment, total_shares, sold_shares, status, amount, highlight, sort_order } = req.body;
    try {
      await pool.query(
        'UPDATE rounds SET name=$1, price=$2, min_investment=$3, total_shares=$4, sold_shares=$5, status=$6, amount=$7, highlight=$8, sort_order=$9 WHERE id=$10',
        [name, price, min_investment, total_shares, sold_shares, status, amount, highlight, sort_order, req.params.id]
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
    const { value_en, value_ru, value_de, value_es, value_tr, label } = req.body;
    try {
      await pool.query(
        `INSERT INTO site_content (key, label, value_en, value_ru, value_de, value_es, value_tr, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,now())
         ON CONFLICT (key) DO UPDATE SET
           label=EXCLUDED.label, value_en=EXCLUDED.value_en, value_ru=EXCLUDED.value_ru,
           value_de=EXCLUDED.value_de, value_es=EXCLUDED.value_es, value_tr=EXCLUDED.value_tr,
           updated_at=now()`,
        [req.params.key, label||'', value_en||'', value_ru||'', value_de||'', value_es||'', value_tr||'']
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}

// Public endpoints (no admin required)
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

  return router;
}
