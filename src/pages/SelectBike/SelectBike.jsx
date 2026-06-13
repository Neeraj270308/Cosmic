import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressStepper from '../../components/ProgressStepper/ProgressStepper';
import FormInput from '../../components/FormInput/FormInput';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import styles from './SelectBike.module.css';

const BIKE_CATEGORIES = {
  "Sports Bikes": [
    "TVS Apache RR 310",
    "KTM RC 390",
    "Yamaha R15 V4",
    "Bajaj Pulsar RS200"
  ],
  "Street Bikes": [
    "TVS Apache RTR 200",
    "Bajaj Pulsar N250",
    "Yamaha MT-15",
    "Hero Xtreme 160R"
  ],
  "Cruisers": [
    "Royal Enfield Classic 350",
    "Royal Enfield Meteor 350",
    "Jawa 42",
    "Honda Hness CB350"
  ],
  "Adventure Bikes": [
    "Royal Enfield Himalayan 450",
    "KTM Adventure 390",
    "Suzuki V-Strom SX",
    "Hero Xpulse 200"
  ],
  "Premium Bikes": [
    "Kawasaki Ninja ZX-6R",
    "Kawasaki Z900",
    "BMW G310R",
    "Triumph Street Triple RS"
  ]
};

const SelectBike = () => {
  const navigate = useNavigate();
  const { 
    selectedBike, 
    customBikeName, 
    isCustomBike, 
    updateBike 
  } = useBooking();

  const [localBike, setLocalBike] = useState(selectedBike || '');
  const [localIsCustom, setLocalIsCustom] = useState(isCustomBike);
  const [localCustomName, setLocalCustomName] = useState(customBikeName || '');
  const [customError, setCustomError] = useState(null);

  useEffect(() => {
    setLocalBike(selectedBike || '');
    setLocalIsCustom(isCustomBike);
    setLocalCustomName(customBikeName || '');
  }, [selectedBike, isCustomBike, customBikeName]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setLocalIsCustom(checked);
    if (!checked) {
      setCustomError(null);
    } else {
      if (localCustomName.trim().length < 3) {
        setCustomError('Custom bike model must be at least 3 characters.');
      }
    }
  };

  const handleDropdownChange = (e) => {
    setLocalBike(e.target.value);
  };

  const handleCustomNameChange = (e) => {
    const val = e.target.value;
    setLocalCustomName(val);
    
    if (val.trim() === '') {
      setCustomError('Custom bike model name is required.');
    } else if (val.trim().length < 3) {
      setCustomError('Name must be at least 3 characters.');
    } else {
      setCustomError(null);
    }
  };

  const isValid = useMemo(() => {
    if (localIsCustom) {
      return localCustomName.trim().length >= 3;
    }
    return localBike !== '';
  }, [localIsCustom, localCustomName, localBike]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      updateBike(
        localIsCustom ? null : localBike,
        localIsCustom,
        localIsCustom ? localCustomName : ''
      );
      navigate('/customer-details');
    }
  };

  const handleBack = () => {
    navigate('/select-service');
  };

  return (
    <main className={`${styles.pageWrapper} container`}>
      <ProgressStepper currentStepKey="bike" />
      
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Select Motorcycle</h1>
        <p className={styles.subtitle}>Choose the bike model relating to this booking.</p>
      </div>

      <form onSubmit={handleNext} className={styles.card} noValidate>
        
        {/* Curated Dropdown List (Grouped) */}
        <div className={styles.formGroup} style={{ opacity: localIsCustom ? 0.4 : 1 }}>
          <label htmlFor="bike-select" className={styles.label}>Motorcycle Model</label>
          <select
            id="bike-select"
            value={localBike}
            onChange={handleDropdownChange}
            disabled={localIsCustom}
            className={styles.select}
          >
            <option value="">-- Choose a Bike --</option>
            {Object.keys(BIKE_CATEGORIES).map((category) => (
              <optgroup key={category} label={category}>
                {BIKE_CATEGORIES[category].map((bike) => (
                  <option key={bike} value={bike}>
                    {bike}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Checkbox "My Bike Is Not Listed" */}
        <div className={styles.checkboxContainer}>
          <input
            id="bike-custom-chk"
            type="checkbox"
            checked={localIsCustom}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <label htmlFor="bike-custom-chk" className={styles.checkboxLabel}>
            My motorcycle model is not in this list
          </label>
        </div>

        {/* Custom Text input if checked */}
        {localIsCustom && (
          <div className={styles.customInputWrapper}>
            <FormInput
              id="custom-bike-input"
              label="Enter Custom Motorcycle Name"
              value={localCustomName}
              onChange={handleCustomNameChange}
              error={customError}
              placeholder="e.g. Yamaha R6, Custom Bobber"
              required={true}
            />
          </div>
        )}

        <div className={styles.actionFooter}>
          <SecondaryButton onClick={handleBack} type="button">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Previous Step</span>
          </SecondaryButton>
          
          <PrimaryButton 
            type="submit" 
            disabled={!isValid}
            ariaLabel="Continue to customer details"
          >
            <span>Continue</span>
            <ArrowRight size={16} aria-hidden="true" />
          </PrimaryButton>
        </div>
      </form>
    </main>
  );
};

export default SelectBike;
