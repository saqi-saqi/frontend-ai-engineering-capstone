import React, { useId, useState, ReactNode, FC, KeyboardEvent } from 'react';

export interface DisclosureProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  badge?: string;
  icon?: ReactNode;
  className?: string;
}

export const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  badge,
  icon,
  className = '',
}) => {
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(defaultOpen);
  const isExpanded = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const nextState = !isExpanded;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    if (onToggle) {
      onToggle(nextState);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`a11y-disclosure-container rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all duration-200 ${className}`}
      data-testid="disclosure-container"
    >
      {/* Disclosure Trigger Button */}
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="a11y-disclosure-trigger w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-100 hover:bg-slate-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset cursor-pointer"
          data-testid="disclosure-trigger"
        >
          <div className="flex items-center gap-3">
            {icon && <span className="text-indigo-400">{icon}</span>}
            <span>{title}</span>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {badge}
              </span>
            )}
          </div>

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
            className={`text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-indigo-400' : 'rotate-0'
            }`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </h3>

      {/* Disclosure Panel Region */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded}
        className={`a11y-disclosure-panel p-5 pt-0 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed ${
          isExpanded ? 'block animate-fade-in' : 'hidden'
        }`}
        data-testid="disclosure-panel"
      >
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};
