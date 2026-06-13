import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateMobile,
  validateEmail,
  validateCity,
  validateAddress,
  validateCustomerForm
} from './validation';

describe('Validation Helpers', () => {
  describe('validateName', () => {
    it('should return error for empty or blank name', () => {
      expect(validateName('')).toBe('Full name is required.');
      expect(validateName('   ')).toBe('Full name is required.');
    });

    it('should return error if name is too short', () => {
      expect(validateName('Ab')).toBe('Name must be at least 3 characters long.');
    });

    it('should return error if name contains invalid characters', () => {
      expect(validateName('John123')).toBe('Name must only contain letters, spaces, hyphens, or apostrophes.');
      expect(validateName('John!')).toBe('Name must only contain letters, spaces, hyphens, or apostrophes.');
    });

    it('should return null for valid names', () => {
      expect(validateName('John Doe')).toBeNull();
      expect(validateName("O'Connor")).toBeNull();
      expect(validateName("Jean-Paul")).toBeNull();
    });
  });

  describe('validateMobile', () => {
    it('should return error for empty mobile', () => {
      expect(validateMobile('')).toBe('Mobile number is required.');
    });

    it('should return error if mobile contains non-digits', () => {
      expect(validateMobile('12345a7890')).toBe('Mobile number must contain only numbers.');
    });

    it('should return error if mobile is not exactly 10 digits', () => {
      expect(validateMobile('123456789')).toBe('Mobile number must be exactly 10 digits.');
      expect(validateMobile('12345678901')).toBe('Mobile number must be exactly 10 digits.');
    });

    it('should return null for valid 10-digit numbers', () => {
      expect(validateMobile('1234567890')).toBeNull();
      expect(validateMobile('123-456-7890')).toBeNull();
      expect(validateMobile('(123) 456-7890')).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Email address is required.');
    });

    it('should return error for invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address (e.g. name@domain.com).');
      expect(validateEmail('test@domain')).toBe('Please enter a valid email address (e.g. name@domain.com).');
    });

    it('should return null for valid email address', () => {
      expect(validateEmail('test@domain.com')).toBeNull();
      expect(validateEmail('user.name+tag@sub.domain.co')).toBeNull();
    });
  });

  describe('validateCustomerForm', () => {
    it('should return accumulated errors for invalid object', () => {
      const invalidDetails = {
        name: 'Jo',
        mobile: '123',
        email: 'invalid',
        city: '',
        address: '123'
      };

      const errors = validateCustomerForm(invalidDetails);
      expect(errors.name).toBe('Name must be at least 3 characters long.');
      expect(errors.mobile).toBe('Mobile number must be exactly 10 digits.');
      expect(errors.email).toBe('Please enter a valid email address (e.g. name@domain.com).');
      expect(errors.city).toBe('City is required.');
      expect(errors.address).toBe('Please enter a complete street address (minimum 5 characters).');
    });

    it('should return empty object for valid customer details', () => {
      const validDetails = {
        name: 'Bruce Wayne',
        mobile: '9876543210',
        email: 'bruce@wayne.corp',
        city: 'Gotham',
        address: '1007 Mountain Drive'
      };

      const errors = validateCustomerForm(validDetails);
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
