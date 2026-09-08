import { useState } from 'react';
import { VegIcon, ItemBadges } from '../UI/VegIcon.jsx';
import { getAssetUrl } from '../../utils/assets.js';
import styles from './FoodCard.module.css';

const FALLBACK = '/images/food-sushi.jpg';

export function FoodCard({ item, onViewDetail, onQuickAdd }) {
  const [imgError, setImgError] = useState(false);

  const displayPrice = item.variants?.length > 0
    ? `₹${Math.min(...item.variants.filter(v=>v.available).map(v=>v.price))}`
    : `₹${item.basePrice}`;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!item.available) return;
    // If variants exist, open detail for selection; otherwise quick-add
    if (item.variants?.length > 0 || item.addOns?.length > 0) {
      onViewDetail(item);
    } else {
      onQuickAdd(item);
    }
  };

  return (
    <article
      className={`${styles.card} ${!item.available ? styles.unavailable : ''}`}
      onClick={() => onViewDetail(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name}, ${displayPrice}. ${item.available ? 'Click to view details' : 'Sold out'}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onViewDetail(item); }}}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <img
          src={getAssetUrl(imgError ? FALLBACK : item.image)}
          alt={item.name}
          className={styles.image}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
        />

        {/* Veg indicator */}
        <div className={styles.vegBadge}>
          <VegIcon type={item.type} size={13} />
        </div>

        {/* Item badges */}
        {(item.chefSpecial || item.isNew) && (
          <div className={styles.badgeRow}>
            <ItemBadges item={{ ...item, popular: false }} />
          </div>
        )}

        {/* Sold out overlay */}
        {!item.available && (
          <div className={styles.soldOverlay}>
            <span>Sold Out</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.meta}>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.desc}>{item.description}</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{displayPrice}</span>

          <button
            className={`${styles.addBtn} ${!item.available ? styles.addBtnDisabled : ''}`}
            onClick={handleAdd}
            disabled={!item.available}
            aria-label={item.available ? `Add ${item.name} to cart` : `${item.name} is sold out`}
          >
            {item.available ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add
              </>
            ) : '—'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;
