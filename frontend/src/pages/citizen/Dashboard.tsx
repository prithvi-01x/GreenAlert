import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Activity, Award, ChevronRight, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { mockReports, mockLeaderboard, mockAnalytics, dashboardStats } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const recentReports = mockReports.slice(0, 4);

  return (
    <div className="citizen-dashboard" id="citizen-dashboard">
      {/* Welcome */}
      <div className="dashboard__welcome">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p>Your environmental impact at a glance</p>
        </div>
        <Link to="/citizen/report">
          <Button icon={<Plus size={18} />}>Report Hazard</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        <StatCard
          label="Reports Submitted"
          value={user?.reportsSubmitted || 0}
          icon={<AlertTriangle size={20} />}
          trend={{ value: '+3 this month', positive: true }}
          variant="primary"
        />
        <StatCard
          label="Green Score"
          value={dashboardStats.greenScore}
          icon={<Award size={20} />}
          trend={{ value: '+12 pts', positive: true }}
          variant="primary"
        />
        <StatCard
          label="Average AQI"
          value={dashboardStats.averageAQI}
          icon={<Activity size={20} />}
          trend={{ value: 'Good', positive: true }}
          variant="secondary"
        />
        <StatCard
          label="Active Cases"
          value={dashboardStats.activeCases}
          icon={<MapPin size={20} />}
          trend={{ value: '-5 from last week', positive: true }}
          variant="warning"
        />
      </div>

      <div className="dashboard__grid">
        {/* Chart */}
        <GlassCard className="dashboard__chart">
          <div className="chart__header">
            <h3>Hazard Intensity</h3>
            <span className="label-text">Last 6 months</span>
          </div>
          <div className="chart__container">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={mockAnalytics}>
                <defs>
                  <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5A0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00E5A0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradientSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ADC6FF" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ADC6FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1A1F2F',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    color: '#DEE1F7',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="reports" stroke="#00E5A0" fill="url(#gradientPrimary)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="#ADC6FF" fill="url(#gradientSecondary)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Leaderboard */}
        <GlassCard className="dashboard__leaderboard">
          <h3>City Leaderboard</h3>
          <div className="leaderboard__list">
            {mockLeaderboard.map((entry) => (
              <div key={entry.rank} className="leaderboard__item">
                <div className="leaderboard__rank">
                  <DataText size="sm" color={entry.rank <= 3 ? 'var(--primary)' : 'var(--on-surface-variant)'}>
                    #{entry.rank}
                  </DataText>
                </div>
                <div className="leaderboard__avatar">{entry.name.charAt(0)}</div>
                <div className="leaderboard__info">
                  <span className="leaderboard__name">{entry.name}</span>
                  <span className="leaderboard__badge">{entry.badge}</span>
                </div>
                <DataText size="sm" color="var(--primary)">{entry.score}</DataText>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Reports */}
      <GlassCard className="dashboard__recent">
        <div className="recent__header">
          <h3>Recent Activity</h3>
          <Link to="/citizen/my-reports" className="recent__view-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="recent__list">
          {recentReports.map(report => (
            <Link key={report.id} to={`/citizen/hazard/${report.id}`} className="recent__item">
              <div className="recent__item-left">
                <Badge severity={report.severity} size="sm" />
                <div>
                  <span className="recent__item-title">{report.title}</span>
                  <span className="recent__item-meta">
                    <DataText size="sm" color="var(--on-surface-variant)">
                      {report.id} · {new Date(report.reportedAt).toLocaleDateString()}
                    </DataText>
                  </span>
                </div>
              </div>
              <div className="recent__item-right">
                <Badge severity={report.status === 'resolved' ? 'resolved' : report.status === 'pending' ? 'warning' : 'info'}
                  label={report.status} size="sm" />
                <ChevronRight size={16} className="recent__chevron" />
              </div>
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
