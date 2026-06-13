import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SuccessMessage from '../../components/Notification/SuccessMessage';
import ErrorMessage from '../../components/Notification/ErrorMessage';
import styles from './Status.module.css';

const Status = () => {
  const navigate = useNavigate();
  const { 
    bookingStatus, 
    bookingReference, 
    errorMessage, 
    selectedService,
    customerDetails,
    selectedDate,
    selectedTimeSlot,
    submitBooking, 
    resetBooking 
  } = useBooking();

  const handleReturnHome = useCallback(() => {
    resetBooking();
    navigate('/');
  }, [resetBooking, navigate]);

  const handleGoBack = useCallback(() => {
    navigate('/summary');
  }, [navigate]);

  const handleRetry = useCallback(async () => {
  try {
    await submitBooking(false);
  } catch (error) {
    console.log(error);
  }
}, [submitBooking]);

  return (
    <main className={`${styles.pageWrapper} container`}>
      {bookingStatus === 'submitting' && (
        <LoadingSpinner 
          message="Submitting Reservation..." 
          subMessage="Securing your selected time slot on the dealer registry"
        />
      )}

      {bookingStatus === 'success' && (
        <SuccessMessage
          referenceId={bookingReference}
          message="Appointment successfully confirmed! An email and SMS confirmation have been sent to your contact details."
          bookingData={{ selectedService, customerDetails, selectedDate, selectedTimeSlot }}
          onReturnHome={handleReturnHome}
        />
      )}

      {bookingStatus === 'error' && (
        <ErrorMessage
          message={errorMessage}
          onRetry={handleRetry}
          onGoBack={handleGoBack}
        />
      )}
    </main>
  );
};

export default Status;
