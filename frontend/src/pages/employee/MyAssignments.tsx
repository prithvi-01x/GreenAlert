import { Link } from 'react-router-dom';
import { FileText, MapPin, Clock, CheckCircle } from 'lucide-react';
import { mockReports } from '../../data/mockData';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import './MyAssignments.css';

export default function MyAssignments() {
  const assigned = mockReports.filter(r => r.assignedTo);

  return (
    <div className="assignments" id="my-assignments">
      <h1>My Assignments</h1>
      <p className="assignments__desc">Hazard reports assigned to you for field verification.</p>

      <div className="assignments__stats">
        <GlassCard className="assignment-stat">
          <DataText size="xl" color="var(--primary)">{assigned.length}</DataText>
          <span className="label-text">Active Tasks</span>
        </GlassCard>
        <GlassCard className="assignment-stat">
          <DataText size="xl" color="var(--secondary)">4</DataText>
          <span className="label-text">Completed Today</span>
        </GlassCard>
        <GlassCard className="assignment-stat">
          <DataText size="xl" color="var(--tertiary-container)">2.1h</DataText>
          <span className="label-text">Avg Completion</span>
        </GlassCard>
      </div>

      <div className="assignments__list">
        {assigned.map((report, i) => (
          <GlassCard key={report.id} hover className="assignment-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="assignment-card__top">
              <Badge severity={report.severity} pulse={report.severity === 'critical'} />
              <DataText size="sm" color="var(--on-surface-variant)">{report.id}</DataText>
            </div>
            <h3>{report.title}</h3>
            <p className="assignment-card__desc">{report.description.substring(0, 100)}...</p>
            <div className="assignment-card__meta">
              <span><MapPin size={14} /> {report.location.address}</span>
              <span><Clock size={14} /> {new Date(report.reportedAt).toLocaleDateString()}</span>
            </div>
            <div className="assignment-card__actions">
              <Link to="/employee/verify">
                <Button size="sm" icon={<CheckCircle size={14} />}>Start Verification</Button>
              </Link>
              <Link to={`/citizen/hazard/${report.id}`}>
                <Button size="sm" variant="ghost" icon={<FileText size={14} />}>View Details</Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
