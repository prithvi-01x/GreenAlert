import { BarChart3, TrendingUp, Brain, Cpu, Activity, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockAnalytics, dashboardStats } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';
import GlassCard from '../../components/ui/GlassCard';
import DataText from '../../components/ui/DataText';
import './AnalyticsDashboard.css';

const modelData = [
  { name: 'Jan', accuracy: 91.2, latency: 340 },
  { name: 'Feb', accuracy: 92.1, latency: 310 },
  { name: 'Mar', accuracy: 92.8, latency: 280 },
  { name: 'Apr', accuracy: 93.5, latency: 260 },
  { name: 'May', accuracy: 93.9, latency: 245 },
  { name: 'Jun', accuracy: 94.2, latency: 230 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="analytics" id="analytics-dashboard">
      <h1>Analytics & Model Health</h1>
      <p className="analytics__desc">Platform performance and AI model metrics</p>

      <div className="analytics__stats">
        <StatCard label="AI Accuracy" value={`${dashboardStats.aiAccuracy}%`} icon={<Brain size={20} />} trend={{ value: '+3.0% YoY', positive: true }} variant="primary" />
        <StatCard label="Avg Response Time" value={dashboardStats.responseTime} icon={<Activity size={20} />} trend={{ value: '-18%', positive: true }} variant="secondary" />
        <StatCard label="Cities Monitored" value={dashboardStats.citiesMonitored} icon={<TrendingUp size={20} />} trend={{ value: '+2 new', positive: true }} variant="primary" />
        <StatCard label="Model Uptime" value="99.97%" icon={<Cpu size={20} />} variant="primary" />
      </div>

      <div className="analytics__grid">
        <GlassCard className="analytics__chart">
          <h3><BarChart3 size={18} /> Report Volume Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockAnalytics}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5A0" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00E5A0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#1A1F2F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#DEE1F7', fontFamily: 'JetBrains Mono', fontSize: '12px' }} />
              <Area type="monotone" dataKey="reports" stroke="#00E5A0" fill="url(#aGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="verified" stroke="#ADC6FF" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="analytics__chart">
          <h3><Brain size={18} /> Model Accuracy Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={modelData}>
              <XAxis dataKey="name" stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#84958A" fontSize={12} tickLine={false} axisLine={false} domain={[89, 96]} />
              <Tooltip contentStyle={{ background: '#1A1F2F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#DEE1F7', fontFamily: 'JetBrains Mono', fontSize: '12px' }} />
              <Line type="monotone" dataKey="accuracy" stroke="#00E5A0" strokeWidth={2.5} dot={{ fill: '#00E5A0', strokeWidth: 0, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard>
        <h3><Cpu size={18} /> Model Health Metrics</h3>
        <div className="model-health-grid">
          {[
            { label: 'Inference Latency', value: '230ms', status: 'healthy' },
            { label: 'Queue Depth', value: '12', status: 'healthy' },
            { label: 'Error Rate', value: '0.03%', status: 'healthy' },
            { label: 'GPU Utilization', value: '67%', status: 'healthy' },
            { label: 'Memory Usage', value: '14.2 GB', status: 'healthy' },
            { label: 'Last Retrained', value: '3 days ago', status: 'healthy' },
          ].map(m => (
            <div key={m.label} className="model-health__item">
              <CheckCircle size={16} className="model-health__check" />
              <div>
                <span className="label-text">{m.label}</span>
                <DataText size="lg" color="var(--on-surface)">{m.value}</DataText>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
