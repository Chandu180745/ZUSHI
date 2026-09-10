import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../../data/menu.js';
import { FoodCard } from './FoodCard.jsx';
import { FoodDetailModal } from './FoodDetailModal.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import styles from './MenuSection.module.css';

const FILTERS = [
  { id: 'veg', label: '🟢 Veg' },
  { id: 'non-veg', label: '🔴 Non-Veg' },
];

function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);
  return { toast, show };
}

export function MenuSection() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchRef = useRef(null);
  const revealRef = useScrollReveal();
  const { toast, show: showToast } = useToast();

  // Listen for search events from the Header
  useEffect(() => {
    const handleSearchEvent = (e) => {
      const query = e.detail;
      if (query) {
        setSearchQuery(query);
        setSearchOpen(true);
        setActiveCategory('all');
      }
    };
    window.addEventListener('zushi-search', handleSearchEvent);
    return () => window.removeEventListener('zushi-search', handleSearchEvent);
  }, []);

  // Filter + search logic
  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    // Category
    if (activeCategory !== 'all') {
      items = items.filter(i => i.category === activeCategory);
    }

    // Veg filter
    if (activeFilter === 'veg') {
      items = items.filter(i => i.type === 'veg');
    } else if (activeFilter === 'non-veg') {
      items = items.filter(i => i.type === 'non-veg');
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        (i.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    return items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [activeCategory, activeFilter, searchQuery]);

  // Group items by category for display
  const groupedItems = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery.trim()) {
      return [{ category: null, items: filteredItems }];
    }
    const groups = [];
    CATEGORIES.sort((a,b) => a.sortOrder - b.sortOrder).forEach(cat => {
      const items = filteredItems.filter(i => i.category === cat.id);
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    });
    return groups;
  }, [filteredItems, activeCategory, searchQuery]);

  const handleQuickAdd = useCallback((item) => {
    addItem({
      id: item.id,
      name: item.name,
      basePrice: item.basePrice,
      image: item.image,
      type: item.type,
      selectedVariant: null,
      selectedAddOns: [],
      quantity: 1,
    });
    showToast(`✓ ${item.name} added`);
  }, [addItem, showToast]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 50);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <section id="menu" className={styles.section} aria-label="Menu">
      {/* Section Header */}
      <div className={`${styles.header} reveal-up`} ref={revealRef} style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)'}}>
        <div style={{textAlign: 'center'}}>
          <span className="section-label" style={{justifyContent: 'center'}}>Our Menu</span>
          <div className="gold-line" style={{margin: 'var(--space-3) auto 0'}} />
        </div>

        {/* Filters */}
        <div className={styles.filters} role="group" aria-label="Dietary filter">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`${styles.filterBtn} ${activeFilter === f.id ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(prev => prev === f.id ? 'all' : f.id)}
              aria-pressed={activeFilter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>


      {/* Grid */}
      <div className={styles.content}>
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p className="empty-state-title">No dishes found</p>
            <p className="empty-state-desc">Try a different search or filter</p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); setActiveFilter('all'); setSearchOpen(false); }}
            >
              Clear Search
            </button>
          </div>
        ) : (
          groupedItems.map(({ category, items }) => (
            <div key={category?.id || 'results'} className={styles.categoryGroup}>
              {category && (
                <div className={styles.categoryHeader} id={`cat-${category.id}`}>
                  <h3 className={styles.categoryTitle}>
                    {category.label}
                  </h3>
                  <div className="gold-line-sm" />
                </div>
              )}
              <div className={styles.grid}>
                {items.map(item => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onViewDetail={setSelectedItem}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Food Detail Modal */}
      {selectedItem && (
        <FoodDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </section>
  );
}

export default MenuSection;
