/**
 * Vaultly Card Component
 *
 * Premium white card component implementing the Vaultly design system.
 * All cards use this standardized component for consistency across the application.
 *
 * Background: #FFFFFF
 * Border: 1px solid #E8DDCC
 * Border Radius: 20px
 * Shadow: Very soft subtle shadow
 * Padding: 24px
 *
 * Usage:
 * import { Card } from './Card';
 *
 * <Card>Content</Card>
 * <Card className="custom-class">Content with custom styling</Card>
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ============================================================================
// CARD COMPONENT - VAULTLY PREMIUM WHITE CARD
// ============================================================================

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Vaultly premium white card style
    const baseClass = `
      bg-white
      border border-[#E8DDCC]
      rounded-[20px]
      p-6
      shadow-sm
      transition-all duration-200
      hover:shadow-md
    `;

    const finalClassName = `${baseClass} ${className}`;

    return (
      <div ref={ref} className={finalClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
