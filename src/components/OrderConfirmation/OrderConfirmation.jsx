import { useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import styles from './OrderConfirmation.module.css';

export function OrderConfirmation({ tableNumber, onReset }) {
  const { clearCart } = useCart();

  useEffect(() => {
    // We don't clear the cart immediately on WhatsApp redirect just in case the user didn't actually send it.
    // But once they are on this confirmation screen and dismiss it, we clear it.
    // Actually, it's safer to let them clear it manually or clear it now. 
    // Let's clear it on unmount of this confirmation.
    return () => clearCart();
  }, [clearCart]);

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modal} animate-scale-in`}>
        <div className={styles.iconWrap}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        
        <h2 className={styles.title}>Order Sent to Kitchen!</h2>
        
        <p className={styles.message}>
          Your order for <strong>Table {tableNumber}</strong> has been prepared. 
          If WhatsApp opened successfully, please hit "Send" in WhatsApp to confirm it with our team.
        </p>

        <div className={styles.infoBox}>
          <p>The kitchen will start preparing your fresh dishes shortly.</p>
          <p>You can pay via cash or card at your table after your meal.</p>
        </div>

        <button className="btn btn-primary" style={{width: '100%', minHeight: '50px'}} onClick={onReset}>
          Return to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
