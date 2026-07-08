/**
 * Vaultly Card Components
 * Reusable card components with design system tokens
 */

import React from 'react';
import { colors } from './Brand';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Card Container
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: `bg-[${colors.white}] border border-[${colors.softBeige}]`,
    elevated: `bg-[${colors.white}] shadow-md`,
    outlined: `bg-transparent border-2 border-[${colors.navy}]`,
  };
  
  return (
    <div
      className={`rounded-xl p-6 transition-all ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`mb-4 border-b border-[${colors.softBeige}] pb-4 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Body
 */
export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`flex-1 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Footer
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`mt-4 border-t border-[${colors.softBeige}] pt-4 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
