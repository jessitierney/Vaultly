/**
 * Vaultly Branding
 * ================
 * Centralized branding assets and company information
 */

export const BRANDING = {
  // Company info
  company: {
    name: 'Vaultly',
    tagline: 'Your Household OS',
    description: 'Vaultly helps households manage budgeting, bills, renovations, and family finances in one calm place.',
    url: 'https://vaultly.com',
  },
  
  // Logo variants — all sourced from src/assets/branding/
  logo: {
    /** Full colour logo — light backgrounds, auth, onboarding */
    full:  '/src/assets/branding/vaultly-logo.svg',
    /** White logo — dark backgrounds (e.g. navy sidebar) */
    white: '/src/assets/branding/logo-white.svg',
    /** Navy monochrome logo */
    navy:  '/src/assets/branding/logo-navy.svg',
    /** House-and-lock icon only */
    icon:  '/src/assets/branding/logo-icon.svg',
  },
  
  // App icons
  appIcon: {
    main: '/src/assets/branding/app-icon-1024.png',
    apple: '/src/assets/branding/apple-touch-icon.png',
  },
  
  // Favicon
  favicon: {
    svg: '/src/assets/branding/favicon.svg',
  },
  
  // Social preview
  socialPreview: {
    image: '/src/assets/branding/social-preview.png',
  },
} as const;

export type Branding = typeof BRANDING;
