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
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    firstElement.focus();
    modalElement.addEventListener('keydown', handleTabKey);

    return () => {
      modalElement?.removeEventListener('keydown', handleTabKey);
    };
  });
};

export default useFocusTrap;
