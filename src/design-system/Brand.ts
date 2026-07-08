/**
 * Vaultly Brand Color Palette
 * Approved colors for the Vaultly design system
 */

export const colors = {
  // Primary Colors
  white: '#FFFFFF',
  cream: '#F6F2EA',
  navy: '#38506A',
  
  // Secondary Colors
  sage: '#A4B69A',
  mustard: '#E0B14D',
  terracotta: '#C86B4A',
  
  // Accent Colors
  forestGreen: '#2F4F3E',
  softBeige: '#E8DDCC',
  clay: '#B98268',
  olive: '#7E8F6B',
  sand: '#D8C3A5',
} as const;

/**
 * Color Semantics
 * Semantic meanings for colors in different contexts
 */
export const semanticColors = {
  // Backgrounds
  background: {
    primary: colors.white,
    secondary: colors.cream,
    tertiary: colors.softBeige,
  },
  
  // Text
  text: {
    primary: colors.navy,
    secondary: colors.sage,
    tertiary: colors.olive,
  },
  
  // Interactive
  interactive: {
    primary: colors.navy,
    secondary: colors.sage,
    accent: colors.mustard,
  },
  
  // Status
  status: {
    success: colors.forestGreen,
    warning: colors.mustard,
    error: colors.terracotta,
    info: colors.navy,
  },
  
  // Borders
  border: {
    default: colors.softBeige,
    light: colors.cream,
    dark: colors.navy,
  },
} as const;

/**
 * Brand Constants
 */
export const brand = {
  name: 'Vaultly',
  tagline: 'Your Household OS',
  logo: '/src/assets/branding/vaultly-logo.svg',
  favicon: '/src/assets/branding/favicon.svg',
} as const;

export type ColorKey = keyof typeof colors;
export type SemanticColorKey = keyof typeof semanticColors;
