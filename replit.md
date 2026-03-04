# ChefNet Invest Landing Page

A multilingual investor landing page for ChefNet, an AI-powered restaurant/food recommendation platform.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6 (port 5000, host 0.0.0.0)
- **Styling**: Tailwind CSS v4 + Emotion
- **UI Components**: Radix UI, MUI, Lucide React
- **Routing**: React Router DOM
- **Auth**: Supabase Auth (signUp, signInWithPassword, signOut, onAuthStateChange)
- **Email**: SendPulse REST API (transactional emails for verification)
- **Backend**: Express API server (port 3001) + Replit PostgreSQL
- **Database**: Replit PostgreSQL (profiles, investments, rounds, referrals, kyc_submissions, user_rounds)
- **Animations**: Motion (Framer Motion)

## Architecture

### Data Flow
1. Supabase handles authentication (JWT tokens)
2. Express API server validates Supabase JWT tokens and serves data from PostgreSQL
3. On login, data syncs from DB → localStorage (via `dataSync.ts`)
4. Dashboard components read/write localStorage as before (no component rewrites needed)
5. On logout, profile/KYC data saves from localStorage → DB, then localStorage is cleared

### Server
- `server/index.ts` — Express API endpoints (port 3001)
- `server/db.ts` — PostgreSQL connection pool
- `server/email.ts` — SendPulse REST API email service (verification emails)
- Vite proxies `/api` and `/verify-email` requests to the Express server

### Email Verification Flow
1. User registers → Supabase creates account, backend sends verification email via SendPulse API
2. Email contains verification link with unique token (24h expiry)
3. User clicks link → `/verify-email?token=xxx` → backend marks profile as verified → redirects to `/?verified=true`
4. Frontend shows green success banner on the landing page
5. Resend button available on the "check your email" screen
- Emails sent from: `no-reply@chefnet.ai` via SendPulse transactional API
- Multilingual templates: RU, EN, DE, ES, TR
- DB columns: `profiles.email_verified`, `profiles.verification_token`, `profiles.verification_token_expires`

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
