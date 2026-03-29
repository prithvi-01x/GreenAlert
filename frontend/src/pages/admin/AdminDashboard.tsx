import { AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockReports, mockAnalytics, dashboardStats } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import './AdminDashboard.css';

const severityData = [
  { name: 'Critical', value: 12, color: '#FFB4AB' },
  { name: 'Warning', value: 34, color: '#FFBD6A' },
  { name: 'Low', value: 43, color: '#6EFFC0' },
];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard" id="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1>Admin Dashboard</h1>
        <span className="label-text">Last updated: <DataText size="sm">2 min ago</DataText></span>
      </div>

      <div className="admin-stats">
        <StatCard label="Total Reports" value={dashboardStats.totalReports} icon={<AlertTriangle size={20} />} trend={{ value: '+12% vs last month', positive: true }} variant="primary" />
        <StatCard label="Active Cases" value={dashboardStats.activeCases} icon={<Clock size={20} />} trend={{ value: '-5 this week', positive: true }} variant="warning" />
        <StatCard label="Resolved" value={dashboardStats.resolvedThisMonth} icon={<CheckCircle size={20} />} trend={{ value: '+23%', positive: true }} variant="primary" />
        <StatCard label="AI Accuracy" value={`${dashboardStats.aiAccuracy}%`} icon={<TrendingUp size={20} />} trend={{ value: '+0.3%', positive: true }} variant="secondary" />
      </div>

      <div className="admin-dashboard__grid">
        <GlassCard className="admin-chart">
          <h3>Reports Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockAnalytics}>
              <XAxis dataKey="month" stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#1A1F2F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#DEE1F7', fontFamily: 'JetBrains Mono', fontSize: '12px' }} />
              <Bar dataKey="reports" fill="#00E5A0" radius={[6, 6, 0, 0]} />
              <Bar dataKey="resolved" fill="#ADC6FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="admin-severity-chart">
          <h3>Severity Distribution</h3>
          <div className="severity-pie-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {severityData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="severity-legend">
              {severityData.map(d => (
                <div key={d.name} className="severity-legend__item">
                  <span className="severity-legend__dot" style={{ background: d.color }} />
                  <span>{d.name}</span>
                  <DataText size="sm" color="var(--on-surface-variant)">{d.value}</DataText>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h3>Recent Reports Queue</h3>
        <div className="admin-queue">
          {mockReports.slice(0, 5).map(report => (
            <div key={report.id} className="admin-queue__item">
              <Badge severity={report.severity} size="sm" pulse={report.severity === 'critical'} />
              <div className="admin-queue__info">
                <span className="admin-queue__title">{report.title}</span>
                <DataText size="sm" color="var(--on-surface-variant)">{report.id} · {report.location.address}</DataText>
              </div>
              <DataText size="sm" color="var(--primary)">{report.aiConfidence}%</DataText>
              <Badge severity={report.status === 'resolved' ? 'resolved' : 'info'} label={report.status} size="sm" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
