import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { VegIcon } from '../UI/VegIcon.jsx';
import { getAssetUrl } from '../../utils/assets.js';
import styles from './CartDrawer.module.css';

const FALLBACK = '/images/food-sushi.jpg';

export function CartDrawer({ onClose, onCheckout }) {
  const { items, itemCount, subtotal, discount, total, appliedCoupon, removeItem, updateQuantity, clearCart } = useCart();
  const drawerRef = useRef(null);

  // Focus trap + Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const scrollToMenu = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector('#menu');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
    >
      <div className={`${styles.drawer} animate-slide-up`} ref={drawerRef}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Your Order</h2>
            {itemCount > 0 && (
              <span className={styles.itemCount}>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
            )}
          </div>
          <div className={styles.headerRight}>
            {items.length > 0 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { if (window.confirm('Clear your entire order?')) clearCart(); }}
                aria-label="Clear cart"
              >
                Clear
              </button>
            )}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Dine-in badge */}
        <div className={styles.dineInBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
          Dine-In Order
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className="empty-state" style={{padding:'var(--space-12) var(--space-8)'}}>
              <div className="empty-state-icon">🛒</div>
              <p className="empty-state-title">Your table is waiting</p>
              <p className="empty-state-desc">Add something delicious to get started</p>
              <button className="btn btn-outline btn-sm" onClick={scrollToMenu} style={{marginTop:'var(--space-3)'}}>
                Explore Menu
              </button>
            </div>
          ) : (
            items.map(item => (
              <CartItem
                key={item.cartId}
                item={item}
                onRemove={() => removeItem(item.cartId)}
                onUpdateQty={(q) => updateQuantity(item.cartId, q)}
              />
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className={styles.footer}>
            {/* Totals */}
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className={`${styles.totalRow} ${styles.discountRow}`}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>−₹{discount}</span>
                </div>
              )}
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <p className={styles.paymentNote}>💵 Payment: Cash at table</p>
            </div>

            <button className="btn btn-primary" style={{width:'100%', minHeight:'52px', fontSize:'1rem'}} onClick={onCheckout}>
              Proceed to Order → 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItem({ item, onRemove, onUpdateQty }) {
  const [imgError, setImgError] = useState(false);
  const basePrice = item.selectedVariant ? item.selectedVariant.price : item.basePrice;
  const addOnPrice = (item.selectedAddOns || []).reduce((s, a) => s + a.price, 0);
  const lineTotal = (basePrice + addOnPrice) * item.quantity;

  return (
    <div className={styles.item}>
      <div className={styles.itemImage}>
        <img
          src={getAssetUrl(imgError ? FALLBACK : item.image)}
          alt={item.name}
          onError={() => setImgError(true)}
        />
      </div>
      <div className={styles.itemBody}>
        <div className={styles.itemTop}>
          <div className={styles.itemInfo}>
            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <VegIcon type={item.type} size={12} />
              <span className={styles.itemName}>{item.name}</span>
            </div>
            {item.selectedVariant && (
              <span className={styles.itemVariant}>{item.selectedVariant.name}</span>
            )}
            {item.selectedAddOns?.length > 0 && (
              <span className={styles.itemAddOns}>
                + {item.selectedAddOns.map(a => a.name).join(', ')}
              </span>
            )}
          </div>
          <button className={styles.removeBtn} onClick={onRemove} aria-label={`Remove ${item.name}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className={styles.itemBottom}>
          <div className="qty-selector">
            <button className="qty-btn" onClick={() => onUpdateQty(item.quantity - 1)} aria-label="Decrease">−</button>
            <span className="qty-value" aria-live="polite">{item.quantity}</span>
            <button className="qty-btn" onClick={() => onUpdateQty(item.quantity + 1)} aria-label="Increase">+</button>
          </div>
          <span className={styles.itemTotal}>₹{lineTotal}</span>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
