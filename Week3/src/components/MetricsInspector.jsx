import React from 'react';
import { Activity, Zap, Shield, Cpu, Gauge, Terminal } from 'lucide-react';

export default function MetricsInspector({ metrics, lastAnalysis }) {
  return (
    <aside className="sidebar-panel">
      <div className="panel-title">
        <Activity size={18} color="var(--accent-cyan)" />
        <span>Telemetry & Safety Metrics</span>
      </div>

      {/* Latency Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        
        {/* TTFT Card */}
        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600 }}>
            <Zap size={13} color="var(--accent-amber)" /> TTFT Latency
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: metrics.ttft < 250 ? 'var(--accent-emerald)' : 'var(--accent-rose)', marginTop: '4px' }}>
            {metrics.ttft} ms
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            {metrics.ttft < 250 ? '⚡ Zero-friction stream' : '⏳ Blocking response'}
          </div>
        </div>

        {/* Speed Card */}
        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600 }}>
            <Gauge size={13} color="var(--accent-cyan)" /> Gen Speed
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
            {metrics.tokensPerSec} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-secondary)' }}>t/s</span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            {metrics.totalTokens} tokens emitted
          </div>
        </div>

      </div>

      {/* Real-Time Safety & Intent Classification Inspector */}
      <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', marginBottom: '16px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Shield size={14} color="var(--accent-primary)" /> NLP Safety Triage State
        </div>

        {lastAnalysis ? (
          <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Classified Intent:</span>
              <span className={`badge ${lastAnalysis.intent_category === 'ACUTE_CRISIS' ? 'badge-crisis' : lastAnalysis.intent_category === 'SUB_ACUTE_DISTRESS' ? 'badge-subacute' : 'badge-casual'}`}>
                {lastAnalysis.intent_category}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Confidence Score:</span>
              <span style={{ fontWeight: 600, color: '#fff' }}>{(lastAnalysis.confidence_score * 100).toFixed(0)}%</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Negation Filter:</span>
              <span style={{ color: lastAnalysis.negation_detected ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                {lastAnalysis.negation_detected ? 'Negation Detected (Verified)' : 'None'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Crisis Modal Action:</span>
              <span style={{ color: lastAnalysis.crisis_flag ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontWeight: 600 }}>
                {lastAnalysis.crisis_flag ? 'TRIGGERED (Level 1)' : 'Bypassed (Safe)'}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Awaiting prompt input to analyze intent and safety triggers...
          </div>
        )}
      </div>

      {/* Live JSON Audit Log */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <Terminal size={13} /> Pipeline Audit Stream
        </div>
        <div style={{ flex: 1, background: '#060911', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#38bdf8', overflowY: 'auto', maxHeight: '180px' }}>
          <div>[INFO] SSE stream initialized via App Router</div>
          <div>[MODEL] Active backend: claude-3-5-sonnet</div>
          {lastAnalysis && (
            <>
              <div>[TRIAGE] Step 1: Scan intent -> {lastAnalysis.intent_category}</div>
              <div>[TRIAGE] Step 2: Negation check -> {lastAnalysis.negation_detected ? 'TRUE' : 'FALSE'}</div>
              <div>[AUDIT] TTFT: {metrics.ttft}ms | Tokens: {metrics.totalTokens}</div>
            </>
          )}
        </div>
      </div>

    </aside>
  );
}
