import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../../utils/blogData';
import styles from './BlogDetails.module.css';

/**
 * Detailed view for an individual blog post.
 */
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return BLOG_POSTS.find((p) => p.id === id);
  }, [id]);

  const handleBack = () => {
    navigate('/blog');
  };

  if (!post) {
    return (
      <main className={`${styles.pageWrapper} container`}>
        <div className={styles.notFound}>
          <h2>Article Not Found</h2>
          <p>We could not retrieve the requested article details.</p>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            <ChevronLeft size={16} aria-hidden="true" />
            <span>Return to Blog Listing</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button 
        type="button" 
        className={styles.backBtn} 
        onClick={handleBack}
        aria-label="Return to Blog listing"
      >
        <ChevronLeft size={18} aria-hidden="true" />
        <span>Back to Journal</span>
      </button>

      <article className={styles.article}>
        {/* Cover Image */}
        <img 
          src={post.image} 
          alt={`Illustrative cover for ${post.title}`} 
          className={styles.coverImage} 
        />

        <div className={styles.contentContainer}>
          {/* Metadata Grid */}
          <div className={styles.metaHeader}>
            <span className={styles.authorTag}>
              <User size={12} style={{ display: 'inline', marginRight: '4px' }} aria-hidden="true" />
              {post.author}
            </span>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} aria-hidden="true" />
                {post.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.divider}></div>

          {/* Long form text */}
          <div className={styles.bodyText}>
            {post.content}
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogDetails;
