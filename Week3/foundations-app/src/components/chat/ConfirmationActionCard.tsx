'use client';

import React, { useState } from 'react';
import { PhoneCall, ShieldCheck, Heart, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { EmergencyEscalationInput, EmergencyEscalationResult } from '@/lib/tools/types';

interface ConfirmationActionCardProps {
  input: EmergencyEscalationInput;
  onConfirm: () => Promise<EmergencyEscalationResult>;
  onDismiss: () => void;
}

export const ConfirmationActionCard: React.FC<ConfirmationActionCardProps> = ({
  input,
  onConfirm,
  onDismiss,
}) => {
  const [status, setStatus] = useState<'pending' | 'confirming' | 'confirmed' | 'dismissed'>('pending');
  const [result, setResult] = useState<EmergencyEscalationResult | null>(null);

  const handleConfirm = async () => {
    setStatus('confirming');
    try {
      const res = await onConfirm();
      setResult(res);
      setStatus('confirmed');
    } catch {
      setStatus('pending');
    }
  };

  const handleDismiss = () => {
    setStatus('dismissed');
    onDismiss();
  };

  if (status === 'confirmed' && result) {
    return (
      <div className="w-full max-w-xl rounded-2xl bg-emerald-950/40 border border-emerald-500/40 p-5 my-3 text-slate-100 shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
          <CheckCircle2 className="w-4 h-4" />
          Hotline Escalation Confirmed
        </div>
        <p className="text-xs text-slate-300 mb-3">{result.routingSummary}</p>
        <div className="bg-slate-900/80 rounded-xl p-3 border border-emerald-500/20 mb-3 text-xs space-y-1.5">
          <span className="font-semibold text-emerald-300 block">Immediate Safety Steps:</span>
          {result.safePlanSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {step}
            </div>
          ))}
        </div>
        <a
          href="tel:988"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg"
        >
          <PhoneCall className="w-4 h-4" /> Call 988 Now (Free & Confidential)
        </a>
      </div>
    );
  }

  if (status === 'dismissed') {
    return (
      <div className="w-full max-w-xl rounded-xl bg-slate-900/60 border border-slate-800 p-3 my-2 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          Escalation declined by user. Continuing supportive dialogue.
        </span>
        <span className="text-[10px] text-slate-400">MindGuard Companion Active</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 p-5 my-3 text-slate-100 shadow-[0_0_25px_-5px_rgba(245,158,11,0.2)] transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
            User Action Confirmation Required
          </span>
          <h4 className="text-sm font-bold text-slate-100">
            Connect with a 988 Crisis Counselor?
          </h4>
        </div>
      </div>

      <p className="text-xs text-slate-300 mb-3 leading-relaxed">
        {input.sessionContext ||
          'MindGuard detected heightened acute distress markers. We recommend connecting you directly to a trained, compassionate human crisis counselor.'}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {input.detectedTriggers?.map((trig, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/20"
          >
            Trigger: {trig}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
        <button
          type="button"
          disabled={status === 'confirming'}
          onClick={handleConfirm}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          {status === 'confirming' ? 'Connecting...' : 'Yes, Connect to 988'}
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
        >
          <Heart className="w-3.5 h-3.5 mr-1 text-slate-400" />
          I'm in a safe space right now
        </button>
      </div>
    </div>
  );
};
