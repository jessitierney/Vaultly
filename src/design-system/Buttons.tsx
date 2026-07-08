/**
 * Vaultly Button Components
 * Reusable button components with design system tokens
 */

import React from 'react';
import { colors } from './Brand';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Primary Button - Main call-to-action
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: `bg-[${colors.navy}] text-[${colors.white}] hover:opacity-90`,
    secondary: `bg-[${colors.sage}] text-[${colors.white}] hover:opacity-90`,
    tertiary: `bg-[${colors.cream}] text-[${colors.navy}] hover:opacity-90`,
    danger: `bg-[${colors.terracotta}] text-[${colors.white}] hover:opacity-90`,
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

/**
 * Icon Button - Compact button for icons
 */
export const IconButton: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center justify-center ${sizeClasses[size]} p-0 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Button;
