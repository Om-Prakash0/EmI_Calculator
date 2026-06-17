/**
 * Format a number as Indian Rupees (₹)
 * e.g. 1234567 → ₹12,34,567
 */
export function formatINR(value) {
  if (value == null || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a number with Indian comma system (no symbol)
 */
export function formatNumber(value) {
  if (value == null || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}
