import React from 'react';
import { Clock } from 'lucide-react';
import styles from './TimeSlotSelector.module.css';

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM'
];

/**
 * Reusable Time Slot Selector Grid.
 * Displays 8 standard dealership slots with accessible ARIA radiogroup roles.
 */
const TimeSlotSelector = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <div 
        className={styles.grid}
        role="radiogroup"
        aria-label="Available appointment time slots"
      >
        {TIME_SLOTS.map((slot) => {
          const isSelected = value === slot;
          
          return (
            <button
              key={slot}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.slotBtn} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(slot)}
              aria-label={`Select time slot ${slot}`}
            >
              <Clock size={18} className={isSelected ? styles.selectedIcon : ''} aria-hidden="true" />
              <span className={styles.timeText}>{slot}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TimeSlotSelector);
