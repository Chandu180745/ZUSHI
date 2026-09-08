import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
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
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
