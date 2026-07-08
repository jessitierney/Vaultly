/**
 * Vaultly Theme Configuration
 * Central theme configuration for the application
 */

import { colors, semanticColors } from './Brand';
import { spacing } from './Spacing';
import { radius } from './Radius';
import { shadows } from './Shadows';

// Note: Typography is exported separately due to dependencies

/**
 * Tailwind Theme Configuration
 * Export this to tailwind.config.js for theme configuration
 */
export const theme = {
  colors: {
    ...colors,
    // Semantic color mappings for Tailwind
    primary: colors.navy,
    secondary: colors.sage,
    accent: colors.mustard,
    success: colors.forestGreen,
    warning: colors.mustard,
    error: colors.terracotta,
    background: colors.white,
    surface: colors.cream,
  },
  
  spacing: spacing,
  
  borderRadius: {
    ...radius,
  },
  
  fontFamily: {
    heading: 'DM Sans, system-ui, sans-serif',
    body: 'Montserrat, system-ui, sans-serif',
  },
  
  boxShadow: shadows,
} as const;

/**
 * Helper function to get semantic color
 */
export const getSemanticColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = semanticColors;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value || '#000000';
};

/**
 * Theme Context Type
 */
export interface ThemeContextType {
  colors: typeof colors;
  semanticColors: typeof semanticColors;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
}

export default theme;
