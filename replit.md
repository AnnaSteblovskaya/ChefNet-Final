# ChefNet Invest Landing Page

A multilingual investor landing page for ChefNet, an AI-powered restaurant/food recommendation platform.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6 (port 5000, host 0.0.0.0)
- **Styling**: Tailwind CSS v4 + Emotion
- **UI Components**: Radix UI, MUI, Lucide React
- **Routing**: React Router DOM
- **Auth**: Supabase Auth (signUp, signInWithPassword, signOut, onAuthStateChange)
- **Email**: Gmail API via Replit Google Mail integration (transactional emails for verification)
- **Backend**: Express API server (port 3001) + Replit PostgreSQL
- **Database**: Replit PostgreSQL (profiles, investments, rounds, referrals, kyc_submissions, user_rounds, news, documents, partners, site_content)
- **Animations**: Motion (Framer Motion)

## Architecture

### Data Flow
1. Supabase handles authentication (JWT tokens)
2. Express API server validates Supabase JWT tokens and serves data from PostgreSQL
3. On login, data syncs from DB → localStorage (via `dataSync.ts`)
4. Dashboard components read/write localStorage as before (no component rewrites needed)
5. On logout, profile/KYC data saves from localStorage → DB, then localStorage is cleared

### Admin Panel
- Route: `/admin` (SPA, no server-side routing needed)
- Auth: Uses Supabase session + `is_admin` flag in profiles table
- Bootstrap: `POST /api/admin-bootstrap` with `ADMIN_BOOTSTRAP_SECRET` env var to grant first admin
- Sections: Overview stats, Users, Investments (confirm/reject), Rounds, KYC, Partners, News, Documents, Content
- All admin API routes under `/api/admin/*` require valid JWT + is_admin=true

### Server
- `server/index.ts` — Express API endpoints (port 3001)
- `server/admin.ts` — Admin CRUD routes + public content routes
- `server/db.ts` — PostgreSQL connection pool
- `server/gmail.ts` — Gmail API client (Replit Google Mail integration, OAuth tokens auto-managed)
- `server/email.ts` — Email service (verification emails via Gmail API)
- Vite proxies `/api` and `/verify-email` requests to the Express server

### Referral System
- Referral code format: `CHEF-` + first 6 chars of user UUID (uppercase, no dashes)
- `profiles.referred_by` — tracks which referral code was used during registration
- `referrals` table — one record per referred user per referrer, with `referred_user_id` and `email` columns
- `GET /api/referrals` — flat list of direct referrals with email, deduped against profiles
- `GET /api/referral-tree` — recursive WITH RECURSIVE CTE returning all levels of downline (max 10)
- Commission rule: 10% of purchased shares, only from first-line (level 1) referrals
- Auto-backfill on startup: fills `referred_user_id` and `email` for existing records by name+referred_by match

### Email Verification Flow
1. User registers → Supabase creates account, backend sends verification email via Gmail API
2. Email contains verification link with unique token (24h expiry)
3. User clicks link → `/verify-email?token=xxx` → backend marks profile as verified → redirects to `/?verified=true`
4. Frontend shows green success banner on the landing page
5. Resend button available on the "check your email" screen AND in the error banner (invalid/expired tokens)
- Emails sent from: connected Gmail account via Replit Gmail integration
- Multilingual templates: RU, EN, DE, ES, TR
- DB columns: `profiles.email_verified`, `profiles.verification_token`, `profiles.verification_token_expires`

### Referral Flow
1. Referrer shares link: `/?ref=CHEF-XXXXXX` (code = `CHEF-` + first 6 chars of userId, uppercased)
2. Visitor lands on site → `?ref=` code stored in `localStorage('chefnet_referral_code')`
3. Visitor registers → RegisterForm reads code from localStorage → sent to `POST /api/register`
4. Server validates code (CHEF-[A-Z0-9]{6}), saves to `profiles.referred_by`
5. Visitor verifies email → `handleVerifyEmail` finds `referred_by`, looks up referrer, creates record in `referrals` table
- `referrals` table: `user_id` = referrer's ID, `name` = referred user's full name, `status = 'registered'`
- Auto-DB schema migration (`ensureDbSchema()`) runs on startup to add any missing columns safely

### Frontend Data Layer
- `src/utils/api.ts` — Authenticated fetch helpers (apiGet, apiPost, apiPut)
- `src/utils/dataSync.ts` — Sync layer: loadDataFromServer, saveDataToServer, seedDemoData, clearLocalDashboardData
- `src/contexts/AuthContext.tsx` — Integrates data sync on login/logout

## Project Structure

```
server/
  index.ts              # Express API server
  db.ts                 # PostgreSQL pool
src/
  app/
    components/
      sections/         # Landing page sections (Hero, About, FAQ, etc.)
      auth/             # Login/Register modal
      dashboard/        # User dashboard
    App.tsx             # Root component
  contexts/             # React contexts (Auth, Language)
  hooks/                # Custom hooks
  locales/              # i18n translations
  styles/               # Global CSS files
  utils/
    api.ts              # Authenticated API helpers
    dataSync.ts         # DB ↔ localStorage sync
    supabase/client.ts  # Supabase client
```

## Database Tables

- `rounds` — Investment rounds (seed, seriesA, marketing, ipo) with prices, share counts
- `investments` — User investment records
- `user_rounds` — Per-user share counts per round
- `referrals` — Referral partner data per user
- `profiles` — User profile data
- `kyc_submissions` — KYC verification data

## Key Features

- Multi-language support (RU, EN, TR, ES, and others)
- Light/dark theme switching
- Supabase authentication (email/password, session persistence)
- PostgreSQL-backed dashboard data with localStorage caching
- Investor-focused landing sections
- Mobile-responsive design

## Development

```bash
npm install
npm run dev    # Starts Express (3001) + Vite (5000)
```

## Notes

- This project was exported from Figma Make. Image assets are in `public/assets/`.
- Supabase handles auth; Replit PostgreSQL handles data storage.
- User profile metadata (firstName, lastName) stored in Supabase `user_metadata`.
- Dashboard components use localStorage as runtime cache; data syncs to/from PostgreSQL on login/logout.
- Deployment is configured as autoscale (Express serves built frontend + API in production on port 5000).
- Production start: `npm run start` (NODE_ENV=production, Express serves `dist/` static files + API).
- Carousel sections use pixel-based slide offsets calculated from container width measurement via `useLayoutEffect`.
- AdvantagesSection phone carousel uses Framer Motion `drag="x"` with `onDragEnd` for swipe navigation.
