import { useEffect } from 'react';

const useFocusTrap = (modalRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const isInsideModal = modalElement.contains(document.activeElement);

      if (event.shiftKey) {
        if (document.activeElement === firstElement || !isInsideModal) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement || !isInsideModal) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    firstElement.focus();
    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  });
};

export default useFocusTrap;
