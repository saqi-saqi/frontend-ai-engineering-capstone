import React from 'react';
import { GitCompare, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function PressureTestDiff() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-title">
            <GitCompare style={{ color: 'var(--accent-emerald)' }} />
            Sitemap Revisions & Pressure-Test Refinement
          </div>
          <p className="section-desc">
            Documenting the structural change made after Claude's critique to shorten conversion distance.
          </p>
        </div>
        <span className="badge badge-pass"><CheckCircle2 size={14} style={{ marginRight: 4 }} /> Criteria Fulfilled</span>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Before Sketch */}
        <div style={{ background: '#0c101a', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-rose)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <ShieldAlert size={16} /> BEFORE PRESSURE TEST (Initial Draft)
          </div>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Page 1: Landing Page (Hero)</li>
            <li style={{ marginBottom: '0.5rem' }}>Page 2: Case Studies (Proof)</li>
            <li style={{ marginBottom: '0.5rem', color: 'var(--accent-rose)' }}>Page 3: Standalone "About Me" Narrative Page (Distraction Risk)</li>
            <li style={{ marginBottom: '0.5rem' }}>Page 4: Contact Page (3 clicks away from Landing)</li>
          </ul>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ⚠️ Flaw: SaaS founders looking for proof had to navigate through a narrative page before reaching the booking trigger.
          </p>
        </div>

        {/* After Sketch */}
        <div style={{ background: '#0c101a', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <CheckCircle2 size={16} /> AFTER PRESSURE TEST (Revised & Approved)
          </div>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Section 1: Hero Claim + Instant Credentials Strip</li>
            <li style={{ marginBottom: '0.5rem' }}>Section 2: Work Proof (Case Studies with inline video)</li>
            <li style={{ marginBottom: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Integrated: About Context embedded directly inside Hero & Case Studies</li>
            <li style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Section 3: Direct Booking Calendar embedded inline (1 click away)</li>
          </ul>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
            ✅ Result: Eliminated friction; 100% of remaining sections earn their place against the proof claim & one action.
          </p>
        </div>
      </div>
    </div>
  );
}
