import React, { useMemo } from 'react';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { formatDisplayDate } from '../../utils/dateHelpers';
import PrimaryButton from '../Button/PrimaryButton';
import styles from './Notification.module.css';

const SERVICE_LABELS = {
  ride: 'Bike Test Ride',
  purchase: 'Bike Purchase Consultation',
  service: 'Bike Service Appointment'
};

/**
 * Reusable Success message page content.
 * Displays generated Reference ID and full summary details with print and return actions.
 */
const SuccessMessage = ({ 
  referenceId, 
  message, 
  bookingData, 
  onReturnHome 
}) => {
  const serviceLabel = useMemo(() => {
    return SERVICE_LABELS[bookingData?.selectedService] || 'Dealership Appointment';
  }, [bookingData]);

  const formattedDate = useMemo(() => {
    return bookingData?.selectedDate ? formatDisplayDate(bookingData.selectedDate) : '';
  }, [bookingData]);

  return (
    <div 
      className={`${styles.container} ${styles.successBorder}`}
      role="document"
      aria-label="Booking Confirmation Success"
    >
      <div className={`${styles.iconCircle} ${styles.successIconCircle}`}>
        <CheckCircle size={40} strokeWidth={2.5} aria-hidden="true" />
      </div>

      <h2 className={styles.title}>Booking Confirmed!</h2>
      <p className={styles.message}>{message}</p>

      {/* Reference Card */}
      <div className={styles.referenceCard}>
        <span className={styles.refLabel}>Booking Reference ID</span>
        <div className={styles.refId}>{referenceId}</div>
      </div>

      {/* Appointment Summary Box */}
      <div className={styles.detailsList}>
        <h4>Appointment Details</h4>
        <div className={styles.detailRow}>
          <span className={styles.detailRowLabel}>Service Type</span>
          <span className={styles.detailRowValue}>{serviceLabel}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailRowLabel}>Date</span>
          <span className={styles.detailRowValue}>{formattedDate}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailRowLabel}>Time Slot</span>
          <span className={styles.detailRowValue}>{bookingData?.selectedTimeSlot}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailRowLabel}>Name</span>
          <span className={styles.detailRowValue}>{bookingData?.customerDetails?.name}</span>
        </div>
      </div>

      <div className={styles.actionGroup}>
        <PrimaryButton onClick={onReturnHome}>
          <span>Return to Homepage</span>
          <ArrowRight size={16} aria-hidden="true" />
        </PrimaryButton>
      </div>
    </div>
  );
};

export default React.memo(SuccessMessage);
