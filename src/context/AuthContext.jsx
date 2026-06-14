import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_USERS_KEY = 'cosmic_cruisers_users';
const STORAGE_CURRENT_USER_KEY = 'cosmic_cruisers_current_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load registered users and current session on mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(STORAGE_USERS_KEY);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      
      const storedCurrentUser = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (storedCurrentUser) {
        setUser(JSON.parse(storedCurrentUser));
      }
    } catch (err) {
      console.error('Failed to load authentication state from localStorage', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login handler
  const login = useCallback((email, password) => {
    setError(null);
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      const errMsg = 'Email and password are required.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    const foundUser = users.find(u => u.email === trimmedEmail);
    if (!foundUser) {
      const errMsg = 'No account found with this email.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    if (foundUser.password !== trimmedPassword) {
      const errMsg = 'Incorrect password.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    // Success
    const sessionUser = { name: foundUser.name, email: foundUser.email };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return { success: true };
  }, [users]);

  // Sign Up handler
  const signUp = useCallback((name, email, password) => {
    setError(null);
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      const errMsg = 'All fields are required.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    if (trimmedName.length < 2) {
      const errMsg = 'Name must be at least 2 characters.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    if (trimmedPassword.length < 6) {
      const errMsg = 'Password must be at least 6 characters.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    // Check email pattern simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      const errMsg = 'Please enter a valid email address.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    const emailExists = users.some(u => u.email === trimmedEmail);
    if (emailExists) {
      const errMsg = 'An account with this email already exists.';
      setError(errMsg);
      return { success: false, error: errMsg };
    }

    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword // Simulated secure plain password for local demo
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updatedUsers));

    // Auto-login upon signing up
    const sessionUser = { name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(sessionUser));

    return { success: true };
  }, [users]);

  // Logout handler
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  }, []);

  const value = {
    user,
    users,
    loading,
    error,
    login,
    signUp,
    logout,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
