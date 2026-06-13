import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BikeConfigurator from './BikeConfigurator';

describe('BikeConfigurator Integration Test (Explicit Lifted State)', () => {
  it('loads with standard build and computes base estimate correctly', () => {
    render(<BikeConfigurator />);
    
    // Check initial configurator header
    expect(screen.getByRole('heading', { name: 'Superbike Configurator' })).toBeInTheDocument();
    
    // Check summary shows base price $14,500
    expect(screen.getByText('Base Motorcycle:')).toBeInTheDocument();
    expect(screen.getAllByText('$14,500')).toHaveLength(2);
    
    // Default tier is Standard Build (+0)
    expect(screen.getByText('Trim Upgrade (Standard Build):')).toBeInTheDocument();
    expect(screen.getAllByText('+$0')[0]).toBeInTheDocument();
    
    // Grand total should be $14,500
    expect(screen.getAllByText('$14,500')).toHaveLength(2);
  });

  it('updates estimated price reactively when selecting a different trim tier', () => {
    render(<BikeConfigurator />);
    
    // Select the "Pro Trim Pack" button
    const proTrimButton = screen.getByRole('button', { name: /Pro Trim Pack/i });
    fireEvent.click(proTrimButton);
    
    // Check that the summary row for Trim Upgrade updates to Pro Trim Pack
    expect(screen.getByText('Trim Upgrade (Pro Trim Pack):')).toBeInTheDocument();
    expect(screen.getAllByText('+$2,500')).toHaveLength(2);
    
    // Total price should update to $17,000 ($14,500 + $2,500)
    expect(screen.getByText('$17,000')).toBeInTheDocument();
    
    // Select the "Cosmic Track Spec" button
    const trackSpecButton = screen.getByRole('button', { name: /Cosmic Track Spec/i });
    fireEvent.click(trackSpecButton);
    
    // Trim Upgrade updates to Cosmic Track Spec (+6,000)
    expect(screen.getByText('Trim Upgrade (Cosmic Track Spec):')).toBeInTheDocument();
    expect(screen.getAllByText('+$6,000')).toHaveLength(2);
    
    // Total price updates to $20,500 ($14,500 + $6,000)
    expect(screen.getByText('$20,500')).toBeInTheDocument();
  });

  it('updates estimate dynamically when selecting/deselecting multiple upgrades', () => {
    render(<BikeConfigurator />);
    
    // Verify no upgrades are listed initially in the summary
    expect(screen.queryByText('Selected Upgrades:')).not.toBeInTheDocument();
    
    // Get option checkboxes
    const warrantyCheckbox = screen.getByLabelText(/3-Year Extended Warranty\s*\+\$1,200/i);
    const paintCheckbox = screen.getByLabelText(/Custom Nebula Paint\s*\+\$800/i);
    
    // Check warranty option
    fireEvent.click(warrantyCheckbox);
    
    // Summary should now show "Selected Upgrades:" and "3-Year Extended Warranty"
    expect(screen.getByText('Selected Upgrades:')).toBeInTheDocument();
    expect(screen.getAllByText('3-Year Extended Warranty')).toHaveLength(2);
    expect(screen.getAllByText('+$1,200')).toHaveLength(2);
    
    // Estimate should update to $15,700 ($14,500 base + $1,200 warranty)
    expect(screen.getByText('$15,700')).toBeInTheDocument();
    
    // Check paint option
    fireEvent.click(paintCheckbox);
    
    // Summary should show both options
    expect(screen.getAllByText('Custom Nebula Paint')).toHaveLength(2);
    expect(screen.getAllByText('+$800')).toHaveLength(2);
    
    // Estimate should update to $16,500 ($14,500 base + $1,200 warranty + $800 paint)
    expect(screen.getByText('$16,500')).toBeInTheDocument();
    
    // Toggle trim to "Pro Trim Pack" (+2,500)
    const proTrimButton = screen.getByRole('button', { name: /Pro Trim Pack/i });
    fireEvent.click(proTrimButton);
    
    // Estimate should update to $19,000 ($14,500 + $2,500 trim + $1,200 warranty + $800 paint)
    expect(screen.getByText('$19,000')).toBeInTheDocument();
    
    // Uncheck warranty option
    fireEvent.click(warrantyCheckbox);
    
    // Estimate should drop to $17,800 ($14,500 base + $2,500 trim + $800 paint)
    expect(screen.getByText('$17,800')).toBeInTheDocument();
    expect(screen.getAllByText('3-Year Extended Warranty')).toHaveLength(1);
    expect(screen.getAllByText('Custom Nebula Paint')).toHaveLength(2);
  });
});
