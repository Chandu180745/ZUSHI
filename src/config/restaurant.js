/**
 * ZUSHI — CENTRAL RESTAURANT CONFIGURATION
 * =========================================
 * All business information, URLs, and settings live here.
 * Change these values to update the entire website without touching any components.
 */

const DEFAULT_CONFIG = {
  // ── Basic Info ──────────────────────────────────────────────────────────────
  name: 'Zushi',
  tagline: 'Authentic Japanese Eats',
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
  publicPhone: '82476 37445',
  whatsappOrderNumber: '+918247637445',

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
  reservationUrl: 'https://www.google.com/maps/reserve/v/dine/c/ZYSijruR8uc?source=pa&opi=89978449&hl=en-IN&gei=Xx-gapaLNaefhvcP9N6lsAY&rr=3&sourceurl=https://www.google.com/search?client%3Dsafari%26rls%3Den%26q%3Dzushi%26ie%3DUTF-8%26oe%3DUTF-8',

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

  // ── Ordering / Review Platforms ──────────────────────────────────────────────
  platforms: {
    zomato: 'https://www.zomato.com/hyderabad/zushi-sainikpuri-secunderabad',
    swiggy: 'https://www.swiggy.com/restaurants/hyderabad/sainikpuri/zushi-1339325/dineout',
    district: 'https://www.district.in/dining/hyderabad/zushi-sainikpuri-secunderabad?srsltid=AfmBOopuxRdRV9GS6UbnYcqHt2kHvx0I09AqeIAj96UdTPLoSNkXZKBw',
    magicpin: 'https://magicpin.in/Hyderabad/Vayupuri/Restaurant/Zushi/store/17b92b2?srsltid=AfmBOoqC_EEhjuiiwVEmahUdjWi0tGTy8qbntu5Ydvy6pjgBCnFgRLE4',
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
