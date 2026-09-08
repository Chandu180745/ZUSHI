import RESTAURANT_CONFIG from '../../config/restaurant.js';
import styles from './RestaurantSnapshot.module.css';

const STATS = [
  {
    id: 'rating',
    value: `${RESTAURANT_CONFIG.google.rating} ★`,
    label: `${RESTAURANT_CONFIG.google.reviewCount.toLocaleString()} Google Reviews`,
    icon: '★',
  },

  {
    id: 'location',
    value: 'Sainikpuri',
    label: 'Hyderabad, Telangana',
    icon: '◎',
  },
  {
    id: 'seating',
    value: 'Outdoor',
    label: 'Seating Available',
    icon: '✦',
  },
];

export function RestaurantSnapshot() {
  return (
    <section className={styles.strip} aria-label="Restaurant information" id="about">
      <div className={styles.inner}>
        {STATS.map((stat, idx) => (
          <div key={stat.id} className={styles.statCard}>
            <span className={styles.statIcon} aria-hidden="true">{stat.icon}</span>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
            {idx < STATS.length - 1 && (
              <div className={styles.divider} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default RestaurantSnapshot;
