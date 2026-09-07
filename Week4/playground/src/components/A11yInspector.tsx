import React, { useState, useEffect } from 'react';

interface ActiveFocusInfo {
  tagName: string;
  role: string | null;
  id: string | null;
  ariaExpanded: string | null;
  ariaSelected: string | null;
  ariaModal: string | null;
  ariaLabel: string | null;
  tabIndex: number;
}

export const A11yInspector: React.FC = () => {
  const [focusInfo, setFocusInfo] = useState<ActiveFocusInfo | null>(null);
  const [keyEvents, setKeyEvents] = useState<string[]>([]);

  useEffect(() => {
    const handleFocusIn = () => {
      const active = document.activeElement;
      if (!active || active === document.body) {
        setFocusInfo(null);
        return;
      }

      setFocusInfo({
        tagName: active.tagName.toLowerCase(),
        role: active.getAttribute('role'),
        id: active.id || null,
        ariaExpanded: active.getAttribute('aria-expanded'),
        ariaSelected: active.getAttribute('aria-selected'),
        ariaModal: active.getAttribute('aria-modal'),
        ariaLabel: active.getAttribute('aria-label') || active.getAttribute('aria-labelledby'),
        tabIndex: (active as HTMLElement).tabIndex,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyName = e.key === ' ' ? 'Space' : e.key;
      const modifier = e.shiftKey ? 'Shift + ' : '';
      setKeyEvents((prev) => [
        `${modifier}${keyName} [${new Date().toLocaleTimeString()}]`,
        ...prev.slice(0, 4),
      ]);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
            Live A11y Focus & Keyboard Inspector
          </h3>
        </div>
        <span className="text-slate-500 text-[10px]">Real-time DOM Audit</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Focused Element Status */}
        <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <div className="text-slate-400 text-[11px] font-semibold">Active Element in Focus:</div>
          {focusInfo ? (
            <div className="space-y-1 text-slate-200">
              <div className="text-indigo-300">
                &lt;<span className="text-rose-400 font-bold">{focusInfo.tagName}</span>
                {focusInfo.id && <span className="text-amber-300"> id=&quot;{focusInfo.id}&quot;</span>}
                {focusInfo.role && <span className="text-emerald-300"> role=&quot;{focusInfo.role}&quot;</span>}
                &gt;
              </div>
              <div className="text-[10px] text-slate-400 flex flex-wrap gap-2 pt-1">
                <span>tabIndex: <b className="text-slate-200">{focusInfo.tabIndex}</b></span>
                {focusInfo.ariaExpanded !== null && (
                  <span>aria-expanded: <b className="text-indigo-300">{focusInfo.ariaExpanded}</b></span>
                )}
                {focusInfo.ariaSelected !== null && (
                  <span>aria-selected: <b className="text-emerald-300">{focusInfo.ariaSelected}</b></span>
                )}
                {focusInfo.ariaModal !== null && (
                  <span>aria-modal: <b className="text-rose-300">{focusInfo.ariaModal}</b></span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-slate-500 italic">No element currently focused (Press Tab)</div>
          )}
        </div>

        {/* Keyboard History */}
        <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <div className="text-slate-400 text-[11px] font-semibold">Recent Keyboard Events:</div>
          <div className="space-y-1">
            {keyEvents.length > 0 ? (
              keyEvents.map((evt, idx) => (
                <div key={idx} className="text-indigo-300 text-[11px] flex items-center justify-between">
                  <span>⌨️ {evt.split(' [')[0]}</span>
                  <span className="text-slate-500 text-[10px]">[{evt.split(' [')[1]}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-500 italic">Press any key (Tab, Space, Arrows, Esc)...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
