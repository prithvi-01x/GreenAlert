import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';
import Button from '../components/ui/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found" id="not-found-page">
      <div className="not-found__content">
        <div className="not-found__icon-wrapper">
          <MapPin size={64} className="not-found__icon" />
          <div className="not-found__ping" />
        </div>
        <h1 className="not-found__code">404</h1>
        <h2>Location Not Found</h2>
        <p>The coordinates you're looking for don't exist in our hazard map. The page may have been moved or the link is incorrect.</p>
        <Link to="/">
          <Button icon={<Home size={18} />}>Return to Base</Button>
        </Link>
      </div>
    </div>
  );
}
