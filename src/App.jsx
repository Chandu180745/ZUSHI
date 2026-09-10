import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext.jsx';

import { Header } from './components/Header/Header.jsx';
import { MobileNav } from './components/Header/MobileNav.jsx';
import { Hero } from './components/Hero/Hero.jsx';
import { RestaurantSnapshot } from './components/RestaurantSnapshot/RestaurantSnapshot.jsx';
import { FeaturedSection } from './components/FeaturedSection/FeaturedSection.jsx';
import { MenuSection } from './components/Menu/MenuSection.jsx';
import { Reviews } from './components/Reviews/Reviews.jsx';
import { Footer } from './components/Footer/Footer.jsx';

import { FoodDetailModal } from './components/Menu/FoodDetailModal.jsx';
import { CartDrawer } from './components/Cart/CartDrawer.jsx';
import { CheckoutModal } from './components/Checkout/CheckoutModal.jsx';
import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation.jsx';

import { Admin } from './pages/Admin/Admin.jsx';
import { RESTAURANT_CONFIG } from './config/restaurant.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ZUSHI App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#fff',
          fontFamily: "'Shojumaru', cursive, system-ui",
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#c8102e', fontSize: '28px', marginBottom: '16px' }}>ZUSHI</h1>
          <p style={{ color: '#d4af37', fontSize: '18px', marginBottom: '20px' }}>Something went wrong while loading the menu.</p>
          <pre style={{ 
            background: '#181818', 
            padding: '16px', 
            borderRadius: '8px', 
            maxWidth: '600px', 
            overflowX: 'auto',
            fontSize: '12px',
            color: '#aaa',
            fontFamily: 'monospace'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '24px',
              padding: '12px 28px',
              background: '#c8102e',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Storefront() {
  const { addItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmationTable, setConfirmationTable] = useState(null);
  
  const [selectedFeaturedItem, setSelectedFeaturedItem] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleOrderNow = useCallback(() => {
    scrollToSection('menu');
  }, []);

  const handleReserve = useCallback(() => {
    scrollToSection('contact');
  }, []);

  return (
    <div className="app-container">
      {RESTAURANT_CONFIG.notice?.active && RESTAURANT_CONFIG.notice?.message && (
        <div className="global-notice" role="alert">
          {RESTAURANT_CONFIG.notice.message}
        </div>
      )}

      <Header 
        onCartOpen={() => setCartOpen(true)} 
        onOrderNow={handleOrderNow} 
      />

      <main>
        <Hero 
          onExploreMenu={handleOrderNow}
          onOrderNow={handleOrderNow}
          onReserve={handleReserve}
        />
        
        <RestaurantSnapshot />

        <FeaturedSection 
          onViewDetail={setSelectedFeaturedItem}
          onQuickAdd={(item) => addItem(item)}
        />

        <MenuSection />

        <Reviews />
      </main>

      <Footer />

      <MobileNav 
        onCartOpen={() => setCartOpen(true)}
        onMenuClick={() => scrollToSection('menu')}
      />

      {selectedFeaturedItem && (
        <FoodDetailModal
          item={selectedFeaturedItem}
          onClose={() => setSelectedFeaturedItem(null)}
        />
      )}

      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          onClose={() => setCheckoutOpen(false)}
          onConfirm={(tableNum) => {
            setCheckoutOpen(false);
            setConfirmationTable(tableNum);
          }}
        />
      )}

      {confirmationTable && (
        <OrderConfirmation
          tableNumber={confirmationTable}
          onReset={() => setConfirmationTable(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Storefront />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
