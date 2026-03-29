import type { ReactNode } from 'react';

interface DataTextProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 'var(--text-label-sm)',
  md: 'var(--text-body-md)',
  lg: 'var(--text-title-md)',
  xl: 'var(--text-headline-md)',
};

export default function DataText({ children, size = 'md', color, className = '' }: DataTextProps) {
  return (
    <span
      className={`data-text ${className}`}
      style={{
        fontFamily: 'var(--font-data)',
        fontSize: sizeMap[size],
        letterSpacing: '0.02em',
        color: color || 'inherit',
      }}
    >
      {children}
    </span>
  );
}
