import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressStepper from '../../components/ProgressStepper/ProgressStepper';
import DatePicker from '../../components/DatePicker/DatePicker';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import styles from './SelectDate.module.css';

/**
 * Step 3: Date Selection Page.
 * Renders the calendar, disabling past dates.
 */
const SelectDate = () => {
  const navigate = useNavigate();
  const { selectedDate, updateDate } = useBooking();

  // FIX: Stricter validation ensuring selectedDate is explicitly a non-empty string
  const isValidDateSelected = typeof selectedDate === 'string' && selectedDate.trim() !== '';

  const handleNext = () => {
    if (isValidDateSelected) {
      navigate('/select-time');
    }
  };

  const handleBack = () => {
    navigate('/customer-details');
  };

  return (
    <main className={`${styles.pageWrapper} container`}>
      <ProgressStepper currentStepKey="date" />
      
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Select Date</h1>
        <p className={styles.subtitle}>Choose an available appointment date from the calendar grid.</p>
      </div>

      <div className={styles.calendarCard}>
        <DatePicker 
          value={selectedDate} 
          onChange={updateDate} 
        />
        
        <div className={styles.actionFooter}>
          <SecondaryButton onClick={handleBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Previous Step</span>
          </SecondaryButton>
          
          <PrimaryButton 
            onClick={handleNext} 
            // FIX: Uses strict boolean validation to ensure button disables properly
            disabled={!isValidDateSelected}
            aria-label="Continue to time selection"
          >
            <span>Continue</span>
            <ArrowRight size={16} aria-hidden="true" />
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
};

export default SelectDate;