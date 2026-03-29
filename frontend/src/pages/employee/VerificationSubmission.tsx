import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, CheckCircle, Upload, ClipboardCheck } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import DataText from '../../components/ui/DataText';
import './VerificationSubmission.css';

export default function VerificationSubmission() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/employee/assignments'), 3000);
  };

  if (submitted) {
    return (
      <div className="verification" id="verification-submission">
        <GlassCard className="verification-success">
          <CheckCircle size={64} className="verification-success__icon" />
          <h2>Verification Submitted!</h2>
          <p>Your field assessment has been recorded and sent to the admin team for review.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="verification" id="verification-submission">
      <h1>Submit Verification</h1>
      <p className="verification__desc">Complete the on-site verification for the assigned hazard report.</p>

      <div className="verification__grid">
        <GlassCard className="verification__form">
          <h3><ClipboardCheck size={18} /> Field Assessment</h3>

          <Input label="Report ID" placeholder="RPT-2024-001" value="RPT-2024-001" readOnly />

          <div className="verification__field">
            <span className="input-group__label">Hazard Confirmed?</span>
            <div className="verification__toggle-group">
              <button className="verification__toggle verification__toggle--active">Yes, Confirmed</button>
              <button className="verification__toggle">No, False Report</button>
              <button className="verification__toggle">Partially</button>
            </div>
          </div>

          <div className="verification__field">
            <span className="input-group__label">Actual Severity</span>
            <div className="verification__toggle-group">
              <button className="verification__toggle">Low</button>
              <button className="verification__toggle verification__toggle--active">Moderate</button>
              <button className="verification__toggle">High</button>
              <button className="verification__toggle">Critical</button>
            </div>
          </div>

          <Textarea label="Field Notes" placeholder="Describe what you observed at the site..." rows={5} />

          <div className="photo-upload">
            <label className="photo-upload__area" htmlFor="verify-photo">
              <Camera size={24} />
              <span>Upload Photo Evidence</span>
              <span className="photo-upload__hint">Take or upload photos of the hazard site</span>
            </label>
            <input type="file" id="verify-photo" accept="image/*" className="photo-upload__input" />
          </div>

          <Input label="GPS Coordinates" placeholder="Auto-detected" icon={<MapPin size={18} />} value="37.7649, -122.3894" readOnly />

          <Button size="lg" fullWidth onClick={handleSubmit} icon={<Upload size={18} />}>Submit Verification</Button>
        </GlassCard>

        <div className="verification__sidebar">
          <GlassCard>
            <h3>Report Context</h3>
            <div className="context-list">
              <div className="context-item"><span className="label-text">Title</span><span>Chemical Runoff in Mission Creek</span></div>
              <div className="context-item"><span className="label-text">Category</span><span>Water Contamination</span></div>
              <div className="context-item"><span className="label-text">AI Confidence</span><DataText size="md" color="var(--primary)">94.2%</DataText></div>
              <div className="context-item"><span className="label-text">Reported By</span><span>Alex Mercer</span></div>
              <div className="context-item"><span className="label-text">Reported At</span><DataText size="sm">Dec 15, 2024 9:23 AM</DataText></div>
              <div className="context-item"><span className="label-text">Location</span><span>200 Channel St, SF</span></div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
