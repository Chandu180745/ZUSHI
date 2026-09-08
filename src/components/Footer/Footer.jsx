import { useState, useCallback } from 'react';
import RESTAURANT_CONFIG from '../../config/restaurant.js';
import { Logo } from '../Logo/Logo.jsx';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleMockAction = (e, actionName) => {
    e.preventDefault();
    showToast(`Opening ${actionName}...`);
  };

  return (
    <footer className={styles.footer} id="contact" aria-label="Site footer">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <Logo size="sm" className={styles.logo} />
            <p className={styles.tagline}>{RESTAURANT_CONFIG.tagline}</p>
          </div>

          {/* Contact */}
          <div className={styles.contactCol}>
            <p>
              <a href={RESTAURANT_CONFIG.google.mapsUrl} target="_blank" rel="noreferrer" className={styles.link}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {RESTAURANT_CONFIG.address.line1}, {RESTAURANT_CONFIG.address.city}
              </a>
            </p>
            <p>
              <a href={`tel:${(RESTAURANT_CONFIG.publicPhone || '').replace(/\s+/g, '')}`} className={styles.link}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                {RESTAURANT_CONFIG.publicPhone}
              </a>
            </p>
          </div>

          {/* Socials */}
          <div className={styles.socialCol}>
            <button className={styles.textBtn} onClick={(e) => handleMockAction(e, 'Instagram')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle'}}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </button>
            <button className={styles.textBtn} onClick={(e) => handleMockAction(e, 'Facebook')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle'}}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              Facebook
            </button>
            <button className={styles.textBtn} onClick={(e) => handleMockAction(e, 'Twitter')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle'}}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              Twitter
            </button>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>© {currentYear} {RESTAURANT_CONFIG.name}.</p>
          <div className={styles.legal}>
            <button className={styles.textBtn} onClick={(e) => handleMockAction(e, 'Privacy Policy')}>Privacy</button>
            <button className={styles.textBtn} onClick={(e) => handleMockAction(e, 'Terms')}>Terms</button>
          </div>
        </div>
      </div>

      {/* Mock Toast Popup */}
      {toast && (
        <div className={styles.toast}>
          <div className={styles.toastIcon}>✓</div>
          {toast}
        </div>
      )}
    </footer>
  );
}

export default Footer;
