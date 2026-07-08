/**
 * Vaultly Shadow System
 * Consistent shadow values for depth and elevation
 */

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  focus: '0 0 0 3px rgba(56, 80, 106, 0.1)',
} as const;

/**
 * Semantic Shadow Values
 * Named shadow values for common use cases
 */
export const shadowSemantics = {
  button: shadows.sm,
  card: shadows.md,
  modal: shadows.xl,
  dropdown: shadows.lg,
  input: shadows.xs,
  hover: shadows.md,
  active: shadows.base,
  focus: shadows.focus,
  elevated: shadows.lg,
} as const;

export type ShadowSize = keyof typeof shadows;
export type ShadowSemantic = keyof typeof shadowSemantics;
