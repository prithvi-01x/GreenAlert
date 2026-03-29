import type { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children, variant = 'primary', size = 'md', icon, iconRight, fullWidth = false, loading = false, className = '', disabled, ...props
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="btn__spinner" />}
      {icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__label">{children}</span>}
      {iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
    </button>
  );
}
