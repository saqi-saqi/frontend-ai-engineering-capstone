import React from 'react';

interface StatusBadgeProps {
  status: 'healthy' | 'operational' | 'degraded' | 'down' | 'active' | 'emergency';
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const getStyle = () => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'degraded':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'emergency':
      case 'down':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getDotStyle = () => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'active':
        return 'bg-emerald-400 animate-pulse';
      case 'degraded':
        return 'bg-amber-400';
      case 'emergency':
      case 'down':
        return 'bg-rose-400 animate-ping';
      default:
        return 'bg-slate-400';
    }
  };

  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotStyle()}`} />
      {displayLabel}
    </span>
  );
}
