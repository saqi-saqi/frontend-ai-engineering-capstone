import React from 'react';
import Link from 'next/link';
import { ShieldCheck, GitBranch, ExternalLink, Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/60 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand & Mission Statement */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold text-sm text-slate-200">MindGuard AI Companion</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                v1.0.0-alpha
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Front-End AI Engineering Capstone · Phase: Foundations. Designed with Hick&apos;s Law crisis safety, real-time token streaming, and WCAG AA accessibility.
            </p>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
            <Link href="/chat" className="hover:text-indigo-400 transition-colors">
              Chat Interface
            </Link>
            <Link href="/crisis" className="hover:text-rose-400 transition-colors">
              Crisis Triage
            </Link>
            <Link href="/telemetry" className="hover:text-indigo-400 transition-colors">
              Telemetry
            </Link>
            <Link href="/settings" className="hover:text-indigo-400 transition-colors">
              Settings
            </Link>
            <Link href="/health" className="hover:text-emerald-400 transition-colors">
              Health Check
            </Link>
            <Link href="/devlog" className="hover:text-indigo-400 transition-colors">
              Dev Log
            </Link>
          </div>

          {/* Verification & Deployment Notice */}
          <div className="flex flex-col items-center md:items-end text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Activity className="w-3.5 h-3.5" />
              <span>Preview Deployment Active</span>
            </div>
            <p className="text-slate-500">Node.js LTS · Next.js 15 App Router · Tailwind CSS</p>
            <p className="text-[11px] text-slate-600">Built for 375px mobile & 1280px desktop</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
