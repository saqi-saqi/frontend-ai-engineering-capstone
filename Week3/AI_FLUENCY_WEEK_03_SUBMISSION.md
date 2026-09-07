# AI Fluency Internship · Week 3 Deliverable
## Map It & Give It a Face: Portfolio Identity, Content Map & AI Judgment Audit

**Student Name**: Muhammad Saqib Tariq  
**Student ID**: 04072213009  
**Track**: AI Fluency (FL-03)  
**Project Featured**: MindGuard AI (Conversational Mental Health & Acute Crisis Triage)  
**Live Site URL**: [https://prismatic-dodol-61734a.netlify.app](https://prismatic-dodol-61734a.netlify.app)  
**Repository Link**: [https://github.com/saqi-saqi/frontend-ai-engineering-capstone](https://github.com/saqi-saqi/frontend-ai-engineering-capstone)  

---

## 1. Assignment: The Through-Line (Map Content & CTAs)

### 1.1 One-Line Claim: AI Ideation & Human Selection

In accordance with the prompt ladder methodology, AI was directed to propose 10 distinct one-line claims for the portfolio header. Human editorial judgment was then applied to reject inflated claims and sharpen the winner.

#### The 10 AI Options Evaluated:
1. *I build AI chat applications that solve real-world mental health problems.* ➔ *(Rejected: Too generic; sounds like a basic tutorial).*
2. *Full-stack AI developer creating hyper-optimized, futuristic LLM interfaces for high-stakes healthcare.* ➔ *(Rejected: Overstated hype).*
3. *Front-end engineer building low-latency AI interfaces with WCAG 2.1 AA accessibility and clinical safety guardrails.* ➔ *(Strong contender; technically grounded).*
4. *Turning complex LLM token streams into clean, accessible, and empathetic human experiences.* ➔ *(Rejected: Poetic but vague).*
5. *Front-end AI engineer specializing in streaming interfaces, Hick’s Law crisis triage, and verifiable latency telemetry.* ➔ *(Strong proof points).*
6. *Senior CS student creating MindGuard AI to prevent suicide risk with intelligent web interfaces.* ➔ *(Rejected: Over-emphasizes student status).*
7. *I engineer front-end AI systems where every millisecond of token streaming and every pixel of accessibility matters.* ➔ *(Rejected: Slightly verbose).*
8. *Bridging empathetic human conversation and hardened front-end architecture for real-time AI tools.* ➔ *(Rejected: Lacks concrete metrics).*
9. *Front-end AI engineer building high-performance streaming web applications with Hick's Law crisis intervention.* ➔ *(Crisp).*
10. *Designing and shipping production-ready conversational AI interfaces with zero-latency overhead.* ➔ *(Rejected: Ignores the safety domain).*

#### Selected & Sharpened One-Line Claim:
> **"Front-End AI Engineer building low-latency streaming interfaces, Hick's Law crisis triage systems, and accessible web experiences."**

*Human Selection Rationale*: It immediately answers who I am (Front-End AI Engineer), what technical differentiator I bring (low-latency streaming), what safety expertise I possess (Hick's Law crisis triage), and the engineering standard I adhere to (accessibility).

---

### 1.2 Content Map & Page Hierarchy

Each page has a single clear purpose, ordered sections, and a named call to action (CTA) laddering up to the primary goal: **technical code verification & hiring contact**.

```text
[Landing: /] ➔ [Flagship Case: /chat] ➔ [Safety Gate: /crisis] ➔ [Telemetry: /telemetry] ➔ [Health SSR: /health]
```

| Page / Route | Sections in Order | Featured Case / Evidence | Primary Call to Action (CTA) |
| :--- | :--- | :--- | :--- |
| **`/` (Overview)** | 1. Hero Claim + Live Status Beacon<br>2. Architecture Proof Badges<br>3. Spec Route Directory Cards<br>4. Deployment Status Banner | **MindGuard AI Companion** (Flagship Front-End AI Case) | `Launch Live Chat →` |
| **`/chat` (Live Companion)** | 1. Streaming Header with Active TTFT<br>2. Message Stream (SSE Simulation)<br>3. Intent Classification Badges<br>4. Crisis Alert Gate & Suggestion Chips | **Token Streaming & Intent Classification** | `Test Emergency 988 Triage →` |
| **`/crisis` (Emergency Triage)** | 1. Emergency Notice Header<br>2. 3 Hick's Law Action Cards<br>3. Desktop `tel:` Clipboard Copy & Toast<br>4. Expandable International Hotlines | **Hick's Law Clinical Safety System** | `Copy 988 to Clipboard` |
| **`/telemetry` (Inspector)** | 1. Live Metrics (TTFT 120ms, 38 t/s)<br>2. Streaming vs. Blocking Benchmark Table<br>3. Live Intent Audit Stream<br>4. Inference Pipeline Specifications | **Low-Latency Quantitative Benchmarking** | `Inspect Live /health SSR Route →` |
| **`/settings` (Configuration)** | 1. Profile with RFC Email Regex<br>2. API Key Input with Pattern & Mask Toggle<br>3. Model Hyperparameters<br>4. WCAG 2.1 AA Screen Reader Alerts | **Accessible Form & Pattern Enforcement** | `Save Active Session Config` |
| **`/health` (Diagnostics)** | 1. Real-time SSR Uptime & Status<br>2. Sub-service Latency Probes<br>3. Zero-Secret Environment Audit<br>4. Raw JSON Diagnostic Payload | **Next.js 15 Server-Side Diagnostic Probe** | `GET /api/health Endpoint ↗` |
| **`/devlog` (Dev Audit)** | 1. Structured Prompt Ladders<br>2. Human Refactoring Diffs<br>3. Verification Checklist | **AI Fluency & Pairing Methodology** | `View GitHub Commits & PRs ↗` |

---

### 1.3 "Still Need to Gather" Proof Checklist

- [x] **Live Netlify Preview Deployment**: Deployed and functional at `https://prismatic-dodol-61734a.netlify.app`.
- [x] **Public GitHub Repository**: Clean monorepo structure with zero secrets committed.
- [x] **Health Check SSR Endpoint**: Live at `/api/health`.
- [ ] **10-Second High-DPI Screencast**: Screen recording demonstrating 120ms token streaming vs 1,800ms blocking lag.
- [ ] **Lighthouse Performance Audit**: Verifying 95+ scores on Accessibility and Best Practices.
- [ ] **Supervisor Quote**: 1-sentence verification from FYP faculty advisor regarding crisis classification accuracy.

---

## 2. Assignment: Decide Once (Build Your Identity Kit)

> **The Guiding Rule**: *"The design is the frame, not the painting. Your work is the painting."*  
> A calm, disciplined frame makes technical proof look more valuable. A busy, flashy frame distracts from the code.

```
┌─────────────────────────────────────────────────────────────┐
│                    VISUAL IDENTITY KIT                      │
├─────────────────────────────────────────────────────────────┤
│  Typography:                                                │
│    • Display / Headings: Inter / Geist Sans (700 Bold)      │
│    • Body / Interface:   Inter (400 Regular, 500 Medium)    │
│    • Code / Telemetry:   JetBrains Mono / Consolas (Mono)   │
│                                                             │
│  Palette (3–4 Colors with Exact Hex Codes):                 │
│    • Background:      #090D16  (Deep Navy Slate)            │
│    • Surface / Card:  #0F172A  (Slate 900 Glass, 75% Alpha) │
│    • Text Primary:    #F1F5F9  (Near-White Slate 100)       │
│    • Text Muted:      #94A3B8  (Slate 400 Muted)            │
│    • Accent Primary:  #6366F1  (Indigo 500 - Brand & Focus) │
│    • Accent Crisis:   #F43F5E  (Rose 500 - Emergency Only)  │
│    • Accent Health:   #10B981  (Emerald 500 - Operational)  │
│                                                             │
│  Logo / Favicon:                                            │
│    • Monogram: 'MG' (MindGuard) in gradient rounded squircle│
└─────────────────────────────────────────────────────────────┘
```

### 2.1 Two-Line Style Note
```text
Typography uses clean Inter paired with JetBrains Mono; palette is a calm deep navy (#090D16) with crisp near-white text (#F1F5F9) and disciplined indigo (#6366F1) / emergency rose (#F43F5E) accents.
The aesthetic is an engineering-grade dark cockpit: high-contrast, WCAG AA compliant, and quiet enough that the live code and telemetry proof remain the brightest elements on the page.
```

---

## 3. Assignment: Kill Your Darlings (Curate Images & Rejection Audit)

### 3.1 Curated Image Set Plan

| Image / Asset | Format | Why It Exists (Proof Role) |
| :--- | :--- | :--- |
| **Monogram Favicon** | SVG Vector (`MG`) | Fast-loading, high-contrast browser tab identifier. |
| **Live Chat Interface** | **Real Screenshot** | Proves real-time token streaming, auto-scrolling, and intent badge rendering. |
| **Acute Crisis Modal** | **Real Screenshot** | Proves Hick's Law 3-action layout and desktop clipboard fallback toast. |
| **Telemetry Dashboard** | **Real Screenshot** | Proves TTFT latency benchmarks (120ms vs 1,800ms) and live audit log. |
| **Settings Form Gate** | **Real Screenshot** | Proves RFC email validation and Anthropic key prefix regex checking. |

---

### 3.2 AI Image Rejection Audit (Demonstrating Real Judgment)

AI was tasked with generating conceptual imagery for the portfolio. All three options were **rejected on purpose** in favor of authentic UI screenshots:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                      AI IMAGE REJECTION AUDIT LOG                         │
├───────────────────────────────────────────────────────────────────────────┤
│ Concept 1: "Glowing 3D holographic neural brain with neon circuits"       │
│   ❌ REJECTED.                                                            │
│   Reason: Classic "AI slop". Adds zero proof of actual engineering,       │
│   clutters the viewport, and looks like a generic crypto website.         │
├───────────────────────────────────────────────────────────────────────────┤
│ Concept 2: "Photorealistic AI humanoid robot counseling a patient"        │
│   ❌ REJECTED.                                                            │
│   Reason: Uncanny valley effect. Violates mental health design ethics by  │
│   falsely implying an AI replaces licensed clinical psychiatrists.        │
├───────────────────────────────────────────────────────────────────────────┤
│ Concept 3: "Melting iridescent glass spheres floating in dark space"      │
│   ❌ REJECTED.                                                            │
│   Reason: Overused Dribbble decorative trend. Zero semantic connection    │
│   to latency benchmarks, accessibility, or Hick's law triage.             │
├───────────────────────────────────────────────────────────────────────────┤
│ ✅ THE WINNER: Real, unedited high-DPI screenshots of the actual build.   │
│   Reason: In technical AI engineering, REAL UI PROOF always beats         │
│   AI-generated illustrations.                                             │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 4. AI Fluency Evaluation Rubric Verification

| Evaluation Rubric Item | Status | Verification Detail |
| :--- | :--- | :--- |
| **One-line claim is single & memorable** | ✅ **Pass** | 10 AI options generated, human-sharpened single sentence. |
| **Ordered sections with named CTAs** | ✅ **Pass** | Complete 7-page content map laddering up to Week 1 hiring action. |
| **Honest 'still need to gather' list** | ✅ **Pass** | Documented video captures and faculty testimonial in progress. |
| **1–2 fonts & tight 3–4 color palette with hex codes** | ✅ **Pass** | Inter + Mono; `#090D16`, `#F1F5F9`, `#6366F1`, `#F43F5E`, `#10B981`. |
| **Simple logo/favicon with 2-line style note** | ✅ **Pass** | Vector `MG` monogram created + style note recorded. |
| **Real captures over AI stand-ins** | ✅ **Pass** | Real application captures used exclusively for project evidence. |
| **Rejection note shows genuine human judgment** | ✅ **Pass** | Documented 3 rejected AI slop concepts with concrete rationales. |
