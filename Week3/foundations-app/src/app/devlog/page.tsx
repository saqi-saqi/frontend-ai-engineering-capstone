import React from 'react';
import {
  FileCode,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  GitPullRequest,
  CheckSquare,
} from 'lucide-react';

export default function DevLogPage() {
  const promptLadders = [
    {
      title: 'Prompt 1: Low-Latency Streaming Pipeline & Sticky Auto-Scroll',
      prompt: `Act as a Senior React Engineer specializing in low-latency AI interfaces.
Scaffold a streaming AI chat interface in Next.js 15 App Router with:
1. Message state containing role ('user' | 'bot'), timestamp, intent badge, and streaming content.
2. Token streaming simulation with configurable TTFT latency (120ms streaming vs 1,800ms blocking).
3. Sticky auto-scroll behavior pinning during active generation without jarring snap-backs.
4. Clean dark-mode glassmorphic styling with clear visual hierarchy for user and bot message bubbles.`,
      result: 'Implemented in /chat with Server-Sent Event simulation and sticky scroll.',
    },
    {
      title: 'Prompt 2: Emergency Crisis Triage Modal (Hick\'s Law Design)',
      prompt: `Design an accessible Emergency Crisis Support Modal & Screen.
Requirements:
1. Apply Hick's Law: Consolidate choices down to 3 immediate triage actions (Call 988 Lifeline, Text Crisis Line 741741, Reach Personal Contact).
2. Desktop tel: Fallback: Replace dead tel: links with a single-click clipboard copy button and toast confirmation.
3. Progressive Disclosure: Place secondary and international hotlines behind an expandable disclosure dropdown.
4. WCAG 2.1 AA Accessibility: Accessible dialog overlay with role="dialog", aria-modal="true", and Escape key dismissal.`,
      result: 'Implemented in /crisis with 988 clipboard copy fallback and expandable directory.',
    },
    {
      title: 'Prompt 3: Production-Ready Settings Form with Test Gate',
      prompt: `Build an accessible Settings & Model Configuration Drawer in Next.js with:
1. Real-time validation executed onBlur and onSubmit using strict RFC email regex and Anthropic API key prefix regex.
2. Input sanitization (.trim()) on all strings prior to validation.
3. API key masked by default (type="password") with an interactive type="button" show/hide toggle.
4. WCAG 2.1 AA accessibility: explicit htmlFor labels, aria-invalid, aria-describedby error alerts, and focus management.`,
      result: 'Implemented in /settings with RFC email validation and password visibility toggle.',
    },
  ];

  const humanCorrections = [
    {
      issue: '1. The Accidental Form Submit Bug (Button Type Omission)',
      aiFlaw: 'The AI generated the password show/hide toggle without setting type="button". Because HTML buttons default to type="submit", clicking the visibility toggle prematurely submitted the form and fired false validation errors.',
      fix: '<button type="button" onClick={() => setShowApiKey(!showApiKey)}>',
    },
    {
      issue: '2. Whitespace-Only Validation Bypass',
      aiFlaw: 'The initial validation logic evaluated `value.length >= 2`. Entering strings of pure spaces (e.g. "   ") bypassed validation and entered invalid state into state.',
      fix: 'const trimmed = typeof value === "string" ? value.trim() : value;\nif (!trimmed || trimmed.length < 2)',
    },
    {
      issue: '3. Desktop tel: Link Breakdown',
      aiFlaw: 'The AI provided standard href="tel:988" links. On desktop browsers without telephony applications, clicking the link resulted in a dead click.',
      fix: 'Implemented a secondary desktop fallback button with navigator.clipboard.writeText("988") and visual toast confirmation.',
    },
  ];

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            AI Engineering Dev Log & Prompt Ladder
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Complete audit trail of structured prompt engineering, human verification gates, and code refactoring diffs.
        </p>
      </div>

      {/* Prompts Section */}
      <section className="space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <span>Structured Prompt Engineering Ladder</span>
        </h2>

        <div className="space-y-6">
          {promptLadders.map((ladder, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-200">{ladder.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Prompt #{idx + 1}
                </span>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {ladder.prompt}
              </pre>

              <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{ladder.result}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Human Corrections Section */}
      <section className="space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2">
          <GitPullRequest className="w-5 h-5 text-amber-400" />
          <span>Human-in-the-Loop Review & Refactoring Diffs</span>
        </h2>

        <div className="space-y-4">
          {humanCorrections.map((corr, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-amber-500/20 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-amber-300">{corr.issue}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-rose-400">AI Flaw:</strong> {corr.aiFlaw}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Human Correction Diff:</div>
                <code className="text-xs font-mono text-emerald-300 whitespace-pre-wrap">{corr.fix}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          <span>Foundations Phase Verification Checklist</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Root layout & responsive navigation</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Server components by default</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Health check page with fetched data</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tested at 375px & 1280px viewports</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tailwind design tokens & glassmorphism</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero secrets in repo (.gitignore + .env.example)</span>
          </div>
        </div>
      </section>

    </main>
  );
}
