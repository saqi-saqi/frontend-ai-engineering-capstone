'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  MessageSquare,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ShieldAlert,
  ArrowLeft,
  Globe,
  HeartHandshake,
  AlertOctagon,
} from 'lucide-react';
import { CRISIS_HOTLINES } from '@/lib/constants';

export default function CrisisPage() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [showInternational, setShowInternational] = useState(false);

  const handleCopy = (number: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(null), 3000);
    }
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Chat Interface</span>
        </Link>
      </div>

      {/* Emergency Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950/70 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-glow-crisis backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex-shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Immediate Support Available</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Emergency Crisis Support & Triage
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              If you or someone you know is in acute distress or experiencing suicidal thoughts, compassionate human counselors are waiting to speak with you right now. All resources are 100% free, anonymous, and confidential.
            </p>
          </div>
        </div>
      </section>

      {/* Copy Toast Alert */}
      {copiedNumber && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Copied hotline number &ldquo;{copiedNumber}&rdquo; to your clipboard!</span>
          </div>
          <span className="text-[11px] text-emerald-400/80">Ready to paste into dialer</span>
        </div>
      )}

      {/* Hick's Law: 3 Immediate Primary Actions */}
      <section className="space-y-4">
        <div className="border-b border-white/10 pb-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-rose-400" />
            <span>3 Immediate Triage Actions (Hick&apos;s Law)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Designed for zero cognitive overhead during emotional crisis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Action 1: Call 988 Lifeline */}
          <div className="glass-card rounded-2xl p-6 border border-rose-500/30 flex flex-col justify-between space-y-4 bg-gradient-to-b from-rose-950/30 to-slate-900/60">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">1. Call 988 Lifeline</h3>
                <p className="text-xs text-slate-400 mt-1">
                  24/7 Suicide & Crisis Lifeline in US & Canada. Free and confidential.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <a
                href="tel:988"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-glow-crisis transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 988 Now</span>
              </a>

              {/* Desktop Clipboard Fallback */}
              <button
                type="button"
                onClick={() => handleCopy('988')}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy &ldquo;988&rdquo; to Clipboard</span>
              </button>
            </div>
          </div>

          {/* Action 2: Text Crisis Line */}
          <div className="glass-card rounded-2xl p-6 border border-indigo-500/30 flex flex-col justify-between space-y-4 bg-gradient-to-b from-indigo-950/30 to-slate-900/60">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">2. Text Crisis Line</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Text <strong>HOME</strong> to <strong>741741</strong> to connect with a crisis counselor 24/7.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <a
                href="sms:741741?&body=HOME"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-glow-primary transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Text 741741</span>
              </a>

              {/* Desktop Clipboard Fallback */}
              <button
                type="button"
                onClick={() => handleCopy('741741')}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy &ldquo;741741&rdquo; to Clipboard</span>
              </button>
            </div>
          </div>

          {/* Action 3: Personal Support Contact */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between space-y-4 bg-gradient-to-b from-emerald-950/30 to-slate-900/60">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">3. Reach Trusted Contact</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect immediately with a trusted friend, family member, therapist, or campus advisor.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <Link
                href="/settings"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>View Emergency Contacts</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Progressive Disclosure: Expandable International Helplines */}
      <section className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <button
          type="button"
          onClick={() => setShowInternational(!showInternational)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                International & Specialized Hotlines (Progressive Disclosure)
              </h3>
              <p className="text-xs text-slate-400">
                Crisis lines for UK, Canada, Pakistan, LGBTQ+ youth, and international regions.
              </p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
            {showInternational ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showInternational && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-fade-in">
            {CRISIS_HOTLINES.map((hotline, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-200">{hotline.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {hotline.country}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{hotline.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-indigo-300">{hotline.number}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(hotline.number)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                    title="Copy number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
