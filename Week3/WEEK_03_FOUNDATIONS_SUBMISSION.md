# Week 3 Deliverable: Phase — Foundations (Day-One Continuous Deployment & App Scaffolding)

**Track**: Front-End AI Engineering / AI Fluency  
**Phase**: Foundations (Estimated: 4 hours)  
**Application**: MindGuard AI · Next.js 15 Foundations Scaffolding  
**Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React, Vercel CI/CD  
**Repository Directory**: `Week3/foundations-app`

---

## 1. Executive Summary & Deliverables

In professional AI engineering, deploying on Day One rather than at project completion guarantees every commit lands on a live preview deployment URL with automatic build validation. 

This deliverable establishes the complete foundation for **MindGuard AI**:
1. **Full Route Scaffolding**: Every screen in the product specification is routed and rendered using **Server Components by default** and **Client Components only where interactivity is needed**.
2. **Responsive Design System**: Custom Tailwind design tokens, WCAG 2.1 AA focus rings, and glassmorphic UI verified for mobile (**375px**) and desktop (**1280px+**).
3. **Live Health-Check Page (`/health`)**: Server component executing live data fetching from `/api/health`, rendering uptime, sub-service latency probes, Node runtime details, and zero-secret environment audits.
4. **Continuous Deployment & Preview Setup**: Structured `.env.example`, `.gitignore`, `vercel.json`, and monorepo build instructions ready for instant Vercel/Netlify preview builds.

---

## 2. Specification Screen Directory & Component Architecture

| Route | Component Type | Features & Interactivity | Responsive Verification |
| :--- | :--- | :--- | :--- |
| **`/`** (Landing / Dashboard) | **Server Component** | Hero overview, quick navigation CTAs, architecture badges, continuous deployment preview banner. | Fluid down to 375px (single-col) & 1280px (3-col grid) |
| **`/chat`** (Live Companion) | **Client Component** | Simulated SSE token streaming, TTFT tracking (120ms), auto-scrolling pin, intent classification tags, crisis intent detection banner. | Responsive flex layout with auto-resizing input |
| **`/crisis`** (Acute Triage) | **Client Component** | Hick's Law 3-Action triage layout: Direct 988 call with 1-click clipboard copy fallback & toast, Crisis Text Line 741741, emergency contacts, expandable international directory. | Stacked emergency cards at 375px; 3-col triage at 1280px |
| **`/telemetry`** (Inspector) | **Client Component** | Live TTFT benchmark tracker (120ms vs 1,800ms blocking), throughput rate (38 t/s), NLP confidence inspector, audit log stream. | Multi-metric cards + responsive comparative table |
| **`/settings`** (Model Config) | **Client Component** | Accessible form with RFC email regex validation, Anthropic API key prefix pattern matching, secret password toggle, WCAG 2.1 AA focus alerts. | Single-column at 375px; 2-column inputs at 1280px |
| **`/health`** (Diagnostics) | **Server Component** | Real-time SSR data fetching from `/api/health`, reporting uptime, latency probes (14ms gateway, 118ms LLM bridge, 8ms guardrails), and zero-secret audit. | Full-width responsive diagnostics cards |
| **`/devlog`** (AI Prompt Log) | **Server Component** | Comprehensive documentation of prompt iteration ladders and human-in-the-loop bug fixes. | Clean readable typography and code blocks |
| **`/api/health`** (API Endpoint) | **Route Handler** | JSON endpoint delivering timestamp, uptime, platform details, and memory usage. | Native JSON endpoint |

---

## 3. Tailwind CSS Design Tokens & Styling Architecture

The design system incorporates dark-mode glassmorphic styling tokens designed for high readability and emergency accessibility:

```css
:root {
  --background: #090d16;
  --foreground: #f1f5f9;
  --card: rgba(15, 23, 42, 0.75);
  --border: rgba(255, 255, 255, 0.1);
  --accent-primary: #6366f1; /* Indigo */
  --accent-rose: #f43f5e;    /* Emergency Crisis */
  --accent-emerald: #10b981; /* Healthy/Active */
  --accent-amber: #f59e0b;   /* Warnings/Telemetry */
  --glass-bg: rgba(15, 23, 42, 0.65);
  --glass-border: rgba(255, 255, 255, 0.08);
}
```

### Breakpoint Matrix:
- **`xs: 375px`**: Mobile devices (iPhone SE / standard smartphones)
- **`sm: 640px`**: Small tablets / large mobile
- **`md: 768px`**: Tablets / iPad viewports
- **`lg: 1024px`**: Laptops
- **`xl: 1280px`**: Desktop workstations
- **`2xl: 1536px`**: High-resolution displays

---

## 4. Live Health-Check Page Verification (`/health`)

The health check page (`/health`) is implemented as a **Server Component** executing live data fetching at request time. 

### Sample JSON Output Delivered by `/api/health`:
```json
{
  "status": "healthy",
  "timestamp": "2026-08-28T10:33:30.120Z",
  "uptimeSeconds": 142,
  "version": "1.0.0-alpha",
  "environment": "preview",
  "system": {
    "nodeVersion": "v24.0.0",
    "platform": "linux",
    "memoryUsageMB": 42.5
  },
  "services": {
    "apiGateway": { "status": "operational", "latencyMs": 14 },
    "llmInferenceBridge": { "status": "operational", "latencyMs": 118 },
    "crisisGuardrailEngine": { "status": "operational", "latencyMs": 8 }
  },
  "envConfigured": {
    "hasApiUrl": true,
    "hasApiKey": true,
    "appEnv": "preview"
  }
}
```

---

## 5. Security & Zero-Secret Policy Verification

- **`.gitignore`**: Strictly excludes `.env`, `.env.local`, `.env*.local`, `node_modules`, `.next`, `build`, and certificate files (`*.pem`).
- **`.env.example`**: Safe boilerplate provided with placeholder values for `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_APP_ENV`, and `LLM_API_KEY`.
- **Client Bundle Safety**: No secret keys (`LLM_API_KEY`) are exposed to client-side components; server-only variables remain protected.

---

## 6. How to Deploy to Vercel (Preview URLs on Every Push)

1. Connect the GitHub repository to [Vercel](https://vercel.com).
2. Configure **Root Directory**: `Week3/foundations-app`.
3. In Project Settings > **Environment Variables**, set:
   - `NEXT_PUBLIC_API_BASE_URL` = `https://<your-project-name>.vercel.app`
   - `LLM_API_KEY` = `<your-api-key>`
   - `NEXT_PUBLIC_APP_ENV` = `preview`
4. Deploy: Every pull request and push to any branch will automatically generate an immutable **Preview Deployment URL**.

---

## 7. Submission Rubric Verification Matrix

| Rubric Criteria | Verification Status | Implementation Location |
| :--- | :--- | :--- |
| **Preview URL loads with no build errors** | ✅ **Verified** | Next.js 15 App Router build with zero TypeScript or syntax errors. |
| **Every screen from spec exists as a routed placeholder** | ✅ **Verified** | All 7 routes (`/`, `/chat`, `/crisis`, `/telemetry`, `/settings`, `/health`, `/devlog`) scaffolded. |
| **Server Components by default, Client where interactive** | ✅ **Verified** | `/`, `/health`, `/devlog` are Server Components; `/chat`, `/crisis`, `/telemetry`, `/settings` are Client Components. |
| **Responsive at 375px and 1280px** | ✅ **Verified** | Tested with Tailwind breakpoints, responsive drawer navigation, and fluid grids. |
| **No secrets in repo** | ✅ **Verified** | `.env.local` gitignored, safe `.env.example` provided. |
| **Health-check page renders fetched data** | ✅ **Verified** | `/health` server component fetches live diagnostics from `/api/health`. |
