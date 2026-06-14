import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bike, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

/**
 * Sticky responsive header navigation for COSMIC CRUISERS.
 * Renders standard links and slides down a mobile navigation list.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} container`}>
        <Link to="/" className={styles.logoLink} onClick={closeMenu} aria-label="COSMIC CRUISERS Home">
          <Bike className={styles.logoIcon} size={28} aria-hidden="true" />
          <span>COSMIC <span className={styles.highlight}>CRUISERS</span></span>
        </Link>

        {/* Desktop Links */}
        <nav className={styles.navLinks} aria-label="Main navigation desktop">
          <NavLink 
            to="/" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/select-service" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            Book Appointment
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/appointments" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            My Appointments
          </NavLink>

          {user ? (
            <div className={styles.userSection}>
              <span className={styles.userGreeting}>
                Hello, <span>{user.name.split(' ')[0]}</span>
              </span>
              <button 
                type="button" 
                onClick={logout} 
                className={styles.logoutBtn}
                aria-label="Log out of your account"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className={styles.loginBtn}
              role="button"
            >
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          onClick={toggleMenu}
          className={styles.hamburger}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <nav 
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Main navigation mobile"
      >
        <NavLink 
          to="/" 
          onClick={closeMenu}
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
          end
        >
          Home
        </NavLink>
        <NavLink 
          to="/select-service" 
          onClick={closeMenu}
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
        >
          Book Appointment
        </NavLink>
        <NavLink 
          to="/gallery" 
          onClick={closeMenu}
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
        >
          Gallery
        </NavLink>
        <NavLink 
          to="/blog" 
          onClick={closeMenu}
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
        >
          Blog
        </NavLink>
        <NavLink 
          to="/appointments" 
          onClick={closeMenu}
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
        >
          My Appointments
        </NavLink>

        {user ? (
          <div className={styles.mobileUserSection}>
            <span className={styles.mobileGreeting}>
              Logged in as: <span>{user.name}</span>
            </span>
            <button 
              type="button" 
              onClick={() => { logout(); closeMenu(); }} 
              className={styles.mobileLogoutBtn}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink 
            to="/login" 
            onClick={closeMenu}
            className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
            style={{ borderBottom: 'none' }}
          >
            Login / Signup
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
