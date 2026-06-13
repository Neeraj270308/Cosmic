import React, { useState } from 'react';
import styles from './BikeConfigurator.module.css';

// Child 1: Tier Selector (Dumb component)
export const TierSelector = ({ tiers, selectedTier, onTierChange }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>1. Choose Your Build Trim</h3>
      <div className={styles.tierGrid}>
        {tiers.map((tier) => (
          <button
            key={tier.id}
            type="button"
            className={`${styles.tierCard} ${selectedTier.id === tier.id ? styles.activeTier : ''}`}
            onClick={() => onTierChange(tier)}
          >
            <div className={styles.tierHeader}>
              <span className={styles.tierName}>{tier.name}</span>
              <span className={styles.tierPrice}>+${tier.price.toLocaleString()}</span>
            </div>
            <p className={styles.tierDesc}>{tier.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// Child 2: Option Selector (Dumb component)
export const OptionSelector = ({ options, selectedOptions, onToggleOption }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>2. Select Cosmic Upgrades</h3>
      <div className={styles.optionsGrid}>
        {options.map((opt) => {
          const isSelected = selectedOptions.some((item) => item.id === opt.id);
          return (
            <label
              key={opt.id}
              className={`${styles.optionLabel} ${isSelected ? styles.activeOption : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleOption(opt)}
                className={styles.checkbox}
              />
              <div className={styles.optionContent}>
                <span className={styles.optionName}>{opt.name}</span>
                <span className={styles.optionPrice}>+${opt.price.toLocaleString()}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// Child 3: Config Summary (Dumb component)
export const ConfigSummary = ({ selectedTier, selectedOptions, basePrice }) => {
  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const grandTotal = basePrice + selectedTier.price + optionsTotal;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>Configuration Summary</h3>
      <div className={styles.summaryRow}>
        <span>Base Motorcycle:</span>
        <span>${basePrice.toLocaleString()}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Trim Upgrade ({selectedTier.name}):</span>
        <span>+${selectedTier.price.toLocaleString()}</span>
      </div>
      {selectedOptions.length > 0 && (
        <div className={styles.summaryRowCol}>
          <span className={styles.addonTitle}>Selected Upgrades:</span>
          <ul className={styles.addonList}>
            {selectedOptions.map((opt) => (
              <li key={opt.id} className={styles.addonItem}>
                <span>{opt.name}</span>
                <span>+${opt.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.divider}></div>
      <div className={styles.totalRow}>
        <span>Estimated Price:</span>
        <span className={styles.totalPrice}>${grandTotal.toLocaleString()}</span>
      </div>
    </div>
  );
};

// Sibling Parent component: BikeConfigurator (Lifts the state)
const BikeConfigurator = () => {
  const basePrice = 14500;

  const TIERS = [
    { id: 'standard', name: 'Standard Build', price: 0, desc: 'Factory specifications and stock street tires.' },
    { id: 'pro', name: 'Pro Trim Pack', price: 2500, desc: 'Carbon fiber side fairings, sticky racing compound tires.' },
    { id: 'track', name: 'Cosmic Track Spec', price: 6000, desc: 'Active electronic suspension, racing ECU remap.' }
  ];

  const OPTIONS = [
    { id: 'exhaust', name: 'Titanium Track Exhaust', price: 1500 },
    { id: 'warranty', name: '3-Year Extended Warranty', price: 1200 },
    { id: 'paint', name: 'Custom Nebula Paint', price: 800 },
    { id: 'brakes', name: 'Brembo Racing Calipers', price: 950 }
  ];

  // Lifted state declarations
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleTierChange = (tier) => {
    setSelectedTier(tier);
  };

  const handleToggleOption = (option) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((item) => item.id === option.id);
      if (exists) {
        return prev.filter((item) => item.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <section className={styles.configuratorSection} aria-labelledby="configurator-heading">
      <div className={styles.headerBlock}>
        <h2 id="configurator-heading" className={styles.title}>Superbike Configurator</h2>
        <p className={styles.subtitle}>
          Customize your build options and instantly calculate estimate quotes using lifted React state.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.selectorsCol}>
          {/* Sibling 1: Tier Selector */}
          <TierSelector
            tiers={TIERS}
            selectedTier={selectedTier}
            onTierChange={handleTierChange}
          />
          {/* Sibling 2: Option Selector */}
          <OptionSelector
            options={OPTIONS}
            selectedOptions={selectedOptions}
            onToggleOption={handleToggleOption}
          />
        </div>
        
        <div className={styles.summaryCol}>
          {/* Sibling 3: Summary Box */}
          <ConfigSummary
            selectedTier={selectedTier}
            selectedOptions={selectedOptions}
            basePrice={basePrice}
          />
        </div>
      </div>
    </section>
  );
};

export default BikeConfigurator;
