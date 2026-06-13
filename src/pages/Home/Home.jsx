import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { motion } from 'framer-motion';
import { Bike, Coins, Wrench, ArrowRight, ShieldCheck, Zap, HeartHandshake, Star } from 'lucide-react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SecondaryButton from '../../components/Button/SecondaryButton';
import BikeConfigurator from '../../components/BikeConfigurator/BikeConfigurator';
import styles from './Home.module.css';

const FEATURED_BIKES = [
  {
    name: "Triumph Street Triple RS",
    category: "Premium Naked",
    engine: "765 cc",
    power: "128.2 PS",
    weight: "166 kg",
    image: "https://cdn.motor1.com/images/mgl/bgYW16/s1/2023-triumph-street-triple-rs---side-right.webp"
  },
  {
    name: "KTM RC 390",
    category: "Sports Track",
    engine: "373 cc",
    power: "43.5 PS",
    weight: "172 kg",
    image: "data:image/jpeg;base64,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"
  },
  {
    name: "Royal Enfield Himalayan 450",
    category: "Adventure Tourer",
    engine: "452 cc",
    power: "40.02 PS",
    weight: "196 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrG4EK_QXAzWuj5E5Qza4J4gDlw3UUyfFYYQ&s"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};


const Home = () => {
  const navigate = useNavigate();
  const { updateService } = useBooking();

  const handleServiceSelect = useCallback((serviceId) => {
    updateService(serviceId);
    navigate('/select-bike');
  }, [updateService, navigate]);

  const handleStartBooking = useCallback(() => {
    navigate('/select-service');
  }, [navigate]);

  return (
    <div className={styles.homeContainer}>
      
      {/* 1. Hero banner */}
      <section className={styles.hero} aria-label="Welcome banner">
        <div className={`${styles.heroContent} container`}>
          <motion.span 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            COSMIC CRUISERS
          </motion.span>
          
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            RIDE BEYOND<br />
            <span className={styles.highlight}>LIMITS.</span>
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Welcome to Hyderabad's premium superbike experience. Reserve your bike test ride, 
            purchase consultation, or expert service diagnostic online in under two minutes.
          </motion.p>
          
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <PrimaryButton onClick={handleStartBooking}>
              <span>Start Booking</span>
              <ArrowRight size={18} aria-hidden="true" />
            </PrimaryButton>
            <SecondaryButton onClick={() => {
              const element = document.getElementById('featured-bikes');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Showroom
            </SecondaryButton>
          </motion.div>
        </div>
      </section>

      {/* 2. Booking Services Section */}
      <section className={styles.servicesSection} aria-labelledby="services-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="services-heading" className={styles.sectionTitle}>Book Appointment</h2>
            <p className={styles.sectionSubtitle}>Select an option below to secure your reservation slot.</p>
          </div>

          <div className={styles.servicesGrid} role="radiogroup" aria-label="Booking options">
            <ServiceCard
              icon={Bike}
              title="Bike Test Ride"
              description="Throttle out on our latest sport or cruiser models. Schedule a 30-minute test run on Tokyo routes."
              badge="30 Mins"
              onClick={() => handleServiceSelect('ride')}
            />
            
            <ServiceCard
              icon={Coins}
              title="Bike Purchase Booking"
              description="Discuss customized setups, pricing structures, and order procedures with our sales consultants."
              badge="45 Mins"
              onClick={() => handleServiceSelect('purchase')}
            />
            
            <ServiceCard
              icon={Wrench}
              title="Bike Service Booking"
              description="Routine oil changes, brake setups, diagnostic scans, or engine tuning with certified experts."
              badge="1-3 Hours"
              onClick={() => handleServiceSelect('service')}
            />
          </div>
        </div>
      </section>

      {/* 3. Featured Bikes Showcase */}
      <section id="featured-bikes" className={styles.featuredSection} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="featured-heading" className={styles.sectionTitle}>Featured Showroom Models</h2>
            <p className={styles.sectionSubtitle}>Some of the ultimate machines available for test rides and purchase consultation.</p>
          </div>

          <div className={styles.featuredGrid}>
            {FEATURED_BIKES.map((bike, index) => (
              <div key={bike.name} className={styles.bikeCard}>
                <div className={styles.bikeImageWrapper}>
                  <img src={bike.image} alt={bike.name} className={styles.bikeImg} loading="lazy" />
                </div>
                <div className={styles.bikeInfo}>
                  <span className={styles.bikeCategory}>{bike.category}</span>
                  <h3 className={styles.bikeName}>{bike.name}</h3>
                  <ul className={styles.bikeSpecList}>
                    <li><span>Engine Displacement:</span> <strong>{bike.engine}</strong></li>
                    <li><span>Peak Power:</span> <strong>{bike.power}</strong></li>
                    <li><span>Dry Weight:</span> <strong>{bike.weight}</strong></li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customizer Section - Demonstration of Explicit Lifted State */}
      <div className="container">
        <BikeConfigurator />
      </div>

      {/* 4. Why Choose Us Section */}
      <section className={styles.whyUsSection} aria-labelledby="whyus-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="whyus-heading" className={styles.sectionTitle}>Why Cosmic Cruisers</h2>
            <p className={styles.sectionSubtitle}>We deliver precision engineering and premium service standards.</p>
          </div>

          <div className={styles.whyUsGrid}>
            <div className={styles.whyUsCard}>
              <ShieldCheck size={36} className={styles.whyUsIcon} aria-hidden="true" />
              <h3 className={styles.whyUsTitle}>Certified Diagnostics</h3>
              <p className={styles.whyUsText}>Our workshop uses official manufacturer calibration equipment to keep your motorcycle running at it's peak specs.</p>
            </div>
            
            <div className={styles.whyUsCard}>
              <Zap size={36} className={styles.whyUsIcon} aria-hidden="true" />
              <h3 className={styles.whyUsTitle}>Raw Speed & Power</h3>
              <p className={styles.whyUsText}>Get exclusive access to the newest sports and adventure releases from Ducati, BMW, Yamaha, and Kawasaki.</p>
            </div>
            
            <div className={styles.whyUsCard}>
              <HeartHandshake size={36} className={styles.whyUsIcon} aria-hidden="true" />
              <h3 className={styles.whyUsTitle}>Rider-First Consulting</h3>
              <p className={styles.whyUsText}>We offer trade-in valuations, tailored financing configurations, and custom parts installation support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dealership Stats */}
      <section className={styles.statsSection} aria-label="Dealership statistics">
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statVal}>10K+</div>
              <div className={styles.statLabel}>Rides Completed</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statVal}>15+</div>
              <div className={styles.statLabel}>Premium Brands</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statVal}>99.8%</div>
              <div className={styles.statLabel}>Success Rate</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statVal}>4.9★</div>
              <div className={styles.statLabel}>Google Ratings</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className={styles.testimonialsSection} aria-labelledby="testimonials-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="testimonials-heading" className={styles.sectionTitle}>Rider Reviews</h2>
            <p className={styles.sectionSubtitle}>Hear what other motorcyclists say about their booking experience.</p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: 'var(--accent-red)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}
              </div>
              <p className={styles.quote}>
                "The test ride booking was super smooth. I chose the Kawasaki Z900, selected a Saturday morning slot, and got instant SMS confirmation. The bike was fully fueled and ready when I arrived."
              </p>
              <div className={styles.clientName}>Abhinav M.</div>
              <div className={styles.clientRole}>Z900 Rider</div>
            </div>

            <div className={styles.testimonialCard}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: 'var(--accent-red)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}
              </div>
              <p className={styles.quote}>
                "COSMIC CRUISERS workshop is state-of-the-art. Being able to list my bike condition details and odometer reading online saved so much check-in time. MotoGP resolved my ECU mapping issue perfectly."
              </p>
              <div className={styles.clientName}>Sharat D</div>
              <div className={styles.clientRole}>BMW S1000RR Rider</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Promotional CTA banner */}
      <section className={styles.ctaBanner} aria-label="Schedule reservation banner">
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.ctaTitle}>Ready to Ride Beyond Limits?</h2>
          <p className={styles.ctaDesc}>
            Reserve your slot today. Our online wizard takes less than two minutes to schedule.
          </p>
          <PrimaryButton onClick={handleStartBooking}>
            <span>Reserve Your Slot</span>
            <ArrowRight size={16} aria-hidden="true" />
          </PrimaryButton>
        </div>
      </section>

    </div>
  );
};

export default Home;
