import React from 'react';
import { Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import styles from './Blog.module.css';

/**
 * Shared layout component for all Blog routes.
 * Contains the shared header block and renders nested routes using Outlet.
 */
const BlogLayout = () => {
  return (
    <div className={`${styles.pageWrapper} container`}>
      <div className={styles.titleBlock}>
        <span style={{ color: 'var(--accent-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <BookOpen size={16} aria-hidden="true" />
          <span>COSMIC KNOWLEDGE</span>
        </span>
        <h1 className={styles.title}>The Rider's Journal</h1>
        <p className={styles.subtitle}>Insights, maintenance tips, and comparisons from our service engineers.</p>
      </div>
      
      <Outlet />
    </div>
  );
};

export default BlogLayout;
