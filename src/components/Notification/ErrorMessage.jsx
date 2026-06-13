import React from 'react';
import { XCircle, RefreshCw, ChevronLeft } from 'lucide-react';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';
import styles from './Notification.module.css';

/**
 * Reusable Error message page content.
 * Displays booking submission errors and supports retry controls or routing fallback.
 */
const ErrorMessage = ({ 
  message = 'An unexpected error occurred during submission.', 
  onRetry, 
  onGoBack 
}) => {
  return (
    <div 
      className={`${styles.container} ${styles.errorBorder}`}
      role="alert"
      aria-label="Booking Error Notice"
    >
      <div className={`${styles.iconCircle} ${styles.errorIconCircle}`}>
        <XCircle size={40} strokeWidth={2.5} aria-hidden="true" />
      </div>

      <h2 className={styles.title}>Submission Failed</h2>
      <p className={styles.message}>{message}</p>

      <div className={styles.actionGroup}>
        {onGoBack && (
          <SecondaryButton onClick={onGoBack}>
            <ChevronLeft size={16} aria-hidden="true" />
            <span>Modify Details</span>
          </SecondaryButton>
        )}
        {onRetry && (
          <PrimaryButton onClick={onRetry}>
            <RefreshCw size={16} aria-hidden="true" />
            <span>Retry Booking</span>
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(ErrorMessage);
