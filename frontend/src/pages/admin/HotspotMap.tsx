import { MapPin, Layers, Filter } from 'lucide-react';
import { mockReports } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import DataText from '../../components/ui/DataText';
import Button from '../../components/ui/Button';
import './HotspotMap.css';

export default function HotspotMap() {
  return (
    <div className="hotspot-map" id="hotspot-map">
      <div className="hotspot-map__sidebar">
        <h2>Hotspot Map</h2>
        <p>Environmental hazard clusters and intensity zones</p>

        <div className="hotspot-controls">
          <Button variant="secondary" size="sm" icon={<Layers size={14} />}>Layers</Button>
          <Button variant="secondary" size="sm" icon={<Filter size={14} />}>Filter</Button>
        </div>

        <div className="hotspot-list">
          {mockReports.slice(0, 5).map(report => (
            <div key={report.id} className="hotspot-list__item">
              <Badge severity={report.severity} size="sm" />
              <div className="hotspot-list__info">
                <span className="hotspot-list__title">{report.title}</span>
                <DataText size="sm" color="var(--on-surface-variant)">{report.location.address}</DataText>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hotspot-map__view">
        <div className="hotspot-map__placeholder">
          <div className="hotspot-map__dots">
            {mockReports.map((report, i) => (
              <div key={report.id} className="hotspot-dot" style={{
                left: `${20 + (i * 8) % 60}%`,
                top: `${15 + (i * 13) % 70}%`,
                animationDelay: `${i * 0.2}s`,
              }}>
                <span className={`hotspot-dot__inner hotspot-dot--${report.severity}`} />
                <span className="hotspot-dot__ping" />
              </div>
            ))}
          </div>
          <MapPin size={48} style={{ color: 'var(--primary)', opacity: 0.3 }} />
          <span className="label-text">Interactive Map View</span>
        </div>

        {/* HUD Controls */}
        <div className="map-hud glass">
          <button className="map-hud__btn">Satellite</button>
          <button className="map-hud__btn map-hud__btn--active">Heatmap</button>
          <button className="map-hud__btn">Clusters</button>
        </div>
      </div>
    </div>
  );
}
