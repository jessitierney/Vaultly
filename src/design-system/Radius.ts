/**
 * Vaultly Border Radius Scale
 * Consistent border radius values for corners and rounded elements
 */

export const radius = {
  none: '0',
  sm: '0.375rem',    // 6px
  base: '0.5rem',    // 8px
  md: '0.625rem',    // 10px
  lg: '0.875rem',    // 14px
  xl: '1rem',        // 16px
  '2xl': '1.25rem',  // 20px
  '3xl': '1.5rem',   // 24px
  '4xl': '2rem',     // 32px
  full: '9999px',    // Full round
} as const;

/**
 * Semantic Radius Values
 * Named radius values for common use cases
 */
export const radiusSemantics = {
  button: radius.lg,      // 14px
  input: radius['2xl'],   // 20px
  card: radius.xl,        // 16px
  modal: radius.xl,       // 16px
  tooltip: radius.md,     // 10px
  badge: radius.full,     // Full round
  avatar: radius.full,    // Full round
} as const;

export type RadiusSize = keyof typeof radius;
export type RadiusSemantic = keyof typeof radiusSemantics;
