import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Eye, ShieldCheck, HelpCircle } from 'lucide-react';

export default function SitemapVisualizer() {
  const [selectedNode, setSelectedNode] = useState(0);

  const nodes = [
    {
      id: 0,
      title: '1. Landing / Hero Section',
      badge: 'Hook & Claim',
      claim: 'States the Proof Claim instantly',
      action: 'Primary CTA: Book 15-Min Audit',
      details: [
        'Bold headline stating the 2x completion rate proof claim',
        'Micro video preview of production AI component in action',
        'Direct "Book Discovery Call" primary button above fold',
        'Compact 2-line founder credentials (no separate About needed)'
      ],
      earnedPlace: 'Earns place by immediately establishing belief and giving a direct path to the one action.'
    },
    {
      id: 1,
      title: '2. Work / Case Studies',
      badge: 'Proof Evidence',
      claim: 'Proves the claim with hard data',
      action: 'Inline Booking Button inside study',
      details: [
        'Case Study 1: Transforming AI Chat into Structured Workflow (2x Task Completion)',
        'Case Study 2: Optimizing LLM Latency UX & Reducing Drop-offs by 45%',
        'Before vs After video demonstrations',
        'Embedded Cal.com booking card at the bottom of each study'
      ],
      earnedPlace: 'Earns place by providing indisputable evidence that backs up the claim.'
    },
    {
      id: 2,
      title: '3. Credentials & Tech Stack',
      badge: 'Integrated Philosophy',
      claim: 'Compact Proof of Velocity',
      action: 'Secondary audit link',
      details: [
        'Compact design system ethos & speed guarantees',
        'Tech stack badges (React, LLM APIs, Tailwind, Python)',
        'Built directly into the bottom of Landing/Work flow'
      ],
      earnedPlace: 'Earns place by removing friction for technical founders evaluating execution capability.'
    },
    {
      id: 3,
      title: '4. Contact / One Action',
      badge: 'Conversion Goal',
      claim: 'Zero-friction booking',
      action: '15-Minute Audit Calendar',
      details: [
        'Direct Cal.com calendar embed',
        'Simple 3-field discovery question form',
        'Zero distraction links or unnecessary fields'
      ],
      earnedPlace: 'Earns place as the single destination for the target user to convert.'
    }
  ];

  return (
    <div className="sitemap-container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-title">
              <Compass className="icon-purple" style={{ color: 'var(--accent-primary)' }} />
              Portfolio Sitemap Sketch & Flow Architecture
            </div>
            <p className="section-desc">
              Every single node in this flow earns its place against your <strong>Proof Statement</strong> and your <strong>One Action</strong>.
            </p>
          </div>
          <span className="badge badge-pass"><CheckCircle2 size={14} style={{ marginRight: 4 }} /> PASS: Lean Architecture</span>
        </div>

        {/* Visual Node Flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
          {nodes.map((node, index) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              style={{
                background: selectedNode === node.id ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-glass)',
                border: selectedNode === node.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-indigo">{node.badge}</span>
                {index < nodes.length - 1 && (
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: selectedNode === node.id ? '#fff' : 'var(--text-primary)' }}>
                {node.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {node.claim}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Node Details Card */}
        <div style={{ background: '#060911', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-sm)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
              Node Detail: {nodes[selectedNode].title}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> Earned Place Verified
            </span>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem' }}>
            <div>
              <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Core Components</h5>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {nodes[selectedNode].details.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="highlight-box">
                <h5 style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <HelpCircle size={14} /> Why this page earns its place:
                </h5>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  {nodes[selectedNode].earnedPlace}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
