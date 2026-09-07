import React, { useState } from 'react';
import { BookOpen, Code, Sparkles, Wrench, CheckCircle2, Copy, Check } from 'lucide-react';

export default function AIDevelopmentLog() {
  const [activeSubTab, setActiveSubTab] = useState('prompts');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', background: '#090d16' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              WEEK 3 INDEPENDENT BUILD SUBMISSION
            </span>
            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: '0.25rem 0' }}>
              AI Assistant Development Log & Refactoring Analysis
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Documentation of AI-assisted implementation, prompting strategy, and human code auditing.
            </p>
          </div>
          <span className="badge badge-casual" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <CheckCircle2 size={14} style={{ marginRight: 4 }} /> Rubric Requirements Fulfilled
          </span>
        </div>

        {/* Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '1.5rem' }}>
          <button 
            className={`tab-btn ${activeSubTab === 'prompts' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('prompts')}
          >
            <Code size={16} /> 1. Prompts Used During Development
          </button>
          <button 
            className={`tab-btn ${activeSubTab === 'assistance' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('assistance')}
          >
            <Sparkles size={16} /> 2. How AI Assisted Implementation
          </button>
          <button 
            className={`tab-btn ${activeSubTab === 'refactoring' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('refactoring')}
          >
            <Wrench size={16} /> 3. Manual Improvements & Refactoring
          </button>
        </div>

        {/* Section 1: Prompts Used */}
        {activeSubTab === 'prompts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  Prompt 1: Streaming Chat Architecture & State Pipeline
                </span>
                <button 
                  onClick={() => handleCopy(`Act as a Senior React Engineer. Scaffold a streaming AI chat interface using React 18 hooks.
Requirements:
1. Messages state with role ('user' | 'bot'), timestamp, intent badge, and streaming content.
2. Simulated token streaming function with customizable chunk latency (120ms TTFT vs 1,800ms blocking).
3. Sticky auto-scroll that locks to viewport bottom during active generation but allows manual scroll upward without jarring snap-backs.`, 1)}
                  style={{ background: '#1e293b', border: '1px solid var(--border-color)', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedIndex === 1 ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                  {copiedIndex === 1 ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>
              <pre style={{ background: '#060911', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', color: '#93c5fd', whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace' }}>
{`Act as a Senior React Engineer. Scaffold a streaming AI chat interface using React 18 hooks.
Requirements:
1. Messages state with role ('user' | 'bot'), timestamp, intent badge, and streaming content.
2. Simulated token streaming function with customizable chunk latency (120ms TTFT vs 1,800ms blocking).
3. Sticky auto-scroll that locks to viewport bottom during active generation but allows manual scroll upward without jarring snap-backs.`}
              </pre>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                  Prompt 2: Crisis Triage Modal (Hick's Law & Desktop Fallback)
                </span>
                <button 
                  onClick={() => handleCopy(`Design an emergency Crisis Support Modal component in React.
Requirements:
1. Strict Hick's Law layout: Consolidate choices to 3 primary actions (Call 988, Text 741741, Reach Contact).
2. Desktop tel: Fallback: Replace dead tel: links with a 1-click clipboard copy button and confirmation toast.
3. Progressive disclosure: Place secondary and international hotlines behind an expandable disclosure dropdown.
4. Accessibility: Accessible dialog overlay with role="dialog", aria-modal="true", and keyboard escape dismissal.`, 2)}
                  style={{ background: '#1e293b', border: '1px solid var(--border-color)', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedIndex === 2 ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                  {copiedIndex === 2 ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>
              <pre style={{ background: '#060911', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', color: '#fca5a5', whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace' }}>
{`Design an emergency Crisis Support Modal component in React.
Requirements:
1. Strict Hick's Law layout: Consolidate choices to 3 primary actions (Call 988, Text 741741, Reach Contact).
2. Desktop tel: Fallback: Replace dead tel: links with a 1-click clipboard copy button and confirmation toast.
3. Progressive disclosure: Place secondary and international hotlines behind an expandable disclosure dropdown.
4. Accessibility: Accessible dialog overlay with role="dialog", aria-modal="true", and keyboard escape dismissal.`}
              </pre>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  Prompt 3: Accessible Settings Form with WCAG 2.1 AA & Test Gate
                </span>
                <button 
                  onClick={() => handleCopy(`Build an accessible Settings Form component in React with:
1. Real-time validation onBlur and onSubmit with regex for RFC email and Anthropic API keys.
2. Input sanitization with .trim() before validation.
3. API key masked with type="password" and type="button" show/hide toggle.
4. WCAG 2.1 AA ARIA attributes (htmlFor, aria-invalid, aria-describedby, role="alert").
5. Focus shift to error summary container on failed submit.`, 3)}
                  style={{ background: '#1e293b', border: '1px solid var(--border-color)', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedIndex === 3 ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                  {copiedIndex === 3 ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>
              <pre style={{ background: '#060911', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', color: '#86efac', whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace' }}>
{`Build an accessible Settings Form component in React with:
1. Real-time validation onBlur and onSubmit with regex for RFC email and Anthropic API keys.
2. Input sanitization with .trim() before validation.
3. API key masked with type="password" and type="button" show/hide toggle.
4. WCAG 2.1 AA ARIA attributes (htmlFor, aria-invalid, aria-describedby, role="alert").
5. Focus shift to error summary container on failed submit.`}
              </pre>
            </div>

          </div>
        )}

        {/* Section 2: AI Assistance Explanation */}
        {activeSubTab === 'assistance' && (
          <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            <h3 style={{ color: '#fff', fontSize: '1.05rem' }}>How AI Accelerated the Implementation Cycle</h3>
            <p>
              Throughout the construction of this React application, AI served as an intelligent pairing partner across three primary workflows:
            </p>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <strong>Component Scaffolding & State Architecture:</strong> AI generated the initial boilerplate for complex state hooks (e.g. streaming message chunk buffers, interval timers for TTFT calculation, and form state dictionaries), reducing initial setup time from hours to minutes.
              </li>
              <li>
                <strong>Regex Formulation & Schema Validation:</strong> AI drafted robust RFC-compliant regular expressions for email checking and Anthropic key prefix patterns (`^sk-ant-api[0-9a-zA-Z_-]{20,}$`).
              </li>
              <li>
                <strong>Accessibility Tag Generation:</strong> Directing the AI with WCAG 2.1 AA directives ensured that `aria-describedby`, `aria-invalid`, and `role="alert"` attributes were mapped systematically across all interactive form fields.
              </li>
            </ol>
          </div>
        )}

        {/* Section 3: Manual Improvements & Refactoring */}
        {activeSubTab === 'refactoring' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ color: 'var(--accent-rose)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                Fix 1: Accidental Form Submit on Password Toggle (Button Type Bug)
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px' }}>
                <strong>AI Error:</strong> The AI-generated show/hide password toggle button omitted <code>type="button"</code>. In HTML5 forms, buttons default to <code>type="submit"</code>, causing clicks on "Show" to prematurely trigger validation errors and submit the form.
              </p>
              <div style={{ background: '#060911', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#f87171' }}>- &lt;button onClick={() =&gt; setShowKey(!showKey)}&gt;</span><br />
                <span style={{ color: '#4ade80' }}>+ &lt;button type="button" onClick={() =&gt; setShowKey(!showKey)}&gt;</span>
              </div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ color: 'var(--accent-amber)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                Fix 2: Whitespace Bypass Vulnerability (Input Sanitization)
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px' }}>
                <strong>AI Error:</strong> The AI's initial validation checked <code>value.length &gt;= 2</code>, allowing strings of pure whitespace (<code>"   "</code>) to be accepted as valid names.
              </p>
              <div style={{ background: '#060911', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#f87171' }}>- if (!value || value.length &lt; 2)</span><br />
                <span style={{ color: '#4ade80' }}>+ const trimmed = typeof value === 'string' ? value.trim() : value;<br />+ if (!trimmed || trimmed.length &lt; 2)</span>
              </div>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                Fix 3: Desktop `tel:` Broken Link Fallback (Clipboard + Toast)
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px' }}>
                <strong>AI Error:</strong> The initial AI output used bare <code>&lt;a href="tel:988"&gt;</code> tags. On desktop environments without a configured telephony client, clicking this link does nothing and appears completely broken to a user in crisis.
              </p>
              <div style={{ background: '#060911', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#4ade80' }}>+ Added dedicated "Copy" button triggering navigator.clipboard.writeText('988') with visual toast confirmation.</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
