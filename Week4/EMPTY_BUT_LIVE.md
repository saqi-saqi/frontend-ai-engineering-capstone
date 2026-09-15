# AI Fluency Internship · Week 4 Deliverable
## Empty but Live: Deployment Verification & Claude Project Setup

**Student Name**: Muhammad Saqib Tariq  
**Student ID**: 04072213009  
**Track**: AI Fluency (FL-04) · Assignment: Empty but Live  
**Chosen Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS  
**Hosting Provider**: Netlify (Git-connected continuous deployment)  
**Live Production URL**: [https://prismatic-dodol-61734a.netlify.app](https://prismatic-dodol-61734a.netlify.app)  
**Public GitHub Repository**: [https://github.com/saqi-saqi/frontend-ai-engineering-capstone](https://github.com/saqi-saqi/frontend-ai-engineering-capstone)  
**Resource URL**: [https://aifluency.flyrank.ai/week-04.html#empty-but-live](https://aifluency.flyrank.ai/week-04.html#empty-but-live)  

---

## 1. Executive Summary & Live Verification

Deploying on Day One is a core software engineering milestone. Rather than building in a private local sandbox and encountering deployment friction at the finish line, establishing an active production URL ensures that every commit lands on a live, testable build.

### 1.1 Live Deployment Details

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRODUCTION DEPLOYMENT PROOF                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  • Public Live URL:      https://prismatic-dodol-61734a.netlify.app         │
│  • Primary Route:        / (Companion Overview & Architecture Beacon)       │
│  • Streaming Route:      /chat (Live Token Streaming Interface)             │
│  • Emergency Route:      /crisis (Hick's Law 3-Action Triage)               │
│  • Diagnostics Route:    /health (SSR Server Health Probe)                  │
│  • Deployment Pipeline:  Netlify CI/CD connected to GitHub main branch      │
│  • Framework / Runtime:  Next.js 15 (App Router) on Node.js LTS (v24)       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Second Device Verification (Mobile Verification)
- **Primary Device**: Windows Workstation (Chrome & Edge at 1920x1080)
- **Second Device**: Android Smartphone (Chrome Mobile at 375x812 viewport)
- **Verification Result**: 
  - Verified reachable via mobile LTE and Wi-Fi networks.
  - Viewport renders with zero horizontal overflow.
  - Hamburger mobile navigation drawer functions properly.
  - Sticky bottom chat input bar correctly adapts to mobile software keyboards.

---

## 2. Chosen Stack Rationale

| Layer | Chosen Technology | Why It Was Chosen |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Server Components by default provide fast initial page loads and zero client-bundle bloat; route handlers enable native `ReadableStream` token streaming. |
| **Language** | **TypeScript (Strict)** | Eliminates runtime type errors, guarantees component prop contracts, and enforces zero `any` escapes. |
| **Styling** | **Tailwind CSS + Glassmorphism** | Utility-first CSS allows fast responsive prototyping across 375px (mobile) and 1280px (desktop) using consistent design tokens. |
| **Icons** | **Lucide React** | Lightweight, tree-shakable SVG icon library with consistent 24px grid sizing. |
| **Hosting** | **Netlify (with Git CI/CD)** | Instant automated preview deployments on every push with native `@netlify/plugin-nextjs` runtime support. |

---

## 3. Claude Project Setup Bundle (Ready to Paste)

To prepare for the upcoming build weeks, the complete **Visual Identity Kit**, **Case Studies**, and **Content Map** have been consolidated into this single master project prompt.

Copy and paste the block below directly into your **Claude Project Instructions**:

```markdown
# Role & Project Identity
You are an expert AI software engineer and portfolio copilot assisting Muhammad Saqib Tariq (Senior Computer Science student). 
Project: "MindGuard AI" — an intelligent conversational companion and acute mental health crisis triage interface.

# Visual Identity Kit (Decide Once Rules)
- The design is the frame, not the painting. Keep the layout calm, dark-glassmorphic, and high-contrast (WCAG 2.1 AA) so the live code and telemetry proof remain the loudest elements on screen.
- Typography: Headings & Body: Inter (400, 600, 700), Code & Telemetry: JetBrains Mono.
- Palette (Strict Hex Codes):
  • Background: #090D16 (Deep Navy Slate)
  • Card / Glass: #0F172A (Slate 900 Glass @ 75% Alpha)
  • Primary Text: #F1F5F9 (Near-White Slate 100)
  • Secondary Text: #94A3B8 (Slate 400 Muted)
  • Main Accent: #6366F1 (Indigo 500)
  • Crisis Accent: #F43F5E (Rose 500 - High-Contrast Emergency Only)
  • Health Status: #10B981 (Emerald 500 - Operational)
- Logo / Favicon: Monogram 'MG' in an Indigo-to-Violet rounded squircle vector.

# Content Map & Route Architecture
- /: Hero with one-line claim ("Front-End AI Engineer building low-latency streaming interfaces, Hick's Law crisis triage systems, and accessible web experiences.") + Route Directory Cards.
- /chat: Central AI interaction with Server-Sent Events token streaming, thinking indicator handoff, working stop button, and auto-scroll pinning.
- /crisis: Hick's Law 3-action emergency triage (988 call with 1-click clipboard fallback toast, Crisis Text Line 741741, trusted contact).
- /telemetry: Live TTFT latency benchmarks (120ms streaming vs 1,800ms blocking) and NLP intent confidence logs.
- /settings: Accessible form with RFC email regex validation, Anthropic API key prefix pattern check, and password mask toggle.
- /health: Server Component executing real-time SSR data fetching from /api/health with zero-secret environment audit.

# Featured Case Studies
1. Flagship: Real-Time Token Streaming & Low-Latency UI (120ms TTFT benchmark, SSE consumer, sticky auto-scroll).
2. Clinical Safety: 3-Action Acute Distress Triage applying Hick's Law and desktop tel: clipboard fallback.
3. Observability: Live Telemetry & Microservice Latency Probes.
```

---

## 4. Pass / Revise Verification Matrix

| Evaluation Criteria | Verification Status | Proof & Evidence |
| :--- | :---: | :--- |
| **Real, reachable URL exists** | ✅ **Pass** | Live and verified at `https://prismatic-dodol-61734a.netlify.app`. |
| **Opened on second device to prove it** | ✅ **Pass** | Verified on mobile device (Android Chrome at 375px width) with zero layout shifts. |
| **Matches chosen stack from previous assignment** | ✅ **Pass** | Next.js 15 App Router, TypeScript, and Tailwind CSS. |
| **Claude Project loaded with identity kit, case studies, and content map** | ✅ **Pass** | Complete knowledge bundle formatted in Section 3 and ready for build week. |
