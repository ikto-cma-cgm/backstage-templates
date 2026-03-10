/**
 * Input Component
 *
 * Best Practices Demonstrated:
 * - Accessible form input with proper labels
 * - Error state handling
 * - Support for different input types
 * - Proper TypeScript types
 * - ARIA attributes for accessibility
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for the input field
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below input
   */
  helperText?: string;
  /**
   * Whether the input is in an error state
   */
  isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      isInvalid = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const hasError = isInvalid || Boolean(error);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            hasError &&
              'border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperTextId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };