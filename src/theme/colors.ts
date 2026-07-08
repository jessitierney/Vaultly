/**
 * Vaultly Color Palette
 * ====================
 * Premium, soft, earthy brand colors for consistent UI
 */

export const COLORS = {
  // Primary brand color - main navigation and headings
  slateNavy: '#0F2A44',
  
  // Secondary accent - calm, supportive
  sage: '#8A9A7B',
  
  // Accent - vibrant, action-oriented
  terracotta: '#C96F45',
  
  // Highlight - warnings and important items
  mustard: '#D8A735',
  
  // Soft background - selected cards and panels
  warmCream: '#F7F1E7',
  
  // Base colors
  white: '#FFFFFF',
  lightGrey: '#E7E2DA',
  
  // Extended palette for variations
  slateNavyLight: '#1A3A54',
  slateNavyDark: '#061628',
  sageLight: '#A8B899',
  sageDark: '#6B7A5C',
  terracottaLight: '#D88555',
  terracottaDark: '#A8562F',
  mustardLight: '#E8B855',
  mustardDark: '#C89115',
} as const;

// Semantic color usage guide
export const SEMANTIC_COLORS = {
  // Backgrounds
  background: {
    primary: COLORS.white,
    secondary: COLORS.warmCream,
    tertiary: COLORS.lightGrey,
  },
  
  // Text
  text: {
    primary: COLORS.slateNavy,
    secondary: COLORS.sage,
    muted: COLORS.lightGrey,
  },
  
  // Navigation
  navigation: {
    background: COLORS.slateNavy,
    activeBackground: COLORS.warmCream,
    activeAccent: COLORS.terracotta,
    hoverBackground: COLORS.slateNavyLight,
  },
  
  // Buttons
  button: {
    primary: COLORS.terracotta,
    secondary: COLORS.sage,
    text: COLORS.white,
  },
  
  // Status
  status: {
    success: COLORS.sage,
    warning: COLORS.mustard,
    error: COLORS.terracotta,
    info: COLORS.slateNavy,
  },
  
  // Borders
  border: {
    default: COLORS.lightGrey,
    accent: COLORS.terracotta,
    muted: '#F0EBE3',
  },
  
  // Cards
  card: {
    background: COLORS.white,
    selectedBackground: COLORS.warmCream,
    border: COLORS.lightGrey,
  },
  
  // Badges
  badge: {
    important: COLORS.terracotta,
    highlight: COLORS.mustard,
    calm: COLORS.sage,
    neutral: COLORS.slateNavy,
  },
} as const;

// TypeScript helpers
export type Color = typeof COLORS;
export type SemanticColor = typeof SEMANTIC_COLORS;
