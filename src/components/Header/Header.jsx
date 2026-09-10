import { useState, useRef } from 'react';
import { Logo } from '../Logo/Logo.jsx';
import { useCart } from '../../context/CartContext.jsx';
import styles from './Header.module.css';

export function Header({ onCartOpen }) {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    window.dispatchEvent(new CustomEvent('zushi-search', { detail: query.trim() }));
    
    if (query.trim()) {
      const menuEl = document.querySelector('#menu');
      if (menuEl) {
        const offset = 80;
        const top = menuEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  };

  const handleBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.navContainer}>
        {/* Logo Pill */}
        {!isSearchExpanded && (
          <a href="#" onClick={e => handleNavClick(e, 'home')} aria-label="Zushi — Home" className={styles.logoPill}>
            <Logo size="sm" />
          </a>
        )}

        {/* Search Pill */}
        <div 
          className={`${styles.searchPill} ${isSearchExpanded ? styles.searchExpanded : styles.searchCollapsed}`}
          onClick={!isSearchExpanded ? toggleSearch : undefined}
        >
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          {isSearchExpanded && (
            <input 
              ref={searchInputRef}
              type="search" 
              placeholder="Search for rolls, ramen..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleBlur}
              className={styles.searchInput}
            />
          )}
        </div>

        {/* Cart Pill */}
        {!isSearchExpanded && (
          <button
            className={styles.cartPill}
            onClick={onCartOpen}
            aria-label={`Cart — ${itemCount} items`}
          >
            <svg className={styles.bagIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
