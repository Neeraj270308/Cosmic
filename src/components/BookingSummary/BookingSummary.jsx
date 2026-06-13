import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { formatDisplayDate } from '../../utils/dateHelpers';
import { Edit2, User, Calendar, Settings } from 'lucide-react'; // Removed unused FileText import
import styles from './BookingSummary.module.css';

const SERVICE_TITLES = {
  ride: 'Bike Test Ride',
  purchase: 'Bike Purchase Consultation',
  service: 'Bike Service Appointment'
};

const BookingSummary = () => {
  const navigate = useNavigate();
  // Safe default fallback array/objects can also be destructured or guarded directly
  const { selectedService, customerDetails, selectedDate, selectedTimeSlot } = useBooking();

  const serviceLabel = useMemo(() => {
    return SERVICE_TITLES[selectedService] || 'Not Selected';
  }, [selectedService]);

  const formattedDate = useMemo(() => {
    return selectedDate ? formatDisplayDate(selectedDate) : 'Not Selected';
  }, [selectedDate]);

  return (
    <div className={styles.summaryCard} aria-label="Booking Reservation Details">
      
      {/* 1. Selected Service */}
      <section className={styles.section} aria-labelledby="summary-service-title">
        <div className={styles.sectionHeader}>
          <h3 id="summary-service-title" className={styles.sectionTitle}>
            <Settings className={styles.sectionIcon} size={18} aria-hidden="true" />
            <span>Appointment Type</span>
          </h3>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => navigate('/select-service')}
            aria-label="Edit appointment type"
          >
            <Edit2 size={13} aria-hidden="true" />
            <span>Edit</span>
          </button>
        </div>
        <div className={styles.serviceValueBlock}>
          <div className={styles.serviceDot} role="presentation"></div>
          <span className={styles.infoValue}>{serviceLabel}</span>
        </div>
      </section>

      {/* 2. Customer Details */}
      <section className={styles.section} aria-labelledby="summary-customer-title">
        <div className={styles.sectionHeader}>
          <h3 id="summary-customer-title" className={styles.sectionTitle}>
            <User className={styles.sectionIcon} size={18} aria-hidden="true" />
            <span>Customer Details</span>
          </h3>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => navigate('/customer-details')}
            aria-label="Edit customer details"
          >
            <Edit2 size={13} aria-hidden="true" />
            <span>Edit</span>
          </button>
        </div>
        <div className={styles.grid}>
          {/* FIX: Added optional chaining (?.) and fallback string triggers ('—') to prevent crash */}
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Full Name</span>
            <span className={styles.infoValue}>{customerDetails?.name ?? '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Mobile Number</span>
            <span className={styles.infoValue}>{customerDetails?.mobile ?? '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email Address</span>
            <span className={styles.infoValue}>{customerDetails?.email ?? '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>City</span>
            <span className={styles.infoValue}>{customerDetails?.city ?? '—'}</span>
          </div>
          <div className={`${styles.infoItem} ${styles.addressValue}`}>
            <span className={styles.infoLabel}>Street Address</span>
            <span className={styles.infoValue}>{customerDetails?.address ?? '—'}</span>
          </div>
        </div>
      </section>

      {/* 3. Date & Time Selection */}
      <section className={styles.section} aria-labelledby="summary-datetime-title">
        <div className={styles.sectionHeader}>
          <h3 id="summary-datetime-title" className={styles.sectionTitle}>
            <Calendar className={styles.sectionIcon} size={18} aria-hidden="true" />
            <span>Date & Time</span>
          </h3>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => navigate('/select-date')}
            aria-label="Edit appointment date and time"
          >
            <Edit2 size={13} aria-hidden="true" />
            <span>Edit</span>
          </button>
        </div>
        <div className={styles.grid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Selected Date</span>
            <span className={styles.infoValue}>{formattedDate}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Time Slot</span>
            {/* FIX: Handled dynamic unselected fallback value */}
            <span className={styles.infoValue}>{selectedTimeSlot ?? 'Not Selected'}</span>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default React.memo(BookingSummary);