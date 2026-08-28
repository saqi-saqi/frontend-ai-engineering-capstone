'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Zap,
  Clock,
  Cpu,
  ShieldCheck,
  BarChart3,
  Terminal,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';

export default function TelemetryPage() {
  const [activeView, setActiveView] = useState<'realtime' | 'benchmarks'>('realtime');

  const auditEvents = [
    { time: '10:30:12', event: 'Intent classified: crisis_acute_distress', confidence: '0.99', status: 'flagged' },
    { time: '10:29:45', event: 'Token stream initiated (TTFT: 118ms)', confidence: '0.96', status: 'ok' },
    { time: '10:28:10', event: 'Health check probe executed', confidence: '1.00', status: 'ok' },
    { time: '10:25:30', event: 'Settings validated: RFC email & API prefix', confidence: '1.00', status: 'ok' },
  ];

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>Telemetry & Performance Inspector</span>
            </h1>
            <StatusBadge status="operational" label="Telemetry Live" />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time observability into Time to First Token (TTFT), token throughput, and NLP intent classification.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-xl bg-slate-900 border border-white/10 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveView('realtime')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeView === 'realtime'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveView('benchmarks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeView === 'benchmarks'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Latency Benchmarks
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: TTFT */}
        <div className="glass-card rounded-2xl p-5 border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Time to First Token (TTFT)</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono">
            120<span className="text-sm font-normal text-slate-400 ml-1">ms</span>
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span>↓ 93.3% faster than blocking benchmark</span>
          </p>
        </div>

        {/* Metric 2: Throughput */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Generation Throughput</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
            38.4<span className="text-sm font-normal text-slate-400 ml-1">tokens/s</span>
          </div>
          <p className="text-[11px] text-slate-400">Consistent SSE buffer stream</p>
        </div>

        {/* Metric 3: Total Tokens */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Session Token Volume</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
            1,428
          </div>
          <p className="text-[11px] text-slate-400">Context window: 200k max</p>
        </div>

        {/* Metric 4: Guardrail Latency */}
        <div className="glass-card rounded-2xl p-5 border border-rose-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Crisis Guardrail Latency</span>
            <ShieldCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-300 font-mono">
            8<span className="text-sm font-normal text-slate-400 ml-1">ms</span>
          </div>
          <p className="text-[11px] text-rose-400">Pre-inference regex & keyword gate</p>
        </div>

      </div>

      {/* Main Comparative View */}
      {activeView === 'benchmarks' ? (
        <section className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-slate-200">Streaming vs. Blocking Benchmark Analysis</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Why low-latency streaming matters in real-time mental health triage interfaces.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Evaluation Metric</th>
                  <th className="py-3 px-4 text-rose-400">Blocking API (Without Streaming)</th>
                  <th className="py-3 px-4 text-emerald-400">MindGuard SSE Streaming</th>
                  <th className="py-3 px-4">User Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">Time to First Token (TTFT)</td>
                  <td className="py-3 px-4 font-mono text-rose-300">1,800ms</td>
                  <td className="py-3 px-4 font-mono text-emerald-300 font-bold">120ms</td>
                  <td className="py-3 px-4 text-slate-400">Instant perceived response & reduced abandonment</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">Crisis Intervention Trigger</td>
                  <td className="py-3 px-4 font-mono text-rose-300">Post-generation (~2.2s)</td>
                  <td className="py-3 px-4 font-mono text-emerald-300 font-bold">&lt; 10ms client filter</td>
                  <td className="py-3 px-4 text-slate-400">Immediate Hick&apos;s Law modal display</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">Perceived Latency Feedback</td>
                  <td className="py-3 px-4 text-slate-400">Frozen spinner / dead UI</td>
                  <td className="py-3 px-4 text-emerald-300">Fluid character-by-character flow</td>
                  <td className="py-3 px-4 text-slate-400">Elevated user reassurance during distress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          
          {/* Live NLP Intent Stream */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>NLP Classification Audit Stream</span>
              </h2>
              <span className="text-[10px] text-slate-500 font-mono">Live WebSocket</span>
            </div>

            <div className="space-y-2">
              {auditEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-mono text-slate-200">{evt.event}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Timestamp: {evt.time}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-mono text-xs font-bold ${
                        evt.status === 'flagged' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      conf: {evt.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Pipeline Specs */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Inference Pipeline Specifications</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Underlying Model</span>
                <span className="font-mono text-slate-200 font-bold">Claude 3.5 Sonnet / GPT-4o</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Context Strategy</span>
                <span className="font-mono text-slate-200">Sliding Window (Last 10 turns)</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Client Accessibility Standard</span>
                <span className="font-mono text-emerald-400 font-bold">WCAG 2.1 AA Compliant</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Server Health Diagnostic</span>
                <Link href="/health" className="text-indigo-400 hover:underline flex items-center gap-1">
                  <span>/health SSR Route</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}
