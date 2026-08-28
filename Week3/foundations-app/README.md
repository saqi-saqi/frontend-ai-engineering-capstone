# MindGuard AI Companion — Phase: Foundations (Week 3)

> **Next.js 15 App Router · TypeScript · Tailwind CSS · Vercel Continuous Deployment**

A modern, accessible, and low-latency AI companion and acute crisis triage application designed for day-one deployment with automatic preview URLs on every commit.

---

## 🚀 Live Preview & Deployment

- **Deployment Target**: Vercel (or Netlify)
- **Preview Deployments**: Configured to build automatically on every git push / PR
- **Node.js Target**: Node.js LTS (v24+ / v20+)

---

## 📱 Responsive Design Verification

The interface has been engineered and verified across all standard responsive breakpoints:
- **Mobile (375px)**: Compact navigation drawer, full-width touch targets, stacked Hick's Law emergency cards, auto-scroll chat input.
- **Workstation / Desktop (1280px+)**: Sticky glassmorphic desktop navigation bar, multi-column metrics dashboard, expansive chat window.

---

## 🛠️ Architecture & Routes

All screens from the specification are fully routed using **Server Components by default** and **Client Components only where interactivity is required**:

| Route | Component Type | Purpose / Description |
| :--- | :--- | :--- |
| `/` | **Server Component** | Companion Dashboard, architecture foundations overview & spec route directory. |
| `/chat` | **Client Component** | Live AI conversational companion with SSE token streaming simulation, TTFT tracking (120ms), and auto-scroll. |
| `/crisis` | **Client Component** | Emergency Crisis Triage screen applying Hick's Law 3-action layout, direct 988 call with 1-click clipboard fallback, and expandable international hotlines. |
| `/telemetry` | **Client Component** | Observability console displaying TTFT (120ms), throughput (38 t/s), NLP intent classification confidence, and audit stream. |
| `/settings` | **Client Component** | Model drawer with real-time RFC email regex validation, Anthropic API key prefix pattern check, and masked password toggle. |
| `/health` | **Server Component** | Live server-rendered health check fetching diagnostic data from `/api/health`, reporting uptime, latency probes, and zero-secret env verification. |
| `/devlog` | **Server Component** | Documentation of prompt ladders, AI pairing workflows, and human-in-the-loop bug fixes. |
| `/api/health` | **Route Handler** | JSON endpoint delivering real-time microservice status, platform details, and memory usage. |

---

## 🔒 Zero Secrets Security & Environment Structure

Sensitive keys are **never committed** to source control.

### Setup Local Environment:
```bash
# In Week3/foundations-app:
cp .env.example .env.local
```

### Environment Variables Matrix:
| Variable | Scope | Description | Sample / Default |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_BASE_URL` | Public (Client + Server) | Base URL for API endpoints | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_ENV` | Public (Client + Server) | App environment indicator | `development` / `preview` / `production` |
| `LLM_API_KEY` | **Server-Only (Secret)** | API key for Anthropic / OpenAI | `sk-ant-api...` (Configured in Vercel) |
| `NEXT_PUBLIC_APP_VERSION` | Public (Client + Server) | Application version | `1.0.0-alpha` |

---

## 💻 Local Development Setup

```bash
# 1. Navigate to the foundations app directory
cd Week3/foundations-app

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Build & Production Test:
```bash
npm run build
npm run start
```

---

## 🌐 Connecting to Vercel / Netlify

1. **Push your repository** to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), select your repository.
3. If deploying the monorepo, set the **Root Directory** to `Week3/foundations-app`.
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_BASE_URL`: `https://<your-vercel-app>.vercel.app`
   - `LLM_API_KEY`: Your LLM API key (kept safe and hidden)
   - `NEXT_PUBLIC_APP_ENV`: `production`
5. Click **Deploy**. Vercel will generate an immutable preview URL for every commit and branch!
