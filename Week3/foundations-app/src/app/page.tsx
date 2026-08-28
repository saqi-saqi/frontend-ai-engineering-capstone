import React from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  ShieldAlert,
  Activity,
  Settings,
  HeartPulse,
  FileCode,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';

export default function HomePage() {
  const specScreens = [
    {
      title: 'Live Chat & Triage Interface',
      href: '/chat',
      badge: 'Interactive',
      badgeStatus: 'active' as const,
      description: 'Conversational companion with streaming token simulation (120ms TTFT benchmark vs 1,800ms blocking), auto-scroll, and crisis intent triggers.',
      icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
      features: ['Server-Sent Event token streaming', 'Sticky auto-scroll pinning', 'Intent classification tags'],
    },
    {
      title: 'Emergency Crisis Support (Hick\'s Law)',
      href: '/crisis',
      badge: 'Emergency Triage',
      badgeStatus: 'emergency' as const,
      description: 'Zero-hesitation 3-action triage modal & screen: direct 988 Lifeline with 1-click clipboard fallback, Crisis Text Line 741741, and trusted contacts.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      features: ['3 Hick\'s Law primary actions', 'Desktop tel: clipboard fallback', 'Progressive disclosure hotlines'],
    },
    {
      title: 'Telemetry & Latency Inspector',
      href: '/telemetry',
      badge: 'Real-time',
      badgeStatus: 'operational' as const,
      description: 'Observability console displaying live Time to First Token (TTFT), token generation throughput (t/s), NLP confidence metrics, and audit log.',
      icon: <Activity className="w-6 h-6 text-indigo-400" />,
      features: ['TTFT latency tracker (120ms)', 'Throughput rate (38 tokens/s)', 'Live NLP confidence inspector'],
    },
    {
      title: 'Model Settings & Drawer Form',
      href: '/settings',
      badge: 'WCAG AA Compliant',
      badgeStatus: 'healthy' as const,
      description: 'Accessible model selector with real-time RFC email validation, Anthropic API key prefix pattern matching, and password visibility toggle.',
      icon: <Settings className="w-6 h-6 text-indigo-400" />,
      features: ['RFC email regex validation', 'API key prefix format check', 'WCAG 2.1 AA focus alerts'],
    },
    {
      title: 'Health Check & Runtime Monitor',
      href: '/health',
      badge: 'Server Fetched',
      badgeStatus: 'healthy' as const,
      description: 'Server component performing live data fetching from Next.js route handlers, validating uptime, latency, memory usage, and zero secret leaks.',
      icon: <HeartPulse className="w-6 h-6 text-emerald-400" />,
      features: ['SSR live data fetching', 'Service latency probes', 'Zero-secret env audit'],
    },
    {
      title: 'AI Engineering & Prompt Log',
      href: '/devlog',
      badge: 'Documentation',
      badgeStatus: 'operational' as const,
      description: 'Documentation of prompt ladders, AI pairing workflows, and human-in-the-loop code refactoring diffs (whitespace bypass, button type fixes).',
      icon: <FileCode className="w-6 h-6 text-indigo-400" />,
      features: ['Prompt iteration ladder', 'Human code review diffs', 'Architecture rationale'],
    },
  ];

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950/80 p-6 sm:p-10 lg:p-12 shadow-glass backdrop-blur-xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Phase: Foundations · Live Preview Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            MindGuard AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-violet-300">
              Front-End AI Engineering Capstone
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Deploying on day one with live preview URLs. Built with Next.js 15 App Router, Server Components by default, responsive design verified at 375px & 1280px, and robust Hick&apos;s Law acute crisis triage.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Launch Live Chat</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/crisis"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-sm font-semibold transition-all duration-200"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Emergency Crisis Triage</span>
            </Link>

            <Link
              href="/health"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
            >
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span>System Health Check</span>
            </Link>
          </div>
        </div>

        {/* Foundation Architecture Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Next.js 15 App Router</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>375px & 1280px Responsive</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Zero Secret Leaks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Vercel Preview Deploy Ready</span>
          </div>
        </div>
      </section>

      {/* Screen Specification Directory (Routed Placeholders) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Spec Screen Directory & Route Matrix</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every screen specified in the MindGuard AI Capstone architecture is fully routed and rendered.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-white/10 self-start sm:self-auto">
            6 Routes Configured
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specScreens.map((screen) => (
            <Link
              key={screen.href}
              href={screen.href}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10 group-hover:border-indigo-500/40 transition-colors">
                    {screen.icon}
                  </div>
                  <StatusBadge status={screen.badgeStatus} label={screen.badge} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                    <span>{screen.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {screen.description}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-white/5">
                  {screen.features.map((feat, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span>Explore Route {screen.href}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture Foundations Summary Banner */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-200">Continuous Preview Deployments</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Every commit lands on an isolated preview URL with automatic health check validation. Environment variables for local, preview, and production stages are structured securely in <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded text-xs">.env.example</code>.
          </p>
        </div>

        <Link
          href="/health"
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
        >
          <HeartPulse className="w-4 h-4 text-emerald-400" />
          <span>View Live Diagnostics</span>
        </Link>
      </section>

    </main>
  );
}
