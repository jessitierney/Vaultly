/**
 * Vaultly Branding Assets
 * =======================
 * Single source of truth for all Vaultly brand assets.
 *
 * Usage:
 *   import { logoFull, logoWhite, logoNavy, logoIcon, favicon } from '@/assets/branding';
 */

import logoFull from './vaultly-logo.svg';
import logoWhite from './vaultly-logo.svg';
import logoNavy from './vaultly-logo.svg';
import logoIcon from './vaultly-logo.svg';
import faviconSvg from './favicon.svg';

export { logoFull, logoWhite, logoNavy, logoIcon, faviconSvg };

export const BRANDING_ASSETS = {
  /** Full colour Vaultly logo — use on light backgrounds, auth screens, onboarding */
  logoFull,
  /** White Vaultly logo — use on dark backgrounds (e.g. navy sidebar) */
  logoWhite,
  /** Navy monochrome Vaultly logo — use where a single-colour version is needed */
  logoNavy,
  /** House-and-lock icon only — use for compact placements, loading screens, PWA icons */
  logoIcon,
  /** Browser favicon */
  faviconSvg,
} as const;

export type BrandingVariant = 'full' | 'white' | 'navy' | 'icon';
