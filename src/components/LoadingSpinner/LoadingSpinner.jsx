import React from 'react';
import styles from './LoadingSpinner.module.css';

/**
 * Reusable loading spinner with optional full-screen overlay.
 */
const LoadingSpinner = ({ message = 'Loading...', subMessage = 'Please wait', fullPage = false }) => {
  return (
    <div 
      className={`${styles.spinnerContainer} ${fullPage ? styles.fullPage : ''}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className={styles.spinnerRing}></div>
      <p className={styles.message}>{message}</p>
      {subMessage && <p className={styles.subMessage}>{subMessage}</p>}
    </div>
  );
};

export default React.memo(LoadingSpinner);
