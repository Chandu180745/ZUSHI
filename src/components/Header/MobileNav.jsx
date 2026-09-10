import { useCart } from '../../context/CartContext.jsx';
import styles from './MobileNav.module.css';

export function MobileNav({ onCartOpen, onMenuClick }) {
  const { itemCount } = useCart();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    scrollTo('#menu');
    onMenuClick?.();
  };

  return (
    <div className={styles.navContainer}>
      <nav className={styles.navDock} aria-label="Mobile bottom navigation">
        
        {/* Left: Home */}
        <button className={styles.navItem} onClick={scrollToHome} aria-label="Go to Home">
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>HOME</span>
        </button>

        {/* Center Gap Spacer */}
        <div className={styles.centerSpacer}>
          <span>MENU</span>
        </div>

        {/* Right: Cart */}
        <button
          className={`${styles.navItem} ${styles.cartNavItem}`}
          onClick={onCartOpen}
          aria-label="View cart"
        >
          <div className={styles.cartIconWrapper}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </div>
          <span>CART</span>
        </button>

      </nav>

      {/* Floating Center Button (Menu) */}
      <button className={styles.centerFab} onClick={scrollToMenu} aria-label="Browse Menu">
        <div className={styles.fabInner}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            <path d="m14 14-4-4" />
          </svg>
        </div>
      </button>

    </div>
  );
}

export default MobileNav;
