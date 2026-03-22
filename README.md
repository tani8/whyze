# Whyze — Setup & Deploy Guide

## Stack
- **Next.js 14** (App Router)
- **Clerk** — auth
- **Supabase** — database
- **Anthropic Claude** — AI wrong-answer explanations
- **Resend** — transactional email
- **Stripe** — payments (Week 8)
- **Vercel** — hosting

---

## Local Setup (15 minutes)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Fill in each value — instructions for each service below.

### 3. Get your API keys

**Clerk** (auth) → https://dashboard.clerk.com
- Create new app → copy Publishable Key and Secret Key

**Supabase** (database) → https://supabase.com
- Create new project → Settings → API → copy URL + anon key + service role key
- Paste the SQL from `nurseiq_schema.sql` into SQL Editor → Run

**Anthropic** (AI) → https://console.anthropic.com
- API Keys → Create Key

**Resend** (email) → https://resend.com
- API Keys → Create → copy key
- Add and verify your sending domain

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Deploy to Vercel (5 minutes)

```bash
npx vercel --prod
```

Or connect your GitHub repo at vercel.com → New Project.

Add all environment variables under:
**Vercel Dashboard → Project → Settings → Environment Variables**

---

## Project Structure

```
whyze/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── layout.tsx            ← Root layout + Clerk + fonts
│   ├── globals.css
│   ├── dashboard/
│   │   └── page.tsx          ← User dashboard (Week 5)
│   ├── onboarding/
│   │   └── page.tsx          ← Post-signup onboarding
│   ├── sign-in/page.tsx
│   ├── sign-up/page.tsx
│   └── api/
│       └── waitlist/
│           └── route.ts      ← Waitlist API (Supabase + Resend)
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── WhySection.tsx
│   ├── CompareSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── CtaSection.tsx
│   ├── Footer.tsx
│   └── WaitlistForm.tsx      ← Reusable form with API integration
├── lib/
│   ├── supabase.ts           ← Supabase client + types
│   ├── ai.ts                 ← Claude wrong-answer explanation engine
│   ├── sm2.ts                ← Spaced repetition algorithm
│   └── utils.ts              ← Helpers (cn, formatDate, passRate)
├── middleware.ts             ← Clerk route protection
├── .env.local.example        ← All env vars documented
└── tailwind.config.js        ← Brand colors + fonts pre-configured
```

---

## Week-by-Week Build Plan

| Week | What to build |
|------|--------------|
| 1 | ✅ Landing page live, waitlist collecting emails |
| 2 | Auth (Clerk) + Supabase schema deployed |
| 3 | Question engine + Claude API integration |
| 4 | SM-2 spaced repetition session flow |
| 5 | Dashboard — stats, streak, category breakdown |
| 6 | Beta launch — invite first 25 users |
| 7 | Fix top issues, add 200 more questions |
| 8 | Stripe integration, beta-to-paid conversion |

---

## Renaming from Whyze
If you pick a different name, find/replace `Whyze` and `whyze` across:
- `app/layout.tsx` (metadata title/description)
- `components/Nav.tsx`
- `components/Footer.tsx`
- `package.json` (name field)
- Vercel project name
- Supabase project name
