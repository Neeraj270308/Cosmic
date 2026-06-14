import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import FormInput from '../../components/FormInput/FormInput';
import PrimaryButton from '../../components/Button/PrimaryButton';
import styles from './Auth.module.css';

const Auth = () => {
  const { user, login, signUp, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Determine where to redirect after successful authentication
  const redirectPath = location.state?.from?.pathname || '/appointments';

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);

  // Clean error state on tab switch
  useEffect(() => {
    clearError();
    setErrors({});
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSuccessMsg('');
  }, [activeTab, clearError]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const validate = () => {
    const tempErrors = {};
    if (activeTab === 'signup') {
      if (!name.trim()) {
        tempErrors.name = 'Name is required.';
      } else if (name.trim().length < 2) {
        tempErrors.name = 'Name must be at least 2 characters.';
      }
    }

    if (!email.trim()) {
      tempErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!password.trim()) {
      tempErrors.password = 'Password is required.';
    } else if (password.trim().length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
    }

    if (activeTab === 'signup') {
      if (password !== confirmPassword) {
        tempErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (activeTab === 'login') {
        const res = login(email, password);
        if (res.success) {
          setSuccessMsg('Successfully logged in! Redirecting...');
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 1000);
        }
      } else {
        const res = signUp(name, email, password);
        if (res.success) {
          setSuccessMsg('Account created successfully! Redirecting...');
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 1000);
        }
      }
    } catch (err) {
      console.error('Authentication request failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main 
      className={styles.authPageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.authContainer}>
        <div className={styles.brandHeader}>
          <Bike className={styles.logoIcon} size={42} aria-hidden="true" />
          <h1 className={styles.title}>COSMIC CRUISERS</h1>
          <p className={styles.subtitle}>
            {activeTab === 'login' 
              ? 'Access your appointments portal' 
              : 'Join the fleet and reserve your ride'}
          </p>
        </div>

        <div className={styles.tabsContainer} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'login'}
            onClick={() => handleTabChange('login')}
            className={`${styles.tabButton} ${activeTab === 'login' ? styles.activeTab : ''}`}
          >
            Log In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'signup'}
            onClick={() => handleTabChange('signup')}
            className={`${styles.tabButton} ${activeTab === 'signup' ? styles.activeTab : ''}`}
          >
            Sign Up
          </button>
        </div>

        {authError && (
          <div className={styles.errorMessage} role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>{authError}</span>
          </div>
        )}

        {successMsg && (
          <div className={styles.successMessage} role="alert">
            <span>{successMsg}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.form 
            key={activeTab}
            onSubmit={handleSubmit}
            className={styles.form}
            noValidate
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'signup' && (
              <FormInput
                id="name"
                label="Full Name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />
            )}

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            {activeTab === 'signup' && (
              <FormInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                required
              />
            )}

            <PrimaryButton 
              type="submit" 
              loading={isSubmitting}
              className={styles.submitBtn}
            >
              <span>{activeTab === 'login' ? 'Log In' : 'Create Account'}</span>
              <ArrowRight size={16} aria-hidden="true" style={{ marginLeft: '0.5rem' }} />
            </PrimaryButton>
          </motion.form>
        </AnimatePresence>

        <div className={styles.footerText}>
          {activeTab === 'login' ? (
            <>
              Don't have an account?
              <button 
                type="button" 
                onClick={() => handleTabChange('signup')}
                className={styles.toggleLink}
              >
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button 
                type="button" 
                onClick={() => handleTabChange('login')}
                className={styles.toggleLink}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Auth;
