import { useState, useEffect, useRef } from 'react';
import { VegIcon, ItemBadges } from '../UI/VegIcon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { getAssetUrl } from '../../utils/assets.js';
import styles from './FoodDetailModal.module.css';

const FALLBACK = '/images/food-sushi.jpg';

export function FoodDetailModal({ item, onClose }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const firstFocusRef = useRef(null);
  const closeRef = useRef(null);

  // Set default variant on mount
  useEffect(() => {
    if (item?.variants?.length > 0) {
      const first = item.variants.find(v => v.available) || item.variants[0];
      setSelectedVariant(first);
    }
  }, [item]);

  // Trap focus & escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!item) return null;

  // Calculate dynamic price
  const variantPrice = selectedVariant ? selectedVariant.price : (item.basePrice || 0);
  const addOnsPrice = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const unitPrice = variantPrice + addOnsPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddOnToggle = (addOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(a => a.id === addOn.id);
      if (exists) {
        return prev.filter(a => a.id !== addOn.id);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const handleAddToCart = () => {
    addItem({
      ...item,
      selectedVariant,
      selectedAddOns,
      quantity,
    });
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const canAdd = item.available && (!item.variants?.length || selectedVariant);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          ref={closeRef}
          aria-label="Close details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Image */}
        <div className={styles.imageWrap}>
          <img
            src={getAssetUrl(imgError ? FALLBACK : item.image)}
            alt={item.name}
            className={styles.image}
            onError={() => setImgError(true)}
          />
          <div className={styles.imageGradient} aria-hidden="true" />
        </div>

        {/* Scrollable content */}
        <div className={styles.content} ref={firstFocusRef} tabIndex={-1}>
          {/* Header */}
          <div className={styles.itemHeader}>
            <div className={styles.titleRow}>
              <VegIcon type={item.type} size={16} />
              <h2 className={styles.title}>{item.name}</h2>
            </div>
            <ItemBadges item={item} />
            <p className={styles.description}>{item.description}</p>
          </div>

          <hr className="divider" />

          {/* Variants */}
          {item.variants?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Choose Size</h3>
              <div className={styles.variantGrid}>
                {item.variants.map(variant => (
                  <button
                    key={variant.id}
                    className={`${styles.variantBtn} ${selectedVariant?.id === variant.id ? styles.variantSelected : ''} ${!variant.available ? styles.variantUnavailable : ''}`}
                    onClick={() => variant.available && setSelectedVariant(variant)}
                    disabled={!variant.available}
                    aria-pressed={selectedVariant?.id === variant.id}
                    aria-label={`${variant.name} — ₹${variant.price}${!variant.available ? ' (unavailable)' : ''}`}
                  >
                    <span className={styles.variantName}>{variant.name}</span>
                    <span className={styles.variantPrice}>₹{variant.price}</span>
                    {!variant.available && <span className={styles.variantSoldOut}>Unavailable</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {item.addOns?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Add-ons <span style={{color:'var(--text-muted)',fontWeight:400,fontSize:'0.85em'}}>(Optional)</span></h3>
              <div className={styles.addOnList}>
                {item.addOns.map(addOn => {
                  const isSelected = selectedAddOns.find(a => a.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      className={`${styles.addOnBtn} ${isSelected ? styles.addOnSelected : ''} ${!addOn.available ? styles.addOnUnavailable : ''}`}
                      onClick={() => addOn.available && handleAddOnToggle(addOn)}
                      disabled={!addOn.available}
                      aria-pressed={!!isSelected}
                      aria-label={`${addOn.name} +₹${addOn.price}`}
                    >
                      <span className={styles.addOnCheck} aria-hidden="true">
                        {isSelected ? '✓' : '+'}
                      </span>
                      <span className={styles.addOnName}>{addOn.name}</span>
                      <span className={styles.addOnPrice}>+₹{addOn.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className={styles.footer}>
            {/* Quantity */}
            <div className={styles.qty} aria-label="Quantity">
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >−</button>
              <span className={styles.qtyVal} aria-live="polite">{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >+</button>
            </div>

            {/* Add button */}
            <button
              className={`btn btn-primary ${styles.addToCartBtn} ${added ? styles.addedState : ''}`}
              onClick={handleAddToCart}
              disabled={!canAdd || added}
              aria-label={added ? 'Added to cart' : `Add to cart — ₹${totalPrice}`}
            >
              {added ? (
                <>✓ Added!</>
              ) : (
                <>Add to Cart · ₹{totalPrice}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetailModal;
