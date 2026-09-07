import React, { useState, useRef } from 'react';
import { Settings, Eye, EyeOff, Save, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function SettingsDrawer({ isOpen, onClose, onSaveSettings, initialSettings }) {
  const [formData, setFormData] = useState(initialSettings || {
    displayName: 'Saqib',
    email: 'engineer@mindguard.ai',
    apiKey: 'sk-ant-api03-abcdef1234567890abcdef',
    model: 'claude-3-5-sonnet',
    simulationSpeed: 'fast',
  });

  const [errors, setErrors] = useState({});
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const errorSummaryRef = useRef(null);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    let err = '';
    const trimmed = typeof value === 'string' ? value.trim() : value;

    if (name === 'displayName') {
      if (!trimmed) err = 'Display Name is required.';
      else if (trimmed.length < 2) err = 'Display Name must be at least 2 characters long.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmed) err = 'Email address is required.';
      else if (!emailRegex.test(trimmed)) err = 'Please enter a valid email address (e.g. user@domain.com).';
    } else if (name === 'apiKey') {
      const keyRegex = /^sk-ant-api[0-9a-zA-Z_-]{20,}$/;
      if (!trimmed) err = 'Anthropic API key is required.';
      else if (!keyRegex.test(trimmed)) err = 'Invalid key format. Must start with sk-ant-api and have 20+ chars.';
    }

    setErrors(prev => ({ ...prev, [name]: err }));
    return !err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameValid = validateField('displayName', formData.displayName);
    const isEmailValid = validateField('email', formData.email);
    const isKeyValid = validateField('apiKey', formData.apiKey);

    if (!isNameValid || !isEmailValid || !isKeyValid) {
      if (errorSummaryRef.current) {
        errorSummaryRef.current.focus();
      }
      return;
    }

    const cleanData = {
      ...formData,
      displayName: formData.displayName.trim(),
      email: formData.email.trim(),
      apiKey: formData.apiKey.trim(),
    };

    onSaveSettings(cleanData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-drawer-title">
      <div className="modal-card" style={{ maxWidth: '480px', borderColor: 'var(--border-accent)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={20} color="var(--accent-primary)" />
            <h2 id="settings-drawer-title" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Assistant & Model Configuration
            </h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close settings drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Summary Container (Focus Management) */}
        {Object.values(errors).some(Boolean) && (
          <div 
            ref={errorSummaryRef} 
            tabIndex="-1" 
            role="alert" 
            style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent-rose)', padding: '10px 12px', borderRadius: '6px', marginBottom: '1.25rem', outline: 'none' }}
          >
            <strong style={{ color: '#fb7185', fontSize: '0.85rem' }}>Please fix the following validation errors:</strong>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '4px', fontSize: '0.8rem', color: '#fca5a5' }}>
              {Object.entries(errors).map(([key, msg]) => msg && <li key={key}>{msg}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Display Name */}
          <div className="form-group">
            <label htmlFor="displayName" className="form-label">Display Name</label>
            <input 
              id="displayName"
              name="displayName"
              type="text"
              className="form-input"
              value={formData.displayName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.displayName ? 'true' : 'false'}
              aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            />
            {errors.displayName && (
              <span id="displayName-error" role="alert" className="field-error">{errors.displayName}</span>
            )}
          </div>

          {/* Contact Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Notification Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" role="alert" className="field-error">{errors.email}</span>
            )}
          </div>

          {/* API Key with Password Toggle */}
          <div className="form-group">
            <label htmlFor="apiKey" className="form-label">Anthropic API Key (Secret)</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                id="apiKey"
                name="apiKey"
                type={showKey ? 'text' : 'password'}
                className="form-input"
                style={{ paddingRight: '40px', fontFamily: 'monospace', fontSize: '0.8rem' }}
                value={formData.apiKey}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.apiKey ? 'true' : 'false'}
                aria-describedby={errors.apiKey ? 'apiKey-error' : undefined}
              />
              <button 
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{ position: 'absolute', right: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.apiKey && (
              <span id="apiKey-error" role="alert" className="field-error">{errors.apiKey}</span>
            )}
          </div>

          {/* Model Selection */}
          <div className="form-group">
            <label htmlFor="model" className="form-label">Active Inference Model</label>
            <select 
              id="model"
              name="model"
              className="form-select"
              value={formData.model}
              onChange={handleChange}
            >
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Recommended - Clinical NLP)</option>
              <option value="gpt-4o">OpenAI GPT-4o (High Speed)</option>
              <option value="local-transformer">Local PyTorch / HuggingFace DistilBERT</option>
            </select>
          </div>

          {/* Simulation Latency Speed */}
          <div className="form-group">
            <label htmlFor="simulationSpeed" className="form-label">Stream Speed Simulation</label>
            <select 
              id="simulationSpeed"
              name="simulationSpeed"
              className="form-select"
              value={formData.simulationSpeed}
              onChange={handleChange}
            >
              <option value="fast">Fast Token Stream (120ms TTFT - Production standard)</option>
              <option value="slow">Un-streamed Blocking (1,800ms wait - Legacy benchmark)</option>
            </select>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.5rem' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ background: 'var(--accent-primary)', border: 'none', color: '#fff', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Save size={16} /> Save Configuration
            </button>
          </div>

        </form>

        {savedSuccess && (
          <div className="toast-popup">
            <CheckCircle2 size={16} /> Settings saved & validated successfully!
          </div>
        )}

      </div>
    </div>
  );
}
