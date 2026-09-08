/**
 * ZUSHI — CENTRAL RESTAURANT CONFIGURATION
 * =========================================
 * All business information, URLs, and settings live here.
 * Change these values to update the entire website without touching any components.
 */

const DEFAULT_CONFIG = {
  // ── Basic Info ──────────────────────────────────────────────────────────────
  name: 'Zushi',
  tagline: 'A premium dining experience in Sainikpuri',
  canonicalUrl: 'https://zushisainikpuri.in',

  // ── Address ─────────────────────────────────────────────────────────────────
  address: {
    line1: 'Plot No. 650, Defence Colony Rd',
    line2: 'Hill Top Colony, Sainikpuri',
    city: 'Hyderabad, Secunderabad',
    state: 'Telangana',
    pincode: '500094',
    full: 'Plot No. 650, Defence Colony Rd, Hill Top Colony, Sainikpuri, Hyderabad, Secunderabad, Telangana 500094',
  },

  // ── Phone Numbers ────────────────────────────────────────────────────────────
  publicPhone: '8074152355',
  whatsappOrderNumber: '+918074152355',

  // ── Google Business ──────────────────────────────────────────────────────────
  google: {
    rating: 4.2,
    reviewCount: 329,
    reviewsUrl: 'https://www.google.com/search?q=Zushi+Sainikpuri+Hyderabad+reviews',
    mapsUrl: 'https://www.google.com/maps/search/Zushi+Sainikpuri+Hyderabad/@17.4849,78.5534,15z',
  },

  // ── Price Range ──────────────────────────────────────────────────────────────
  priceRange: {
    min: 400,
    max: 1400,
    currency: '₹',
    perPerson: true,
  },

  // ── Seating ──────────────────────────────────────────────────────────────────
  outdoorSeating: true,

  // ── Reservation ──────────────────────────────────────────────────────────────
  reservationUrl: null,

  // ── Opening Hours ────────────────────────────────────────────────────────────
  openingHours: {
    monday:    { open: '12:00', close: '22:30' },
    tuesday:   { open: '12:00', close: '22:30' },
    wednesday: { open: '12:00', close: '22:30' },
    thursday:  { open: '12:00', close: '22:30' },
    friday:    { open: '12:00', close: '23:00' },
    saturday:  { open: '12:00', close: '23:00' },
    sunday:    { open: '12:00', close: '22:30' },
  },
  hoursConfirmed: false,

  // ── Tables ───────────────────────────────────────────────────────────────────
  tableCount: 30,

  // ── SEO ──────────────────────────────────────────────────────────────────────
  seo: {
    title: 'Zushi Sainikpuri | Premium Dining & Digital Menu',
    description: 'Explore Zushi\'s full menu, browse dishes, and place your dine-in order directly from your table in Sainikpuri, Hyderabad.',
    keywords: 'Zushi, Sainikpuri restaurant, Hyderabad dining, dine-in menu, restaurant Sainikpuri',
  },

  // ── Social Media ─────────────────────────────────────────────────────────────
  social: {
    instagram: null,
    facebook: null,
    twitter: null,
  },
  
  // Notice Banner (optional alert at the top of the site)
  notice: {
    active: false,
    message: '',
  }
};

// Deep merge utility for applying overrides
function mergeDeep(target, source) {
  if (typeof target !== 'object' || typeof source !== 'object') return source;
  const output = Object.assign({}, target);
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!(key in target)) Object.assign(output, { [key]: source[key] });
      else output[key] = mergeDeep(target[key], source[key]);
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });
  return output;
}

let overrides = {};
try {
  const saved = localStorage.getItem('zushi_config_overrides');
  if (saved) overrides = JSON.parse(saved);
} catch(e) {}

export const RESTAURANT_CONFIG = mergeDeep(DEFAULT_CONFIG, overrides);

// ── Coupon / Discount Configuration ────────────────────────────────────────────
export const COUPONS = [
  {
    code: 'WELCOME15',
    type: 'percentage',
    value: 15,
    label: 'New Customer Welcome',
    active: true,
    expiresAt: null, // null = no expiry
    minOrderValue: 200,
  },
  {
    code: 'LOYAL10',
    type: 'percentage',
    value: 10,
    label: 'Returning Customer Offer',
    active: true,
    expiresAt: null,
    minOrderValue: 200,
  },
];

// ── Admin Configuration ──────────────────────────────────────────────────────
// Password hash for admin access (bcryptjs hash of the actual password).
// Default prototype password: Zushi@Admin2024
// IMPORTANT: Change this hash before going live. Generate with bcryptjs.
export const ADMIN_CONFIG = {
  passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVKq.m5/hm', // "Zushi@Admin2024"
  sessionKey: 'zushi_admin_session',
};

export default RESTAURANT_CONFIG;
