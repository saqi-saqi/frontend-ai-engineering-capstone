import React, { useState } from 'react';
import ProofStatementView from './components/ProofStatementView';
import SitemapVisualizer from './components/SitemapVisualizer';
import ClaudeProjectSimulator from './components/ClaudeProjectSimulator';
import PressureTestDiff from './components/PressureTestDiff';
import ToolkitStatus from './components/ToolkitStatus';
import PassAudit from './components/PassAudit';
import UserSettingsForm from './components/UserSettingsForm';
import { Target, Compass, Bot, GitCompare, Layers, Award, CheckCircle2, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header-nav">
        <div className="brand-badge">
          <div className="brand-icon">W2</div>
          <div className="brand-text">
            <h1>AI Fluency: Week 02 — Prompt Engineering & User Settings</h1>
            <p>Build It Twice Drill & Validation Suite</p>
          </div>
        </div>

        <nav className="nav-tabs">
          <button
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} /> User Settings Form
          </button>
          <button
            className={`nav-btn ${activeTab === 'proof' ? 'active' : ''}`}
            onClick={() => setActiveTab('proof')}
          >
            <Target size={16} /> Proof Statement
          </button>
          <button
            className={`nav-btn ${activeTab === 'sitemap' ? 'active' : ''}`}
            onClick={() => setActiveTab('sitemap')}
          >
            <Compass size={16} /> Sitemap Sketch
          </button>
          <button
            className={`nav-btn ${activeTab === 'claude' ? 'active' : ''}`}
            onClick={() => setActiveTab('claude')}
          >
            <Bot size={16} /> Claude Project
          </button>
          <button
            className={`nav-btn ${activeTab === 'diff' ? 'active' : ''}`}
            onClick={() => setActiveTab('diff')}
          >
            <GitCompare size={16} /> Revisions
          </button>
          <button
            className={`nav-btn ${activeTab === 'toolkit' ? 'active' : ''}`}
            onClick={() => setActiveTab('toolkit')}
          >
            <Layers size={16} /> AI Toolkit
          </button>
          <button
            className={`nav-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            <Award size={16} /> Pass Audit
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        {/* Foundation Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.08))',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          marginBottom: '2rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              WEEK 2 DRILL COMPLETE
            </span>
            <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: '0.2rem 0' }}>
              "Build It Twice: Vague vs. Precise Prompting & Accessible User Settings Form"
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Key Deliverables:</strong> Accessible Form with WCAG 2.1 AA, Real-time Validation, Vitest Suite, WORKFLOW.md & CLAUDE.md Rules
            </p>
          </div>
          <span className="badge badge-pass">
            <CheckCircle2 size={14} style={{ marginRight: 4 }} /> Pass Criteria Verified
          </span>
        </div>

        {/* Tab Views */}
        {activeTab === 'settings' && <UserSettingsForm />}
        {activeTab === 'proof' && <ProofStatementView />}
        {activeTab === 'sitemap' && <SitemapVisualizer />}
        {activeTab === 'claude' && <ClaudeProjectSimulator />}
        {activeTab === 'diff' && <PressureTestDiff />}
        {activeTab === 'toolkit' && <ToolkitStatus />}
        {activeTab === 'audit' && <PassAudit />}
      </main>
    </div>
  );
}
