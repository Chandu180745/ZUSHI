/**
 * Coupon validation engine
 */
import { COUPONS } from '../config/restaurant.js';

/**
 * Validates a coupon code and returns the result
 * @param {string} code
 * @param {number} subtotal
 * @returns {{ valid: boolean, coupon: Object|null, discount: number, error: string|null }}
 */
export function validateCoupon(code, subtotal) {
  if (!code || !code.trim()) {
    return { valid: false, coupon: null, discount: 0, error: 'Please enter a promo code.' };
  }

  const normalized = code.trim().toUpperCase();
  const coupon = COUPONS.find(c => c.code === normalized);

  if (!coupon) {
    return { valid: false, coupon: null, discount: 0, error: "That promo code isn't valid." };
  }

  if (!coupon.active) {
    return { valid: false, coupon: null, discount: 0, error: 'This offer is no longer active.' };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, coupon: null, discount: 0, error: 'This offer has expired.' };
  }

  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return {
      valid: false,
      coupon: null,
      discount: 0,
      error: `Minimum order of ₹${coupon.minOrderValue} required for this code.`,
    };
  }

  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = Math.round((subtotal * coupon.value) / 100);
  } else if (coupon.type === 'flat') {
    discount = Math.min(coupon.value, subtotal);
  }

  // Guard: discount cannot exceed subtotal (no negative totals)
  discount = Math.min(discount, subtotal);

  return { valid: true, coupon, discount, error: null };
}

/**
 * Calculates order totals
 */
export function calculateTotals(cartItems, appliedCoupon) {
  const subtotal = cartItems.reduce((sum, item) => {
    const basePrice = item.selectedVariant ? item.selectedVariant.price : item.basePrice;
    const addOnPrice = (item.selectedAddOns || []).reduce((a, ao) => a + ao.price, 0);
    return sum + (basePrice + addOnPrice) * item.quantity;
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
    discount = Math.min(discount, subtotal);
  }

  const total = subtotal - discount;

  return { subtotal, discount, total };
}
