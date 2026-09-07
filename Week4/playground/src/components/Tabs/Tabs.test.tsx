import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabItem } from './Tabs';

const sampleTabs: TabItem[] = [
  { id: 'tab-1', label: 'First Tab', content: 'First Content Body' },
  { id: 'tab-2', label: 'Second Tab', content: 'Second Content Body' },
  { id: 'tab-3', label: 'Third Tab', content: 'Third Content Body' },
];

describe('Tabs Component (W3C ARIA APG Pattern)', () => {
  it('renders tablist, tabs, and active tabpanel with correct ARIA attributes', () => {
    render(<Tabs tabs={sampleTabs} ariaLabel="Test Tabs" />);

    const tablist = screen.getByRole('tablist', { name: 'Test Tabs' });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    // Initial state: Tab 1 is active (tabIndex 0), Tab 2 and 3 are inactive (tabIndex -1)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');

    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveTextContent('First Content Body');
    expect(panel).toHaveAttribute('aria-labelledby', tabs[0].id);
  });

  it('navigates with ArrowRight and ArrowLeft keys (Roving TabIndex)', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={sampleTabs} ariaLabel="Test Tabs" />);

    const tabs = screen.getAllByRole('tab');

    // Focus first tab
    tabs[0].focus();
    expect(document.activeElement).toBe(tabs[0]);

    // Press ArrowRight to move to second tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second Content Body');

    // Press ArrowRight again to move to third tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');

    // Press ArrowRight on last tab -> wraps around to first tab
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    // Press ArrowLeft on first tab -> wraps around to last tab
    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(tabs[2]);
  });

  it('jumps to first and last tab with Home and End keys', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={sampleTabs} ariaLabel="Test Tabs" />);

    const tabs = screen.getAllByRole('tab');

    tabs[1].focus();
    expect(document.activeElement).toBe(tabs[1]);

    // Press Home -> jump to first tab
    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    // Press End -> jump to last tab
    await user.keyboard('{End}');
    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });
});
