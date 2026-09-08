import { useState, useRef, useCallback, useEffect } from 'react';
import { CATEGORIES } from '../../data/menu.js';
import styles from './CategoryNav.module.css';

export function CategoryNav({ activeCategory, onSelect }) {
  const scrollRef = useRef(null);

  // Scroll active category into view
  useEffect(() => {
    const container = scrollRef.current;
    const active = container?.querySelector('[data-active="true"]');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  return (
    <nav className={styles.nav} aria-label="Menu categories">
      <div className={styles.track} ref={scrollRef} role="tablist">
        <button
          role="tab"
          className={`${styles.tab} ${activeCategory === 'all' ? styles.tabActive : ''}`}
          onClick={() => onSelect('all')}
          aria-selected={activeCategory === 'all'}
          data-active={activeCategory === 'all'}
        >
          <span className={styles.tabIcon}>🍽️</span>
          <span>All</span>
        </button>

        {CATEGORIES.sort((a,b) => a.sortOrder - b.sortOrder).map(cat => (
          <button
            key={cat.id}
            role="tab"
            className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
            onClick={() => onSelect(cat.id)}
            aria-selected={activeCategory === cat.id}
            data-active={activeCategory === cat.id}
          >
            <span className={styles.tabIcon}>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default CategoryNav;
