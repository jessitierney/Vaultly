/**
 * Vaultly Layout Components
 * Reusable layout components with design system spacing
 */

import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'between' | 'around' | 'end';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

/**
 * Container Component
 */
export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  children,
  className = '',
  ...props
}) => {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full',
  };
  
  return (
    <div
      className={`mx-auto w-full px-4 ${maxWidths[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Flex Component
 */
export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = 'md',
  children,
  className = '',
  ...props
}) => {
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
  
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    end: 'justify-end',
  };
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };
  
  return (
    <div
      className={`flex ${directionClass} ${justifyClasses[justify]} ${alignClasses[align]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Grid Component
 */
export const Grid: React.FC<GridProps> = ({
  cols = 3,
  gap = 'md',
  children,
  className = '',
  ...props
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };
  
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };
  
  return (
    <div
      className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * VStack Component - Vertical Stack
 */
export const VStack: React.FC<StackProps> = ({
  spacing = 'md',
  children,
  className = '',
  ...props
}) => {
  const spacingClasses = {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  };
  
  return (
    <div
      className={`flex flex-col ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * HStack Component - Horizontal Stack
 */
export const HStack: React.FC<StackProps> = ({
  spacing = 'md',
  children,
  className = '',
  ...props
}) => {
  const spacingClasses = {
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-6',
    xl: 'space-x-8',
  };
  
  return (
    <div
      className={`flex flex-row ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
