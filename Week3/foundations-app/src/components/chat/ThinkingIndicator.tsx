import React from 'react';
import { Sparkles } from 'lucide-react';

interface ThinkingIndicatorProps {
  isVisible: boolean;
  statusText?: string;
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  isVisible,
  statusText = 'MindGuard is thinking...',
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 w-fit animate-fade-in shadow-sm transition-all duration-200"
      data-testid="thinking-indicator"
    >
      <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="font-medium text-slate-300">{statusText}</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
