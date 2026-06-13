import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { mockSubmitBooking } from '../services/bookingApi';
import { validateCustomerForm } from '../utils/validation';

const BookingContext = createContext();

const initialCustomerDetails = {
  name: '',
  mobile: '',
  email: '',
  city: '',
  address: ''
};

const LOCAL_STORAGE_KEY = 'cosmic_cruisers_appointments';

export const BookingProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBike, setSelectedBike] = useState(null);
  const [customBikeName, setCustomBikeName] = useState('');
  const [isCustomBike, setIsCustomBike] = useState(false);
  
  const [customerDetails, setCustomerDetails] = useState(initialCustomerDetails);
  
  const [vehicleReg, setVehicleReg] = useState('');
  const [odometer, setOdometer] = useState('');
  const [notes, setNotes] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Status and API Results
  const [bookingStatus, setBookingStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [bookingReference, setBookingReference] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Persistence: Appointments History
  const [appointmentsHistory, setAppointmentsHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setAppointmentsHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load appointments from localStorage', e);
    }
  }, []);

  // Save history helper
const saveAppointments = (list) => {
  setAppointmentsHistory(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(list)
    );
    return list;
  });
};

  // State Updates
  const updateService = useCallback((serviceId) => {
    setSelectedService(serviceId);
    // Clear downstream to maintain workflow consistency
    setSelectedBike(null);
    setCustomBikeName('');
    setIsCustomBike(false);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setVehicleReg('');
    setOdometer('');
    setNotes('');
  }, []);

  const updateBike = useCallback((bikeName, isCustom, customName = '') => {
    setSelectedBike(isCustom ? null : bikeName);
    setIsCustomBike(isCustom);
    setCustomBikeName(customName);
    // Clear date/time on bike change
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  }, []);

  const updateCustomerDetails = useCallback((details) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  }, []);

  const updateServiceVehicleDetails = useCallback((details) => {
    if (details.vehicleReg !== undefined) setVehicleReg(details.vehicleReg);
    if (details.odometer !== undefined) setOdometer(details.odometer);
    if (details.notes !== undefined) setNotes(details.notes);
  }, []);

  const updateDate = useCallback((dateString) => {
    setSelectedDate(dateString);
    setSelectedTimeSlot(null);
  }, []);

  const updateTimeSlot = useCallback((timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  }, []);

  // Step validation checker
  const isStepComplete = useCallback((stepKey) => {
    switch (stepKey) {
      case 'service':
        return !!selectedService;
      case 'bike':
        if (!selectedService) return false;
        if (isCustomBike) {
          return customBikeName.trim().length >= 3;
        }
        return !!selectedBike;
      case 'customer':
        if (!isStepComplete('bike')) return false;
        const formErrors = validateCustomerForm(customerDetails);
        const customerFieldsValid = Object.keys(formErrors).length === 0 && 
                                   Object.values(customerDetails).every(val => val.trim() !== '');
        
        return customerFieldsValid;
      case 'date':
        return isStepComplete('customer') && !!selectedDate;
      case 'time':
        return isStepComplete('date') && !!selectedTimeSlot;
      case 'summary':
        return isStepComplete('time');
      case 'status':
        return bookingStatus !== 'idle';
      default:
        return false;
    }
  }, [
    selectedService, 
    selectedBike, 
    isCustomBike, 
    customBikeName, 
    customerDetails, 
    selectedDate, 
    selectedTimeSlot, 
    bookingStatus
  ]);

  // Async submission flow
  const submitBooking = useCallback(async (forceFail = false) => {
    setBookingStatus('submitting');
    setErrorMessage(null);

    const payload = {
      selectedService,
      selectedBike: isCustomBike ? customBikeName : selectedBike,
      customerDetails,
      vehicleDetails: selectedService === 'service' ? { vehicleReg, odometer, notes } : null,
      selectedDate,
      selectedTimeSlot
    };

    try {
      const response = await mockSubmitBooking(payload, forceFail);
      
      const newAppointment = {
        id: response.referenceId,
        serviceType: selectedService,
        bike: isCustomBike ? customBikeName : selectedBike,
        date: selectedDate,
        time: selectedTimeSlot,
        customerDetails: { ...customerDetails },
        vehicleDetails: selectedService === 'service' ? { vehicleReg, odometer, notes } : null,
        status: 'Confirmed',
        timestamp: response.timestamp
      };

      // Add to list and save
    const storedAppointments = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
);

const updatedList = [newAppointment, ...storedAppointments];

saveAppointments(updatedList);

      setBookingReference(response.referenceId);
      setBookingStatus('success');

      // Trigger EmailJS notification asynchronously
      triggerEmailNotification(newAppointment);

      return response;
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit reservation. Please try again.');
      setBookingStatus('error');
      throw err;
    }
  }, [
    selectedService,
    selectedBike,
    isCustomBike,
    customBikeName,
    customerDetails,
    vehicleReg,
    odometer,
    notes,
    selectedDate,
    selectedTimeSlot,
    appointmentsHistory
  ]);

  // EmailJS Integration
  const triggerEmailNotification = async (appointment) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS environment keys are not fully configured. Email notification skipped.');
      return;
    }

    const serviceLabels = {
      ride: 'Bike Test Ride',
      purchase: 'Bike Purchase Consultation',
      service: 'Bike Service Appointment'
    };

    const templateParams = {
      booking_id: appointment.id,
      service_type: serviceLabels[appointment.serviceType] || appointment.serviceType,
      bike_name: appointment.bike,
      date: appointment.date,
      time: appointment.time,
      customer_name: appointment.customerDetails.name,
      customer_email: appointment.customerDetails.email,
      customer_phone: appointment.customerDetails.mobile
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('EmailJS: Real email confirmation notification dispatched!');
    } catch (err) {
      console.error('EmailJS: Failed to dispatch email notification:', err);
    }
  };

  // Cancel an appointment in history
  const cancelAppointment = useCallback((refId) => {
    const updated = appointmentsHistory.map(appt => {
      if (appt.id === refId) {
        return { ...appt, status: 'Cancelled' };
      }
      return appt;
    });
    saveAppointments(updated);
  }, [appointmentsHistory]);

  // Rebook an appointment
  const rebookAppointment = useCallback((appt) => {
    setSelectedService(appt.serviceType);
    setSelectedBike(appt.bike);
    setIsCustomBike(false); // Defaulting custom name parsing
    setCustomBikeName('');
    
    // Check if appointment bike was custom
    // If it is not in our known list, we can treat it as custom bike
    setCustomerDetails(appt.customerDetails);
    
    if (appt.serviceType === 'service' && appt.vehicleDetails) {
      setVehicleReg(appt.vehicleDetails.vehicleReg || '');
      setOdometer(appt.vehicleDetails.odometer || '');
      setNotes(appt.vehicleDetails.notes || '');
    } else {
      setVehicleReg('');
      setOdometer('');
      setNotes('');
    }

    // Reset date/time to force new selection
    setSelectedDate(null);
    setSelectedTimeSlot(null);

    setBookingStatus('idle');
    setBookingReference(null);
    setErrorMessage(null);
  }, []);

  // Clear current wizard inputs (starts a fresh booking wizard)
  const resetBooking = useCallback(() => {
    setSelectedService(null);
    setSelectedBike(null);
    setCustomBikeName('');
    setIsCustomBike(false);
    setCustomerDetails(initialCustomerDetails);
    setVehicleReg('');
    setOdometer('');
    setNotes('');
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setBookingStatus('idle');
    setBookingReference(null);
    setErrorMessage(null);
  }, []);

 const contextValue = {
  selectedService,
  selectedBike,
  customBikeName,
  isCustomBike,

  customerDetails,

  vehicleReg,
  odometer,
  notes,

  selectedDate,
  selectedTimeSlot,

  bookingStatus,
  bookingReference,
  errorMessage,

  appointmentsHistory,

  updateService,
  updateBike,
  updateCustomerDetails,
  updateServiceVehicleDetails,
  updateDate,
  updateTimeSlot,

  submitBooking,
  cancelAppointment,
  rebookAppointment,
  resetBooking,

  isStepComplete
};
  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
