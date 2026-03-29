import { NavLink, useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, FileText, BarChart3, Map, Send,
  Users, Radio, Settings, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  const isEmployee = role === 'employee';
  const prefix = isEmployee ? '/employee' : '/admin';

  const adminLinks = [
    { to: `${prefix}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/reports-queue', label: 'Reports Queue', icon: FileText },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/hotspot-map', label: 'Hotspot Map', icon: Map },
    { to: '/admin/dispatch', label: 'Dispatch', icon: Send },
    { to: '/admin/employee-tracker', label: 'Employee Tracker', icon: Users },
  ];

  const employeeLinks = [
    { to: '/employee/assignments', label: 'My Assignments', icon: FileText },
    { to: '/employee/verify', label: 'Submit Verification', icon: Radio },
  ];

  const links = isEmployee ? employeeLinks : adminLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar--collapsed' : ''}`} id="admin-sidebar">
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">
          <Shield size={24} />
          {!collapsed && <span>GreenAlert</span>}
        </div>
        <button className="admin-sidebar__collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="admin-sidebar__nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
            }
          >
            <link.icon size={20} />
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        {user && !collapsed && (
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">{user.name.charAt(0)}</div>
            <div>
              <div className="admin-sidebar__name">{user.name}</div>
              <div className="admin-sidebar__role">{user.badge}</div>
            </div>
          </div>
        )}
        <NavLink to={`${prefix}/settings`} className="admin-sidebar__link">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button className="admin-sidebar__link admin-sidebar__link--logout" onClick={handleLogout}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
