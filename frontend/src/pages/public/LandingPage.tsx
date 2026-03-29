import { Link } from 'react-router-dom';
import { Shield, Brain, Globe, Lock, Building2, ChevronRight, Activity, Users, MapPin, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';
import GlassCard from '../../components/ui/GlassCard';
import DataText from '../../components/ui/DataText';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing" id="landing-page">
      {/* Background Ambiance */}
      <div className="landing__aurora" />
      <div className="landing__aurora landing__aurora--secondary" />

      {/* Hero Section */}
      <section className="landing__hero" id="hero-section">
        <div className="container">
          <div className="hero__badge">
            <Activity size={14} />
            <DataText size="sm">NEURAL NETWORK STATUS: ONLINE</DataText>
          </div>
          <h1 className="hero__title">
            AI-Powered Urban<br />
            <span className="hero__title--accent">Hazard Detection</span>
          </h1>
          <p className="hero__subtitle">
            Citizens report. AI analyzes. City responds. Experience the next generation
            of environmental intelligence for safer, smarter urban living.
          </p>
          <div className="hero__actions">
            <Link to="/login">
              <Button size="lg" icon={<Shield size={18} />}>Get Started</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg">Learn More</Button>
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <DataText size="xl" color="var(--primary)">1,247</DataText>
              <span className="hero__stat-label">Reports Processed</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <DataText size="xl" color="var(--secondary)">94.2%</DataText>
              <span className="hero__stat-label">AI Accuracy</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <DataText size="xl" color="var(--tertiary-container)">2.4h</DataText>
              <span className="hero__stat-label">Avg Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section className="landing__section" id="monitoring-section">
        <div className="container">
          <div className="section__header">
            <span className="label-text">Real-Time Monitoring</span>
            <h2>Real-Time Hazard Monitoring</h2>
            <p>AI-validated reports from across the globe, visualized for immediate municipal response and citizen awareness.</p>
          </div>
          <div className="landing__map-placeholder">
            <div className="map-placeholder__inner">
              <MapPin size={48} className="map-placeholder__icon" />
              <p>Interactive Hazard Map</p>
              <div className="map-placeholder__dots">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="map-placeholder__dot" style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 70}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}>
                    <span className="map-placeholder__ping" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing__section" id="features-section">
        <div className="container">
          <div className="section__header">
            <span className="label-text">Platform Features</span>
            <h2>Intelligent Environmental Protection</h2>
          </div>
          <div className="features__grid">
            <GlassCard hover className="feature-card">
              <div className="feature-card__icon feature-card__icon--primary">
                <Brain size={28} />
              </div>
              <h3 className="feature-card__title">Neural Hazard Verification</h3>
              <p className="feature-card__desc">
                Our proprietary AI models process citizen reports in milliseconds, filtering noise and verifying severity through satellite cross-referencing and historical data patterns.
              </p>
              <Link to="/about" className="feature-card__link">
                Learn more <ChevronRight size={16} />
              </Link>
            </GlassCard>

            <GlassCard hover className="feature-card">
              <div className="feature-card__icon feature-card__icon--secondary">
                <Globe size={28} />
              </div>
              <h3 className="feature-card__title">Open Data API</h3>
              <p className="feature-card__desc">
                Empowering developers and city planners with real-time environmental APIs for smarter infrastructure integration.
              </p>
              <Link to="/about" className="feature-card__link">
                Explore API <ChevronRight size={16} />
              </Link>
            </GlassCard>

            <GlassCard hover className="feature-card">
              <div className="feature-card__icon feature-card__icon--tertiary">
                <Lock size={28} />
              </div>
              <h3 className="feature-card__title">Citizen Privacy</h3>
              <p className="feature-card__desc">
                Military-grade encryption for all user reports. Contributing to your city shouldn't mean compromising your data.
              </p>
              <Link to="/about" className="feature-card__link">
                Learn more <ChevronRight size={16} />
              </Link>
            </GlassCard>

            <GlassCard hover className="feature-card">
              <div className="feature-card__icon feature-card__icon--primary">
                <Building2 size={28} />
              </div>
              <h3 className="feature-card__title">Municipal Dashboard</h3>
              <p className="feature-card__desc">
                A unified command center for city officials to visualize, prioritize, and dispatch responses based on real-time intelligence clusters.
              </p>
              <Link to="/about" className="feature-card__link">
                Learn more <ChevronRight size={16} />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing__cta" id="cta-section">
        <div className="container">
          <GlassCard variant="heavy" className="cta-card">
            <div className="cta-card__glow" />
            <Zap size={36} className="cta-card__icon" />
            <h2>Ready to Protect Your City?</h2>
            <p>Join thousands of citizens already making their communities safer with GreenAlert.</p>
            <div className="cta-card__actions">
              <Link to="/login">
                <Button size="lg">Start Reporting</Button>
              </Link>
              <div className="cta-card__stats">
                <Users size={16} />
                <DataText size="sm">12,847 active citizens</DataText>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
