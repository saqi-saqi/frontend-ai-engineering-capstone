import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState, useRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

// Test wrapper component to test focus restoration
const ModalTestWrapper = ({
  initialOpen = false,
  role = 'dialog',
}: {
  initialOpen?: boolean;
  role?: 'dialog' | 'alertdialog';
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        data-testid="trigger-button"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal Title"
        description="Test modal description"
        role={role}
      >
        <div>
          <p>Modal body content</p>
          <input type="text" placeholder="First input" data-testid="input-1" />
          <input type="text" placeholder="Second input" data-testid="input-2" />
          <button onClick={() => setIsOpen(false)} data-testid="confirm-btn">
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

describe('Modal Component (W3C ARIA APG Pattern)', () => {
  it('renders with correct ARIA attributes when open', () => {
    render(<ModalTestWrapper initialOpen={true} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');

    const title = screen.getByText('Test Modal Title');
    expect(title).toBeInTheDocument();
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.id);
  });

  it('closes when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<ModalTestWrapper initialOpen={true} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('traps focus inside the modal when pressing Tab and Shift+Tab', async () => {
    const user = userEvent.setup();
    render(<ModalTestWrapper initialOpen={true} />);

    const closeButton = screen.getByTestId('modal-close-button');
    const input1 = screen.getByTestId('input-1');
    const input2 = screen.getByTestId('input-2');
    const confirmBtn = screen.getByTestId('confirm-btn');

    // First focusable element should receive initial focus
    expect(document.activeElement).toBe(closeButton);

    // Tab forwards
    await user.tab();
    expect(document.activeElement).toBe(input1);

    await user.tab();
    expect(document.activeElement).toBe(input2);

    await user.tab();
    expect(document.activeElement).toBe(confirmBtn);

    // Tab wraps from last element back to first element
    await user.tab();
    expect(document.activeElement).toBe(closeButton);

    // Shift+Tab backwards wraps from first element to last element
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(confirmBtn);
  });

  it('restores focus to the trigger button when closed', async () => {
    const user = userEvent.setup();
    render(<ModalTestWrapper initialOpen={false} />);

    const triggerButton = screen.getByTestId('trigger-button');
    triggerButton.focus();
    expect(document.activeElement).toBe(triggerButton);

    // Open modal by clicking trigger
    await user.click(triggerButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close modal by pressing Escape
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(document.activeElement).toBe(triggerButton);
    });
  });
});
