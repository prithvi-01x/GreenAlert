import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { mockReports } from '../../data/mockData';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import { Input } from '../../components/ui/Input';
import './MyReports.css';

const statusFilters = ['All', 'Pending', 'Verified', 'Dispatched', 'Resolved'];

export default function MyReports() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = mockReports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || r.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="my-reports" id="my-reports">
      <h1>My Reports</h1>
      <p className="my-reports__desc">Track all your submitted hazard reports and their current status.</p>

      <div className="my-reports__controls">
        <Input placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={18} />} variant="glass" />
        <div className="my-reports__filters">
          <Filter size={16} />
          {statusFilters.map(f => (
            <button key={f} className={`filter-chip ${activeFilter === f ? 'filter-chip--active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="my-reports__list">
        {filtered.length === 0 ? (
          <GlassCard className="my-reports__empty">
            <p>No reports found matching your criteria.</p>
          </GlassCard>
        ) : (
          filtered.map((report, i) => (
            <Link key={report.id} to={`/citizen/hazard/${report.id}`}
              className="report-row" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="report-row__severity">
                <Badge severity={report.severity} size="sm" pulse={report.severity === 'critical'} />
              </div>
              <div className="report-row__info">
                <span className="report-row__title">{report.title}</span>
                <span className="report-row__meta">
                  <DataText size="sm" color="var(--on-surface-variant)">
                    {report.id} · {report.category} · {new Date(report.reportedAt).toLocaleDateString()}
                  </DataText>
                </span>
              </div>
              <div className="report-row__status">
                <Badge severity={report.status === 'resolved' ? 'resolved' : report.status === 'pending' ? 'warning' : 'info'} label={report.status} size="sm" />
              </div>
              <div className="report-row__confidence">
                <DataText size="sm" color="var(--primary)">{report.aiConfidence}%</DataText>
                <span className="label-text">AI Score</span>
              </div>
              <ChevronRight size={18} className="report-row__chevron" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
