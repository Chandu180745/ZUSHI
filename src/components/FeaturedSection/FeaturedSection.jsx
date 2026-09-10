import { useRef } from 'react';
import { MENU_ITEMS } from '../../data/menu.js';
import { FoodCard } from '../Menu/FoodCard.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import styles from './FeaturedSection.module.css';

export function FeaturedSection({ onViewDetail, onQuickAdd }) {
  const featured = MENU_ITEMS.filter(item => item.chefSpecial || item.popular).slice(0, 6);
  const revealRef = useScrollReveal();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const width = 320;
      const amount = direction === 'left' ? -width : width;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (featured.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Featured Dishes">
      <div className={`section-header ${styles.header} reveal-up`} ref={revealRef}>
        <span className="section-label">Signatures</span>
        <div className="gold-line" />
      </div>

      <div className={styles.carouselWrap}>
        <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={() => scroll('left')} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className={styles.scrollContainer} ref={scrollRef}>
          <div className={styles.track}>
            {featured.map(item => (
              <div key={item.id} className={styles.cardWrap}>
                <FoodCard
                  item={item}
                  onViewDetail={onViewDetail}
                  onQuickAdd={onQuickAdd}
                />
              </div>
            ))}
          </div>
        </div>

        <button className={`${styles.navBtn} ${styles.navRight}`} onClick={() => scroll('right')} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default FeaturedSection;
