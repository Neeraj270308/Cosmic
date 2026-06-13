import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('Cosmic Engine Collision: Simulated rendering crash triggered by dev panel.');
  }

  return (
    <footer className={styles.footer} aria-label="Dealership Information Footer">
      <div className="container">
        <div className={styles.footerGrid}>
          
          {/* Brand block */}
          <div className={styles.brandCol}>
            <h3>COSMIC <span>CRUISERS</span></h3>
            <p>
              Experience premium motorcycle dealership services. Compare models, book test rides, and schedule high-end maintenance appointments.
            </p>
            <p className={styles.tagline}>"Ride Beyond Limits"</p>
            
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Facebook link">
                <ExternalLink size={18} aria-hidden="true" />ⓕ
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Twitter link">
                <ExternalLink size={18} aria-hidden="true" />𝕏
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Instagram link">
                <ExternalLink size={18} aria-hidden="true" />🅾
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="YouTube link">
                <ExternalLink size={18} aria-hidden="true" />🚩
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={styles.infoCol}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/select-service">Book Appointment</Link></li>
              <li><Link to="/gallery">Sold Gallery</Link></li>
              <li><Link to="/blog">Our Blog</Link></li>
              <li><Link to="/appointments">My Appointments</Link></li>
            </ul>
          </div>
          
          {/* Services info */}
          <div className={styles.infoCol}>
            <h4>Services</h4>
            <ul>
              <li><Link to="/select-service">Bike Test Ride</Link></li>
              <li><Link to="/select-service">Purchase Consultation</Link></li>
              <li><Link to="/select-service">Service Appointment</Link></li>
            </ul>
          </div>
          
          {/* Contact details */}
          <div className={styles.infoCol}>
            <h4>Contact Info</h4>
            <ul>
              <li>Few Throttle Away,</li>
              <li>Area A, Hyderabad City,</li>
              <li>500049</li>
              <li style={{ marginTop: '0.5rem' }}><strong>Phone:</strong> 770-280-2703</li>
              <li><strong>Email:</strong> <a href="mailto:support@cosmiccruisers.com">support@cosmiccruisers.com</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} COSMIC CRUISERS Dealership. All rights reserved.</p>
          <button 
            type="button" 
            className={styles.crashBtn} 
            onClick={() => setShouldCrash(true)}
            title="Dev Panel: Simulate rendering crash for Error Boundary"
          >
            Simulate Crash
          </button>
          <div className={styles.accessibilityText}>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
