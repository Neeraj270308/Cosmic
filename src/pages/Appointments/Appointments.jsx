import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Eye, AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { formatDisplayDate } from '../../utils/dateHelpers';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import Modal from '../../components/Modal/Modal';
import styles from './Appointments.module.css';

const SERVICE_LABELS = {
  ride: 'Bike Test Ride',
  purchase: 'Bike Purchase Consultation',
  service: 'Bike Service Appointment'
};

const Appointments = () => {
  const navigate = useNavigate();
  const { 
    appointmentsHistory, 
    cancelAppointment, 
    rebookAppointment 
  } = useBooking();

  const [activeAppt, setActiveAppt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = useCallback((appt) => {
    setActiveAppt(appt);
    setIsModalOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsModalOpen(false);
    setActiveAppt(null);
  }, []);

  const handleRebook = useCallback((appt) => {
    rebookAppointment(appt);
    navigate('/select-date');
  }, [rebookAppointment, navigate]);

  const activeApptFormattedDate = useMemo(() => {
    return activeAppt ? formatDisplayDate(activeAppt.date) : '';
  }, [activeAppt]);

  return (
    <motion.main 
      className={`${styles.pageWrapper} container`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.titleBlock}>
        <span style={{ color: 'var(--accent-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Calendar size={16} aria-hidden="true" />
          <span>RIDER PORTAL</span>
        </span>
        <h1 className={styles.title}>My Appointments</h1>
        <p className={styles.subtitle}>View, manage, and reschedule your cosmic reservation bookings.</p>
      </div>

      <AnimatePresence mode="wait">
        {appointmentsHistory.length === 0 ? (
          <motion.div 
            key="empty"
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={48} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
            <h2 className={styles.emptyTitle}>No Reservations Scheduled</h2>
            <p className={styles.emptyText}>
              You haven't booked any test rides, consultations, or maintenance slots yet. 
              Get started below!
            </p>
            <PrimaryButton onClick={() => navigate('/select-service')}>
              Start Booking
            </PrimaryButton>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            className={styles.list}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {appointmentsHistory.map((appt) => {
              const isConfirmed = appt.status === 'Confirmed';
              const serviceLabel = SERVICE_LABELS[appt.serviceType] || appt.serviceType;
              const formattedDate = formatDisplayDate(appt.date);

              return (
                <motion.div 
                  key={appt.id}
                  layout
                  className={styles.appointmentCard}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <div className={styles.infoSection}>
                    <div className={styles.headerRow}>
                      <span className={styles.refCode}>{appt.id}</span>
                      <span className={`${styles.statusBadge} ${
                        isConfirmed ? styles.statusConfirmed : styles.statusCancelled
                      }`}>
                        {appt.status}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {serviceLabel}
                      </span>
                    </div>

                    <div className={styles.bikeName}>{appt.bike}</div>

                    <div className={styles.dateTimeRow}>
                      <span>
                        <Calendar size={14} aria-hidden="true" />
                        {formattedDate}
                      </span>
                      <span>
                        <Clock size={14} aria-hidden="true" />
                        {appt.time}
                      </span>
                    </div>
                  </div>

                  <div className={styles.btnGroup}>
                    {/* FIX: Changed ariaLabel to aria-label */}
                    <SecondaryButton onClick={() => handleOpenDetails(appt)} aria-label={`View details for booking ${appt.id}`}>
                      <Eye size={14} aria-hidden="true" />
                      <span>Details</span>
                    </SecondaryButton>

                    {isConfirmed ? (
                      /* FIX: Changed ariaLabel to aria-label */
                      <SecondaryButton 
                        onClick={() => cancelAppointment(appt.id)}
                        aria-label={`Cancel appointment ${appt.id}`}
                      >
                        <XCircle size={14} style={{ color: 'var(--accent-red)' }} aria-hidden="true" />
                        <span style={{ color: 'var(--accent-red)' }}>Cancel</span>
                      </SecondaryButton>
                    ) : (
                      /* FIX: Changed ariaLabel to aria-label */
                      <PrimaryButton onClick={() => handleRebook(appt)} aria-label={`Reschedule booking ${appt.id}`}>
                        <RefreshCw size={14} aria-hidden="true" />
                        <span>Rebook</span>
                      </PrimaryButton>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Detail Popup Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseDetails}
        title="Reservation Details"
        actions={<SecondaryButton onClick={handleCloseDetails}>Close</SecondaryButton>}
      >
        {activeAppt && (
          <div className={styles.modalDetailsBlock}>
            {/* Appointment metadata */}
            <div className={styles.modalSection}>
              <div className={styles.modalSubTitle}>Reservation Header</div>
              <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Reference ID</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{activeAppt.id}</span>
              </div>
              <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service Category</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{SERVICE_LABELS[activeAppt.serviceType]}</span>
              </div>
              <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span style={{ fontWeight: 700, color: activeAppt.status === 'Confirmed' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {activeAppt.status}
                </span>
              </div>
            </div>

            {/* Motorcycle selection */}
            <div className={styles.modalSection}>
              <div className={styles.modalSubTitle}>Motorcycle Selection</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeAppt.bike}</div>
              
              {activeAppt.serviceType === 'service' && activeAppt.vehicleDetails && (
                <div className={styles.modalGrid} style={{ marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registration Number</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {activeAppt.vehicleDetails.vehicleReg || 'N/A'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Odometer Reading</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {activeAppt.vehicleDetails.odometer ? `${activeAppt.vehicleDetails.odometer} km` : 'N/A'}
                    </span>
                  </div>
                  {activeAppt.vehicleDetails.notes && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Diagnostic Notes</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        {activeAppt.vehicleDetails.notes}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Schedule Slot */}
            <div className={styles.modalSection}>
              <div className={styles.modalSubTitle}>Schedule Slot</div>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: 'var(--accent-red)' }} aria-hidden="true" />
                  {activeApptFormattedDate}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Clock size={14} style={{ color: 'var(--accent-red)' }} aria-hidden="true" />
                  {activeAppt.time}
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className={styles.modalSection}>
              <div className={styles.modalSubTitle}>Customer Contact</div>
              <div className={styles.modalGrid}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Name</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activeAppt.customerDetails.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activeAppt.customerDetails.mobile}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activeAppt.customerDetails.email}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Address</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {activeAppt.customerDetails.address}, {activeAppt.customerDetails.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.main>
  );
};

export default Appointments;