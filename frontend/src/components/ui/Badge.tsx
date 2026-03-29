import './Badge.css';

interface BadgeProps {
  severity: 'critical' | 'warning' | 'low' | 'resolved' | 'info';
  label?: string;
  pulse?: boolean;
  size?: 'sm' | 'md';
}

const severityConfig = {
  critical: { text: 'Critical', className: 'badge--critical' },
  warning: { text: 'Warning', className: 'badge--warning' },
  low: { text: 'Low', className: 'badge--low' },
  resolved: { text: 'Resolved', className: 'badge--resolved' },
  info: { text: 'Info', className: 'badge--info' },
};

export default function Badge({ severity, label, pulse = false, size = 'md' }: BadgeProps) {
  const config = severityConfig[severity];

  return (
    <span className={`badge ${config.className} badge--${size} ${pulse ? 'badge--pulse' : ''}`}>
      <span className="badge__dot" />
      <span className="badge__label">{label || config.text}</span>
    </span>
  );
}
