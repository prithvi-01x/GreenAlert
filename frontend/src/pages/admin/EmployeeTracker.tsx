import { MapPin, Radio } from 'lucide-react';
import { mockEmployees } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import './EmployeeTracker.css';

export default function EmployeeTracker() {
  return (
    <div className="tracker" id="employee-tracker">
      <div className="tracker__sidebar">
        <h2><Radio size={20} /> Live Employee Tracker</h2>
        <p>Real-time location of all field agents</p>
        <div className="tracker__list">
          {mockEmployees.map(emp => (
            <div key={emp.id} className={`tracker__item tracker__item--${emp.status}`}>
              <div className="tracker__avatar">{emp.name.charAt(0)}</div>
              <div className="tracker__info">
                <span className="tracker__name">{emp.name}</span>
                <span className="tracker__role">{emp.role}</span>
                <DataText size="sm" color="var(--on-surface-variant)">Updated: {emp.lastUpdate}</DataText>
              </div>
              <Badge severity={emp.status === 'active' ? 'low' : emp.status === 'en-route' ? 'warning' : 'resolved'} label={emp.status} size="sm" />
            </div>
          ))}
        </div>
      </div>
      <div className="tracker__map">
        <div className="tracker__map-placeholder">
          {mockEmployees.map((emp, i) => (
            <div key={emp.id} className={`tracker-pin tracker-pin--${emp.status}`} style={{ left: `${20 + i * 15}%`, top: `${25 + (i * 12) % 50}%` }}>
              <span className="tracker-pin__label">{emp.name.split(' ')[0]}</span>
            </div>
          ))}
          <MapPin size={40} style={{ color: 'var(--primary)', opacity: 0.2 }} />
        </div>
      </div>
    </div>
  );
}
