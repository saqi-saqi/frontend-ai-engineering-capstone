'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  ShieldAlert,
  Activity,
  Settings,
  HeartPulse,
  FileCode,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  MessageSquare: <MessageSquare className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-rose-400" />,
  Activity: <Activity className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4 text-emerald-400" />,
  FileCode: <FileCode className="w-4 h-4" />,
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 flex items-center justify-center font-bold text-white shadow-glow-primary group-hover:scale-105 transition-transform duration-200">
              MG
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-1.5">
                MindGuard AI <Sparkles className="w-3.5 h-3.5 text-indigo-400 inline" />
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Foundations · Week 3 Live Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (>= 1024px) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isEmergency = item.isEmergency;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? isEmergency
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-crisis'
                        : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-glow-primary'
                      : isEmergency
                      ? 'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {ICON_MAP[item.iconName]}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] uppercase font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Status Pill + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/health"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Preview Live</span>
            </Link>

            {/* Mobile Hamburger Toggle button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Responsive down to 375px) */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
      />
    </header>
  );
}
