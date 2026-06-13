import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { Check } from 'lucide-react';
import styles from './ProgressStepper.module.css';

const STEPS = [
  { key: 'service', label: 'Service', path: '/select-service' },
  { key: 'bike', label: 'Select Bike', path: '/select-bike' },
  { key: 'customer', label: 'Details', path: '/customer-details' },
  { key: 'date', label: 'Date', path: '/select-date' },
  { key: 'time', label: 'Time', path: '/select-time' },
  { key: 'summary', label: 'Summary', path: '/summary' }
];

/**
 * 6-stage wizard progress stepper with completion percentage tracking.
 */
const ProgressStepper = ({ currentStepKey }) => {
  const navigate = useNavigate();
  const { isStepComplete } = useBooking();

  const currentStepIndex = useMemo(() => {
    return STEPS.findIndex(step => step.key === currentStepKey);
  }, [currentStepKey]);

  // Compute progress bar percentage (0% to 100%)
  const progressPercent = useMemo(() => {
    if (currentStepIndex <= 0) return 0;
    return (currentStepIndex / (STEPS.length - 1)) * 100;
  }, [currentStepIndex]);

  // Calculate actual form completion percentage (1-based steps)
  const completionPercent = useMemo(() => {
    return Math.round(((currentStepIndex + 1) / STEPS.length) * 100);
  }, [currentStepIndex]);

  // Check navigation allowance
  const isClickable = (index, stepKey) => {
    if (index === currentStepIndex) return false;
    if (isStepComplete(stepKey)) return true;
    if (index === 0) return true;
    return index > 0 && isStepComplete(STEPS[index - 1].key);
  };

  const handleStepClick = (path, index, stepKey) => {
    if (isClickable(index, stepKey)) {
      navigate(path);
    }
  };

  return (
    <nav className={styles.stepperContainer} aria-label="Booking Progress Wizard">
      {/* Desktop Stepper view */}
      <ul className={styles.stepperList}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progressPercent}%` }}
          role="presentation"
        ></div>
        
        {STEPS.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex || isStepComplete(step.key);
          const clickable = isClickable(index, step.key);

          return (
            <li 
              key={step.key} 
              className={styles.stepItem}
              aria-current={isActive ? 'step' : undefined}
            >
              <button
                type="button"
                className={`btn-reset ${styles.stepCircle} ${
                  isActive ? styles.activeCircle : ''
                } ${isCompleted ? styles.completedCircle : ''}`}
                onClick={() => handleStepClick(step.path, index, step.key)}
                disabled={!clickable}
                aria-label={`Step ${index + 1}: ${step.label}${isCompleted ? ', completed' : ''}`}
              >
                {isCompleted && !isActive ? (
                  <Check size={18} strokeWidth={3} aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </button>
              <span 
                className={`${styles.stepLabel} ${isActive ? styles.activeLabel : ''} ${
                  isCompleted ? styles.completedLabel : ''
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Mobile progress tracking view */}
      <div className={styles.mobileProgress}>
        <div>
          Step {currentStepIndex + 1} of {STEPS.length} ({completionPercent}% Complete): <strong>{STEPS[currentStepIndex]?.label}</strong>
        </div>
        <div className={styles.mobileBarContainer} role="presentation">
          <div 
            className={styles.mobileBarFill} 
            style={{ width: `${completionPercent}%` }}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(ProgressStepper);
