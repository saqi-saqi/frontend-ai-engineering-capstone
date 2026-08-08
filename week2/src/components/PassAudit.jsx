import React from 'react';
import { Award, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

export default function PassAudit() {
  const criteria = [
    {
      title: 'Build It Twice Branches',
      requirement: 'Round 1 (vague prompt) and Round 2 (precise prompt with test suite) implemented and compared.',
      status: 'PASS',
      details: 'Round 1 & Round 2 code structure compared; accessible form with schema validation and Vitest tests built.'
    },
    {
      title: 'WORKFLOW.md & Case Study',
      requirement: '300-500 words document with quantitative/qualitative diff table, AI mistakes caught, and review effort.',
      status: 'PASS',
      details: 'WORKFLOW.md written with specific diff highlights, WCAG 2.1 AA accessibility analysis, and timing metrics.'
    },
    {
      title: 'CLAUDE.md Rules Updated',
      requirement: 'Project rules file updated with at least 3 concrete, testable guidelines.',
      status: 'PASS',
      details: 'CLAUDE.md updated with 4 testable rules: WCAG 2.1 AA labels/ARIA, string trimming, Vitest test gate, and error summary focus.'
    }
  ];

  return (
    <div className="card">
      <div className="section-title">
        <Award style={{ color: 'var(--accent-emerald)' }} />
        Pass / Revise Final Verification Audit
      </div>
      <p className="section-desc">
        Submission checklist verified against AI Fluency Week 02 prompt engineering & form validation standards.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {criteria.map((item, index) => (
          <div key={index} style={{
            background: 'var(--bg-glass)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{item.requirement}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>✅ {item.details}</span>
            </div>
            <span className="badge badge-pass" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
              <CheckCircle2 size={16} style={{ marginRight: 4 }} /> {item.status}
            </span>
          </div>
        ))}
      </div>

      <div style={{ background: '#060911', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FileText style={{ color: 'var(--accent-primary)' }} />
          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Deliverable Files</h5>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Saved in week2 root: <code>WORKFLOW.md</code> &amp; <code>CLAUDE.md</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
