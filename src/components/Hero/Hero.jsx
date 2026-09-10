import { useEffect, useRef } from 'react';
import RESTAURANT_CONFIG from '../../config/restaurant.js';
import { Logo } from '../Logo/Logo.jsx';
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
        <div className={styles.panContainer}>
          <img
            src={getAssetUrl('/images/hero-food.jpg')}
            alt=""
            className={styles.bgImg}
            fetchpriority="high"
            decoding="async"
          />
        </div>
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

        <div className={styles.heroLogoWrapper}>
          <Logo className={styles.fireLogo} />
        </div>

        <p className={styles.subheading}>
          {RESTAURANT_CONFIG.tagline}
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <button
            className={`${styles.ctaBtn} ${styles.ctaPrimary}`}
            onClick={onExploreMenu}
            id="hero-explore-menu"
          >
            Explore Menu
          </button>
          <a
            href={RESTAURANT_CONFIG.reservationUrl || '#contact'}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.ctaSecondary}`}
            id="hero-reserve"
          >
            Reserve a Table
          </a>
        </div>

        {/* Quick stats */}
        <div className={styles.stats} aria-label="Restaurant highlights">
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
