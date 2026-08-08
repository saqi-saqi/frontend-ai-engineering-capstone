import React, { useState } from 'react';
import { Bot, Play, CheckCircle2, MessageSquare, Copy, Settings, Flame } from 'lucide-react';

export default function ClaudeProjectSimulator() {
  const [customInstructions, setCustomInstructions] = useState(`You are an expert AI Product Tutor and UX Strategist acting as my personal advisor for my 8-week portfolio build.

MY PROOF STATEMENT:
"I design and build production-ready AI user interfaces that double user task completion rates and eliminate cognitive friction."

MY ONE ACTION:
"Drive the visitor to book a 15-minute UX Audit & Discovery Call."

YOUR TUTORING RULES:
1. Pressure-test every design decision, copy block, and sitemap page against my Proof Statement and One Action.
2. Be brutally direct. If a page or component does not directly build belief in the claim or drive the one action, challenge me to eliminate or simplify it.
3. Provide actionable suggestions, micro-copy tweaks, and UX patterns tailored for AI SaaS founders.
4. Keep track of our progress across the 8 weeks, ensuring we never deviate from our core claim.`);

  const [promptText, setPromptText] = useState(`Review my 4-section portfolio sitemap (Landing Hero, Work/Case Studies, Short About, Contact). Pressure-test it against my Proof Statement ('I design and build production-ready AI user interfaces that double user completion rates') and my One Action ('Book a 15-minute UX Audit Call'). Identify any friction points, cognitive overload, or weak links where a SaaS founder might drop off.`);

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState({
    executed: true,
    critique: [
      { type: 'strength', text: 'The 4-section architecture avoids corporate noise and gets straight to proof.' },
      { type: 'weakness', text: 'Having a standalone "About" page after "Case Studies" risks killing momentum. A SaaS founder looking for proof wants to see the work and convert immediately.' },
      { type: 'recommendation', text: 'Integrate the "About" context into a sidebar or concise header credential line inside the "Work" section. Convert the bottom of each Case Study into a direct "Book Audit Call" trigger so visitors don\'t have to navigate to a separate Contact page after reading proof.' }
    ]
  });

  const handleRunTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        executed: true,
        critique: [
          { type: 'strength', text: 'Clear focus on 2x task completion rates aligns well with high-growth SaaS founder priorities.' },
          { type: 'weakness', text: 'Multipage contact flows introduce a 30% drop-off risk compared to embedded inline scheduling widgets.' },
          { type: 'recommendation', text: 'Eliminate separate contact page; embed Cal.com widget directly at the footer of the Landing Hero & Case Studies section.' }
        ]
      });
    }, 800);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-title">
            <Bot style={{ color: 'var(--accent-cyan)' }} />
            Claude Project Environment: <code>Portfolio Build 2026</code>
          </div>
          <p className="section-desc">
            Configured with custom instructions containing your proof statement and AI Tutor rules for all 8 weeks.
          </p>
        </div>
        <span className="badge badge-pass"><CheckCircle2 size={14} style={{ marginRight: 4 }} /> Project Active</span>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Custom Instructions Panel */}
        <div style={{ background: '#060911', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Settings size={15} /> Custom Instructions (Saved in Claude)
            </span>
            <button className="btn btn-secondary" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }} onClick={() => navigator.clipboard.writeText(customInstructions)}>
              <Copy size={12} /> Copy
            </button>
          </div>
          <textarea
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            style={{
              width: '100%',
              height: '240px',
              background: 'transparent',
              border: 'none',
              color: '#cbd5e1',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.825rem',
              resize: 'none',
              outline: 'none',
              lineHeight: '1.5'
            }}
          />
        </div>

        {/* Live Pressure Test Runner */}
        <div style={{ background: '#060911', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={15} /> First Pressure-Test Prompt
          </span>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            style={{
              width: '100%',
              height: '140px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              color: '#f1f5f9',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              resize: 'none'
            }}
          />
          <button className="btn" onClick={handleRunTest} disabled={isTesting} style={{ alignSelf: 'flex-end' }}>
            {isTesting ? 'Pressure-Testing...' : <><Play size={15} /> Run Pressure-Test Prompt</>}
          </button>
        </div>
      </div>

      {/* AI Tutor Output Panel */}
      {testResult.executed && (
        <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-sm)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Flame size={18} style={{ color: 'var(--accent-rose)' }} />
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Claude AI Tutor Critique & Feedback</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {testResult.critique.map((item, index) => (
              <div key={index} style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius-sm)',
                borderLeft: item.type === 'strength' ? '4px solid var(--accent-emerald)' : item.type === 'weakness' ? '4px solid var(--accent-rose)' : '4px solid var(--accent-cyan)'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: item.type === 'strength' ? 'var(--accent-emerald)' : item.type === 'weakness' ? 'var(--accent-rose)' : 'var(--accent-cyan)',
                  marginRight: '0.5rem'
                }}>
                  {item.type}:
                </span>
                <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
