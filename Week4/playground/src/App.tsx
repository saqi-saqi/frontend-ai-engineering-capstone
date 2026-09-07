import React, { useState, useRef } from 'react';
import { Modal } from './components/Modal';
import { Tabs, TabItem } from './components/Tabs';
import { Disclosure } from './components/Disclosure';
import { A11yInspector } from './components/A11yInspector';
import { KeyboardGuide } from './components/KeyboardGuide';
import { ShadcnComparison } from './components/Comparison/ShadcnComparison';
import {
  ShieldAlert,
  Sliders,
  Layers,
  Sparkles,
  Eye,
  CheckCircle2,
  Lock,
  MessageSquare,
  Activity,
  HeartHandshake,
} from 'lucide-react';
import './styles/index.css';

export default function App() {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'dialog' | 'alertdialog'>('dialog');
  const [modalInitialFocus, setModalInitialFocus] = useState<boolean>(false);
  const customFocusInputRef = useRef<HTMLInputElement>(null);

  // Tabs sample data
  const sampleTabs: TabItem[] = [
    {
      id: 'tab-streaming',
      label: '⚡ Token Streaming',
      content: (
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-indigo-300">Server-Sent Events & TTFT Tracker</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real-time SSE token streaming simulation with Time to First Token tracking (120ms benchmark vs 1,800ms blocking). Notice how arrow keys (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">←</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">→</kbd>) rove tab focus, and <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">Home</kbd>/<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">End</kbd> jump to the bounds.
          </p>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Focusable Action Inside Tab 1
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'tab-triage',
      label: '🛡️ Crisis Triage',
      content: (
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-rose-300">Hick&apos;s Law 3-Action Emergency Intervention</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Direct 988 call action + 1-click clipboard copy fallback for desktop browsers, Crisis Text Line 741741, and trusted contacts.
          </p>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              Focusable Action Inside Tab 2
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'tab-telemetry',
      label: '📊 Telemetry',
      content: (
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-emerald-300">Live NLP Intent Stream & Latency Inspector</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Live panel displaying TTFT latency, token generation throughput (38.4 t/s), NLP intent classification confidence (0.99), and audit stream.
          </p>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Focusable Action Inside Tab 3
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Week 4 · Foundations: Accessible Components by Hand</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          W3C ARIA Authoring Practices Playground
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Three interactive components built from scratch in React + TypeScript (no libraries): Modal Dialog, Tabs (Roving Tabindex), and Disclosure. Fully operable by keyboard with focus trapping, restoration, and zero <code className="text-indigo-300 bg-slate-900 px-1 py-0.5 rounded">any</code> escapes.
        </p>
      </header>

      {/* Live A11y DOM & Keyboard Inspector */}
      <A11yInspector />

      {/* Keyboard Testing Guide */}
      <KeyboardGuide />

      {/* Main Interactive Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Component 1: Modal Dialog */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Lock className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                Pattern: Dialog (Modal)
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-100">1. Accessible Modal Dialog</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traps <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Tab</kbd> / <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Shift+Tab</kbd> within dialog boundaries, closes on <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Escape</kbd>, and restores focus to this exact trigger button upon dismissal.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
            >
              Open Accessible Modal Dialog
            </button>
          </div>
        </section>

        {/* Component 2: Tabs */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Layers className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
              Pattern: Tabs (Roving TabIndex)
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-100">2. Accessible Tabs with Roving TabIndex</h2>
            <p className="text-xs text-slate-400 mt-1">
              Navigate tabs using keyboard arrows (<kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">←</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">→</kbd>), <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Home</kbd>, and <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">End</kbd>.
            </p>
          </div>

          <Tabs tabs={sampleTabs} ariaLabel="MindGuard Feature Sections" />
        </section>

      </div>

      {/* Component 3: Disclosures */}
      <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
            <Sliders className="w-5 h-5" />
          </span>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            Pattern: Disclosure (Show / Hide)
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-100">3. Accessible Disclosures</h2>
          <p className="text-xs text-slate-400 mt-1">
            Toggle with <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Enter</kbd> or <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Space</kbd>. Content is semantically hidden from assistive tools when collapsed.
          </p>
        </div>

        <div className="space-y-3">
          <Disclosure
            title="How does Hick's Law apply to acute crisis triage interfaces?"
            badge="Cognitive Psychology"
            icon={<ShieldAlert className="w-4 h-4" />}
            defaultOpen={true}
          >
            <p>
              Hick&apos;s Law states that the time it takes to make a decision increases logarithmically with the number and complexity of choices: <code className="text-indigo-300">RT = b · log2(n + 1)</code>. In mental health crises, acute stress drastically degrades executive cognitive function. MindGuard restricts emergency actions to 3 clear, unmissable choices: (1) Direct 988 Lifeline call/copy, (2) Crisis Text Line 741741, and (3) Trusted contact connection.
            </p>
          </Disclosure>

          <Disclosure
            title="Why is roving tabindex superior to standard tab navigation for tablists?"
            badge="W3C ARIA APG"
            icon={<Layers className="w-4 h-4" />}
          >
            <p>
              According to the W3C ARIA Authoring Practices Guide, a tablist should represent a single tab stop in the natural page tab order. Users navigate into the tablist once with <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Tab</kbd>, explore individual tabs using <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Arrow</kbd> keys, and exit with a single <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Tab</kbd> press directly into the active tabpanel.
            </p>
          </Disclosure>

          <Disclosure
            title="What WCAG 2.1 AA criteria are enforced in these three components?"
            badge="WCAG 2.1 AA"
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li><strong>2.1.1 Keyboard:</strong> All functionality operable via keyboard interface with no specific timing required.</li>
              <li><strong>2.1.2 No Keyboard Trap:</strong> Focus can move away using standard keyboard keys (Escape, Tab wrap).</li>
              <li><strong>2.4.3 Focus Order:</strong> Components maintain logical reading and focus order.</li>
              <li><strong>2.4.7 Focus Visible:</strong> High-contrast focus rings (2px solid #818cf8) clearly identify focused elements.</li>
              <li><strong>4.1.2 Name, Role, Value:</strong> Correct ARIA attributes (role, aria-expanded, aria-selected, aria-modal, aria-controls).</li>
            </ul>
          </Disclosure>
        </div>
      </section>

      {/* Side-by-Side Deep Dive: Hand-Rolled vs shadcn/ui */}
      <ShadcnComparison />

      {/* Interactive Modal Dialog Instance */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="W3C Accessible Dialog (Modal)"
        description="This modal implements focus trapping, Escape dismissal, and focus restoration."
        role={modalRole}
        initialFocusRef={modalInitialFocus ? customFocusInputRef : undefined}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Try navigating using only your keyboard. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Tab</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Shift+Tab</kbd> — focus will cycle smoothly through the form fields and buttons below without ever escaping to the background page.
          </p>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div>
              <label htmlFor="test-name" className="block text-xs font-semibold text-slate-300 mb-1">
                Your Name
              </label>
              <input
                id="test-name"
                ref={customFocusInputRef}
                type="text"
                placeholder="Saqib Tariq"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="test-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                A11y Test Notes
              </label>
              <textarea
                id="test-notes"
                rows={2}
                placeholder="Type anything here..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Cancel (Esc)
            </button>
            <button
              type="button"
              onClick={() => {
                alert('Action confirmed! Focus will now restore to the trigger button.');
                setIsModalOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Confirm & Restore Focus
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
