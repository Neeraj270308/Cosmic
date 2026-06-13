import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressStepper from '../../components/ProgressStepper/ProgressStepper';
import TimeSlotSelector from '../../components/TimeSlotSelector/TimeSlotSelector';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import styles from './SelectTime.module.css';

/**
 * Step 4: Time Selection Page.
 * Displays 8 selectable hour slots and binds them to the context state.
 */
const SelectTime = () => {
  const navigate = useNavigate();
  const { selectedTimeSlot, updateTimeSlot } = useBooking();

  const handleNext = () => {
    if (selectedTimeSlot) {
      navigate('/summary');
    }
  };

  const handleBack = () => {
    navigate('/select-date');
  };

  return (
    <main className={`${styles.pageWrapper} container`}>
      <ProgressStepper currentStepKey="time" />
      
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Select Time</h1>
        <p className={styles.subtitle}>Choose one available time slot for your appointment.</p>
      </div>

      <div className={styles.timeCard}>
        <TimeSlotSelector 
          value={selectedTimeSlot} 
          onChange={updateTimeSlot} 
        />
        
        <div className={styles.selectedDisplay}>
          {selectedTimeSlot ? (
            <p>Selected Slot: <strong>{selectedTimeSlot}</strong></p>
          ) : (
            <p>Please select a time slot from the grid</p>
          )}
        </div>

        <div className={styles.actionFooter}>
          <SecondaryButton onClick={handleBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Previous Step</span>
          </SecondaryButton>
          
          <PrimaryButton 
            onClick={handleNext} 
            disabled={!selectedTimeSlot}
            ariaLabel="Continue to booking summary"
          >
            <span>Continue</span>
            <ArrowRight size={16} aria-hidden="true" />
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
};

export default SelectTime;
