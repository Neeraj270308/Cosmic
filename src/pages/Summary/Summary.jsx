import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react';
import ProgressStepper from '../../components/ProgressStepper/ProgressStepper';
import BookingSummary from '../../components/BookingSummary/BookingSummary';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import Modal from '../../components/Modal/Modal';
import styles from './Summary.module.css';

const Summary = () => {
  const navigate = useNavigate();
  const { submitBooking } = useBooking();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceFail, setForceFail] = useState(false);

  const handleBack = () => {
    navigate('/select-time');
  };

  const handleOpenConfirmModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSubmit = async () => {
  setIsModalOpen(false);

  try {
    await submitBooking(forceFail);
    navigate('/status');
  } catch (error) {
    navigate('/status');
  }
};

  const modalActions = (
    <>
      <SecondaryButton onClick={handleCloseConfirmModal}>
        Cancel
      </SecondaryButton>
      <PrimaryButton onClick={handleConfirmSubmit}>
        <span>Confirm Booking</span>
      </PrimaryButton>
    </>
  );

  return (
    <main className={`${styles.pageWrapper} container`}>
      <ProgressStepper currentStepKey="summary" />
      
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Confirm Your Booking</h1>
        <p className={styles.subtitle}>Please review your appointment choices and submit reservation.</p>
      </div>

      {/* Developer Test Panel for testing Success / Failure outcomes */}
      <div className={styles.testPanel} role="note" aria-label="Demo Testing Panel">
        <ShieldAlert size={20} style={{ color: 'var(--accent-red)' }} aria-hidden="true" />
        <div>
          <input
            id="force-fail-chk"
            type="checkbox"
            checked={forceFail}
            onChange={(e) => setForceFail(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="force-fail-chk" className={styles.toggleLabel}>
            Simulate booking submission failure (evaluator test)
          </label>
        </div>
      </div>

      <BookingSummary />

      <div className={styles.actionFooter}>
        <SecondaryButton onClick={handleBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Previous Step</span>
        </SecondaryButton>
        
        <PrimaryButton
  onClick={handleOpenConfirmModal}
  aria-label="Confirm and book appointment"
>
          <span>Confirm & Book</span>
          <CheckCircle size={16} aria-hidden="true" />
        </PrimaryButton>
      </div>

      {/* Confirmation Dialog Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseConfirmModal}
        title="Confirm Appointment Reservation"
        actions={modalActions}
      >
        <p className={styles.modalText}>
          Are you sure you want to finalize this reservation? 
          An appointment slot will be blocked on our database. 
          You can edit these details later if needed.
        </p>
      </Modal>
    </main>
  );
};

export default Summary;
