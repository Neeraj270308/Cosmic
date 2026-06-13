import React, { useState, useMemo } from 'react';
import GalleryPresenter from './GalleryPresenter';
import { GALLERY_ITEMS } from '../../utils/galleryData';

const CATEGORIES = ['All', 'Sports', 'Naked', 'Adventure', 'Touring'];

/**
 * Smart Container component for Gallery.
 * Manages active category filter states and calculates filtered bikes list.
 */
const GalleryContainer = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <GalleryPresenter
      categories={CATEGORIES}
      activeFilter={activeFilter}
      filteredItems={filteredItems}
      onFilterChange={setActiveFilter}
    />
  );
};

export default GalleryContainer;
