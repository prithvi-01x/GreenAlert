import { Send, MapPin, Clock, User } from 'lucide-react';
import { mockReports, mockEmployees } from '../../data/mockData';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import './DispatchDashboard.css';

export default function DispatchDashboard() {
  const pendingReports = mockReports.filter(r => r.status === 'pending' || r.status === 'verified');
  const activeEmployees = mockEmployees.filter(e => e.status !== 'off-duty');

  return (
    <div className="dispatch" id="dispatch-dashboard">
      <h1>Dispatch Dashboard</h1>
      <p className="dispatch__desc">Assign verified reports to field employees for on-site verification.</p>

      <div className="dispatch__grid">
        <div className="dispatch__reports">
          <h3><Send size={18} /> Pending Dispatch ({pendingReports.length})</h3>
          <div className="dispatch__list">
            {pendingReports.map(report => (
              <GlassCard key={report.id} className="dispatch-card">
                <div className="dispatch-card__header">
                  <Badge severity={report.severity} size="sm" />
                  <DataText size="sm" color="var(--on-surface-variant)">{report.id}</DataText>
                </div>
                <h4>{report.title}</h4>
                <div className="dispatch-card__meta">
                  <MapPin size={14} /> <DataText size="sm">{report.location.address}</DataText>
                </div>
                <div className="dispatch-card__meta">
                  <Clock size={14} /> <DataText size="sm">{new Date(report.reportedAt).toLocaleString()}</DataText>
                </div>
                <Button size="sm" icon={<Send size={14} />} fullWidth>Dispatch</Button>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="dispatch__employees">
          <h3><User size={18} /> Available Agents ({activeEmployees.length})</h3>
          <div className="dispatch__list">
            {activeEmployees.map(emp => (
              <GlassCard key={emp.id} className="employee-card">
                <div className="employee-card__header">
                  <div className="employee-card__avatar">{emp.name.charAt(0)}</div>
                  <div>
                    <span className="employee-card__name">{emp.name}</span>
                    <span className="employee-card__role">{emp.role}</span>
                  </div>
                  <Badge severity={emp.status === 'active' ? 'low' : 'warning'} label={emp.status} size="sm" />
                </div>
                <div className="employee-card__stats">
                  <div><DataText size="sm" color="var(--primary)">{emp.assignedReports}</DataText><span className="label-text">Assigned</span></div>
                  <div><DataText size="sm" color="var(--secondary)">{emp.completedToday}</DataText><span className="label-text">Completed</span></div>
                  <div><DataText size="sm" color="var(--on-surface-variant)">{emp.lastUpdate}</DataText><span className="label-text">Last Update</span></div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
