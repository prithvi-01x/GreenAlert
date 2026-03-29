import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Send, Eye } from 'lucide-react';
import { mockReports } from '../../data/mockData';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import './ReportsQueue.css';

export default function ReportsQueue() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Pending', 'Verified', 'Dispatched'];

  const filtered = mockReports.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || r.status.toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="reports-queue" id="reports-queue">
      <h1>Reports Queue</h1>
      <p className="rq-desc">Review, verify, and dispatch incoming hazard reports.</p>

      <div className="rq-controls">
        <Input placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={18} />} variant="glass" />
        <div className="rq-filters">
          <Filter size={16} />
          {filters.map(f => (
            <button key={f} className={`filter-chip ${filter === f ? 'filter-chip--active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="rq-list">
        {filtered.map((report, i) => (
          <GlassCard key={report.id} className="rq-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="rq-card__top">
              <Badge severity={report.severity} pulse={report.severity === 'critical'} />
              <DataText size="sm" color="var(--on-surface-variant)">{report.id}</DataText>
            </div>
            <h4 className="rq-card__title">{report.title}</h4>
            <p className="rq-card__desc">{report.description.substring(0, 120)}...</p>
            <div className="rq-card__meta">
              <span>{report.category}</span>
              <span>·</span>
              <DataText size="sm" color="var(--on-surface-variant)">{new Date(report.reportedAt).toLocaleDateString()}</DataText>
              <span>·</span>
              <span>AI: <DataText size="sm" color="var(--primary)">{report.aiConfidence}%</DataText></span>
            </div>
            <div className="rq-card__location">
              <DataText size="sm" color="var(--on-surface-variant)">{report.location.address}</DataText>
            </div>
            <div className="rq-card__actions">
              <Button size="sm" icon={<CheckCircle size={14} />}>Verify</Button>
              <Button size="sm" variant="secondary" icon={<Send size={14} />}>Dispatch</Button>
              <Button size="sm" variant="ghost" icon={<Eye size={14} />}>View</Button>
              <Button size="sm" variant="ghost" icon={<XCircle size={14} />}>Dismiss</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
