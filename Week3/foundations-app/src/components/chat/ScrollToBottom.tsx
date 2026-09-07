import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollToBottomProps {
  isVisible: boolean;
  onClick: () => void;
  hasUnreadTokens?: boolean;
}

export const ScrollToBottom: React.FC<ScrollToBottomProps> = ({
  isVisible,
  onClick,
  hasUnreadTokens = false,
}) => {
  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-24 right-6 sm:right-12 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-400/40 transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in"
      aria-label="Jump to latest message"
    >
      <ArrowDown className="w-3.5 h-3.5" />
      <span>Jump to latest</span>
      {hasUnreadTokens && (
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
      )}
    </button>
  );
};
