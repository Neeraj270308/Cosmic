import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import styles from './Gallery.module.css';

/**
 * Dumb Presenter component for Gallery.
 * Receives filtered items, category selections, and callback handlers to draw the UI.
 */
const GalleryPresenter = ({ categories, activeFilter, filteredItems, onFilterChange }) => {
  return (
    <motion.main 
      className={`${styles.pageWrapper} container`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.titleBlock}>
        <span style={{ color: 'var(--accent-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Camera size={16} aria-hidden="true" />
          <span>SOLD BRANDS</span>
        </span>
        <h1 className={styles.title}>Cosmic Gallery</h1>
        <p className={styles.subtitle}>Browse some of the premium machines delivered to our riders.</p>
      </div>

      {/* Filter Button Row */}
      <div className={styles.filterContainer} role="tablist" aria-label="Filter sold bikes by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeFilter === cat}
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilterBtn : ''}`}
            onClick={() => onFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filterable Bike Grid */}
      <motion.div 
        layout 
        className={styles.grid}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <img src={item.image} alt={item.name} className={styles.img} loading="lazy" />
              
              <div className={styles.overlay}>
                <span className={styles.tag}>{item.category}</span>
                <h2 className={styles.bikeName}>{item.name}</h2>
                <div className={styles.meta}>
                  <span>Year: {item.year}</span>
                  <span className={styles.soldBadge}>{item.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.main>
  );
};

export default GalleryPresenter;
