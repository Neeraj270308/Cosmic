import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './FormInput.module.css';

/**
 * Reusable accessible Form Input component.
 * Supports standard text input types and textareas.
 */
const FormInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  rows = 3,
  ...props
}) => {
  const isTextarea = type === 'textarea';
  
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label 
          htmlFor={id} 
          className={`${styles.label} ${error ? styles.labelError : ''}`}
        >
          {label} {required && <span aria-hidden="true" style={{ color: 'var(--accent-red)' }}>*</span>}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      )}
      
      {error && (
        <span 
          id={`${id}-error`} 
          className={styles.errorMessage} 
          role="alert"
        >
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
};

export default React.memo(FormInput);
