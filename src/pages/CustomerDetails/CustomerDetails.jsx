import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { 
  validateName, 
  validateMobile, 
  validateEmail, 
  validateCity, 
  validateAddress 
} from '../../utils/validation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressStepper from '../../components/ProgressStepper/ProgressStepper';
import FormInput from '../../components/FormInput/FormInput';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import styles from './CustomerDetails.module.css';

/**
 * Step 2: Customer Information Page.
 * Collects name, email, mobile, city, and address with real-time feedback and validation guards.
 */
const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerDetails, updateCustomerDetails } = useBooking();

  // Local state for validation errors
  const [errors, setErrors] = useState({
    name: null,
    mobile: null,
    email: null,
    city: null,
    address: null
  });

  // Local state for tracking touched fields (to avoid premature error showing)
  const [touched, setTouched] = useState({
    name: false,
    mobile: false,
    email: false,
    city: false,
    address: false
  });

  // Re-usable field validation runner
  const validateField = useCallback((field, value) => {
    let errorMsg = null;
    switch (field) {
      case 'name':
        errorMsg = validateName(value);
        break;
      case 'mobile':
        errorMsg = validateMobile(value);
        break;
      case 'email':
        errorMsg = validateEmail(value);
        break;
      case 'city':
        errorMsg = validateCity(value);
        break;
      case 'address':
        errorMsg = validateAddress(value);
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
    return errorMsg;
  }, []);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    // Update global booking state
    updateCustomerDetails({ [field]: value });
    
    // Validate in real-time if field has been touched or has content
    if (touched[field] || value.length > 0) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => (e) => {
    const { value } = e.target;
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  // Determine if the entire form is valid
  const isFormValid = useMemo(() => {
    // Check if there are any error messages
    const hasErrors = Object.values(errors).some(err => err !== null);
    
    // Check if any field is empty
    const hasEmptyFields = Object.values(customerDetails).some(val => !val || val.trim() === '');
    
    return !hasErrors && !hasEmptyFields;
  }, [errors, customerDetails]);

  const handleNext = (e) => {
    e.preventDefault();
    
    // Final check: Validate all fields on submit
    const finalErrors = {
      name: validateName(customerDetails.name),
      mobile: validateMobile(customerDetails.mobile),
      email: validateEmail(customerDetails.email),
      city: validateCity(customerDetails.city),
      address: validateAddress(customerDetails.address)
    };

    setErrors(finalErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      city: true,
      address: true
    });

    const isAllValid = Object.values(finalErrors).every(err => err === null);
    
    if (isAllValid && isFormValid) {
      navigate('/select-date');
    }
  };

  const handleBack = () => {
    navigate('/select-service');
  };

  return (
    <main className={`${styles.pageWrapper} container`}>
      <ProgressStepper currentStepKey="customer" />
      
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Customer Information</h1>
        <p className={styles.subtitle}>Please provide your contact details for the booking reference.</p>
      </div>

      <form onSubmit={handleNext} className={styles.formCard} noValidate>
        <div className={styles.formGrid}>
          {/* Full Name */}
          <div className={styles.fullWidth}>
            <FormInput
              id="cust-name"
              label="Full Name"
              value={customerDetails.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name ? errors.name : null}
              placeholder="Eg: Ken Block"
              required={true}
              autoComplete="name"
            />
          </div>

          {/* Email Address */}
          <FormInput
            id="cust-email"
            label="Email Address"
            type="email"
            value={customerDetails.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email ? errors.email : null}
            placeholder="eg : k.n.neeraj2703@gmail.com"
            required={true}
            autoComplete="email"
          />

          {/* Mobile Number */}
          <FormInput
            id="cust-mobile"
            label="Mobile Number"
            type="tel"
            value={customerDetails.mobile}
            onChange={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            error={touched.mobile ? errors.mobile : null}
            placeholder="10 digit number (e.g. 9876543210)"
            required={true}
            autoComplete="tel"
          />

          {/* City */}
          <div className={styles.fullWidth}>
            <FormInput
              id="cust-city"
              label="City"
              value={customerDetails.city}
              onChange={handleChange('city')}
              onBlur={handleBlur('city')}
              error={touched.city ? errors.city : null}
              placeholder="eg : Hyd City"
              required={true}
            />
          </div>

          {/* Address */}
          <div className={styles.fullWidth}>
            <FormInput
              id="cust-address"
              label="Street Address"
              type="textarea"
              value={customerDetails.address}
              onChange={handleChange('address')}
              onBlur={handleBlur('address')}
              error={touched.address ? errors.address : null}
              placeholder="100 Throttle Way, Suite A"
              required={true}
              rows={2}
            />
          </div>
        </div>

        <div className={styles.actionFooter}>
          <SecondaryButton onClick={handleBack} type="button">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Previous Step</span>
          </SecondaryButton>
          
          <PrimaryButton 
            type="submit" 
            disabled={!isFormValid}
            ariaLabel="Continue to date selection"
          >
            <span>Continue</span>
            <ArrowRight size={16} aria-hidden="true" />
          </PrimaryButton>
        </div>
      </form>
    </main>
  );
};

export default CustomerDetails;
