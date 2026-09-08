import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { calculateTotals } from '../utils/coupon.js';

const CartContext = createContext(null);
const CART_KEY = 'zushi_cart';
const TABLE_KEY = 'zushi_table';
const COUPON_KEY = 'zushi_coupon';

// ── Reducer ──────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { item } = action;
      const key = getItemKey(item);
      const existing = state.items.find(i => getItemKey(i) === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            getItemKey(i) === key ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...item, cartId: Date.now() + Math.random() }] };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.cartId) };

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.cartId !== action.cartId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], appliedCoupon: null };

    case 'SET_TABLE':
      return { ...state, tableNumber: action.tableNumber };

    case 'APPLY_COUPON':
      return { ...state, appliedCoupon: action.coupon };

    case 'REMOVE_COUPON':
      return { ...state, appliedCoupon: null };

    case 'LOAD_PERSISTED':
      return { ...state, ...action.data };

    default:
      return state;
  }
}

function getItemKey(item) {
  const variantId = item.selectedVariant?.id || 'base';
  const addOnIds = (item.selectedAddOns || []).map(a => a.id).sort().join(',');
  return `${item.id}__${variantId}__${addOnIds}`;
}

const initialState = {
  items: [],
  tableNumber: '',
  appliedCoupon: null,
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Detect table number from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');

    // Load persisted state
    const persisted = {
      items: [],
      tableNumber: '',
      appliedCoupon: null,
    };

    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) persisted.items = JSON.parse(savedCart);
    } catch { /* ignore */ }

    try {
      const savedTable = localStorage.getItem(TABLE_KEY);
      if (savedTable) persisted.tableNumber = savedTable;
    } catch { /* ignore */ }

    try {
      const savedCoupon = localStorage.getItem(COUPON_KEY);
      if (savedCoupon) persisted.appliedCoupon = JSON.parse(savedCoupon);
    } catch { /* ignore */ }

    // URL table param takes priority
    if (tableParam) {
      const parsed = parseInt(tableParam, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
        persisted.tableNumber = String(parsed);
      }
    }

    dispatch({ type: 'LOAD_PERSISTED', data: persisted });
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    } catch { /* ignore */ }
  }, [state.items]);

  useEffect(() => {
    try {
      if (state.tableNumber) {
        localStorage.setItem(TABLE_KEY, state.tableNumber);
      }
    } catch { /* ignore */ }
  }, [state.tableNumber]);

  useEffect(() => {
    try {
      if (state.appliedCoupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(state.appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch { /* ignore */ }
  }, [state.appliedCoupon]);

  // ── Actions ──────────────────────────────────────────────────────────────
  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', item }), []);
  const removeItem = useCallback((cartId) => dispatch({ type: 'REMOVE_ITEM', cartId }), []);
  const updateQuantity = useCallback((cartId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', cartId, quantity }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const setTable = useCallback((tableNumber) => dispatch({ type: 'SET_TABLE', tableNumber }), []);
  const applyCoupon = useCallback((coupon) => dispatch({ type: 'APPLY_COUPON', coupon }), []);
  const removeCoupon = useCallback(() => dispatch({ type: 'REMOVE_COUPON' }), []);

  // ── Derived State ────────────────────────────────────────────────────────
  const totals = calculateTotals(state.items, state.appliedCoupon);
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    items: state.items,
    tableNumber: state.tableNumber,
    appliedCoupon: state.appliedCoupon,
    itemCount,
    ...totals,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setTable,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
