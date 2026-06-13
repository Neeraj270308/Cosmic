/**
 * Form field validation helpers.
 * Returns an error message string if invalid, or null if valid.
 */

export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return 'Full name is required.';
  }
  if (name.trim().length < 3) {
    return 'Name must be at least 3 characters long.';
  }
  // Allow letters, spaces, and hyphens/apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Name must only contain letters, spaces, hyphens, or apostrophes.';
  }
  return null;
};

export const validateMobile = (mobile) => {
  if (!mobile || mobile.trim() === '') {
    return 'Mobile number is required.';
  }
  // Strip spaces, dashes, parentheses for evaluation
  const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
  if (!/^\d+$/.test(cleanMobile)) {
    return 'Mobile number must contain only numbers.';
  }
  if (cleanMobile.length !== 10) {
    return 'Mobile number must be exactly 10 digits.';
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email address is required.';
  }
  // Standard email validation pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g. name@domain.com).';
  }
  return null;
};

export const validateCity = (city) => {
  if (!city || city.trim() === '') {
    return 'City is required.';
  }
  if (city.trim().length < 2) {
    return 'City name must be at least 2 characters.';
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address || address.trim() === '') {
    return 'Street address is required.';
  }
  if (address.trim().length < 5) {
    return 'Please enter a complete street address (minimum 5 characters).';
  }
  return null;
};

/**
 * Validates the entire customer details object.
 * Returns an object with field-level errors if any exist, or an empty object.
 */
export const validateCustomerForm = (details) => {
  const errors = {};
  
  const nameErr = validateName(details.name);
  if (nameErr) errors.name = nameErr;
  
  const mobileErr = validateMobile(details.mobile);
  if (mobileErr) errors.mobile = mobileErr;
  
  const emailErr = validateEmail(details.email);
  if (emailErr) errors.email = emailErr;
  
  const cityErr = validateCity(details.city);
  if (cityErr) errors.city = cityErr;
  
  const addressErr = validateAddress(details.address);
  if (addressErr) errors.address = addressErr;
  
  return errors;
};
