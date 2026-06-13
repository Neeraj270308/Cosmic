import React from 'react';
import { Check } from 'lucide-react';
import styles from './ServiceCard.module.css';

/**
 * Reusable Service Card component with hover scaling, keyboard triggers, and visual selected indications.
 */
const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  badge, 
  selected = false, 
  onClick 
}) => {
  const handleKeyDown = (e) => {
    // Accessibility: Activate on Enter or Space keys
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="radio"
      aria-checked={selected}
      aria-label={`${title}. ${description} ${badge ? `Duration: ${badge}` : ''}`}
    >
      {selected && (
        <div className={styles.selectedIndicator}>
          <Check size={12} className={styles.selectedCheck} strokeWidth={3} aria-hidden="true" />
        </div>
      )}

      {Icon && (
        <div className={styles.iconWrapper}>
          <Icon size={24} aria-hidden="true" />
        </div>
      )}

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      {badge && <span className={styles.badge}>{badge}</span>}
    </div>
  );
};

export default React.memo(ServiceCard);
