# ChefNet Invest — Deployment Guide (DigitalOcean)

## Stack

| Component | Technology |
|-----------|-----------|
| Frontend  | React + Vite (served as static from Express) |
| Backend   | Node.js + Express (TypeScript via tsx) |
| Database  | Supabase PostgreSQL |
| Auth      | Supabase Auth |
| Email     | SMTP (Gmail App Password or any provider) |
| KYC       | Sumsub |

---

## Option A — DigitalOcean App Platform (Recommended)

1. Fork / push this repo to GitHub
2. In DigitalOcean → **Create App** → connect GitHub repo
3. DigitalOcean detects `.do/app.yaml` automatically
4. Set all **Secret** environment variables in the App Platform UI:

| Variable | Where to find it |
|----------|-----------------|
| `DATABASE_URL` | Supabase → Project Settings → Database → URI |
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API |
| `ADMIN_BOOTSTRAP_SECRET` | Generate: `openssl rand -hex 32` |
| `SUMSUB_APP_TOKEN` | Sumsub Dashboard |
| `SUMSUB_SECRET_KEY` | Sumsub Dashboard |
| `SMTP_HOST` | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | your Gmail address |
| `SMTP_PASS` | Gmail App Password (16 chars) |
| `SMTP_FROM` | `ChefNet Invest <your@gmail.com>` |

5. Click **Deploy** — build runs automatically

> **VITE_ variables** are build-time. App Platform injects them during the Docker build via ARG. Make sure they are set as **Build-Time** variables, not just runtime.

---

## Option B — DigitalOcean Droplet (Docker)

### Prerequisites
- Droplet: Ubuntu 22.04, min 2 GB RAM (Basic $12/mo)
- Domain `chefnet.ai` pointing to Droplet IP
- Docker + Docker Compose installed

### Setup

```bash
# 1. SSH into droplet
ssh root@YOUR_DROPLET_IP

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose

# 3. Clone repo
git clone https://github.com/YOUR_ACCOUNT/ChefNet-Final.git /app/chefnet
cd /app/chefnet

# 4. Create .env from example
cp .env.example .env
nano .env   # Fill in all values

# 5. Get SSL certificate
apt install -y certbot
certbot certonly --standalone -d chefnet.ai -d www.chefnet.ai

# 6. Build and start
docker-compose up -d --build

# 7. View logs
docker-compose logs -f app
```

### Update deployment

```bash
cd /app/chefnet
git pull
docker-compose up -d --build
```

---

## Gmail App Password Setup

1. Google Account → Security → 2-Step Verification (enable it)
2. Google Account → Security → App Passwords
3. Create password for "Mail" → "Other (Custom name)"
4. Copy the 16-character password → use as `SMTP_PASS`

---

## Sumsub Webhook

In Sumsub Dashboard → Webhooks:
- URL: `https://chefnet.ai/api/kyc/webhook`
- Events: `applicantReviewed`, `applicantPending`

---

## Admin Panel

After first deploy, create the admin account:

```
POST https://chefnet.ai/api/admin/bootstrap
Body: { "secret": "YOUR_ADMIN_BOOTSTRAP_SECRET" }
```

Then log in at: `https://chefnet.ai/admin`

---

## Health Check

```
GET https://chefnet.ai/api/health
```

Returns `200 OK` when the server is running.
