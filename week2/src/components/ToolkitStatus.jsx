import React from 'react';
import { Layers, CheckCircle2, ExternalLink } from 'lucide-react';

export default function ToolkitStatus() {
  const tools = [
    {
      name: 'Claude',
      provider: 'Anthropic',
      role: 'Claude Project Host & AI Tutor (8-Week Lead)',
      status: 'Configured & Active',
      url: 'https://claude.ai',
      color: '#d97706'
    },
    {
      name: 'ChatGPT',
      provider: 'OpenAI',
      role: 'Multimodal Copy & Visual Prompt Validator',
      status: 'Ready',
      url: 'https://chatgpt.com',
      color: '#10b981'
    },
    {
      name: 'Gemini',
      provider: 'Google DeepMind',
      role: 'Code Logic, SDKs & Long-Context Research',
      status: 'Ready',
      url: 'https://gemini.google.com',
      color: '#3b82f6'
    },
    {
      name: 'Perplexity',
      provider: 'Perplexity AI',
      role: 'Real-Time Technical Search & Market Benchmarking',
      status: 'Ready',
      url: 'https://perplexity.ai',
      color: '#06b6d4'
    }
  ];

  return (
    <div className="card">
      <div className="section-title">
        <Layers style={{ color: 'var(--accent-cyan)' }} />
        8-Week AI Toolkit Setup Status
      </div>
      <p className="section-desc">
        Free accounts verified and ready across all four core AI tools.
      </p>

      <div className="grid-4">
        {tools.map((tool, i) => (
          <div key={i} style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: tool.color, fontWeight: 700 }}>{tool.name}</h4>
                <a href={tool.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>
                  <ExternalLink size={14} />
                </a>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                {tool.provider}
              </span>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {tool.role}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
              <CheckCircle2 size={14} /> {tool.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
