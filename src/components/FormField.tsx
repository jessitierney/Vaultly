/**
 * Vaultly FormField Component
 *
 * Reusable form field wrapper with label, input, and error state.
 * Standardizes form appearance and improves accessibility.
 *
 * Usage:
 * import { FormField } from './FormField';
 *
 * <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
 * <FormField label="Notes" type="textarea" />
 * <FormField label="Amount" type="number" error="This field is required" />
 */

import React from 'react';

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'password' | 'textarea';
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
}

// ============================================================================
// FORM FIELD COMPONENT
// ============================================================================

export const FormField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  (
    {
      label,
      type = 'text',
      error,
      helperText,
      fullWidth = true,
      required = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = props.id || `field-${Math.random()}`;
    const isTextarea = type === 'textarea';

    // Container styles
    const containerClass = `flex flex-col gap-2 ${fullWidth ? 'w-full' : 'w-auto'}`;

    // Label styles
    const labelClass = `text-sm font-medium text-[#38506A] font-montserrat`;

    // Input styles
    const inputClass = `
      px-4 py-3 rounded-lg border-2 border-[#A4B69A] bg-[#FAF8F5]
      text-[#38506A] font-montserrat placeholder-[#8B8B8B]
      transition-all duration-200 ease-out
      focus:outline-none focus:border-[#38506A] focus:ring-2 focus:ring-[#38506A] focus:ring-opacity-10
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? `border-[#C86B4A] focus:ring-[#C86B4A]` : ''}
      ${className}
    `;

    // Error message styles
    const errorClass = `text-xs font-medium text-[#C86B4A]`;

    // Helper text styles
    const helperClass = `text-xs text-[#8B8B8B]`;

    return (
      <div className={containerClass}>
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
            {required && <span className="text-[#C86B4A]">*</span>}
          </label>
        )}

        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={inputClass}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            type={type}
            className={inputClass}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <p className={errorClass}>{error}</p>}
        {!error && helperText && <p className={helperClass}>{helperText}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
