import { MENU_ITEMS } from '../../data/menu.js';
import { FoodCard } from '../Menu/FoodCard.jsx';
import styles from './FeaturedSection.module.css';

export function FeaturedSection({ onViewDetail, onQuickAdd }) {
  // Get Chef's Specials and Popular items
  const featured = MENU_ITEMS.filter(item => item.chefSpecial || item.popular).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Featured Dishes">
      <div className={styles.header}>
        <span className="section-label">Signatures</span>
        <h2 className="section-title">Chef's Recommendations</h2>
        <div className="gold-line" />
      </div>

      <div className={styles.scrollContainer}>
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
    </section>
  );
}

export default FeaturedSection;
