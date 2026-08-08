import React, { useState, useRef } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle, Save, Info } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_KEY_REGEX = /^sk-ant-api[0-9a-zA-Z_-]{20,}$/;

export default function UserSettingsForm({ onSaveSuccess }) {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    apiKey: '',
    notificationFreq: 'daily',
    publicProfile: false
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  
  const errorSummaryRef = useRef(null);

  const validateField = (name, value) => {
    let errorMsg = '';
    const trimmed = typeof value === 'string' ? value.trim() : value;

    switch (name) {
      case 'displayName':
        if (!trimmed) {
          errorMsg = 'Display Name is required.';
        } else if (trimmed.length < 2) {
          errorMsg = 'Display Name must be at least 2 characters long.';
        } else if (trimmed.length > 50) {
          errorMsg = 'Display Name cannot exceed 50 characters.';
        }
        break;

      case 'email':
        if (!trimmed) {
          errorMsg = 'Email Address is required.';
        } else if (!EMAIL_REGEX.test(trimmed)) {
          errorMsg = 'Please enter a valid email address (e.g., alex@company.com).';
        }
        break;

      case 'apiKey':
        if (trimmed && !API_KEY_REGEX.test(trimmed)) {
          errorMsg = 'API Key must start with "sk-ant-api" followed by at least 20 valid characters.';
        }
        break;

      default:
        break;
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const fieldError = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Validate all fields
    const newErrors = {
      displayName: validateField('displayName', formData.displayName),
      email: validateField('email', formData.email),
      apiKey: validateField('apiKey', formData.apiKey)
    };

    // Mark all as touched
    setTouched({
      displayName: true,
      email: true,
      apiKey: true
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(err => Boolean(err));

    if (hasErrors) {
      setSubmitStatus('error');
      // Focus error summary for accessibility
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setIsSubmitting(true);

    // Simulate API persistence
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      if (onSaveSuccess) {
        onSaveSuccess({
          ...formData,
          displayName: formData.displayName.trim(),
          email: formData.email.trim(),
          apiKey: formData.apiKey.trim()
        });
      }
    }, 400);
  };

  return (
    <div className="card" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <ShieldCheck className="accent-icon" size={28} style={{ color: 'var(--accent-primary, #6366f1)' }} />
        <div>
          <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Account & API Settings</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)', margin: 0 }}>
            Configure your AI portfolio identity and LLM credentials with real-time validation.
          </p>
        </div>
      </div>

      {/* Global Error Alert Banner */}
      {submitStatus === 'error' && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#fca5a5',
            outline: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>Form Submission Failed</span>
          </div>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            Please correct the highlighted errors below before saving settings.
          </p>
        </div>
      )}

      {/* Global Success Alert Banner */}
      {submitStatus === 'success' && (
        <div
          role="status"
          aria-live="polite"
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid #22c55e',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#86efac',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <CheckCircle size={20} />
          <div>
            <strong>Settings saved successfully!</strong>
            <div style={{ fontSize: '0.85rem', color: '#bbf7d0' }}>
              Your profile and credentials have been securely updated.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Display Name Field */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label 
            htmlFor="displayName" 
            style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}
          >
            Display Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.displayName && errors.displayName)}
            aria-describedby={errors.displayName ? "displayName-error" : "displayName-hint"}
            placeholder="e.g. Jane Doe"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              border: touched.displayName && errors.displayName ? '1px solid #ef4444' : '1px solid var(--border-accent, #334155)',
              background: 'var(--bg-input, #0f172a)',
              color: '#f8fafc',
              fontSize: '0.95rem'
            }}
          />
          <span id="displayName-hint" style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Between 2 and 50 characters.
          </span>
          {touched.displayName && errors.displayName && (
            <span 
              id="displayName-error" 
              role="alert" 
              style={{ display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}
            >
              {errors.displayName}
            </span>
          )}
        </div>

        {/* Email Address Field */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label 
            htmlFor="email" 
            style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}
          >
            Email Address <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            placeholder="name@domain.com"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              border: touched.email && errors.email ? '1px solid #ef4444' : '1px solid var(--border-accent, #334155)',
              background: 'var(--bg-input, #0f172a)',
              color: '#f8fafc',
              fontSize: '0.95rem'
            }}
          />
          <span id="email-hint" style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Used for system alerts and security verification.
          </span>
          {touched.email && errors.email && (
            <span 
              id="email-error" 
              role="alert" 
              style={{ display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}
            >
              {errors.email}
            </span>
          )}
        </div>

        {/* API Key Field */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label 
            htmlFor="apiKey" 
            style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}
          >
            Anthropic API Key <span style={{ fontWeight: 400, color: '#94a3b8' }}>(Optional)</span>
          </label>
          <input
            id="apiKey"
            name="apiKey"
            type="password"
            value={formData.apiKey}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.apiKey && errors.apiKey)}
            aria-describedby={errors.apiKey ? "apiKey-error" : "apiKey-hint"}
            placeholder="sk-ant-api..."
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              border: touched.apiKey && errors.apiKey ? '1px solid #ef4444' : '1px solid var(--border-accent, #334155)',
              background: 'var(--bg-input, #0f172a)',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}
          />
          <span id="apiKey-hint" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            <Info size={12} /> Format: sk-ant-api... (minimum 20 characters)
          </span>
          {touched.apiKey && errors.apiKey && (
            <span 
              id="apiKey-error" 
              role="alert" 
              style={{ display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}
            >
              {errors.apiKey}
            </span>
          )}
        </div>

        {/* Notification Frequency Fieldset */}
        <fieldset style={{ border: '1px solid var(--border-accent, #334155)', borderRadius: '6px', padding: '0.85rem 1rem', marginBottom: '1.25rem' }}>
          <legend style={{ padding: '0 0.4rem', fontWeight: 600, fontSize: '0.85rem', color: '#cbd5e1' }}>
            Notification Digest Frequency
          </legend>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
              <input
                type="radio"
                name="notificationFreq"
                value="realtime"
                checked={formData.notificationFreq === 'realtime'}
                onChange={handleChange}
              />
              Real-time
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
              <input
                type="radio"
                name="notificationFreq"
                value="daily"
                checked={formData.notificationFreq === 'daily'}
                onChange={handleChange}
              />
              Daily Digest
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
              <input
                type="radio"
                name="notificationFreq"
                value="weekly"
                checked={formData.notificationFreq === 'weekly'}
                onChange={handleChange}
              />
              Weekly Digest
            </label>
          </div>
        </fieldset>

        {/* Public Profile Checkbox */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              id="publicProfile"
              name="publicProfile"
              type="checkbox"
              checked={formData.publicProfile}
              onChange={handleChange}
            />
            Make my AI Portfolio public to prospective clients
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.75rem',
            fontWeight: 600,
            borderRadius: '6px',
            background: 'var(--accent-primary, #6366f1)',
            color: '#fff',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          <Save size={18} />
          {isSubmitting ? 'Saving Settings...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
