import type { ReactNode } from 'react';
import './StatCard.css';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: string; positive: boolean };
  variant?: 'default' | 'primary' | 'secondary' | 'warning';
}

export default function StatCard({ label, value, icon, trend, variant = 'default' }: StatCardProps) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card__header">
        {icon && <div className="stat-card__icon">{icon}</div>}
        <span className="stat-card__label">{label}</span>
      </div>
      <div className="stat-card__value">{value}</div>
      {trend && (
        <div className={`stat-card__trend ${trend.positive ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}
