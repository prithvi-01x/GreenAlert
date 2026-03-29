import type { ReactNode, CSSProperties } from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'heavy' | 'solid';
  glow?: boolean;
  hover?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', variant = 'default', glow = false, hover = false, style, onClick }: GlassCardProps) {
  const classes = [
    'glass-card',
    `glass-card--${variant}`,
    glow ? 'glass-card--glow' : '',
    hover ? 'glass-card--hover' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
}
