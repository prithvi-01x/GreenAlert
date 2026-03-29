import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Brain, User, Share2 } from 'lucide-react';
import { mockReports } from '../../data/mockData';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import './HazardDetail.css';

export default function HazardDetail() {
  const { id } = useParams();
  const report = mockReports.find(r => r.id === id) || mockReports[0];

  const timeline = [
    { time: report.reportedAt, label: 'Report Submitted', desc: `By ${report.reportedBy}`, active: true },
    { time: report.reportedAt, label: 'AI Verification', desc: `Confidence: ${report.aiConfidence}%`, active: report.status !== 'pending' },
    { time: report.updatedAt, label: 'Dispatched', desc: report.assignedTo ? `To ${report.assignedTo}` : 'Awaiting dispatch', active: report.status === 'dispatched' || report.status === 'resolved' },
    { time: report.updatedAt, label: 'Resolved', desc: 'Issue addressed', active: report.status === 'resolved' },
  ];

  return (
    <div className="hazard-detail" id="hazard-detail">
      <Link to="/citizen/my-reports" className="hazard-detail__back">
        <ArrowLeft size={18} /> Back to Reports
      </Link>

      <div className="hazard-detail__header">
        <div>
          <div className="hazard-detail__badges">
            <Badge severity={report.severity} pulse={report.severity === 'critical'} />
            <Badge severity={report.status === 'resolved' ? 'resolved' : 'info'} label={report.status} />
          </div>
          <h1>{report.title}</h1>
          <div className="hazard-detail__meta">
            <DataText size="sm" color="var(--on-surface-variant)">{report.id}</DataText>
            <span>·</span>
            <span>{report.category}</span>
          </div>
        </div>
        <Button variant="secondary" icon={<Share2 size={16} />} size="sm">Share</Button>
      </div>

      <div className="hazard-detail__grid">
        <div className="hazard-detail__main">
          <GlassCard>
            <h3>Description</h3>
            <p className="hazard-detail__description">{report.description}</p>
          </GlassCard>

          <GlassCard>
            <h3>Location</h3>
            <div className="hazard-detail__location">
              <MapPin size={18} />
              <span>{report.location.address}</span>
            </div>
            <div className="hazard-detail__map">
              <div className="map-area__placeholder" style={{ height: 200 }}>
                <MapPin size={32} />
                <DataText size="sm" color="var(--on-surface-variant)">
                  {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                </DataText>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3>AI Analysis</h3>
            <div className="ai-analysis">
              <div className="ai-analysis__score">
                <Brain size={24} />
                <div>
                  <DataText size="xl" color="var(--primary)">{report.aiConfidence}%</DataText>
                  <span className="label-text">Verification Confidence</span>
                </div>
              </div>
              <div className="ai-analysis__bar">
                <div className="ai-analysis__fill" style={{ width: `${report.aiConfidence}%` }} />
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="hazard-detail__sidebar">
          <GlassCard>
            <h3>Timeline</h3>
            <div className="detail-timeline">
              {timeline.map((t, i) => (
                <div key={i} className={`timeline-item ${t.active ? 'timeline-item--active' : ''}`}>
                  <div className="timeline-item__dot" />
                  {i < timeline.length - 1 && <div className="timeline-item__line" />}
                  <div className="timeline-item__content">
                    <span className="timeline-item__label">{t.label}</span>
                    <span className="timeline-item__desc">{t.desc}</span>
                    <DataText size="sm" color="var(--outline)">
                      {new Date(t.time).toLocaleString()}
                    </DataText>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3>Details</h3>
            <div className="detail-info-list">
              <div className="detail-info-row">
                <span className="label-text">Reported By</span>
                <div className="detail-info-row__val"><User size={14} /> {report.reportedBy}</div>
              </div>
              <div className="detail-info-row">
                <span className="label-text">Reported At</span>
                <DataText size="sm">{new Date(report.reportedAt).toLocaleString()}</DataText>
              </div>
              <div className="detail-info-row">
                <span className="label-text">Last Updated</span>
                <DataText size="sm">{new Date(report.updatedAt).toLocaleString()}</DataText>
              </div>
              {report.assignedTo && (
                <div className="detail-info-row">
                  <span className="label-text">Assigned To</span>
                  <span>{report.assignedTo}</span>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
