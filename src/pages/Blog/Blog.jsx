import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../../utils/blogData';
import styles from './Blog.module.css';


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Blog = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {BLOG_POSTS.map((post) => (
          <motion.article 
            key={post.id} 
            className={styles.card}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={styles.imageWrapper}>
              <img src={post.image} alt={post.title} className={styles.img} loading="lazy" />
            </div>
            
            <div className={styles.cardContent}>
              <div className={styles.meta}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              
              <div className={styles.cardFooter}>
                <span className={styles.author}>By {post.author}</span>
                <button 
                  type="button" 
                  className={styles.readMoreBtn}
                  onClick={() => handleReadMore(post.id)}
                  aria-label={`Read article: ${post.title}`}
                >
                  <span>Read More</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Blog;
