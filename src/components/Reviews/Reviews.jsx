import { useRef } from 'react';
import RESTAURANT_CONFIG from '../../config/restaurant.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import styles from './Reviews.module.css';

const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Ananya S.',
    rating: 5,
    text: "The best sushi in Sainikpuri, hands down. The ambiance is incredible and the dragon roll is a must-try. Will definitely be coming back!",
    time: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Rahul K.',
    rating: 5,
    text: "Hidden gem! The ramen broth is rich and authentic. Excellent service and a very premium dining experience.",
    time: '1 month ago'
  },
  {
    id: 3,
    name: 'Meera V.',
    rating: 5,
    text: "Absolutely loved the aesthetics of the place. The tempura was light and crispy. Perfect spot for a date night.",
    time: '2 months ago'
  }
];

export function Reviews() {
  const revealRef = useScrollReveal();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const amount = direction === 'left' ? -width : width;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} aria-label="Customer Reviews">
      <div className={`${styles.header} reveal-up`} ref={revealRef}>
        <h2 className="section-title">What Our Guests Say</h2>
        <div className="gold-line" />
      </div>

      <div className={styles.carouselWrap}>
        <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={() => scroll('left')} aria-label="Previous review">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className={styles.grid} ref={scrollRef}>
          {MOCK_REVIEWS.map(review => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{review.name.charAt(0)}</div>
                <div className={styles.meta}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.time}>{review.time}</span>
                </div>
              </div>
              <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
              </div>
              <p className={styles.text}>"{review.text}"</p>
            </div>
          ))}
        </div>

        <button className={`${styles.navBtn} ${styles.navRight}`} onClick={() => scroll('right')} aria-label="Next review">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div className={styles.footer}>
        <a 
          href={RESTAURANT_CONFIG.google.reviewsUrl} 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-outline"
        >
          Read more on Google ({RESTAURANT_CONFIG.google.rating}★)
        </a>
      </div>
    </section>
  );
}

export default Reviews;
