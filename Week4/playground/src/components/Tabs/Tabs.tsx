import React, {
  useId,
  useState,
  ReactNode,
  FC,
  useRef,
  useEffect,
} from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onChange?: (tabId: string) => void;
  ariaLabel: string;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  className?: string;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultTabId,
  activeTabId,
  onChange,
  ariaLabel,
  orientation = 'horizontal',
  activationMode = 'automatic',
  className = '',
}) => {
  const baseId = useId();
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const initialIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === (defaultTabId || activeTabId || tabs[0]?.id))
  );

  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(initialIndex);

  const selectedIndex =
    activeTabId !== undefined
      ? tabs.findIndex((t) => t.id === activeTabId)
      : internalActiveIndex;

  const handleSelect = (index: number) => {
    if (tabs[index]?.disabled) return;
    if (activeTabId === undefined) {
      setInternalActiveIndex(index);
    }
    if (onChange && tabs[index]) {
      onChange(tabs[index].id);
    }
  };

  const { focusedIndex, getTabProps } = useRovingTabIndex({
    itemCount: tabs.length,
    initialIndex: selectedIndex,
    orientation,
    loop: true,
    activationMode,
    onSelect: handleSelect,
  });

  // Focus the newly active tab button when roving index changes via keyboard
  useEffect(() => {
    const targetButton = tabButtonRefs.current[focusedIndex];
    if (targetButton && document.activeElement !== targetButton) {
      targetButton.focus();
    }
  }, [focusedIndex]);

  const activeTab = tabs[selectedIndex] || tabs[0];
  const activeTabElementId = `${baseId}-tab-${selectedIndex}`;
  const activePanelElementId = `${baseId}-panel-${selectedIndex}`;

  return (
    <div
      className={`a11y-tabs-container ${
        orientation === 'vertical' ? 'flex gap-6' : 'space-y-4'
      } ${className}`}
      data-testid="tabs-container"
    >
      {/* Tab List */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={`a11y-tablist ${
          orientation === 'vertical'
            ? 'flex flex-col space-y-1 border-r border-slate-800 pr-4 min-w-[180px]'
            : 'flex space-x-2 border-b border-slate-800 pb-2'
        }`}
        data-testid="tablist"
      >
        {tabs.map((tab, index) => {
          const isSelected = index === selectedIndex;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          const rovingProps = getTabProps(index);

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabButtonRefs.current[index] = el;
              }}
              role="tab"
              id={tabId}
              aria-selected={isSelected}
              aria-controls={panelId}
              aria-disabled={tab.disabled ? 'true' : undefined}
              disabled={tab.disabled}
              tabIndex={rovingProps.tabIndex}
              onClick={rovingProps.onClick}
              onKeyDown={rovingProps.onKeyDown}
              className={`a11y-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isSelected
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
              {isSelected && orientation === 'horizontal' && (
                <span className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={activePanelElementId}
        aria-labelledby={activeTabElementId}
        tabIndex={0}
        className="a11y-tabpanel rounded-2xl bg-slate-900/60 border border-slate-800 p-6 text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        data-testid={`tabpanel-${activeTab?.id}`}
      >
        {activeTab?.content}
      </div>
    </div>
  );
};
