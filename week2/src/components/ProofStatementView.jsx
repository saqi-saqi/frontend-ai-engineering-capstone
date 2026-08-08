import React, { useState } from 'react';
import { Target, CheckCircle2, Copy, HelpCircle, MessageSquareQuote, Zap } from 'lucide-react';

export default function ProofStatementView() {
  const [copied, setCopied] = useState(false);

  const proofStatement = `I design and build production-ready AI user interfaces that double task completion rates in complex LLM software. I work directly with seed-to-series-A SaaS founders who are shipping generative AI products and struggling with user drop-off due to UI complexity and model latency. My goal is to get these founders to book a 15-minute product UX audit call so we can identify and eliminate their single biggest user friction point.`;

  const oneLineWhy = `A CV or LinkedIn list of past titles cannot demonstrate live component responsiveness or prove how I solve AI latency friction, whereas owning this proof portfolio lets a founder test and experience my execution velocity firsthand.`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-title">
            <Target style={{ color: 'var(--accent-cyan)' }} />
            Week 01 Deliverable: What Are You Proving?
          </div>
          <p className="section-desc">
            Your one-paragraph proof statement (Claim + Person + Action) and your one-line why.
          </p>
        </div>
        <span className="badge badge-pass"><CheckCircle2 size={14} style={{ marginRight: 4 }} /> All Criteria Passed</span>
      </div>

      {/* Proof Statement Card */}
      <div style={{ background: '#060911', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The One-Paragraph Proof Statement
          </span>
          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => handleCopy(`${proofStatement}\n\nWhy this needs to exist:\n${oneLineWhy}`)}>
            <Copy size={14} /> {copied ? 'Copied to Clipboard!' : 'Copy Deliverable Text'}
          </button>
        </div>
        <blockquote style={{ fontSize: '1.05rem', color: '#f1f5f9', lineHeight: 1.7, fontStyle: 'italic', borderLeft: '4px solid var(--accent-cyan)', paddingLeft: '1rem', margin: '0.75rem 0' }}>
          "{proofStatement}"
        </blockquote>
      </div>

      {/* One Line Why */}
      <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
          <Zap size={16} /> The One-Line Why (Why owning this fixes what LinkedIn/CV can't)
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
          "{oneLineWhy}"
        </p>
      </div>

      {/* 3 Core Pillars Matrix */}
      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.1rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>1. The One Claim</span>
          <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: '0.4rem 0' }}>AI Interface Design for LLM Workflows</h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Single named primary skill: Designing components that double task completion in complex AI software.
          </p>
        </div>

        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.1rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>2. The One Person</span>
          <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: '0.4rem 0' }}>Seed to Series-A AI SaaS Founders</h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            A specific hiring decision-maker struggling with user drop-off due to AI UI friction and model latency.
          </p>
        </div>

        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.1rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>3. The One Action</span>
          <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: '0.4rem 0' }}>Book a 15-Minute Product UX Audit</h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Single primary action focused on converting visitors into audit calendar bookings.
          </p>
        </div>
      </div>
    </div>
  );
}
