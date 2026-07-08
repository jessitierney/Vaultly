/**
 * Vaultly Input Components
 * Reusable input components with design system tokens
 */

import React from 'react';
import { colors } from './Brand';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outlined';
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

/**
 * Text Input Component
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  ...props
}) => {
  const inputClasses = `w-full px-4 py-2.5 rounded-[14px] border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-[${colors.cream}] disabled:cursor-not-allowed`;
  
  const borderClasses = error
    ? `border-[${colors.terracotta}] focus:ring-[${colors.terracotta}]`
    : `border-[${colors.softBeige}] focus:ring-[${colors.navy}]`;
  
  return (
    <div className="w-full">
      {label && (
        <label className={`mb-2 block text-sm font-medium text-[${colors.navy}]`}>
          {label}
        </label>
      )}
      <input
        className={`${inputClasses} ${borderClasses} ${className}`}
        {...props}
      />
      {error && <p className={`mt-1 text-sm text-[${colors.terracotta}]`}>{error}</p>}
      {helperText && <p className={`mt-1 text-sm text-[${colors.sage}]`}>{helperText}</p>}
    </div>
  );
};

/**
 * Textarea Component
 */
export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const textareaClasses = `w-full px-4 py-2.5 rounded-[14px] border border-[${colors.softBeige}] transition-all focus:outline-none focus:ring-2 focus:ring-[${colors.navy}] focus:ring-offset-2 disabled:bg-[${colors.cream}] disabled:cursor-not-allowed`;
  
  return (
    <div className="w-full">
      {label && (
        <label className={`mb-2 block text-sm font-medium text-[${colors.navy}]`}>
          {label}
        </label>
      )}
      <textarea
        className={`${textareaClasses} ${className}`}
        {...props}
      />
      {error && <p className={`mt-1 text-sm text-[${colors.terracotta}]`}>{error}</p>}
      {helperText && <p className={`mt-1 text-sm text-[${colors.sage}]`}>{helperText}</p>}
    </div>
  );
};

/**
 * Select Component
 */
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}) => {
  const selectClasses = `w-full px-4 py-2.5 rounded-[14px] border border-[${colors.softBeige}] transition-all focus:outline-none focus:ring-2 focus:ring-[${colors.navy}] focus:ring-offset-2 disabled:bg-[${colors.cream}] disabled:cursor-not-allowed`;
  
  return (
    <div className="w-full">
      {label && (
        <label className={`mb-2 block text-sm font-medium text-[${colors.navy}]`}>
          {label}
        </label>
      )}
      <select className={`${selectClasses} ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className={`mt-1 text-sm text-[${colors.terracotta}]`}>{error}</p>}
      {helperText && <p className={`mt-1 text-sm text-[${colors.sage}]`}>{helperText}</p>}
    </div>
  );
};

export default Input;
