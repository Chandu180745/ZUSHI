import { useState, useRef, useCallback, useEffect } from 'react';
import { CATEGORIES } from '../../data/menu.js';
import styles from './CategoryNav.module.css';

export function CategoryNav({ activeCategory, onSelect }) {
  const scrollRef = useRef(null);

  // Container no longer scrolls horizontally, so we removed the scroll tracking effect.

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
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default CategoryNav;
