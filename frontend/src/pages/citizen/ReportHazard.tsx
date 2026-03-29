import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, AlertTriangle, ChevronRight, ChevronLeft, Upload, CheckCircle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { hazardCategories } from '../../data/mockData';
import './ReportHazard.css';

const steps = ['Category', 'Details', 'Location', 'Review'];
const severities = ['Low', 'Moderate', 'High', 'Critical'] as const;

export default function ReportHazard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    severity: 'Moderate',
    address: '',
    photo: null as File | null,
  });
  const navigate = useNavigate();

  const canNext = step === 0 ? !!form.category :
    step === 1 ? !!form.title && !!form.description :
    step === 2 ? !!form.address : true;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/citizen/my-reports'), 3000);
  };

  if (submitted) {
    return (
      <div className="report-hazard" id="report-hazard">
        <GlassCard className="report-success">
          <CheckCircle size={64} className="report-success__icon" />
          <h2>Report Submitted!</h2>
          <p>Your hazard report has been sent to our AI verification system. You'll be notified once it's processed.</p>
          <span className="data-text" style={{ color: 'var(--primary)' }}>RPT-2024-009</span>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="report-hazard" id="report-hazard">
      <h1>Report a Hazard</h1>
      <p className="report-hazard__desc">Help keep your community safe by reporting environmental hazards.</p>

      {/* Progress */}
      <div className="report-steps">
        {steps.map((s, i) => (
          <div key={s} className={`report-step ${i === step ? 'report-step--active' : ''} ${i < step ? 'report-step--done' : ''}`}>
            <div className="report-step__num">{i < step ? '✓' : i + 1}</div>
            <span className="report-step__label">{s}</span>
            {i < steps.length - 1 && <div className="report-step__line" />}
          </div>
        ))}
      </div>

      <GlassCard className="report-form">
        {/* Step 0: Category */}
        {step === 0 && (
          <div className="report-form__section animate-fade-in">
            <h3>Select Hazard Category</h3>
            <div className="category-grid">
              {hazardCategories.map(cat => (
                <button key={cat} className={`category-btn ${form.category === cat ? 'category-btn--active' : ''}`}
                  onClick={() => setForm({ ...form, category: cat })}>
                  <AlertTriangle size={18} />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="report-form__section animate-fade-in">
            <h3>Describe the Hazard</h3>
            <Input label="Title" placeholder="Brief description of the hazard" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Description" placeholder="Provide detailed information about the hazard..."
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <div className="severity-select">
              <span className="input-group__label">Severity Level</span>
              <div className="severity-options">
                {severities.map(s => (
                  <button key={s} className={`severity-btn severity-btn--${s.toLowerCase()} ${form.severity === s ? 'severity-btn--active' : ''}`}
                    onClick={() => setForm({ ...form, severity: s })}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="photo-upload">
              <label className="photo-upload__area" htmlFor="photo-input">
                <Upload size={24} />
                <span>{form.photo ? form.photo.name : 'Upload Photo Evidence'}</span>
                <span className="photo-upload__hint">PNG, JPG up to 10MB</span>
              </label>
              <input type="file" id="photo-input" accept="image/*" className="photo-upload__input"
                onChange={e => setForm({ ...form, photo: e.target.files?.[0] || null })} />
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="report-form__section animate-fade-in">
            <h3>Pin Location</h3>
            <Input label="Address" placeholder="Enter the hazard location" value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })} icon={<MapPin size={18} />} />
            <div className="map-area">
              <div className="map-area__placeholder">
                <MapPin size={40} />
                <p>Map Preview</p>
                <Camera size={18} />
                <span className="label-text">Click map to set exact pin</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="report-form__section animate-fade-in">
            <h3>Review & Submit</h3>
            <div className="review-grid">
              <div className="review-item"><span className="review-label">Category</span><span>{form.category}</span></div>
              <div className="review-item"><span className="review-label">Title</span><span>{form.title}</span></div>
              <div className="review-item"><span className="review-label">Severity</span><span>{form.severity}</span></div>
              <div className="review-item"><span className="review-label">Location</span><span>{form.address}</span></div>
              <div className="review-item review-item--full"><span className="review-label">Description</span><p>{form.description}</p></div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="report-form__nav">
          {step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)} icon={<ChevronLeft size={18} />}>Back</Button>}
          <div style={{ flex: 1 }} />
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext} iconRight={<ChevronRight size={18} />}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} icon={<AlertTriangle size={18} />}>Submit Report</Button>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
