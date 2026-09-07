# Phase: Build (Core) · Streaming Chat Interface Deliverable

**Student Name**: Muhammad Saqib Tariq  
**Student ID**: 04072213009  
**Track**: Front-End AI Engineering / AI Fluency  
**Phase**: Build (Core) · Real-Time Streaming Chat Interface  
**Application**: MindGuard AI · Next.js 15 App Router Streaming Companion  

---

## 1. Executive Summary & Deliverable Links

Streaming chat is the defining UI pattern of modern AI engineering. This deliverable implements the full full-stack streaming conversational companion for **MindGuard AI**:
- **Server**: A dedicated Next.js 15 Route Handler ([`route.ts`](https://github.com/saqi-saqi/frontend-ai-engineering-capstone/blob/main/Week3/foundations-app/src/app/api/chat/route.ts)) streaming Claude responses via `ReadableStream` / Server-Sent Events with server-only API key isolation.
- **Client**: A robust streaming chat interface ([`page.tsx`](https://github.com/saqi-saqi/frontend-ai-engineering-capstone/blob/main/Week3/foundations-app/src/app/chat/page.tsx)) rendering typed message parts token-by-token, an indicator-to-token handoff, and an abortable stop button.
- **AI Config**: A centralized module ([`ai-config.ts`](https://github.com/saqi-saqi/frontend-ai-engineering-capstone/blob/main/Week3/foundations-app/src/lib/ai-config.ts)) housing model hyperparameters and the MindGuard empathetic system prompt with crisis guardrails.

---

## 🔗 Required Submission Links

| Deliverable Item | URL / Repository Path | Description |
| :--- | :--- | :--- |
| **🌐 Live Preview URL** | [https://prismatic-dodol-61734a.netlify.app/chat](https://prismatic-dodol-61734a.netlify.app/chat) | Live interactive deployment where a reviewer can hold a streaming conversation. |
| **⚡ Server Route Handler** | [`Week3/foundations-app/src/app/api/chat/route.ts`](https://github.com/saqi-saqi/frontend-ai-engineering-capstone/blob/main/Week3/foundations-app/src/app/api/chat/route.ts) | Server-side SSE route handler streaming Claude responses with client abort listening. |
| **💬 Client Chat Component** | [`Week3/foundations-app/src/app/chat/page.tsx`](https://github.com/saqi-saqi/frontend-ai-engineering-capstone/blob/main/Week3/foundations-app/src/app/chat/page.tsx) | Client component with thinking indicator handoff, working stop button, and auto-scroll pinning. |
| **⚙️ AI Config & System Prompt** | [`Week3/foundations-app/src/lib/ai-config.ts`](https://github.com/saqi-saqi/frontend-ai-engineering-capstone/blob/main/Week3/foundations-app/src/lib/ai-config.ts) | Well-commented module with model settings (`claude-3-5-sonnet-20241022`) and crisis guardrails. |

---

## 2. Evaluation Criteria Verification Matrix

| Evaluation Criteria | Verification Status | Implementation & Proof Detail |
| :--- | :---: | :--- |
| **Responses visibly stream token by token** | ✅ **Pass** | Server sends incremental text chunks over `ReadableStream`; client decodes chunks via `TextDecoder` and renders them token-by-token in real time. |
| **Generation can be stopped mid-stream without breaking state** | ✅ **Pass** | `AbortController.abort()` cleanly halts the HTTP stream; the partial message is preserved in state; the input is immediately re-enabled; subsequent sends succeed ("Stop, then send again" works). |
| **Conversation state survives multiple turns** | ✅ **Pass** | Maintains full conversation history across multiple turns; saved in `localStorage` (`mindguard_streaming_chat_v2`) so refreshes cause zero data loss. |
| **API key lives server-side only** | ✅ **Pass** | `ANTHROPIC_API_KEY` / `LLM_API_KEY` is referenced strictly within `src/app/api/chat/route.ts`. Zero client bundle leakage. |
| **Usable at phone width (375px)** | ✅ **Pass** | Responsive design tested at 375px: sticky bottom input, auto-expanding textarea, touch targets, and mobile navigation drawer. |

---

## 3. Mentor Tips & Architectural Edge Cases Handled

### 1. Auto-Scroll Pinning & User Scroll Release
* **The Problem**: Naive auto-scroll forcibly scrolls to the bottom on every token, creating a frustrating "snap-back" if the user tries to scroll up and read previous context.
* **Our Solution**:
  - `handleScroll` monitors scroll distance: `isAtBottom` is `true` only when the user is within 40px of the bottom.
  - The moment the user scrolls up, auto-scroll releases immediately.
  - A floating **`ScrollToBottom` ("Jump to latest ↓")** pill appears, featuring a pulsating green unread badge if new tokens are streaming in the background.

### 2. The Stop Button as a State Problem
* **The Problem**: Stopping generation frequently breaks component state, clears partial messages, or disables the input until page refresh.
* **Our Solution**:
  - Clicking **Stop** aborts the HTTP request controller.
  - The partial message received so far is tagged as `{ isPartial: true }` and remains in the conversation history.
  - The input immediately re-enables and focuses, allowing the user to type and send their next message immediately.

### 3. Thinking Indicator to Token Handoff (Zero Flicker)
* **The Problem**: If the thinking indicator unmounts one frame before the first token renders, the UI experiences an ugly flash of empty space.
* **Our Solution**:
  - `ThinkingIndicator` remains rendered while `hasReceivedFirstToken` is `false`.
  - As soon as the first streamed byte arrives, `setIsThinking(false)` and the bot message container are instantiated synchronously in the same render cycle, delivering an imperceptible, fluid handoff.

### 4. Streaming-Aware Text Rendering
* **The Problem**: Naive markdown parsers crash or flicker when parsing unclosed code fences (` ``` `) or dangling asterisks (` ** `) mid-stream.
* **Our Solution**:
  - Pre-renders stream chunks with continuous text decoding, whitespace normalization, and pre-wrap typography, preventing mid-stream rendering crashes.

---

## 4. Local Run & Deployment Instructions

### Run Locally:
```bash
cd Week3/foundations-app
npm run dev
# Open http://localhost:3000/chat
```

### Push to GitHub & Deploy:
```bash
git add .
git commit -m "feat(streaming): implement real-time streaming chat with thinking handoff, stop button, and scroll pinning"
git push origin main
```
Netlify will automatically detect the commit and deploy the updated streaming interface to your live preview URL!
