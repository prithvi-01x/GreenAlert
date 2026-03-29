import { Shield, User, Briefcase, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../data/mockData';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import './LoginPage.css';

const roles: { id: UserRole; label: string; desc: string; icon: typeof User }[] = [
  { id: 'citizen', label: 'Citizen', desc: 'Report hazards and track your community', icon: User },
  { id: 'employee', label: 'Field Employee', desc: 'Verify and respond to hazard reports', icon: Briefcase },
  { id: 'admin', label: 'Administrator', desc: 'Manage reports, analytics, and dispatch', icon: ShieldCheck },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(selectedRole);
    const routes: Record<UserRole, string> = {
      citizen: '/citizen/dashboard',
      employee: '/employee/assignments',
      admin: '/admin/dashboard',
    };
    navigate(routes[selectedRole]);
  };

  return (
    <div className="login-page" id="login-page">
      <div className="login-page__bg" />
      <div className="login-page__bg login-page__bg--secondary" />

      <div className="login-page__content">
        <div className="login-page__header">
          <Shield size={40} className="login-page__icon" />
          <h1 className="login-page__title">GreenAlert</h1>
          <p className="login-page__subtitle">AI-Powered Urban Hazard Detection</p>
        </div>

        <GlassCard variant="heavy" className="login-card">
          <p className="login-card__instruction">Select your account type before signing in</p>

          <div className="login-card__roles">
            {roles.map(role => (
              <button
                key={role.id}
                className={`role-option ${selectedRole === role.id ? 'role-option--active' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="role-option__icon">
                  <role.icon size={22} />
                </div>
                <div className="role-option__text">
                  <span className="role-option__label">{role.label}</span>
                  <span className="role-option__desc">{role.desc}</span>
                </div>
                {selectedRole === role.id && <div className="role-option__check">✓</div>}
              </button>
            ))}
          </div>

          <Button size="lg" fullWidth onClick={handleLogin} icon={<Shield size={18} />}>
            Sign in as {roles.find(r => r.id === selectedRole)?.label}
          </Button>

          <p className="login-card__terms">
            By signing in you agree to our <a href="#">Terms of Service</a>.
          </p>
        </GlassCard>

        <div className="login-page__footer-links">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
          <span>•</span>
          <a href="#">System Status</a>
        </div>
      </div>
    </div>
  );
}
