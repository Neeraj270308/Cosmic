import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton Component', () => {
  it('renders children correctly', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);
    
    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick} disabled={true}>Click Me</PrimaryButton>);
    
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders spinner and "Processing..." when loading, and disables the button', () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick} loading={true}>Click Me</PrimaryButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
