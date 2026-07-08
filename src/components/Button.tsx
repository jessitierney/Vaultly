/**
 * Vaultly Button Component
 *
 * Reusable button with support for variants (primary, secondary, ghost, danger).
 * Automatically applies design system styles and ensures brand consistency.
 *
 * Usage:
 * import { Button } from './Button';
 *
 * <Button>Click me</Button>
 * <Button variant="primary">Add Item</Button>
 * <Button variant="danger" onClick={handleDelete}>Delete</Button>
 * <Button disabled>Disabled</Button>
 */

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'danger' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseClass = `
      font-medium font-montserrat rounded-[14px] border-none cursor-pointer
      transition-all duration-200 ease-out flex items-center justify-center gap-2
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-70 disabled:cursor-not-allowed shadow-sm
    `;

    // Size variants
    const sizeClass = {
      sm: `px-3 py-1.5 text-sm`,
      md: `px-6 py-3 text-base h-13`,
      lg: `px-6 h-[52px] text-base font-semibold`,
    }[size];

    // Color variants (Brand Board Specifications)
    const variantClass = {
      // Primary: Navy background with lighter hover
      primary: `bg-[#38506A] text-white hover:bg-[#48627E] active:bg-[#2C3F52] focus:ring-[#38506A]`,
      // Secondary: Sage background
      secondary: `bg-[#A4B69A] text-white hover:bg-[#95A68B] active:bg-[#A4B69A] focus:ring-[#A4B69A]`,
      // Warning: Mustard background
      warning: `bg-[#E0B14D] text-[#38506A] hover:bg-[#D8A865] active:bg-[#E0B14D] focus:ring-[#E0B14D]`,
      // Danger: Terracotta background
      danger: `bg-[#C86B4A] text-white hover:bg-[#B85C3A] active:bg-[#C86B4A] focus:ring-[#C86B4A]`,
      // Outline: White background with Navy border
      outline: `bg-white text-vaultly-navy border-2 border-vaultly-navy hover:bg-vaultly-cream active:bg-white focus:ring-vaultly-navy`,
      // Text: Transparent with text only
      text: `bg-transparent text-[#38506A] hover:bg-[#F6F2EA] focus:ring-[#38506A]`,
    }[variant];

    // Width
    const widthClass = fullWidth ? 'w-full' : '';

    const finalClassName = `${baseClass} ${sizeClass} ${variantClass} ${widthClass} ${className}`;

    return (
      <button ref={ref} disabled={disabled || isLoading} className={finalClassName} {...props}>
        {children}
        {isLoading && <span className="animate-spin">⟳</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
