/**
 * WhatsApp order message builder
 */

/**
 * Builds the WhatsApp message and opens WhatsApp
 * @param {Array} cartItems
 * @param {number} subtotal
 * @param {Object|null} coupon
 * @param {number} discount
 * @param {number} total
 * @param {string|number} tableNumber
 * @param {string} whatsappNumber - E.164 format e.g. +918074152355
 * @returns {boolean} true if WhatsApp opened, false if failed
 */
export function sendWhatsAppOrder({ cartItems, subtotal, coupon, discount, total, tableNumber, whatsappNumber }) {
  const lines = [];

  lines.push('🍽️ ZUSHI — DINE-IN ORDER');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`Table: ${tableNumber}`);
  lines.push('');
  lines.push('📋 ORDER:');
  lines.push('');

  cartItems.forEach(item => {
    let line = `${item.quantity} × ${item.name}`;

    // Find the price for the selected variant
    if (item.selectedVariant) {
      line += ` — ₹${item.selectedVariant.price * item.quantity}`;
    } else {
      line += ` — ₹${item.basePrice * item.quantity}`;
    }

    lines.push(line);

    if (item.selectedVariant) {
      lines.push(`   Variant: ${item.selectedVariant.name}`);
    }

    if (item.selectedAddOns && item.selectedAddOns.length > 0) {
      const addOnStr = item.selectedAddOns.map(a => `${a.name} (+₹${a.price})`).join(', ');
      lines.push(`   Add-ons: ${addOnStr}`);
    }

    lines.push('');
  });

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`Subtotal: ₹${subtotal}`);

  if (discount > 0 && coupon) {
    lines.push(`Discount (${coupon.code}): −₹${discount}`);
  }

  lines.push(`TOTAL: ₹${total}`);
  lines.push('');
  lines.push('💵 Payment: Cash');
  lines.push('');
  lines.push('Please confirm this order. Thank you! 🙏');

  const message = lines.join('\n');
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encoded}`;

  try {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats the order as plain text (fallback display)
 */
export function formatOrderText({ cartItems, subtotal, coupon, discount, total, tableNumber }) {
  const lines = [];
  lines.push(`ZUSHI — DINE-IN ORDER`);
  lines.push(`Table: ${tableNumber}`);
  lines.push('');
  cartItems.forEach(item => {
    lines.push(`${item.quantity} × ${item.name}`);
    if (item.selectedVariant) lines.push(`  Variant: ${item.selectedVariant.name}`);
    if (item.selectedAddOns?.length) {
      lines.push(`  Add-ons: ${item.selectedAddOns.map(a => a.name).join(', ')}`);
    }
  });
  lines.push('');
  lines.push(`Subtotal: ₹${subtotal}`);
  if (discount > 0) lines.push(`Discount: −₹${discount}`);
  lines.push(`TOTAL: ₹${total}`);
  return lines.join('\n');
}
