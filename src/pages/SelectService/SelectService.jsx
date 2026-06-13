import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { Bike, Coins, Wrench, ArrowRight, ArrowLeft } from 'lucide-react';
import ProgressStepper from '../../components/ProgressStepper/ProgressStepper';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import styles from './SelectService.module.css';

/**
 * Step 1: Appointment Type Selection Page.
 * Allows user to choose a category, highlighting previous state if they went back.
 */
const SelectService = () => {
  const navigate = useNavigate();
  const { selectedService, updateService } = useBooking();

  const handleNext = () => {
    if (selectedService) {
      navigate('/select-bike');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className={`${styles.pageWrapper} container`}>
      <ProgressStepper currentStepKey="service" />
      
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Select Booking Category</h1>
        <p className={styles.subtitle}>Choose the type of appointment you would like to reserve below.</p>
      </div>

      <div 
        className={styles.grid}
        role="radiogroup" 
        aria-label="Appointment categories"
      >
        <ServiceCard
          icon={Bike}
          title="Bike Test Ride"
          description="Experience the raw power and agile handling of our latest motorcycle lineup. Book a 30-minute demonstration on open roads."
          badge="30 Mins"
          selected={selectedService === 'ride'}
          onClick={() => updateService('ride')}
        />
        
        <ServiceCard
          icon={Coins}
          title="Bike Purchase Booking"
          description="Sit down with our retail consultants. Explore finance configurations, custom modifications, and trade-in valuations."
          badge="45 Mins"
          selected={selectedService === 'purchase'}
          onClick={() => updateService('purchase')}
        />
        
        <ServiceCard
          icon={Wrench}
          title="Bike Service Booking"
          description="Keep your engine in peak performance. Schedule maintenance checkups, fluid flushes, or certified parts replacements."
          badge="1-3 Hours"
          selected={selectedService === 'service'}
          onClick={() => updateService('service')}
        />
      </div>

      <div className={styles.actionFooter}>
        <SecondaryButton onClick={handleBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Home</span>
        </SecondaryButton>
        
        <PrimaryButton 
          onClick={handleNext} 
          disabled={!selectedService}
          ariaLabel="Continue to customer details"
        >
          <span>Continue</span>
          <ArrowRight size={16} aria-hidden="true" />
        </PrimaryButton>
      </div>
    </main>
  );
};

export default SelectService;
