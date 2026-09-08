import { useEffect, useRef } from 'react';
import RESTAURANT_CONFIG from '../../config/restaurant.js';
import { getAssetUrl } from '../../utils/assets.js';
import styles from './Hero.module.css';

export function Hero({ onExploreMenu, onOrderNow, onReserve }) {
  const heroRef = useRef(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = () => {
      const scrollY = window.scrollY;
      el.style.setProperty('--parallax-y', `${scrollY * 0.35}px`);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef} aria-label="Welcome to Zushi">
      {/* Background image with parallax */}
      <div className={styles.bg} aria-hidden="true">
        <img
          src={getAssetUrl('/images/hero-food.jpg')}
          alt=""
          className={styles.bgImg}
          fetchpriority="high"
          decoding="async"
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Grain texture */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {/* Japanese Watermark */}
        <div className={styles.watermark} aria-hidden="true">寿司</div>

        <div className={styles.eyebrow} aria-label="Sainikpuri, Hyderabad">
          <span className={styles.eyebrowLine} />
          <span>Sainikpuri · Hyderabad</span>
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingAccent}>Zushi</span>
        </h1>

        <p className={styles.subheading}>
          {RESTAURANT_CONFIG.tagline}
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <button
            className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}
            onClick={onOrderNow}
            id="hero-order-now"
          >
            Order Now
          </button>
          <button
            className={`btn btn-outline btn-lg ${styles.ctaSecondary}`}
            onClick={onExploreMenu}
            id="hero-explore-menu"
          >
            Explore Menu
          </button>
          <button
            className={`btn btn-ghost ${styles.ctaTertiary}`}
            onClick={onReserve}
            id="hero-reserve"
          >
            Reserve a Table →
          </button>
        </div>

        {/* Quick stats */}
        <div className={styles.stats} aria-label="Restaurant highlights">
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {RESTAURANT_CONFIG.google.rating}
              <span className={styles.star}>★</span>
            </span>
            <span className={styles.statLabel}>{RESTAURANT_CONFIG.google.reviewCount} Reviews</span>
          </div>

          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statValue}>Open</span>
            <span className={styles.statLabel}>From 12 PM</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;
