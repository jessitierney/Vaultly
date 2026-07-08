/**
 * Vaultly Assets Index
 * ====================
 * Centralized export of all branding and asset files.
 * Import branding assets from this file or from src/assets/branding/index.ts.
 */

export * from './branding';


// ============================================================================
// ICON PATHS (for future use when icon files are added)
// ============================================================================

export const ICON_PATHS = {
  navigation: './icons/navigation',
  finance: './icons/finance',
  household: './icons/household',
  projects: './icons/projects',
  calendar: './icons/calendar',
  reports: './icons/reports',
  settings: './icons/settings',
  notifications: './icons/notifications',
  system: './icons/system',
} as const;

// ============================================================================
// ILLUSTRATION PATHS (for future use when illustration files are added)
// ============================================================================

export const ILLUSTRATION_PATHS = {
  emptyStates: './illustrations/empty-states',
  onboarding: './illustrations/onboarding',
  dashboards: './illustrations/dashboards',
  marketing: './illustrations/marketing',
} as const;

// ============================================================================
// IMAGE PATHS (for future use when image files are added)
// ============================================================================

export const IMAGE_PATHS = {
  home: './images/home',
  receipts: './images/receipts',
  documents: './images/documents',
  renovations: './images/renovations',
  demo: './images/demo',
} as const;

// ============================================================================
// BACKGROUND PATHS (for future use when background files are added)
// ============================================================================

export const BACKGROUND_PATHS = {
  backgrounds: './backgrounds',
} as const;

// ============================================================================
// AVATAR PATHS (for future use when avatar files are added)
// ============================================================================

export const AVATAR_PATHS = {
  avatars: './avatars',
} as const;

// ============================================================================
// PLACEHOLDER PATHS (for future use when placeholder files are added)
// ============================================================================

export const PLACEHOLDER_PATHS = {
  placeholders: './placeholders',
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// export type BrandingAssets = typeof BRANDING_ASSETS;
export type IconPath = typeof ICON_PATHS;
export type IllustrationPath = typeof ILLUSTRATION_PATHS;
export type ImagePath = typeof IMAGE_PATHS;
export type BackgroundPath = typeof BACKGROUND_PATHS;
export type AvatarPath = typeof AVATAR_PATHS;
export type PlaceholderPath = typeof PLACEHOLDER_PATHS;
