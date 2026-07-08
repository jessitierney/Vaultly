/**
 * VaultlyLogo
 * ===========
 * Reusable Vaultly brand logo component.
 *
 * Variants:
 *   full   — full colour logo (vaultly-logo.svg)  → light backgrounds, auth, onboarding
 *   white  — white logo (logo-white.svg)           → dark backgrounds, navy sidebar
 *   navy   — navy monochrome (logo-navy.svg)       → single-colour contexts
 *   icon   — house-and-lock icon (logo-icon.svg)   → compact/loading placements
 *
 * Usage:
 *   import { VaultlyLogo } from '@/components/common/VaultlyLogo';
 *   <VaultlyLogo variant="white" size="lg" />
 */

import { logoFull, logoWhite, logoNavy, logoIcon } from '../../assets/branding';
import type { BrandingVariant } from '../../assets/branding';

export type { BrandingVariant };

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface VaultlyLogoProps {
  /** Which brand asset to display */
  variant?: BrandingVariant;
  /** Tailwind height class controlling displayed size */
  size?: LogoSize;
  /** Extra CSS classes */
  className?: string;
  /** Alt text */
  alt?: string;
}

const ASSET_MAP: Record<BrandingVariant, string> = {
  full:  logoFull,
  white: logoWhite,
  navy:  logoNavy,
  icon:  logoIcon,
};

/** Height classes — width is always auto to preserve aspect ratio */
const SIZE_MAP: Record<LogoSize, string> = {
  xs: 'h-6',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-14',
  xl: 'h-20',
};

export function VaultlyLogo({
  variant = 'full',
  size = 'md',
  className = '',
  alt = 'Vaultly',
}: VaultlyLogoProps) {
  return (
    <img
      src={ASSET_MAP[variant]}
      alt={alt}
      className={`${SIZE_MAP[size]} w-auto object-contain ${className}`.trim()}
    />
  );
}

/** Convenience alias for icon-only variant */
export function VaultlyIcon({ size = 'md', className = '' }: Pick<VaultlyLogoProps, 'size' | 'className'>) {
  return <VaultlyLogo variant="icon" size={size} className={className} />;
}
