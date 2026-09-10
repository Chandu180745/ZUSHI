import { useState, useCallback } from 'react';
import RESTAURANT_CONFIG from '../../config/restaurant.js';
import { Logo } from '../Logo/Logo.jsx';
import styles from './Footer.module.css';

/* ── Mock Policy Content ─────────────────────────── */
const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    content: `Last updated: September 2026

Zushi ("we", "our", or "us") operates the Zushi Sainikpuri digital menu website. This page informs you of our policies regarding the collection, use, and disclosure of personal information.

Information We Collect
• When you place an order, we collect your table number and order details.
• We do not collect personal identification data such as name, email, or payment information through this platform.
• We may use cookies to improve your browsing experience.

How We Use Your Information
• To process and fulfill your dine-in orders.
• To improve our menu and service based on aggregate usage data.
• To communicate order status and updates during your visit.

Data Retention
• Order data is retained only for the duration of your dining session and for up to 7 days for operational purposes.

Third-Party Services
• We use Google Maps to display our location. Google's privacy policy applies to map interactions.
• Links to Zomato, Swiggy, and other platforms are governed by their respective privacy policies.

Contact Us
If you have any questions about this Privacy Policy, please contact us at the restaurant or call ${RESTAURANT_CONFIG.publicPhone}.`,
  },
  terms: {
    title: 'Terms of Service',
    content: `Last updated: September 2026

Welcome to Zushi's digital menu. By accessing and using this website, you agree to the following terms and conditions.

Use of Service
• This website is a digital menu and ordering tool for dine-in customers of Zushi, Sainikpuri.
• You must be physically present at the restaurant to place orders through this platform.

Orders & Pricing
• All prices listed are in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.
• Menu items and prices are subject to change without prior notice.
• Item availability is subject to kitchen stock and may vary.

Intellectual Property
• All content, branding, images, and design elements on this website are the property of Zushi and are protected by applicable intellectual property laws.

Limitation of Liability
• We strive to provide accurate menu information, but we do not guarantee that all information is error-free.
• Zushi shall not be liable for any allergic reactions. Please inform your server of any food allergies.

Modifications
• We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.

Contact Us
For questions regarding these terms, please speak with our staff or call ${RESTAURANT_CONFIG.publicPhone}.`,
  },
};

/* ── Policy Modal Component ──────────────────────── */
function PolicyModal({ policy, onClose }) {
  if (!policy) return null;
  const data = POLICIES[policy];
  if (!data) return null;

  return (
    <div className={styles.policyBackdrop} onClick={onClose}>
      <div className={styles.policyModal} onClick={e => e.stopPropagation()}>
        <div className={styles.policyHeader}>
          <h3 className={styles.policyTitle}>{data.title}</h3>
          <button className={styles.policyClose} onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className={styles.policyBody}>
          {data.content.split('\n').map((line, i) => (
            <p key={i} className={line.startsWith('•') ? styles.policyBullet : line.match(/^[A-Z]/) && !line.startsWith('•') ? styles.policySectionTitle : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Footer Component ────────────────────────────── */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState(null);

  // Google Maps embed URL for Zushi Sainikpuri
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2!2d78.5534!3d17.4849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sZushi%20Sainikpuri!5e0!3m2!1sen!2sin!4v1`;
  const mapsDirectUrl = RESTAURANT_CONFIG.google.mapsUrl;

  const platforms = [
    { key: 'zomato', url: RESTAURANT_CONFIG.platforms?.zomato, label: 'Zomato', color: '#E23744',
      img: 'https://www.google.com/s2/favicons?domain=zomato.com&sz=128' },
    { key: 'swiggy', url: RESTAURANT_CONFIG.platforms?.swiggy, label: 'Swiggy', color: '#FC8019',
      img: 'https://www.google.com/s2/favicons?domain=swiggy.com&sz=128' },
    { key: 'district', url: RESTAURANT_CONFIG.platforms?.district, label: 'District', color: '#6C5CE7',
      img: 'https://www.google.com/s2/favicons?domain=district.in&sz=128' },
    { key: 'magicpin', url: RESTAURANT_CONFIG.platforms?.magicpin, label: 'MagicPin', color: '#00C9A7',
      img: 'https://www.google.com/s2/favicons?domain=magicpin.in&sz=128' },
  ].filter(p => p.url);

  return (
    <footer className={styles.footer} id="contact" aria-label="Site footer">
      <div className={styles.inner}>
        
        {/* ── Top: Logo ─────────────────────────── */}
        <div className={styles.logoWrap}>
          <Logo size="sm" className={styles.logo} />
        </div>

        {/* ── Platform Icons ─────────────────────── */}
        {platforms.length > 0 && (
          <div className={styles.platforms}>
            {platforms.map(p => (
              <a
                key={p.key}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformIcon}
                aria-label={`Visit us on ${p.label}`}
                style={{ '--platform-color': p.color }}
              >
                <img src={p.img} alt={`${p.label} logo`} className={styles.realLogo} />
              </a>
            ))}
          </div>
        )}

        {/* ── Divider ────────────────────────────── */}
        <div className={styles.divider} />

        {/* ── Map + Contact Grid ─────────────────── */}
        <div className={styles.mapContactGrid}>
          {/* Google Map */}
          <div className={styles.mapWrap}>
            <a href={mapsDirectUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink} aria-label="Open in Google Maps">
              <iframe
                src={mapEmbedUrl}
                className={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zushi Location on Google Maps"
              />
              <div className={styles.mapOverlay}>
                <span className={styles.mapOverlayText}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Open in Google Maps
                </span>
              </div>
            </a>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <a href={mapsDirectUrl} target="_blank" rel="noreferrer" className={styles.contactLink}>
                  {RESTAURANT_CONFIG.address.line1}
                </a>
                <span className={styles.contactSub}>{RESTAURANT_CONFIG.address.city}</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <a href={`tel:${(RESTAURANT_CONFIG.publicPhone || '').replace(/\s+/g, '')}`} className={styles.contactLink}>
                {RESTAURANT_CONFIG.publicPhone}
              </a>
            </div>
          </div>
        </div>

        {RESTAURANT_CONFIG.reservationUrl && (
          <div className={styles.reserveWrap}>
            <a 
              href={RESTAURANT_CONFIG.reservationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.reserveBtn}
            >
              Reserve a Table
            </a>
          </div>
        )}

        {/* ── Bottom Bar ─────────────────────────── */}
        <div className={styles.divider} />
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© {currentYear} {RESTAURANT_CONFIG.name}. All rights reserved.</p>
          <div className={styles.legal}>
            <button className={styles.legalBtn} onClick={() => setActivePolicy('privacy')}>Privacy Policy</button>
            <span className={styles.legalDot}>·</span>
            <button className={styles.legalBtn} onClick={() => setActivePolicy('terms')}>Terms of Service</button>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
    </footer>
  );
}

export default Footer;
