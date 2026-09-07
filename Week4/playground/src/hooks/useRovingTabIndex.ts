import { useState, useCallback, KeyboardEvent } from 'react';

export interface UseRovingTabIndexOptions {
  itemCount: number;
  initialIndex?: number;
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
  onSelect?: (index: number) => void;
  activationMode?: 'automatic' | 'manual';
}

export interface UseRovingTabIndexReturn {
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  getTabProps: (index: number) => {
    tabIndex: number;
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    onClick: () => void;
  };
}

export function useRovingTabIndex(
  options: UseRovingTabIndexOptions
): UseRovingTabIndexReturn {
  const {
    itemCount,
    initialIndex = 0,
    orientation = 'horizontal',
    loop = true,
    onSelect,
    activationMode = 'automatic',
  } = options;

  const [focusedIndex, setFocusedIndex] = useState<number>(initialIndex);

  const moveFocus = useCallback(
    (nextIndex: number) => {
      let target = nextIndex;
      if (loop) {
        if (target < 0) target = itemCount - 1;
        if (target >= itemCount) target = 0;
      } else {
        if (target < 0) target = 0;
        if (target >= itemCount) target = itemCount - 1;
      }
      setFocusedIndex(target);
      if (activationMode === 'automatic' && onSelect) {
        onSelect(target);
      }
    },
    [itemCount, loop, activationMode, onSelect]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>, currentIndex: number) => {
      const isHorizontal = orientation === 'horizontal';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      switch (event.key) {
        case nextKey:
          event.preventDefault();
          moveFocus(currentIndex + 1);
          break;
        case prevKey:
          event.preventDefault();
          moveFocus(currentIndex - 1);
          break;
        case 'Home':
          event.preventDefault();
          moveFocus(0);
          break;
        case 'End':
          event.preventDefault();
          moveFocus(itemCount - 1);
          break;
        case 'Enter':
        case ' ':
          if (activationMode === 'manual' && onSelect) {
            event.preventDefault();
            onSelect(currentIndex);
          }
          break;
        default:
          break;
      }
    },
    [orientation, moveFocus, itemCount, activationMode, onSelect]
  );

  const getTabProps = useCallback(
    (index: number) => ({
      tabIndex: focusedIndex === index ? 0 : -1,
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => handleKeyDown(event, index),
      onClick: () => {
        setFocusedIndex(index);
        if (onSelect) onSelect(index);
      },
    }),
    [focusedIndex, handleKeyDown, onSelect]
  );

  return {
    focusedIndex,
    setFocusedIndex,
    getTabProps,
  };
}
