# Full-Stack Portfolio Deployment & Architecture Guide

This guide covers running the Anjali Vishwakarma Developer Portfolio locally and deploying both the frontend and FastAPI + PostgreSQL backend to production.

---

## 1. Architecture Overview

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Backend:** Python 3.13 + FastAPI + SQLAlchemy 2.0 + Pydantic v2 + Uvicorn + SlowAPI.
- **Database:** PostgreSQL (with Alembic migrations & indexed schemas).
- **Email Dispatch:** Resend Transactional Email API (with Reply-To directly linked to inquirer, HTML sanitization, and fallback).
- **Analytics:** Privacy-first, lightweight anonymous event and pageview tracking with client-side debounce and backend deduplication.

---

## 2. Local Development

### Prerequisites
- Node.js 18+ (tested on Node v24)
- Python 3.10+ (tested on Python 3.13)

### Step 1: Clone & Frontend Setup
```bash
git clone https://github.com/anjali1306/anjali-portfolio.git
cd anjali-portfolio
npm install
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows PowerShell:
.\.venv\Scripts\Activate.ps1
# On macOS / Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head
```

### Step 3: Run the Services

**Terminal 1 — FastAPI Backend:**
```bash
# From project root:
python backend/run.py
# Backend runs at: http://127.0.0.1:8000
# OpenAPI Swagger docs at: http://127.0.0.1:8000/api/docs (in development mode)
```

**Terminal 2 — Vite Frontend:**
```bash
# From project root:
npm run dev
# Frontend runs at: http://localhost:5173
```
*Note: The Vite dev server automatically proxies all `/api/*` requests to `http://127.0.0.1:8000`.*

---

## 3. Environment Variables Configuration

Copy `backend/.env.example` to `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `ENVIRONMENT` | Environment mode (`development` or `production`) | `production` |
| `DATABASE_URL` | PostgreSQL connection URI | `postgresql://user:pass@host:5432/db` |
| `RESEND_API_KEY` | Resend API key for transactional email | `re_xxx...` |
| `NOTIFICATION_EMAIL` | Inbox receiving contact inquiries | `anjali13anuj@gmail.com` |
| `SENDER_EMAIL` | Verified sender or default sandbox sender | `Portfolio Contact <onboarding@resend.dev>` |
| `ALLOWED_ORIGINS` | Comma-separated list of permitted CORS domains | `https://anjali-portfolio.vercel.app,http://localhost:5173` |

---

## 4. Production Deployment

### Option A: Render (Backend + Managed PostgreSQL)
Render handles both the web service and managed PostgreSQL database seamlessly:

1. Connect your GitHub repository to [Render](https://dashboard.render.com).
2. Choose **Blueprints** and select the repository (or create manually via Web Service):
   - **Environment:** Python
   - **Build Command:** `pip install -r backend/requirements.txt && cd backend && alembic upgrade head`
   - **Start Command:** `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT --workers 2`
   - **Health Check Path:** `/api/health`
3. Attach a **Render PostgreSQL** database.
4. Set the environment variables:
   - `ENVIRONMENT`: `production`
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `RESEND_API_KEY`: `<your_resend_api_key>`
   - `NOTIFICATION_EMAIL`: `anjali13anuj@gmail.com`
   - `SENDER_EMAIL`: `Portfolio Contact <onboarding@resend.dev>`
   - `ALLOWED_ORIGINS`: `https://<your-vercel-app>.vercel.app`
5. Deploy the backend service and copy your assigned service URL (e.g. `https://anjali-portfolio-backend.onrender.com`).

### Option B: Vercel (Frontend Deployment & API Routing)
1. Import your GitHub repository to [Vercel](https://vercel.com).
2. Framework: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Open `vercel.json` in your repository and update `destination` to your live Render backend URL:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://anjali-portfolio-backend.onrender.com/api/:path*"
    }
  ]
}
```
4. Deploy on Vercel! All `/api/*` traffic will be proxied automatically by Vercel's edge network to Render.

---

## 5. PostgreSQL Migration & Contact Preservation

Existing local inquiries are preserved in `backend/data/backup_contacts.json`. When you have provisioned your production PostgreSQL database:

Run the included migration script to seed existing messages into PostgreSQL:
```bash
python backend/scripts/migrate_to_postgres.py --url "postgresql://user:pass@ep-host.region.pooler.supabase.com:5432/postgres?sslmode=require"
```
The script will:
1. Ensure all tables (`contact_messages`, `page_views`, `analytics_events`) exist in PostgreSQL.
2. Check for existing records to prevent duplicates (idempotent).
3. Insert existing messages while strictly preserving original timestamps and status.
4. Automatically advance the PostgreSQL ID sequence (`contact_messages_id_seq`).
5. Leave your local development SQLite database completely untouched.

---

## 6. Custom Domain Verification with Resend

To send emails from your personal domain (e.g., `contact@anjalivishwakarma.dev`):
1. In the [Resend Domains Dashboard](https://resend.com/domains), click **Add Domain**.
2. Add the generated DNS records at your domain registrar:
   - **DKIM (TXT):** `resend._domainkey` -> `k=rsa; p=...`
   - **SPF (TXT):** `v=spf1 include:amazonses.com ~all`
   - **MX (if using subdomain):** `feedback-smtp.us-east-1.amazonses.com` (Priority 10)
3. Once verified, update `SENDER_EMAIL` in Render environment variables:
   ```env
   SENDER_EMAIL=Anjali Vishwakarma <contact@anjalivishwakarma.dev>
   ```
