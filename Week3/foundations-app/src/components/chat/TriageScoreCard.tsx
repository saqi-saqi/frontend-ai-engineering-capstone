'use client';

import React from 'react';
import { TriageAssessmentResult } from '@/lib/tools/types';
import { RiskRadarChart } from './RiskRadarChart';
import {
  ShieldAlert,
  Activity,
  HeartPulse,
  Sparkles,
  PhoneCall,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface TriageScoreCardProps {
  result: TriageAssessmentResult;
  onActionTrigger?: (actionCode: string) => void;
}

export const TriageScoreCard: React.FC<TriageScoreCardProps> = ({
  result,
  onActionTrigger,
}) => {
  const { overallScore, riskTier, radarScores, identifiedMarkers, protocol, timestamp, executionDurationMs } = result;

  const tierConfig = {
    critical: {
      badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
      glow: 'shadow-[0_0_25px_-5px_rgba(244,63,94,0.3)]',
      border: 'border-rose-500/40',
      icon: ShieldAlert,
      tag: 'Immediate Crisis Triage',
    },
    elevated: {
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      glow: 'shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]',
      border: 'border-amber-500/40',
      icon: HeartPulse,
      tag: 'Elevated Distress Risk',
    },
    moderate: {
      badgeBg: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
      glow: 'shadow-[0_0_25px_-5px_rgba(234,179,8,0.2)]',
      border: 'border-yellow-500/40',
      icon: Activity,
      tag: 'Moderate Stress Indicators',
    },
    low: {
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      glow: 'shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]',
      border: 'border-emerald-500/40',
      icon: Sparkles,
      tag: 'Sub-Clinical Baseline',
    },
  }[riskTier];

  const TierIcon = tierConfig.icon;

  return (
    <div
      className={`w-full max-w-xl rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border ${tierConfig.border} ${tierConfig.glow} p-5 my-3 text-slate-100 transition-all duration-300 backdrop-blur-md`}
    >
      <div className="flex items-start justify-between border-b border-slate-800/80 pb-4 mb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${tierConfig.badgeBg}`}
            >
              <TierIcon className="w-3.5 h-3.5" />
              {tierConfig.tag}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" /> {timestamp} ({executionDurationMs}ms)
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
            MindGuard Clinical Assessment
          </h4>
        </div>

        <div className="text-right">
          <div className="text-2xl font-extrabold text-slate-100 tracking-tight">
            {overallScore}
            <span className="text-xs font-medium text-slate-400"> / 100</span>
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Composite Severity
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex flex-col items-center justify-center bg-slate-950/60 border border-slate-800/60 rounded-xl p-2">
          <RiskRadarChart scores={radarScores} size={200} />
        </div>

        <div className="flex flex-col justify-between h-full space-y-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Identified Linguistic Markers:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {identifiedMarkers.map((marker, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 text-xs rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
                >
                  #{marker}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-800/60 text-xs text-slate-300">
            <span className="font-semibold text-slate-200 block mb-0.5">Clinical Protocol:</span>
            <p className="text-slate-400 leading-relaxed">{protocol.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium">
          {protocol.emergencyRequired ? '⚠️ Emergency Protocol Required' : 'Guided Autonomous Intervention'}
        </span>

        {protocol.emergencyRequired ? (
          <a
            href={protocol.actionUrl || 'tel:988'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-900/40"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            {protocol.actionLabel}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onActionTrigger && onActionTrigger(protocol.code)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all shadow-md shadow-sky-900/30"
          >
            <span>{protocol.actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
