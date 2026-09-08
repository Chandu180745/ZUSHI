/**
 * Reusable VegIcon indicator
 */
export function VegIcon({ type, size = 14 }) {
  const isVeg = type === 'veg';
  const color = isVeg ? '#4CAF50' : '#E53935';
  const label = isVeg ? 'Vegetarian' : 'Non-Vegetarian';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      title={label}
    >
      <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke={color} strokeWidth="1.2"/>
      {isVeg ? (
        <circle cx="7" cy="7" r="3.5" fill={color}/>
      ) : (
        <polygon points="7,3 11,11 3,11" fill={color}/>
      )}
    </svg>
  );
}

/**
 * Badge component — only renders if the condition is true
 */
export function Badge({ variant = 'gold', children }) {
  return (
    <span className={`badge badge-${variant}`}>{children}</span>
  );
}

/**
 * Food item badges based on item flags
 */
export function ItemBadges({ item }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
      {item.chefSpecial && <Badge variant="gold">Chef's Special</Badge>}
      {item.popular && !item.chefSpecial && <Badge variant="burgundy">Popular</Badge>}
      {item.isNew && <Badge variant="green">New</Badge>}
      {!item.available && <span className="sold-out-badge">Sold Out</span>}
    </div>
  );
}

export default VegIcon;
