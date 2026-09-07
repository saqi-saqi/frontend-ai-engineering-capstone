import { useEffect, useRef } from 'react';

export interface UseFocusRestoreOptions {
  active: boolean;
  restoreTargetRef?: React.RefObject<HTMLElement>;
}

export function useFocusRestore(options: UseFocusRestoreOptions): void {
  const { active, restoreTargetRef } = options;
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      // Capture currently focused element before modal opens
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    } else {
      // Restore focus when modal closes
      const target = restoreTargetRef?.current || previousActiveElementRef.current;
      if (target && typeof target.focus === 'function') {
        // Small delay ensures any unmounting transitions complete
        requestAnimationFrame(() => {
          target.focus();
        });
      }
    }
  }, [active, restoreTargetRef]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      const target = restoreTargetRef?.current || previousActiveElementRef.current;
      if (target && typeof target.focus === 'function') {
        target.focus();
      }
    };
  }, [restoreTargetRef]);
}
