// ============================================
// UTILS — Portfolio
// ============================================

/**
 * Concatenate class names (lightweight cn helper)
 * No external dependency required
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Split text into an array of characters for letter-by-letter animation
 * Handles spaces by replacing them with non-breaking spaces
 */
export function splitTextToChars(text: string): string[] {
  return text.split('').map((char) => (char === ' ' ? ' ' : char));
}

/**
 * Split text into words
 */
export function splitTextToWords(text: string): string[] {
  return text.split(' ');
}

/**
 * Truncate a string to a given length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Get the primary color for a status
 */
export function getStatusColor(status: 'deployed' | 'in-progress' | 'archived'): string {
  const colors: Record<string, string> = {
    deployed: '#22C55E',
    'in-progress': '#838CE5',
    archived: '#7A7090',
  };
  return colors[status] ?? '#7A7090';
}

/**
 * Get readable label for a status
 */
export function getStatusLabel(status: 'deployed' | 'in-progress' | 'archived'): string {
  const labels: Record<string, string> = {
    deployed: 'Déployé',
    'in-progress': 'En cours',
    archived: 'Archivé',
  };
  return labels[status] ?? status;
}

/**
 * Format a year to string
 */
export function formatYear(year: number): string {
  return year.toString();
}

/**
 * Calculate distance between two 2D points
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
