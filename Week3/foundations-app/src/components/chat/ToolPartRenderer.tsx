'use client';

import React from 'react';
import { ToolPart } from '@/lib/tools/types';
import { TriageScoreCard } from './TriageScoreCard';
import { ToolErrorCard } from './ToolErrorCard';
import { ConfirmationActionCard } from './ConfirmationActionCard';
import { Terminal, Cpu, Loader2 } from 'lucide-react';
import { TOOL_NAMES, executeEmergencyEscalation } from '@/lib/tools/triage-tool';

interface ToolPartRendererProps {
  toolPart: ToolPart;
  onRetry?: (toolCallId: string) => void;
  onActionTrigger?: (actionCode: string) => void;
}

export const ToolPartRenderer: React.FC<ToolPartRendererProps> = ({
  toolPart,
  onRetry,
  onActionTrigger,
}) => {
  const { toolName, state, args, rawInput, result, error, errorCode, toolCallId } = toolPart;

  // State 1: Input Streaming (Cyan glowing telemetry card with live argument stream)
  if (state === 'input-streaming') {
    return (
      <div className="w-full max-w-xl my-2 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)] animate-pulse transition-all duration-200">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Terminal className="w-3.5 h-3.5 animate-spin" />
          <span>Agent Calling Tool: {toolName}()</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-auto"></span>
        </div>
        <div className="bg-slate-950/80 rounded-lg p-2 font-mono text-[11px] text-cyan-200/90 overflow-x-auto border border-cyan-500/20">
          <code>{rawInput || JSON.stringify(args) || 'Streaming tool arguments...'}</code>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
          <span>Synthesizing clinical input parameters</span>
          <span className="italic">State: input-streaming</span>
        </div>
      </div>
    );
  }

  // State 2: Input Available (Indigo execution card with spinner)
  if (state === 'input-available') {
    return (
      <div className="w-full max-w-xl my-2 p-3.5 rounded-xl bg-slate-900/95 border border-indigo-500/40 shadow-[0_0_15px_-3px_rgba(99,102,241,0.25)] transition-all duration-200">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Server Tool Executing: {toolName}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-indigo-300 font-medium">
            <Loader2 className="w-3 h-3 animate-spin" /> Running server logic...
          </span>
        </div>

        <div className="bg-slate-950/90 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
            Validated Tool Payload:
          </div>
          <div className="text-indigo-200">
            • Query: <span className="text-slate-300">"{args?.patientQuery || args?.sessionContext || 'Live transcript evaluation'}"</span>
          </div>
          {args?.severityLevel && (
            <div className="text-indigo-200">
              • Initial Severity: <span className="text-amber-300 font-semibold">{args.severityLevel}</span>
            </div>
          )}
          {args?.symptoms && args.symptoms.length > 0 && (
            <div className="text-indigo-200">
              • Tracked Symptoms: <span className="text-slate-300">{args.symptoms.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Computing multi-dimensional clinical telemetry</span>
          <span className="italic">State: input-available</span>
        </div>
      </div>
    );
  }

  // State 4: Output Error (Designed error card with retry button)
  if (state === 'output-error') {
    return (
      <ToolErrorCard
        toolName={toolName}
        errorCode={errorCode || 'ERR_TOOL_EXECUTION_FAILED'}
        errorMessage={error || 'An unexpected error occurred during tool execution.'}
        onRetry={onRetry ? () => onRetry(toolCallId) : undefined}
      />
    );
  }

  // State 3: Output Available (Rendered as real component with 200ms crossfade)
  if (state === 'output-available') {
    if (toolName === TOOL_NAMES.ASSESS_CRISIS_RISK && result) {
      return (
        <div className="transition-opacity duration-200 ease-in opacity-100">
          <TriageScoreCard result={result} onActionTrigger={onActionTrigger} />
        </div>
      );
    }

    if (toolName === TOOL_NAMES.CONFIRM_EMERGENCY_ESCALATION) {
      return (
        <div className="transition-opacity duration-200 ease-in opacity-100">
          <ConfirmationActionCard
            input={args}
            onConfirm={async () => executeEmergencyEscalation(args)}
            onDismiss={() => {}}
          />
        </div>
      );
    }

    return (
      <div className="w-full max-w-xl my-2 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs">
        <span className="font-bold text-slate-100 block mb-1">Result: {toolName}</span>
        <pre className="font-mono text-[11px] overflow-x-auto text-slate-400">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    );
  }

  return null;
};
