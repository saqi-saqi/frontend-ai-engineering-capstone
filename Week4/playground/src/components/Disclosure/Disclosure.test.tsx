import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Disclosure } from './Disclosure';

describe('Disclosure Component (W3C ARIA APG Pattern)', () => {
  it('renders collapsed by default with correct ARIA attributes', () => {
    render(
      <Disclosure title="Disclosure Title Header">
        <p>Revealed inner content</p>
      </Disclosure>
    );

    const trigger = screen.getByRole('button', { name: /Disclosure Title Header/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');

    const panel = screen.getByTestId('disclosure-panel');
    expect(panel).toHaveAttribute('role', 'region');
    expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
    expect(panel).toHaveAttribute('hidden');
  });

  it('toggles open and closed when clicked', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure title="Toggle Test">
        <p>Inner Secret Content</p>
      </Disclosure>
    );

    const trigger = screen.getByRole('button', { name: /Toggle Test/i });
    const panel = screen.getByTestId('disclosure-panel');

    // Click to open
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');
    expect(screen.getByText('Inner Secret Content')).toBeVisible();

    // Click to close
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('hidden');
  });

  it('toggles using Enter and Space keys', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure title="Keyboard Toggle">
        <p>Keyboard Revealed Body</p>
      </Disclosure>
    );

    const trigger = screen.getByRole('button', { name: /Keyboard Toggle/i });

    // Focus trigger
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    // Press Enter to open
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Press Space to close
    await user.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
