# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

```bash
# Install dependencies
npm install

# Development (runs Express on :3001 + Vite on :5000 with HMR)
npm run dev

# Run only backend or frontend
npm run dev:server    # Express on port 3001
npm run dev:client    # Vite on port 5000

# Production build (Vite bundles React to dist/)
npm run build

# Production start
npm start   # NODE_ENV=production node --import tsx server/index.ts
```

No test runner is configured. No linter is configured.

## Architecture

Single-repo full-stack app — Express serves the Vite-built React frontend as static files and exposes API endpoints on `/api/*`.

- **`src/`** — React 18 + TypeScript frontend (Vite, Tailwind CSS v4, Radix/shadcn UI)
- **`server/`** — Express 5 + TypeScript backend (raw SQL via `pg`, no ORM)
- **`dist/`** — Vite build output, served by Express in production

### Frontend State

Three React Contexts drive the app:
- `AuthContext` — user session, JWT from Supabase Auth, stored in `localStorage` key `chefnet-auth-storage`
- `LanguageContext` — i18n (EN, RU, DE, ES, TR)
- `SiteContentContext` — CMS content fetched from API

Path alias: `@/` → `./src/`

### Backend

`server/index.ts` is the monolithic server file (~2100 lines) containing all 30+ API routes, middleware setup, and Supabase Auth integration. Key modules:
- `server/admin.ts` — admin CRUD operations
- `server/db.ts` — PostgreSQL pool (Supabase via `pg` with SSL)
- `server/email.ts` / `server/gmail.ts` / `server/smtp.ts` — email sending (SMTP + Gmail API)
- `server/middleware/security.ts` — CORS, rate limiting, Helmet, HPP
- `server/utils/validation.ts` — Zod schemas for request validation

Database schema is auto-created/migrated by `ensureDbSchema()` at startup.

### API Routes

- Auth: `/api/register`, `/api/send-verification`, `/api/reset-password`
- Profile: `/api/profile` (GET/PUT)
- Investments: `/api/investments` (GET/POST)
- Referrals: `/api/referrals`, `/api/referral-tree`
- KYC: `/api/kyc/*` (Sumsub integration)
- Admin: `/api/admin/*` (requires admin role)
- Content: `/api/site-content`, `/api/rounds`, `/api/documents`, `/api/news`
- Health: `/api/health`

### External Services

- **Supabase** — PostgreSQL database + Auth + Realtime subscriptions
- **Sumsub** — KYC identity verification
- **Gmail API / SMTP** — transactional email
- **Google reCAPTCHA** — spam protection

## Deployment

### Docker
```bash
docker-compose up -d --build
```
Services: `app` (Express, port 5000) + `nginx` (reverse proxy, ports 80/443)

### DigitalOcean App Platform
Config in `.do/app.yaml`. Health check: `GET /api/health`.

### Admin Bootstrap (first deploy)
```bash
POST /api/admin/bootstrap  {"secret": "ADMIN_BOOTSTRAP_SECRET"}
```

## Environment Variables

Frontend (build-time): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL`

Backend (runtime): `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_BOOTSTRAP_SECRET`, `SUMSUB_APP_TOKEN`, `SUMSUB_SECRET_KEY`, `SMTP_HOST/PORT/USER/PASS`, `GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN`

See `.env.example` for full list.

## Dev Proxy

Vite dev server (port 5000) proxies `/api/*` to Express (port 3001). In production, Express serves everything from a single port (5000).
