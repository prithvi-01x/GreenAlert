import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './MobileBottomNav.css';

export default function MobileBottomNav() {
  const { role } = useAuth();
  const prefix = role === 'employee' ? '/employee' : role === 'admin' ? '/admin' : '/citizen';

  const citizenLinks = [
    { to: '/citizen/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/citizen/report', label: 'Report', icon: AlertTriangle },
    { to: '/citizen/my-reports', label: 'Reports', icon: FileText },
    { to: '/citizen/profile', label: 'Profile', icon: User },
  ];

  const employeeLinks = [
    { to: '/employee/assignments', label: 'Tasks', icon: FileText },
    { to: '/employee/verify', label: 'Verify', icon: AlertTriangle },
    { to: `${prefix}/profile`, label: 'Profile', icon: User },
  ];

  const links = role === 'employee' ? employeeLinks : citizenLinks;

  return (
    <nav className="mobile-bottom-nav glass" id="mobile-bottom-nav">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `mobile-bottom-nav__item ${isActive ? 'mobile-bottom-nav__item--active' : ''}`
          }
        >
          <link.icon size={20} />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
