import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Shield size={20} />
              <span>GreenAlert</span>
            </Link>
            <p className="footer__desc">
              AI-Powered Urban Hazard Detection. Citizens report. AI analyzes. City responds.
            </p>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Platform</h4>
            <Link to="/" className="footer__link">Live Map</Link>
            <Link to="/login" className="footer__link">Report a Hazard</Link>
            <Link to="/" className="footer__link">API Documentation</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Company</h4>
            <Link to="/" className="footer__link">About</Link>
            <Link to="/" className="footer__link">Careers</Link>
            <Link to="/" className="footer__link">Contact</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Legal</h4>
            <Link to="/" className="footer__link">Privacy Policy</Link>
            <Link to="/" className="footer__link">Terms of Service</Link>
            <Link to="/" className="footer__link">Cookie Policy</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2024 GreenAlert Environmental Intelligence. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
