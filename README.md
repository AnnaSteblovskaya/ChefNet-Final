# ChefNet Invest

Investment platform for the FoodTech sector. Full-stack app with React frontend and Express API backend, backed by Supabase (PostgreSQL + Auth).

## Quick Start

```bash
npm install
npm run dev
```

This starts Express on `:3001` and Vite dev server on `:5000` with HMR. The Vite dev server proxies `/api/*` requests to Express.

Other commands:

```bash
npm run dev:server    # Express only (port 3001)
npm run dev:client    # Vite only (port 5000)
npm run build         # Production build (Vite bundles React to dist/)
npm start             # Production server (port 5000)
```

## Architecture

Single-repo full-stack app. Express serves the Vite-built React frontend as static files and exposes all API endpoints on `/api/*`.

```
src/           React 18 + TypeScript (Vite, Tailwind CSS v4, Radix/shadcn UI)
server/        Express 5 + TypeScript (raw SQL via pg, Supabase Auth)
dist/          Vite build output, served by Express in production
```

### Frontend

- **State**: three React Contexts — `AuthContext` (JWT session), `LanguageContext` (EN/RU/DE/ES/TR), `SiteContentContext` (CMS content)
- **Path alias**: `@/` maps to `./src/`
- **Auth token**: stored in `localStorage` key `chefnet-auth-storage`

### Backend

- `server/index.ts` — main server: 30+ API routes, middleware, Supabase Auth integration
- `server/admin.ts` — admin CRUD operations
- `server/db.ts` — PostgreSQL pool (Supabase via `pg` with SSL)
- `server/email.ts` / `server/gmail.ts` / `server/smtp.ts` — email (SMTP preferred, Gmail API fallback)
- `server/middleware/security.ts` — CORS, rate limiting, Helmet, HPP
- `server/utils/validation.ts` — Zod schemas for request validation

Database schema is auto-created/migrated by `ensureDbSchema()` at startup.

### External Services

| Service | Purpose |
|---------|---------|
| **Supabase** | PostgreSQL database + Auth + Realtime subscriptions |
| **Sumsub** | KYC identity verification |
| **Gmail API / SMTP** | Transactional email |
| **Google reCAPTCHA** | Spam protection |

## Environment Variables

**Frontend (build-time):**

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_SITE_URL` | Public site URL (default: `https://chefnet.ai`) |

**Backend (runtime):**

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Supabase pooler) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side auth) |
| `ADMIN_BOOTSTRAP_SECRET` | Secret for initial admin user creation |
| `SUMSUB_APP_TOKEN` | Sumsub API token |
| `SUMSUB_SECRET_KEY` | Sumsub API secret |
| `SUMSUB_LEVEL_NAME` | Sumsub verification level (default: `id-and-liveness`) |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_SECURE` | Use TLS (`true`/`false`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | Sender address |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (Gmail API fallback) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | Google OAuth refresh token |

## Deployment

### DigitalOcean App Platform

Config in `.do/app.yaml`. Set secrets in the DO dashboard. Health check: `GET /api/health`.

### Docker

```bash
# Create .env file with all required variables, then:
docker-compose up -d --build
```

Services: `app` (Express, port 3001) + `nginx` (reverse proxy, ports 80/443).

SSL certificates via Let's Encrypt (mount at `/etc/letsencrypt`).

### Admin Bootstrap

After first deploy, create the initial admin user:

```bash
curl -X POST https://chefnet.ai/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"secret": "YOUR_ADMIN_BOOTSTRAP_SECRET"}'
```

## API Routes

| Group | Endpoints |
|-------|-----------|
| Auth | `POST /api/register`, `/api/send-verification`, `/api/reset-password` |
| Profile | `GET/PUT /api/profile` |
| Investments | `GET/POST /api/investments` |
| Referrals | `GET /api/referrals`, `/api/referral-tree` |
| KYC | `/api/kyc/*` (Sumsub integration) |
| Admin | `/api/admin/*` (requires admin role) |
| Content | `GET /api/site-content`, `/api/rounds`, `/api/documents`, `/api/news` |
| Health | `GET /api/health` |
