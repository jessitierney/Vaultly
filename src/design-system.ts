/**
 * Vaultly Design System
 * 
 * Centralized design constants for consistent branding, typography, spacing, and colors.
 * Based on official brand guidelines in docs/01-BRAND-GUIDELINES.md
 * 
 * Usage:
 * import { colors, typography, spacing, shadows, borderRadius } from './design-system';
 */

// ============================================================================
// COLOUR PALETTE
// ============================================================================
// Official Vaultly colour palette per brand guidelines

export const colors = {
  // Primary palette
  white: '#FFFFFF',         // Primary background
  cream: '#F6F2EA',         // Secondary background
  navy: '#38506A',          // Primary text, key elements (dark mode: #24384D)
  sage: '#A4B69A',          // Accents, secondary elements
  mustard: '#E0B14D',       // Highlights, CTAs
  terracotta: '#C86B4A',    // Alerts, warnings

  // New earthy support colours
  forestGreen: '#2F4F3E',   // Forest Green accent
  softBeige: '#E8DDCC',     // Soft Beige background
  clay: '#B98268',          // Clay accent
  olive: '#7E8F6B',         // Olive accent
  sand: '#D8C3A5',          // Sand accent

  // Extended palette (derived for depth)
  sageLight: '#A8B99A',     // Lighter sage variant
  sageDark: '#5B6F82',      // Darker sage variant
  navyLight: '#4F6272',     // Lighter navy variant
  navyDark: '#24384D',      // Darker navy variant
  mustardLight: '#D8B65A',  // Lighter mustard variant
  terracottaLight: '#D48C6A', // Lighter terracotta variant
  cream95: '#FAF8F5',       // Very light cream (95% white)
  creamDark: '#D8CFC4',     // Darker cream for contrast

  // Semantic colours
  text: {
    primary: '#38506A',     // Primary text (navy)
    secondary: '#A4B69A',   // Secondary text (sage)
    light: '#F6F2EA',       // Light text (on dark backgrounds)
    muted: '#8B8B8B',       // Muted text (disabled, hints)
  },

  background: {
    primary: '#FFFFFF',     // Primary background (white)
    secondary: '#FAF8F5',   // Secondary background (98% white)
    surface: '#FFFFFF',     // Surface/card backgrounds
  },

  status: {
    success: '#A4B69A',     // Success/healthy (sage)
    warning: '#E0B14D',     // Warning/caution (mustard)
    error: '#C86B4A',       // Error/alert (terracotta)
    info: '#38506A',        // Info (navy)
  },

  // Semantic UI elements for activity types
  activity: {
    bcr: '#A8B99A',         // Bills, Costs, Receipts (sage)
    family: '#24384D',      // Family (dark navy)
  },

  // Calendar event type colours
  calendar: {
    Income: '#A4B69A',      // Sage
    Bills: '#D8B65A',       // Mustard Light
    Projects: '#24384D',    // Dark Navy
    Appointments: '#5B6F82', // Sage Dark
    Leave: '#A8B99A',       // Sage
    Holiday: '#D8B65A',     // Mustard Light
    Warranty: '#D48C6A',    // Terracotta Light
  },

  // Status badges
  badge: {
    healthy: '#A8B99A',
    onTrack: '#38506A',
    moving: '#E0B14D',
    upcoming: '#E0B14D',
    calm: '#A4B69A',
    remind: '#D48C6A',
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================
// Font families and text styles per brand guidelines

export const typography = {
  families: {
    heading: 'DM Sans, sans-serif',     // DM Sans for clean, premium headings
    body: 'Montserrat, sans-serif',    // Montserrat for body and small text
  },

  sizes: {
    // Heading sizes (DM Sans)
    h1: {
      fontSize: '60px',
      lineHeight: '1.2',
      fontWeight: 700,
      family: 'DM Sans',
    },
    h2: {
      fontSize: '48px',
      lineHeight: '1.2',
      fontWeight: 700,
      family: 'DM Sans',
    },
    h3: {
      fontSize: '32px',
      lineHeight: '1.2',
      fontWeight: 700,
      family: 'DM Sans',
    },
    h4: {
      fontSize: '24px',
      lineHeight: '1.3',
      fontWeight: 600,
      family: 'DM Sans',
    },

    // Body text sizes (Montserrat)
    body: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: 400,
      family: 'Montserrat',
    },
    bodySmall: {
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: 400,
      family: 'Montserrat',
    },
    bodyExtraSmall: {
      fontSize: '12px',
      lineHeight: '1.4',
      fontWeight: 400,
      family: 'Montserrat',
    },
    label: {
      fontSize: '14px',
      lineHeight: '1.4',
      fontWeight: 500,
      family: 'Montserrat',
    },
  },
} as const;

// ============================================================================
// SPACING SYSTEM
// ============================================================================
// 8pt grid system for consistent spacing throughout UI

export const spacing = {
  // Base unit: 4px (used in calculations)
  unit: 4,

  xs: '4px',       // 1x unit
  sm: '8px',       // 2x units
  md: '12px',      // 3x units
  lg: '16px',      // 4x units
  xl: '24px',      // 6x units
  xl2: '32px',     // 8x units
  xl3: '48px',     // 12x units
  xl4: '64px',     // 16x units

  // Component-specific spacing
  padding: {
    card: '24px',          // Card padding
    section: '32px',       // Section padding
    page: '32px',          // Page padding
    form: '24px',          // Form padding
    modal: '24px',         // Modal padding
  },

  margin: {
    section: '32px',       // Between sections
    item: '16px',          // Between list items
    form: '12px',          // Between form fields
  },

  gap: {
    tight: '4px',
    standard: '8px',
    comfortable: '12px',
    relaxed: '16px',
    generous: '24px',
  },
} as const;

// ============================================================================
// SHADOWS
// ============================================================================
// Subtle shadow system for depth and hierarchy

export const shadows = {
  // Premium subtle shadows per brand guidelines
  soft: '0 12px 40px rgba(79, 98, 114, 0.12)',        // Main shadow style
  brand: '0 18px 60px -24px rgba(36, 56, 77, 0.26)', // Official brand shadow
  
  // Additional shadow variants
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
  md: '0 4px 8px rgba(79, 98, 114, 0.1)',
  lg: '0 8px 16px rgba(79, 98, 114, 0.12)',
  xl: '0 12px 24px rgba(79, 98, 114, 0.15)',
  xl2: '0 20px 40px rgba(79, 98, 114, 0.2)',

  // Interactive shadows
  hover: '0 8px 16px rgba(79, 98, 114, 0.12)',
  active: '0 4px 8px rgba(79, 98, 114, 0.1)',
  focus: '0 0 0 3px rgba(56, 80, 106, 0.1)',
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================
// Rounded corners system per brand guidelines (20-32px for cards)

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xl2: '20px',     // Card borders (per brand guidelines)
  xl3: '24px',     // Larger cards
  xl4: '28px',
  xl5: '32px',     // Large card borders (per brand guidelines)
  full: '9999px',
} as const;

// ============================================================================
// COMPONENT STYLES
// ============================================================================
// Reusable component style definitions

export const components = {
  button: {
    base: {
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: 500,
      borderRadius: borderRadius.lg,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: typography.families.body,
    },
    primary: {
      backgroundColor: colors.mustard,
      color: colors.navy,
      padding: '10px 20px',
    },
    secondary: {
      backgroundColor: colors.sage,
      color: 'white',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.navy,
      border: `1px solid ${colors.sage}`,
    },
    danger: {
      backgroundColor: colors.terracotta,
      color: 'white',
    },
  },

  card: {
    base: {
      backgroundColor: colors.background.surface,
      borderRadius: borderRadius.xl2,
      padding: spacing.padding.card,
      boxShadow: shadows.soft,
      border: 'none',
    },
    elevated: {
      boxShadow: shadows.lg,
    },
    outlined: {
      border: `1px solid ${colors.sage}`,
      boxShadow: 'none',
    },
  },

  input: {
    base: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      fontFamily: typography.families.body,
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.sage}`,
      backgroundColor: colors.background.secondary,
      color: colors.text.primary,
    },
    focus: {
      outline: 'none',
      boxShadow: shadows.focus,
      borderColor: colors.navy,
    },
  },

  modal: {
    base: {
      borderRadius: borderRadius.xl3,
      backgroundColor: colors.background.surface,
      boxShadow: shadows.xl2,
      padding: spacing.padding.modal,
    },
  },
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================
// Responsive design breakpoints (matching Tailwind)

export const breakpoints = {
  mobile: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xl2: '1536px',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================
// Consistent z-index layering for UI elements

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  notification: 70,
} as const;

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================
// Standard animation timing for consistency

export const animations = {
  fast: '150ms',
  standard: '200ms',
  slow: '300ms',
  verySlow: '500ms',

  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// PRESET COMBINATIONS
// ============================================================================
// Pre-built combinations for common use cases

export const presets = {
  pageBackground: {
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
  },

  surfaceBackground: {
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
  },

  premiumCard: {
    backgroundColor: colors.background.surface,
    borderRadius: borderRadius.xl2,
    padding: spacing.padding.card,
    boxShadow: shadows.soft,
  },

  premiumButton: {
    backgroundColor: colors.mustard,
    color: colors.navy,
    padding: '10px 20px',
    borderRadius: borderRadius.lg,
    fontWeight: 500,
    fontFamily: typography.families.body,
    border: 'none',
    cursor: 'pointer',
    transition: `all ${animations.standard} ${animations.easing.easeInOut}`,
  },
} as const;

export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  components,
  breakpoints,
  zIndex,
  animations,
  presets,
};
