import React, { useState } from 'react';
import { AlertOctagon, Phone, MessageSquare, HeartHandshake, Copy, Check, ChevronDown, ChevronUp, X } from 'lucide-react';

export default function CrisisModal({ isOpen, onClose, triggerText }) {
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);

  if (!isOpen) return null;

  const handleCopyHelpline = () => {
    navigator.clipboard.writeText('988');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="crisis-modal-title">
      <div className="modal-card">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '8px', borderRadius: '8px', color: 'var(--accent-rose)' }}>
              <AlertOctagon size={24} />
            </div>
            <div>
              <h2 id="crisis-modal-title" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                Immediate Support is Available
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                You are not alone. Please reach out to confidential, free 24/7 care.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close crisis support modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Trigger Context Warning */}
        {triggerText && (
          <div style={{ background: 'rgba(244, 63, 94, 0.08)', borderLeft: '3px solid var(--accent-rose)', padding: '8px 12px', borderRadius: '4px', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#fca5a5' }}>
            <strong>Trigger Detected:</strong> "{triggerText}"
          </div>
        )}

        {/* 3 Acute Triage Actions (Hick's Law) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
          
          {/* Action 1: 988 Call + Desktop Clipboard Fallback */}
          <div style={{ background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} style={{ color: 'var(--accent-rose)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Suicide & Crisis Lifeline</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Free, confidential call 24/7 (US & Canada)</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <a 
                href="tel:988" 
                style={{ background: 'var(--accent-rose)', color: '#fff', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Call 988
              </a>
              <button 
                type="button"
                onClick={handleCopyHelpline}
                style={{ background: '#334155', border: 'none', color: '#e2e8f0', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Copy number to clipboard (Desktop Fallback)"
              >
                {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Action 2: Crisis Text Line */}
          <div style={{ background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={18} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Crisis Text Line</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Text <strong>HOME</strong> to <strong>741741</strong></div>
              </div>
            </div>
            <a 
              href="sms:741741?body=HOME" 
              style={{ background: '#0284c7', color: '#fff', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}
            >
              Text 741741
            </a>
          </div>

          {/* Action 3: Trusted Personal Contact */}
          <div style={{ background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HeartHandshake size={18} style={{ color: 'var(--accent-emerald)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Reach Safety Contact</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Contact a trusted friend, counselor, or family member</div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => alert('Opening emergency contacts dialog...')}
              style={{ background: '#059669', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
            >
              Connect
            </button>
          </div>

        </div>

        {/* Progressive Disclosure: Secondary & International Hotlines */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
          <button 
            type="button"
            onClick={() => setShowMore(!showMore)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showMore ? 'Hide additional resources' : 'View international hotlines & veterans support'}
          </button>

          {showMore && (
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', background: '#090d16', padding: '10px', borderRadius: '6px' }}>
              <div>• <strong>Veterans Crisis Line:</strong> Dial 988, then press 1.</div>
              <div>• <strong>The Trevor Project (LGBTQ Youth):</strong> Call 1-866-488-7386 or Text START to 678-678.</div>
              <div>• <strong>International Resources:</strong> Find your country helpline at <a href="https://findahelpline.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>findahelpline.com</a>.</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
