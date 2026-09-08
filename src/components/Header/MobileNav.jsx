import { useCart } from '../../context/CartContext.jsx';
import styles from './MobileNav.module.css';

export function MobileNav({ onCartOpen, onMenuClick }) {
  const { itemCount, total } = useCart();

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    onMenuClick?.();
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Mobile bottom navigation">
      {/* Menu */}
      <button className={styles.navItem} onClick={scrollToMenu} aria-label="Browse Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
        <span>Menu</span>
      </button>

      {/* Cart CTA - centered prominent */}
      <button
        className={`${styles.navItem} ${styles.cartNavItem} ${itemCount > 0 ? styles.hasItems : ''}`}
        onClick={onCartOpen}
        aria-label={itemCount > 0 ? `Cart — ${itemCount} items, ₹${total}` : 'View cart'}
      >
        <div className={styles.cartIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </div>
        <span>{itemCount > 0 ? `₹${total}` : 'Cart'}</span>
      </button>

      {/* Contact */}
      <button className={styles.navItem} onClick={scrollToContact} aria-label="Contact Zushi">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16z"/>
        </svg>
        <span>Contact</span>
      </button>
    </nav>
  );
}

export default MobileNav;
