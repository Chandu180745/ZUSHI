import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { ADMIN_CONFIG } from '../../config/restaurant.js';
import styles from './Admin.module.css';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Config State
  const [config, setConfig] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_CONFIG.sessionKey);
    if (session === 'active') {
      setIsAuthenticated(true);
      loadConfig();
    }
  }, []);

  const loadConfig = () => {
    let currentOverrides = {};
    try {
      const saved = localStorage.getItem('zushi_config_overrides');
      if (saved) currentOverrides = JSON.parse(saved);
    } catch (e) {}
    setConfig(currentOverrides);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Check password against hash
    const isValid = bcrypt.compareSync(password, ADMIN_CONFIG.passwordHash);
    
    if (isValid) {
      sessionStorage.setItem(ADMIN_CONFIG.sessionKey, 'active');
      setIsAuthenticated(true);
      loadConfig();
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_CONFIG.sessionKey);
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('zushi_config_overrides', JSON.stringify(config));
      setSaveStatus('Saved successfully! Refresh main site to see changes.');
      setTimeout(() => setSaveStatus(''), 4000);
    } catch (err) {
      setSaveStatus('Failed to save.');
    }
  };

  const handleClear = () => {
    if (window.confirm('Reset all changes to defaults?')) {
      localStorage.removeItem('zushi_config_overrides');
      setConfig({});
      setSaveStatus('Reset to defaults. Refresh main site.');
      setTimeout(() => setSaveStatus(''), 4000);
    }
  };

  const handleChange = (path, value) => {
    setConfig(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Zushi Admin</h1>
          <form onSubmit={handleLogin} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.field}>
              <label htmlFor="password">Admin Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Login</button>
          </form>
          <p style={{marginTop: '1rem', fontSize: '12px', color: 'var(--text-muted)'}}>
            Hint: Zushi@Admin2024
          </p>
        </div>
      </div>
    );
  }

  if (!config) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Restaurant Dashboard</h1>
          <p className={styles.subtitle}>Update settings and information</p>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          <a href="/" className="btn btn-outline" target="_blank" rel="noreferrer">View Site</a>
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className={styles.main}>
        {saveStatus && <div className={styles.successBanner}>{saveStatus}</div>}

        <form onSubmit={handleSave}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Global Notice Banner</h2>
            <div className={styles.fieldRow}>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={config.notice?.active || false}
                  onChange={e => handleChange('notice.active', e.target.checked)}
                />
                Show Notice Banner
              </label>
            </div>
            {config.notice?.active && (
              <div className={styles.fieldRow}>
                <label>Banner Message</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. We are closed today due to maintenance."
                  value={config.notice?.message || ''}
                  onChange={e => handleChange('notice.message', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Contact Details</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label>Public Phone</label>
                <input 
                  type="text" 
                  className="input"
                  value={config.publicPhone || ''}
                  onChange={e => handleChange('publicPhone', e.target.value)}
                  placeholder="8074152355"
                />
              </div>
              <div className={styles.field}>
                <label>WhatsApp Order Number</label>
                <input 
                  type="text" 
                  className="input"
                  value={config.whatsappOrderNumber || ''}
                  onChange={e => handleChange('whatsappOrderNumber', e.target.value)}
                  placeholder="+918074152355"
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Opening Hours</h2>
            <p style={{fontSize:'12px', color:'var(--text-muted)', marginBottom:'1rem'}}>Use 24-hour format (e.g. 14:30). Clear fields to mark as closed.</p>
            <div className={styles.fieldGrid}>
              {['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(day => (
                <div key={day} className={styles.field}>
                  <label style={{textTransform:'capitalize'}}>{day}</label>
                  <div style={{display:'flex', gap:'10px'}}>
                    <input 
                      type="time" 
                      className="input"
                      value={config.openingHours?.[day]?.open || ''}
                      onChange={e => handleChange(`openingHours.${day}.open`, e.target.value)}
                    />
                    <span style={{alignSelf:'center'}}>to</span>
                    <input 
                      type="time" 
                      className="input"
                      value={config.openingHours?.[day]?.close || ''}
                      onChange={e => handleChange(`openingHours.${day}.close`, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={handleClear}>Reset to Defaults</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Admin;
