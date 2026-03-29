import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import './PublicNavbar.css';

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/map', label: 'Live Map' },
    { to: '/reports', label: 'Reports' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="public-nav glass" id="public-navbar">
      <div className="public-nav__inner container-wide">
        <Link to="/" className="public-nav__logo">
          <Shield size={24} />
          <span>GreenAlert</span>
        </Link>

        <div className={`public-nav__links ${open ? 'public-nav__links--open' : ''}`}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`public-nav__link ${location.pathname === link.to ? 'public-nav__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button size="sm">Sign In</Button>
          </Link>
        </div>

        <button className="public-nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
