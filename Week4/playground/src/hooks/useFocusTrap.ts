import { useEffect, RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface UseFocusTrapOptions {
  active: boolean;
  initialFocusRef?: RefObject<HTMLElement>;
  onEscape?: () => void;
}

export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T>,
  options: UseFocusTrapOptions
): void {
  const { active, initialFocusRef, onEscape } = options;

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;

    // Helper to query all visible, tabbable elements in container
    const getFocusableElements = (): HTMLElement[] => {
      const elements = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      return elements.filter(
        (el) =>
          !el.hasAttribute('disabled') &&
          el.getAttribute('aria-hidden') !== 'true' &&
          el.offsetParent !== null // ensure visible
      );
    };

    // Set initial focus
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else {
      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    }

    // Keydown handler for Tab cycling & Escape
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        event.stopPropagation();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: if on first element, wrap to last
        if (document.activeElement === firstElement || document.activeElement === container) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, containerRef, initialFocusRef, onEscape]);
}
