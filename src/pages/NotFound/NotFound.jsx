import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={`${styles.wrapper} container`} role="alert" aria-label="Page Not Found Error">
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Lost Your Track?</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved. 
        Use the buttons below to get back on the road.
      </p>

      <div className={styles.actions}>
        <SecondaryButton onClick={() => navigate('/')}>
          <Home size={16} aria-hidden="true" />
          <span>Return Home</span>
        </SecondaryButton>
        <PrimaryButton onClick={() => navigate('/select-service')}>
          <Compass size={16} aria-hidden="true" />
          <span>Book Appointment</span>
        </PrimaryButton>
      </div>
    </main>
  );
};

export default NotFound;
