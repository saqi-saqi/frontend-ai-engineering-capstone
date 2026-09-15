'use client';

import React from 'react';
import { AlertCircle, RotateCcw, ShieldCheck, Terminal } from 'lucide-react';

interface ToolErrorCardProps {
  toolName: string;
  errorCode?: string;
  errorMessage?: string;
  onRetry?: () => void;
}

export const ToolErrorCard: React.FC<ToolErrorCardProps> = ({
  toolName,
  errorCode = 'ERR_CLINICAL_GATEWAY_TIMEOUT',
  errorMessage = 'The automated clinical evaluation service failed to return structured data in the expected window.',
  onRetry,
}) => {
  return (
    <div className="w-full max-w-xl rounded-2xl bg-slate-900/90 border border-rose-500/30 p-4 my-3 text-slate-100 shadow-[0_0_20px_-5px_rgba(244,63,94,0.15)] transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Tool Execution Interrupted
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
              <Terminal className="w-2.5 h-2.5" />
              {errorCode}
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-2 leading-relaxed">
            {errorMessage}
          </p>

          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5 mb-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Conversational safety active
            </span>
            <span>Fallback to standard empathetic chat</span>
          </div>

          <div className="flex items-center gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-md"
              >
                <RotateCcw className="w-3 h-3" />
                Retry {toolName}()
              </button>
            )}
            <span className="text-[11px] text-slate-400">
              No chat context was lost.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
