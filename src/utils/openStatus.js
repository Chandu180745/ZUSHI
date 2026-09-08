/**
 * Open/closed status calculator
 * Reads from RESTAURANT_CONFIG.openingHours
 */

const DAYS = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

/**
 * Returns { isOpen, nextChange, label }
 * @param {Object} openingHours - weekly hours config
 * @param {Date} [now] - optional date override for testing
 */
export function getOpenStatus(openingHours, now = new Date()) {
  if (!openingHours) return { isOpen: false, label: 'Hours not set', nextChange: null };

  const dayKey = DAYS[now.getDay()];
  const hours = openingHours[dayKey];

  if (!hours) return { isOpen: false, label: 'Closed today', nextChange: null };

  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes    = openH * 60 + openM;
  const closeMinutes   = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  let nextChange = null;
  if (isOpen) {
    nextChange = `Closes at ${formatTime(hours.close)}`;
  } else if (currentMinutes < openMinutes) {
    nextChange = `Opens at ${formatTime(hours.open)}`;
  } else {
    // Find next day that opens
    for (let i = 1; i <= 7; i++) {
      const nextDay = DAYS[(now.getDay() + i) % 7];
      const nextHours = openingHours[nextDay];
      if (nextHours) {
        const dayLabel = i === 1 ? 'tomorrow' : nextDay.charAt(0).toUpperCase() + nextDay.slice(1);
        nextChange = `Opens ${dayLabel} at ${formatTime(nextHours.open)}`;
        break;
      }
    }
  }

  return { isOpen, nextChange, label: isOpen ? 'Open Now' : 'Closed' };
}

function formatTime(time24) {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2,'0')} ${suffix}`;
}
