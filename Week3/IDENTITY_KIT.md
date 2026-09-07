# Visual Identity Kit · One-Page Deliverable

**Student Name**: Muhammad Saqib Tariq  
**Student ID**: 04072213009  
**Track**: AI Fluency (FL-03) · Week 3 Assignment: Decide Once (Identity Kit)  
**Project**: MindGuard AI (Front-End AI Engineering Capstone)  
**Resource URL**: [https://aifluency.flyrank.ai/week-03.html#identity-kit](https://aifluency.flyrank.ai/week-03.html#identity-kit)  

---

## 🎨 The 1-Page Identity Kit

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            VISUAL IDENTITY CARD                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Typography (2 Free Google Fonts):                                       │
│     • Headings & Body: Inter (Weights: 400 Regular, 600 SemiBold, 700 Bold) │
│     • Code & Telemetry: JetBrains Mono (Weights: 400 Regular, 700 Bold)     │
│                                                                             │
│  2. Palette (Tight 4-Color Foundation with Exact Hex Codes):               │
│     • Background (Near-Black):   #090D16  (Deep Navy Slate)                 │
│     • Surface / Card (Glass):    #0F172A  (Slate 900 Glass @ 75% Alpha)     │
│     • Text Primary (Near-White): #F1F5F9  (Crisp Slate 100)                 │
│     • Text Muted (Secondary):    #94A3B8  (Slate 400)                       │
│     • Main / Primary Accent:     #6366F1  (Indigo 500 - Focus & Brand)      │
│     • Crisis Accent (Emergency): #F43F5E  (Rose 500 - High-Contrast Alert)  │
│                                                                             │
│  3. Logo & Favicon:                                                         │
│     • Monogram: "MG" (MindGuard AI) in an Indigo-to-Violet rounded squircle │
│     • Format: Clean vector SVG (`icon.svg` & `favicon.svg`)                 │
│                                                                             │
│  4. Two-Line Style Note:                                                    │
│     "Typography uses Inter with JetBrains Mono; palette is deep navy slate │
│      (#090D16) with crisp white text (#F1F5F9) and indigo (#6366F1) /      │
│      rose (#F43F5E) accents. The mood is an engineering-grade dark cockpit:│
│      calm, high-contrast, and quiet so the live code proof is the loudest   │
│      thing on the page."                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Detailed Identity Breakdown

### 1. Typography Selection
* **Primary / Heading & Body**: `Inter` — Clean, modern grotesque sans-serif with tall x-height and exceptional legibility across mobile (375px) and desktop (1280px).
* **Monospace / Code**: `JetBrains Mono` — Crisp monospaced font used strictly for token streaming counters, TTFT latency numbers, and code diffs.
* *Why this pairing*: Exactly two fonts. No visual clutter.

### 2. Tight Color Palette
| Color Role | Hex Code | Swatch | Usage Rationale |
| :--- | :--- | :---: | :--- |
| **Near-Black Background** | `#090D16` | ⬛ | Dark canvas that provides a calm, glare-free backdrop. |
| **Card / Glass Surface** | `#0F172A` | ◼️ | Subtle container with backdrop blur that groups components. |
| **Near-White Text** | `#F1F5F9` | ⬜ | High contrast (14.2:1 ratio) ensuring effortless WCAG AA reading. |
| **Muted Text** | `#94A3B8` | 🔘 | Secondary descriptions, timestamps, and metadata. |
| **Main Accent** | `#6366F1` | 🟪 | Interactive buttons, active tab indicators, and primary links. |
| **Crisis Accent** | `#F43F5E` | 🟥 | Reserved exclusively for acute emergency triage actions. |

### 3. Logo & Favicon Asset
* **Symbol**: `MG` Monogram
* **Asset Location**: `src/app/icon.svg` and `public/favicon.svg`
* **SVG Code**:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#mg)" />
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="14">MG</text>
</svg>
```

---

## 🤖 Claude Project / AI Workspace Snippet

Add this snippet directly into your **Claude Project Instructions** or AI system prompt so all future builds remain 100% consistent:

```markdown
### Visual Identity Rules
- **Fonts**: Headings/Body: `Inter`, Code/Metrics: `JetBrains Mono`.
- **Colors**: Background `#090D16`, Cards `#0F172A` (75% alpha), Text `#F1F5F9`, Muted `#94A3B8`, Accent `#6366F1`, Crisis `#F43F5E`.
- **Mood**: The design is the frame, not the painting. Keep the layout calm, dark-glassmorphic, and high-contrast (WCAG 2.1 AA) so the live code and telemetry proof remain the loudest elements on screen.
```

---

## ✅ Pass / Revise Criteria Verification

- [x] **One or two fonts, not a pile**: `Inter` and `JetBrains Mono` only.
- [x] **Tight palette (≈3–4 colors) with actual hex codes**: `#090D16`, `#0F172A`, `#F1F5F9`, `#6366F1`, `#F43F5E`.
- [x] **Simple logo / favicon exists**: SVG monogram `MG` created and integrated.
- [x] **Style note describes a single coherent mood**: Calm dark cockpit where design frames the work without upstaging it.
