/**
 * Vaultly Typography
 * ==================
 * Font definitions and sizes for consistent typography
 */

export const FONTS = {
  // Font families
  heading: {
    family: 'Bricolage Grotesque, sans-serif',
    weight: 600,
    lineHeight: 1.2,
  },
  
  body: {
    family: 'Montserrat, sans-serif',
    weight: 400,
    lineHeight: 1.5,
  },
  
  button: {
    family: 'Montserrat, sans-serif',
    weight: 600,
    lineHeight: 1.2,
  },
  
  caption: {
    family: 'Montserrat, sans-serif',
    weight: 400,
    lineHeight: 1.4,
  },
} as const;

// Typography scale
export const TEXT_SIZES = {
  xs: {
    size: '0.75rem',    // 12px
    lineHeight: '1rem', // 16px
  },
  sm: {
    size: '0.875rem',   // 14px
    lineHeight: '1.25rem', // 20px
  },
  base: {
    size: '1rem',       // 16px
    lineHeight: '1.5rem', // 24px
  },
  lg: {
    size: '1.125rem',   // 18px
    lineHeight: '1.75rem', // 28px
  },
  xl: {
    size: '1.25rem',    // 20px
    lineHeight: '1.75rem', // 28px
  },
  '2xl': {
    size: '1.5rem',     // 24px
    lineHeight: '2rem', // 32px
  },
  '3xl': {
    size: '1.875rem',   // 30px
    lineHeight: '2.25rem', // 36px
  },
  '4xl': {
    size: '2.25rem',    // 36px
    lineHeight: '2.5rem', // 40px
  },
  '5xl': {
    size: '3rem',       // 48px
    lineHeight: '1.2',
  },
} as const;

// Heading sizes
export const HEADING_SIZES = {
  h1: TEXT_SIZES['5xl'],
  h2: TEXT_SIZES['4xl'],
  h3: TEXT_SIZES['3xl'],
  h4: TEXT_SIZES['2xl'],
  h5: TEXT_SIZES.xl,
  h6: TEXT_SIZES.lg,
} as const;

// Component sizes
export const COMPONENT_SIZES = {
  button: TEXT_SIZES.sm,
  input: TEXT_SIZES.base,
  label: TEXT_SIZES.sm,
  caption: TEXT_SIZES.xs,
  body: TEXT_SIZES.base,
} as const;

export type Fonts = typeof FONTS;
export type TextSize = keyof typeof TEXT_SIZES;
export type HeadingLevel = keyof typeof HEADING_SIZES;
