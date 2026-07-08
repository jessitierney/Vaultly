/**
 * Vaultly Icon Component
 * Reusable component for displaying approved Vaultly SVG icons
 * 
 * Usage:
 * <VaultlyIcon name="documents" />
 * <VaultlyIcon name="projects" size="lg" />
 * <VaultlyIcon name="calendar" size="md" className="custom-class" />
 */

import React from 'react';
import { ICON_MAP, type IconName } from '../../assets/icons';

export interface VaultlyIconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

// Size mapping to Tailwind height classes
const SIZE_MAP = {
  sm: 'h-5',
  md: 'h-6',
  lg: 'h-8',
  xl: 'h-10',
} as const;

export const VaultlyIcon: React.FC<VaultlyIconProps> = ({
  name,
  size = 'md',
  className = '',
  alt = name,
}) => {
  const iconSrc = ICON_MAP[name];
  const sizeClass = SIZE_MAP[size];

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found in icon registry`);
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={alt}
      className={`inline-block ${sizeClass} ${className}`}
      style={{ display: 'inline' }}
    />
  );
};

export default VaultlyIcon;
