import logoText from '../../assets/logo-text.png';
import logoText2x from '../../assets/logo-text@2x.png';
import styles from './Logo.module.css';

/**
 * Zushi Logo — Extracted authentic wordmark from the original restaurant sign.
 * Dynamically scales based on screen size and viewport.
 */
export function Logo({ size = 'md', className = '', style = {} }) {
  const isPreset = typeof size === 'string' && ['sm', 'md', 'lg'].includes(size);
  const sizeClass = isPreset ? styles[size] : styles.md;

  const dynamicStyle = {
    ...(!isPreset && size
      ? { '--logo-height': typeof size === 'number' ? `${size}px` : size }
      : {}),
    ...style,
  };

  return (
    <div
      className={`${styles.logo} ${sizeClass} ${className}`}
      style={dynamicStyle}
      aria-label="ZUSHI restaurant"
    >
      <img
        src={logoText}
        srcSet={`${logoText} 1x, ${logoText2x} 2x`}
        alt="ZUSHI"
        className={styles.logoImg}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export default Logo;
