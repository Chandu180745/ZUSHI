import styles from './Logo.module.css';

/**
 * Zushi Logo — SVG vintage wordmark
 * Swappable: replace this component with a real logo when available.
 * Use variant="light" for white version on dark backgrounds.
 */
export function Logo({ size = 'md', variant = 'default', className = '' }) {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const h = sizes[size] || sizes.md;

  return (
    <div className={`${styles.logo} ${className}`} aria-label="Zushi restaurant">
      <svg
        height={h}
        viewBox="0 0 200 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Zushi"
      >
        {/* Decorative top rule */}
        <line x1="0" y1="4" x2="200" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>

        {/* Small ornament left */}
        <polygon points="8,4 12,0 16,4" fill="currentColor" opacity="0.5"/>
        {/* Small ornament right */}
        <polygon points="184,4 188,0 192,4" fill="currentColor" opacity="0.5"/>

        {/* ZUSHI wordmark */}
        <text
          x="100"
          y="38"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="28"
          fontWeight="700"
          fill="currentColor"
          letterSpacing="10"
        >
          ZUSHI
        </text>

        {/* Decorative bottom rule */}
        <line x1="0" y1="48" x2="200" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>

        {/* Centre ornament below text */}
        <circle cx="100" cy="51" r="1.5" fill="currentColor" opacity="0.5"/>
        <line x1="85" y1="51" x2="95" y2="51" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="105" y1="51" x2="115" y2="51" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </svg>
    </div>
  );
}

export default Logo;
