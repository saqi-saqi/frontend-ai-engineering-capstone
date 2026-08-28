'use client';

import React, { useState } from 'react';
import {
  Settings,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Save,
  Sliders,
  ShieldCheck,
  User,
  Key,
} from 'lucide-react';
import { DEFAULT_SETTINGS } from '@/lib/constants';
import { ModelSettings } from '@/lib/types';

interface FormErrors {
  displayName?: string;
  email?: string;
  apiKey?: string;
}

export default function SettingsPage() {
  const [formData, setFormData] = useState<ModelSettings>(DEFAULT_SETTINGS);
  const [showApiKey, setShowApiKey] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Field validation with RFC email and Anthropic key regex
  const validateField = (field: keyof ModelSettings, value: any): string | null => {
    const trimmed = typeof value === 'string' ? value.trim() : value;

    if (field === 'displayName') {
      if (!trimmed) return 'Display name is required.';
      if (trimmed.length < 2) return 'Display name must be at least 2 characters.';
    }

    if (field === 'email') {
      if (!trimmed) return 'Email address is required.';
      const rfcEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!rfcEmailRegex.test(trimmed)) return 'Please provide a valid email address.';
    }

    if (field === 'apiKey') {
      if (!trimmed) return 'API key is required.';
      const anthropicKeyRegex = /^sk-ant-api[0-9a-zA-Z_-]{20,}$/;
      if (!anthropicKeyRegex.test(trimmed)) {
        return 'Key must start with sk-ant-api followed by at least 20 valid characters.';
      }
    }

    return null;
  };

  const handleBlur = (field: keyof ModelSettings) => {
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || undefined,
    }));
  };

  const handleChange = (field: keyof ModelSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateField('displayName', formData.displayName);
    const emailErr = validateField('email', formData.email);
    const keyErr = validateField('apiKey', formData.apiKey);

    if (nameErr || emailErr || keyErr) {
      setErrors({
        displayName: nameErr || undefined,
        email: emailErr || undefined,
        apiKey: keyErr || undefined,
      });
      return;
    }

    setErrors({});
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">Model & System Settings</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Configure model parameters, developer credentials, and safety thresholds with WCAG 2.1 AA validated controls.
        </p>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Configuration saved successfully! Parameters updated for active session.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* User Identity Section */}
        <section className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Developer Profile & Notification Email</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-xs font-semibold text-slate-300 mb-1">
                Display Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="displayName"
                type="text"
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                onBlur={() => handleBlur('displayName')}
                aria-invalid={Boolean(errors.displayName)}
                aria-describedby={errors.displayName ? 'displayName-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
                  errors.displayName
                    ? 'border-rose-500/80 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {errors.displayName && (
                <p id="displayName-error" role="alert" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.displayName}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1">
                Engineering Contact Email <span className="text-rose-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
                  errors.email
                    ? 'border-rose-500/80 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

          </div>
        </section>

        {/* API Credentials Section */}
        <section className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <span>LLM Provider Authentication</span>
          </h2>

          <div>
            <label htmlFor="apiKey" className="block text-xs font-semibold text-slate-300 mb-1">
              Anthropic / OpenAI API Key <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={formData.apiKey}
                onChange={(e) => handleChange('apiKey', e.target.value)}
                onBlur={() => handleBlur('apiKey')}
                aria-invalid={Boolean(errors.apiKey)}
                aria-describedby={errors.apiKey ? 'apiKey-error' : undefined}
                className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-900 border text-xs sm:text-sm font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
                  errors.apiKey
                    ? 'border-rose-500/80 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              
              {/* Critical fix: Explicit type="button" avoids accidental form submission */}
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.apiKey ? (
              <p id="apiKey-error" role="alert" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.apiKey}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">
                Pattern requirement: Starts with <code className="text-indigo-400">sk-ant-api</code> followed by at least 20 alphanumeric characters.
              </p>
            )}
          </div>
        </section>

        {/* Model Inference Parameters */}
        <section className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Model Selection & Hyperparameters</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Model Selector */}
            <div>
              <label htmlFor="modelSelector" className="block text-xs font-semibold text-slate-300 mb-1">
                Selected Model
              </label>
              <select
                id="modelSelector"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Recommended)</option>
                <option value="claude-3-haiku-20240307">Claude 3 Haiku (Ultra Low Latency)</option>
                <option value="gpt-4o">GPT-4o (OpenAI Direct)</option>
                <option value="meta-llama-3.3-70b">Llama 3.3 70B (Open Weights)</option>
              </select>
            </div>

            {/* Simulation Speed */}
            <div>
              <label htmlFor="speedSelector" className="block text-xs font-semibold text-slate-300 mb-1">
                Stream Simulation Speed
              </label>
              <select
                id="speedSelector"
                value={formData.simulationSpeed}
                onChange={(e) => handleChange('simulationSpeed', e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="fast">Fast (120ms TTFT benchmark)</option>
                <option value="realistic">Realistic Network (350ms TTFT)</option>
                <option value="instant">Instant Blocking Render</option>
              </select>
            </div>

          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-glow-primary transition-all duration-150"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </main>
  );
}
