import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { validateCoupon } from '../../utils/coupon.js';
import { sendWhatsAppOrder } from '../../utils/whatsapp.js';
import RESTAURANT_CONFIG from '../../config/restaurant.js';
import styles from './CheckoutModal.module.css';

export function CheckoutModal({ onClose, onConfirm }) {
  const { items, subtotal, discount, total, appliedCoupon, tableNumber, setTable, applyCoupon, removeCoupon } = useCart();
  const [localTable, setLocalTable] = useState(tableNumber || '');
  const [couponCode, setCouponCode] = useState(appliedCoupon?.code || '');
  const [couponMsg, setCouponMsg] = useState({ type: '', text: '' });
  const [error, setError] = useState('');
  
  const focusRef = useRef(null);

  // Focus trap
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    focusRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleApplyCoupon = () => {
    setCouponMsg({ type: '', text: '' });
    if (!couponCode) {
      removeCoupon();
      return;
    }
    
    const res = validateCoupon(couponCode, subtotal);
    if (res.valid) {
      applyCoupon(res.coupon);
      setCouponMsg({ type: 'success', text: `Saved ₹${res.discount}!` });
    } else {
      removeCoupon();
      setCouponMsg({ type: 'error', text: res.error });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setCouponMsg({ type: '', text: '' });
  };

  const handlePlaceOrder = () => {
    setError('');
    
    if (!localTable.trim()) {
      setError('Please enter your table number.');
      return;
    }
    
    const tNum = parseInt(localTable, 10);
    if (isNaN(tNum) || tNum <= 0 || tNum > 100) {
      setError('Please enter a valid table number (1-100).');
      return;
    }

    setTable(String(tNum));

    // Send WhatsApp Order
    const success = sendWhatsAppOrder({
      cartItems: items,
      subtotal,
      coupon: appliedCoupon,
      discount,
      total,
      tableNumber: String(tNum),
      whatsappNumber: RESTAURANT_CONFIG.whatsappOrderNumber
    });

    if (success) {
      onConfirm(String(tNum));
    } else {
      setError('Failed to open WhatsApp. Please try again or ask your server.');
    }
  };

  return (
    <div className={styles.backdrop} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close checkout">
          ✕
        </button>
        
        <div className={styles.content} ref={focusRef} tabIndex={-1}>
          <h2 className={styles.title}>Checkout</h2>
          
          {error && (
            <div className={styles.errorBanner}>{error}</div>
          )}

          {/* Table Number */}
          <div className={styles.section}>
            <label className={styles.label} htmlFor="table-number">Table Number <span className={styles.req}>*</span></label>
            <input
              id="table-number"
              type="number"
              min="1"
              max="100"
              className={styles.input}
              placeholder="E.g. 12"
              value={localTable}
              onChange={e => { setLocalTable(e.target.value); setError(''); }}
            />
            <p className={styles.hint}>Look for the number on your table stand.</p>
          </div>

          {/* Coupon */}
          <div className={styles.section}>
            <label className={styles.label} htmlFor="promo-code">Promo Code</label>
            <div className={styles.couponRow}>
              <input
                id="promo-code"
                type="text"
                className={styles.input}
                placeholder="Got a code?"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                disabled={!!appliedCoupon}
              />
              {appliedCoupon ? (
                <button className="btn btn-outline" onClick={handleRemoveCoupon}>Remove</button>
              ) : (
                <button className="btn btn-outline" onClick={handleApplyCoupon}>Apply</button>
              )}
            </div>
            {couponMsg.text && (
              <p className={`${styles.msg} ${couponMsg.type === 'error' ? styles.msgError : styles.msgSuccess}`}>
                {couponMsg.text}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Items ({items.length})</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className={`${styles.summaryRow} ${styles.summaryDiscount}`}>
                <span>Discount</span>
                <span>−₹{discount}</span>
              </div>
            )}
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total to Pay</span>
              <span>₹{total}</span>
            </div>
          </div>
          
          <p className={styles.paymentInfo}>
            <span>💵</span> You will pay by cash or card at the table.
          </p>
        </div>

        <div className={styles.footer}>
          <button className={`btn btn-primary ${styles.placeOrderBtn}`} onClick={handlePlaceOrder}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
            Send to Kitchen
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
