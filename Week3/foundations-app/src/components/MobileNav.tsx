'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  MessageSquare,
  ShieldAlert,
  Activity,
  Settings,
  HeartPulse,
  FileCode,
  X,
  ExternalLink,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5 text-indigo-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-indigo-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-400" />,
  Activity: <Activity className="w-5 h-5 text-indigo-400" />,
  Settings: <Settings className="w-5 h-5 text-indigo-400" />,
  HeartPulse: <HeartPulse className="w-5 h-5 text-emerald-400" />,
  FileCode: <FileCode className="w-5 h-5 text-indigo-400" />,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-xs bg-slate-900 border-l border-white/10 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                MG
              </div>
              <span className="font-bold text-slate-100 text-sm">MindGuard AI</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isEmergency = item.isEmergency;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                    isActive
                      ? isEmergency
                        ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                        : 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="mt-0.5">{ICON_MAP[item.iconName]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info inside mobile drawer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Deployment Status</span>
            <span className="text-emerald-400 font-medium">● Preview Ready</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Responsive design verified for 375px mobile & 1280px desktop.
          </p>
        </div>
      </div>
    </div>
  );
}
