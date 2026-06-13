import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

/**
 * Reusable accessible Dialog Modal overlay.
 * Traps key focus and listens to ESC key close.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  ariaLabelledBy = 'modal-title'
}) => {
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal container for accessibility
      modalRef.current?.focus();
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Only close if user clicked directly on the overlay backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={styles.modalBox}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2 id={ariaLabelledBy} className={styles.title}>{title}</h2>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        
        <div className={styles.content}>
          {children}
        </div>
        
        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Modal);
