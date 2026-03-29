import { Award, MapPin, Calendar, FileText, Settings, ChevronRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/ui/GlassCard';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const achievements = [
    { label: 'First Report', desc: 'Submitted your first hazard report', earned: true },
    { label: 'Green Guardian', desc: 'Reached 500+ Green Score', earned: true },
    { label: 'Rapid Responder', desc: '10 reports in one month', earned: true },
    { label: 'Community Hero', desc: 'Reached 1000+ Green Score', earned: false },
    { label: 'Sentinel Elite', desc: 'Top 10 on city leaderboard', earned: false },
  ];

  return (
    <div className="profile" id="citizen-profile">
      <div className="profile__header-card">
        <div className="profile__avatar">
          <span>{user.name.charAt(0)}</span>
        </div>
        <div className="profile__info">
          <h1>{user.name}</h1>
          <div className="profile__badge-row">
            <Award size={16} />
            <span>{user.badge}</span>
          </div>
          <div className="profile__meta-row">
            <span><MapPin size={14} /> {user.city}</span>
            <span><Calendar size={14} /> Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="profile__stats-row">
        <GlassCard className="profile__stat">
          <DataText size="xl" color="var(--primary)">{user.greenScore}</DataText>
          <span className="label-text">Green Score</span>
        </GlassCard>
        <GlassCard className="profile__stat">
          <DataText size="xl" color="var(--secondary)">{user.reportsSubmitted}</DataText>
          <span className="label-text">Reports Submitted</span>
        </GlassCard>
        <GlassCard className="profile__stat">
          <DataText size="xl" color="var(--tertiary-container)">{user.reportsVerified}</DataText>
          <span className="label-text">Reports Verified</span>
        </GlassCard>
      </div>

      <div className="profile__grid">
        <GlassCard>
          <h3>Achievements</h3>
          <div className="achievements-list">
            {achievements.map(a => (
              <div key={a.label} className={`achievement ${a.earned ? 'achievement--earned' : ''}`}>
                <div className="achievement__icon">
                  <Shield size={18} />
                </div>
                <div className="achievement__text">
                  <span className="achievement__label">{a.label}</span>
                  <span className="achievement__desc">{a.desc}</span>
                </div>
                {a.earned && <span className="achievement__check">✓</span>}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3>Account Settings</h3>
          <div className="settings-list">
            {[
              { label: 'Notification Preferences', icon: Settings },
              { label: 'Privacy Settings', icon: Shield },
              { label: 'Edit Profile', icon: FileText },
            ].map(item => (
              <button key={item.label} className="settings-item">
                <item.icon size={18} />
                <span>{item.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <Button variant="danger" size="sm" fullWidth>Delete Account</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
