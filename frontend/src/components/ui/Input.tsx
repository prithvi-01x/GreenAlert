import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glass';
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, icon, variant = 'default', className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`}>
      {label && <label htmlFor={inputId} className="input-group__label">{label}</label>}
      <div className={`input-wrapper input-wrapper--${variant}`}>
        {icon && <span className="input-wrapper__icon">{icon}</span>}
        <input id={inputId} className="input-field" {...props} />
      </div>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`}>
      {label && <label htmlFor={inputId} className="input-group__label">{label}</label>}
      <textarea id={inputId} className="textarea-field" {...props} />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}
