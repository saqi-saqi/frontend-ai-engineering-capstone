import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UserSettingsForm from '../UserSettingsForm';

describe('UserSettingsForm Component (Round 2)', () => {
  it('renders all form fields with proper accessible labels and default state', () => {
    render(<UserSettingsForm />);

    expect(screen.getByLabelText(/Display Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Anthropic API Key/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Daily Digest/i)).toBeChecked();
    expect(screen.getByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
  });

  it('shows inline validation error when required email is invalid on blur', async () => {
    render(<UserSettingsForm />);
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error summary banner when submitted with empty required fields', async () => {
    render(<UserSettingsForm />);
    
    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    const alertBanner = await screen.findByText(/Form Submission Failed/i);
    expect(alertBanner).toBeInTheDocument();
    expect(screen.getByText(/Display Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email Address is required/i)).toBeInTheDocument();
  });

  it('rejects invalid Anthropic API key format', async () => {
    render(<UserSettingsForm />);

    const apiKeyInput = screen.getByLabelText(/Anthropic API Key/i);
    fireEvent.change(apiKeyInput, { target: { value: 'invalid-key' } });
    fireEvent.blur(apiKeyInput);

    expect(await screen.findByText(/API Key must start with "sk-ant-api"/i)).toBeInTheDocument();
    expect(apiKeyInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits successfully and calls onSaveSuccess with trimmed values when input is valid', async () => {
    const handleSave = vi.fn();
    render(<UserSettingsForm onSaveSuccess={handleSave} />);

    const nameInput = screen.getByLabelText(/Display Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const apiKeyInput = screen.getByLabelText(/Anthropic API Key/i);
    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });

    fireEvent.change(nameInput, { target: { value: '   Sarah Connor   ' } });
    fireEvent.change(emailInput, { target: { value: 'sarah@skynet-resistance.org' } });
    fireEvent.change(apiKeyInput, { target: { value: 'sk-ant-api0123456789abcdefghijk' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Settings saved successfully!/i)).toBeInTheDocument();
    });

    expect(handleSave).toHaveBeenCalledWith({
      displayName: 'Sarah Connor',
      email: 'sarah@skynet-resistance.org',
      apiKey: 'sk-ant-api0123456789abcdefghijk',
      notificationFreq: 'daily',
      publicProfile: false
    });
  });
});
