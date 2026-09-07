import React, {
  useEffect,
  useRef,
  useId,
  ReactNode,
  RefObject,
  FC,
} from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useFocusRestore } from '../../hooks/useFocusRestore';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  initialFocusRef?: RefObject<HTMLElement>;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  role?: 'dialog' | 'alertdialog';
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  initialFocusRef,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  role = 'dialog',
  size = 'md',
  showCloseButton = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Focus trap & focus restoration hooks
  useFocusTrap(dialogRef, {
    active: isOpen,
    initialFocusRef,
    onEscape: closeOnEscape ? onClose : undefined,
  });

  useFocusRestore({
    active: isOpen,
  });

  // Lock document body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calculate scrollbar width to minimize layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  }[size];

  const modalContent = (
    <div
      className="a11y-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in"
      onClick={closeOnBackdropClick ? (e) => {
        if (e.target === e.currentTarget) onClose();
      } : undefined}
      data-testid="modal-backdrop"
    >
      <div
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`a11y-modal-dialog w-full ${sizeClasses} rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl text-slate-100 p-6 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
        data-testid="modal-dialog"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <h2
              id={titleId}
              className="text-lg font-bold text-slate-100 tracking-tight"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="text-xs text-slate-400 leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
              aria-label="Close dialog"
              data-testid="modal-close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="py-4 text-sm text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );

  // Render via React Portal if document is available
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};
