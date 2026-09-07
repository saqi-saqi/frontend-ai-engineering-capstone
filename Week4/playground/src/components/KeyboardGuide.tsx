import React from 'react';

export const KeyboardGuide: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3 text-xs">
      <h3 className="font-bold text-slate-100 flex items-center gap-2">
        <span>⌨️</span> W3C ARIA APG Keyboard Testing Cheat Sheet
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
          <div className="font-bold text-indigo-400">Modal Dialog</div>
          <p className="text-[11px] text-slate-400">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Tab</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Shift+Tab</kbd> cycles inside dialog. <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Esc</kbd> closes & restores focus.
          </p>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
          <div className="font-bold text-emerald-400">Tabs Pattern</div>
          <p className="text-[11px] text-slate-400">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">←</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">→</kbd> roves tab focus. <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Home</kbd>/<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">End</kbd> jumps to first/last tab.
          </p>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
          <div className="font-bold text-amber-400">Disclosure Pattern</div>
          <p className="text-[11px] text-slate-400">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Space</kbd> toggles open/collapse state. Content hidden from Tab when closed.
          </p>
        </div>
      </div>
    </div>
  );
};
