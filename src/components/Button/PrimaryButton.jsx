import React from 'react';
import styles from './Button.module.css';

/**
 * Reusable primary CTA button (accent red filled)
 */
const PrimaryButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  loading = false,
  ariaLabel,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles.primary} ${(disabled || loading) ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <div className={styles.spinner} role="presentation"></div>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default React.memo(PrimaryButton);
