import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CitizenNavbar.css';

export default function CitizenNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/citizen/report', label: 'Report', icon: AlertTriangle },
    { to: '/citizen/my-reports', label: 'My Reports', icon: FileText },
    { to: '/citizen/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="citizen-nav glass" id="citizen-navbar">
      <div className="citizen-nav__inner">
        <Link to="/citizen/dashboard" className="citizen-nav__logo">
          <Shield size={22} />
          <span>GreenAlert</span>
        </Link>

        <div className="citizen-nav__links">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`citizen-nav__link ${location.pathname === link.to ? 'citizen-nav__link--active' : ''}`}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="citizen-nav__right">
          {user && <span className="citizen-nav__user">{user.name}</span>}
          <button className="citizen-nav__logout" onClick={logout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
