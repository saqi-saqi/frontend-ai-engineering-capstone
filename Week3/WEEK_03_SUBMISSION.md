# Week 3 Deliverable: AI-Assisted React Application Build
**Track**: Front-End AI Engineering / AI Fluency  
**Application Built**: MindGuard AI · Front-End AI Companion & Mental Health Triage Interface  
**Tech Stack**: React 18, Vite, Lucide Icons, Vitest, Testing Library

---

## 1. Overview of the Completed Application

The **MindGuard AI Companion & Triage Interface** is a specialized front-end web application demonstrating core AI engineering principles:
* **Token Streaming & Low-Latency UI**: Implements a real-time Server-Sent Events (SSE) token streaming simulation with smooth auto-scroll management and Time to First Token (TTFT) tracking (**120ms** stream vs. **1,800ms** blocking benchmark).
* **3-Action Acute Crisis Triage Modal (Hick's Law)**: Automatically detects acute distress and passive suicidal ideation (including pseudo-negations), displaying an accessible emergency modal with:
  1. Direct 988 call action + **1-click clipboard copy fallback** for desktop browsers.
  2. Crisis Text Line action (Text `HOME` to `741741`).
  3. Trusted personal contact connection.
  4. Progressive disclosure for secondary international hotlines.
* **Accessible Settings & Model Drawer**: Form with RFC email regex validation, Anthropic API key prefix pattern matching, secret password masking toggle, and WCAG 2.1 AA focus shifting.
* **Telemetry & Pipeline Inspector**: Live panel displaying TTFT latency, token generation throughput (t/s), NLP intent classification confidence, and audit trail stream.

---

## 2. Prompts Used During Development

### Prompt 1: Component Scaffolding & Message Streaming Pipeline
```text
Act as a Senior React Engineer specializing in low-latency AI interfaces.
Scaffold a streaming AI chat interface in React 18 with the following specification:
1. Message state containing role ('user' | 'bot'), timestamp, intent badge, and streaming content.
2. Token streaming simulation function with configurable TTFT latency (120ms streaming vs 1,800ms blocking).
3. Sticky auto-scroll behavior that pins to the bottom during active token generation while permitting upward scroll without jarring snap-backs.
4. Clean dark-mode glassmorphic styling with clear visual hierarchy for user and bot message bubbles.
```

### Prompt 2: Emergency Crisis Triage Modal (Hick's Law Design)
```text
Design an accessible Emergency Crisis Support Modal component in React.
Requirements:
1. Apply Hick's Law: Consolidate choices down to 3 immediate triage actions (Call 988 Lifeline, Text Crisis Line 741741, Reach Personal Contact).
2. Desktop tel: Fallback: Replace dead tel: links with a single-click clipboard copy button and toast confirmation.
3. Progressive Disclosure: Place secondary and international hotlines behind an expandable disclosure dropdown.
4. WCAG 2.1 AA Accessibility: Accessible dialog overlay with role="dialog", aria-modal="true", and Escape key dismissal.
```

### Prompt 3: Production-Ready Settings Form with Test Gate
```text
Build an accessible Settings & Model Configuration Drawer in React with:
1. Real-time validation executed onBlur and onSubmit using strict RFC email regex and Anthropic API key prefix regex.
2. Input sanitization (.trim()) on all strings prior to validation.
3. API key masked by default (type="password") with an interactive type="button" show/hide toggle.
4. WCAG 2.1 AA accessibility: explicit htmlFor labels, aria-invalid, aria-describedby error alerts, and error summary focus management on failed submit.
```

---

## 3. How AI Assisted Throughout the Implementation

AI functioned as an intelligent pairing partner across three critical stages:

1. **Rapid Architecture & State Scaffolding**:
   AI eliminated blank-page latency by generating boilerplate for multi-tier state orchestration (combining streaming message buffers, real-time latency calculation intervals, and intent classification triggers).
2. **Regex Formulation & Constraint Enforcement**:
   AI formulated hardened regex patterns for email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) and Anthropic API keys (`^sk-ant-api[0-9a-zA-Z_-]{20,}$`).
3. **Accessibility Schema Mapping**:
   Directing AI with explicit WCAG 2.1 AA constraints ensured proper wiring of ARIA attributes (`aria-describedby`, `aria-invalid`, `role="alert"`) across form controls without manual boilerplate lookup.

---

## 4. Manual Improvements, Corrections & Code Refactoring

During human code auditing of the AI-generated snippets, three significant bugs/defects were discovered and manually refactored:

### 1. The Accidental Form Submit Bug (Button Type Omission)
* **AI Flaw**: The AI generated the password show/hide toggle without setting `type="button"`. Because HTML buttons default to `type="submit"`, clicking the visibility toggle prematurely submitted the form and fired false validation errors.
* **Manual Correction**:
```diff
- <button onClick={() => setShowKey(!showKey)}>
+ <button type="button" onClick={() => setShowKey(!showKey)}>
```

### 2. Whitespace-Only Validation Bypass
* **AI Flaw**: The initial validation logic evaluated `value.length >= 2`. Entering strings of pure spaces (e.g. `"   "`) bypassed validation and entered invalid state.
* **Manual Correction**:
```diff
- if (!value || value.length < 2)
+ const trimmed = typeof value === 'string' ? value.trim() : value;
+ if (!trimmed || trimmed.length < 2)
```

### 3. Desktop `tel:` Link Breakdown
* **AI Flaw**: The AI provided standard `href="tel:988"` links. On desktop browsers without telephony applications, clicking the link resulted in a dead click.
* **Manual Correction**: Implemented a secondary desktop fallback button with `navigator.clipboard.writeText('988')` and visual toast confirmation.

---

## 5. Submission Checklist & Rubric Verification
- [x] **Completed Application**: Full React + Vite application running in `Week3/`.
- [x] **Prompts Documented**: Exact structured prompts recorded for all major components.
- [x] **AI Assistance Explanation**: Clear breakdown of where AI added velocity and where human oversight was needed.
- [x] **Manual Refactoring Documented**: Concrete code diffs showing human bug catches and architectural improvements.
