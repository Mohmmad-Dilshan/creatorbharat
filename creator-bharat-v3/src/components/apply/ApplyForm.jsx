import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  BarChart3,
  ChevronRight,
  CreditCard,
  Hash,
  IndianRupee,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { Btn, Fld } from '../Primitives';
import { fmt } from '../../utils/helpers';

const NICHES = ['Travel', 'Lifestyle', 'Fashion', 'Beauty', 'Tech', 'Gaming', 'Food', 'Fitness', 'Education', 'Finance', 'Comedy', 'Art'];
const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'];
const SERVICES = ['Sponsored Posts', 'Reels', 'YouTube Videos', 'Stories', 'Product Reviews', 'Event Attendance'];

const STEPS = [
  { title: 'Identity', icon: User, helper: 'Basic account and location' },
  { title: 'Influence', icon: BarChart3, helper: 'Niche, platform, audience' },
  { title: 'Commercials', icon: CreditCard, helper: 'Rates and services' },
  { title: 'Review', icon: BadgeCheck, helper: 'Launch your profile' },
];

function SelectChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`apply-chip ${active ? 'active' : ''}`}
    >
      {label}
    </button>
  );
}

SelectChip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

function StepHeader({ step }) {
  return (
    <div className="apply-stepper">
      {STEPS.map((item, index) => {
        const Icon = item.icon;
        const active = step === index + 1;
        const done = step > index + 1;
        return (
          <div key={item.title} className={`apply-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
            <div className="apply-step-icon"><Icon size={17} /></div>
            <div>
              <strong>{item.title}</strong>
              <span>{item.helper}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

StepHeader.propTypes = {
  step: PropTypes.number.isRequired,
};

export default function ApplyForm({ onSuccess, onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mob, setMob] = useState(globalThis.innerWidth < 720);
  const [F, setF] = useState({
    name: '',
    handle: '',
    email: '',
    password: '',
    confirm: '',
    city: 'Bhilwara',
    state: 'Rajasthan',
    niche: [],
    platform: [],
    followers: '',
    er: '',
    rateMin: '',
    services: [],
    interests: [], // Added for Podcast, Articles, Events
    portfolio: '' // Added for existing portfolio link
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onResize = () => setMob(globalThis.innerWidth < 720);
    globalThis.addEventListener('resize', onResize);
    return () => globalThis.removeEventListener('resize', onResize);
  }, []);

  const upF = (key, value) => setF(prev => ({ ...prev, [key]: value }));
  const toggleArr = (key, value) => setF(prev => ({
    ...prev,
    [key]: prev[key].includes(value) ? prev[key].filter(x => x !== value) : [...prev[key], value],
  }));

  const validateStep1 = (errs) => {
    if (!F.name) errs.name = 'Full name is required';
    if (!F.email || !/^\S+@\S+\.\S+$/.test(F.email)) errs.email = 'Valid email is required';
    if (!F.password || F.password.length < 6) errs.password = 'Minimum 6 characters';
    if (F.password !== F.confirm) errs.confirm = 'Passwords do not match';
  };

  const validateStep2 = (errs) => {
    if (F.niche.length === 0) errs.niche = 'Select at least one niche';
    if (F.platform.length === 0) errs.platform = 'Select at least one platform';
    if (!F.followers) errs.followers = 'Audience reach is required';
  };

  const validate = (activeStep) => {
    const nextErrors = {};
    if (activeStep === 1) validateStep1(nextErrors);
    if (activeStep === 2) validateStep2(nextErrors);
    if (activeStep === 3 && !F.rateMin) nextErrors.rateMin = 'Starting rate is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep(current => current + 1);
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      onSuccess({ ...F, id: 'u-' + Date.now(), role: 'creator', handle: F.handle || fmt.handle(F.name) });
      setLoading(false);
    }, 1100);
  };

  const current = STEPS[step - 1];
  const CurrentIcon = current.icon;

  return (
    <div className="apply-form-shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StepHeader step={step} />

      <div className="apply-progress" aria-hidden="true">
        <span style={{ width: `${(step / STEPS.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.24 }}
        >
          <div className="apply-section-title">
            <div><CurrentIcon size={19} /></div>
            <span>Step {step} of 4</span>
            <h3>{current.title}</h3>
            <p>{current.helper}</p>
          </div>

          {step === 1 && (
            <div className="apply-field-stack">
              <div className="apply-two-col">
                <Fld label="Full name" value={F.name} icon={User} onChange={e => upF('name', e.target.value)} placeholder="Aman Deep" error={errors.name} required />
                <Fld label="Creator handle" value={F.handle} icon={Hash} onChange={e => upF('handle', e.target.value)} placeholder="@amandeep" />
              </div>
              <Fld label="Work email" type="email" icon={Mail} value={F.email} onChange={e => upF('email', e.target.value)} placeholder="aman@bhilwara.me" error={errors.email} required />
              <div className="apply-two-col">
                <Fld label="Password" type="password" icon={Lock} value={F.password} onChange={e => upF('password', e.target.value)} placeholder="Password" error={errors.password} required />
                <Fld label="Confirm password" type="password" icon={Lock} value={F.confirm} onChange={e => upF('confirm', e.target.value)} placeholder="Confirm" error={errors.confirm} required />
              </div>
              <div className="apply-two-col">
                <Fld label="City" value={F.city} icon={MapPin} onChange={e => upF('city', e.target.value)} options={['Bhilwara', 'Jaipur', 'Udaipur', 'Delhi', 'Mumbai']} required />
                <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} options={['Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Karnataka']} required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="apply-field-stack">
              <div className="apply-choice-block">
                <div className="apply-choice-head">
                  <strong>Primary niches</strong>
                  <span>{F.niche.length} selected</span>
                </div>
                <div className="apply-chip-grid">
                  {NICHES.map(niche => (
                    <SelectChip key={niche} label={niche} active={F.niche.includes(niche)} onClick={() => toggleArr('niche', niche)} />
                  ))}
                </div>
                {errors.niche && <p className="apply-error">{errors.niche}</p>}
              </div>

              <div className="apply-choice-block">
                <div className="apply-choice-head">
                  <strong>Content Ecosystem</strong>
                  <span>{F.interests.length} selected</span>
                </div>
                <div className="apply-chip-grid">
                  {['Podcasts', 'Articles/Blogs', 'Live Events', 'Short Films', 'Newsletters'].map(item => (
                    <SelectChip key={item} label={item} active={F.interests.includes(item)} onClick={() => toggleArr('interests', item)} />
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                 <Fld label="Existing Portfolio/Website (Optional)" value={F.portfolio} onChange={e => upF('portfolio', e.target.value)} placeholder="https://mybrand.com" />
              </div>

              <div className="apply-choice-block">
                <div className="apply-choice-head">
                  <strong>Social platforms</strong>
                  <span>{F.platform.length} selected</span>
                </div>
                <div className="apply-chip-grid compact">
                  {PLATFORMS.map(platform => (
                    <SelectChip key={platform} label={platform} active={F.platform.includes(platform)} onClick={() => toggleArr('platform', platform)} />
                  ))}
                </div>
                {errors.platform && <p className="apply-error">{errors.platform}</p>}
              </div>

              <div className="apply-two-col">
                <Fld label="Total followers" type="number" icon={Hash} value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="25000" error={errors.followers} required />
                <Fld label="Engagement rate" type="number" value={F.er} onChange={e => upF('er', e.target.value)} placeholder="4.8" helper="Optional percentage" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="apply-field-stack">
              <div className="apply-rate-card">
                <div>
                  <span>Suggested starter range</span>
                  <strong>INR 5k - INR 25k</strong>
                  <p>Keep your rate realistic for your reach and niche. You can update this later.</p>
                </div>
                <Sparkles size={30} />
              </div>
              <Fld label="Minimum collaboration rate" type="number" icon={IndianRupee} value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="5000" error={errors.rateMin} required />
              <div className="apply-choice-block">
                <div className="apply-choice-head">
                  <strong>Services offered</strong>
                  <span>{F.services.length} selected</span>
                </div>
                <div className="apply-chip-grid">
                  {SERVICES.map(service => (
                    <SelectChip key={service} label={service} active={F.services.includes(service)} onClick={() => toggleArr('services', service)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="apply-review-grid">
              <div className="apply-verified-card">
                <div className="apply-verified-icon"><ShieldCheck size={34} /></div>
                <h4>Creator profile ready</h4>
                <p>Your verified workspace will become visible to premium brands after launch.</p>
              </div>
              <div className="apply-profile-preview">
                <div className="apply-avatar">{(F.name || 'C').slice(0, 1).toUpperCase()}</div>
                <div>
                  <strong>{F.name || 'Creator Name'}</strong>
                  <span>@{F.handle || fmt.handle(F.name || 'creator')}</span>
                </div>
                <div className="apply-preview-meta">
                  <span>{F.city}, {F.state}</span>
                  <span>{F.niche.slice(0, 2).join(', ') || 'Digital Creator'}</span>
                  {F.interests.length > 0 && <span>{F.interests.slice(0, 2).join(' • ')}</span>}
                  <span>{F.rateMin ? `From INR ${Number(F.rateMin).toLocaleString('en-IN')}` : 'Rate pending'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="apply-actions">
            {step > 1 && (
              <Btn variant="outline" onClick={() => setStep(s => s - 1)} style={{ borderRadius: 14, height: 52, padding: mob ? '0 16px' : '0 24px' }}>
                Back
              </Btn>
            )}
            {step < 4 ? (
              <Btn full lg onClick={next} style={{ borderRadius: 14, background: '#111827', color: '#fff', border: 'none', height: 52, fontWeight: 900 }}>
                Continue <ChevronRight size={18} />
              </Btn>
            ) : (
              <Btn full lg loading={loading} onClick={submit} style={{ borderRadius: 14, background: '#FF9431', color: '#fff', border: 'none', height: 52, fontWeight: 950, boxShadow: '0 14px 30px rgba(255,148,49,0.25)' }}>
                Launch Profile
              </Btn>
            )}
          </div>

          <button type="button" onClick={onBackToLogin} className="apply-login-link">
            Already a member? <span>Sign in</span>
          </button>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .apply-form-shell {
          min-width: 0;
        }

        .apply-stepper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 18px;
        }

        .apply-step {
          min-width: 0;
          min-height: 68px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 16px;
          border: 1px solid #eef2f7;
          background: #fff;
          color: #94a3b8;
        }

        .apply-step.active {
          border-color: rgba(255,148,49,0.34);
          background: rgba(255,148,49,0.07);
          color: #ff9431;
        }

        .apply-step.done {
          border-color: rgba(16,185,129,0.22);
          background: rgba(16,185,129,0.07);
          color: #10b981;
        }

        .apply-step-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: currentColor;
        }

        .apply-step-icon svg {
          color: #fff;
        }

        .apply-step strong,
        .apply-step span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .apply-step strong {
          color: #111827;
          font-size: 12px;
          font-weight: 950;
          margin-bottom: 2px;
        }

        .apply-step span {
          color: #94a3b8;
          font-size: 10px;
          font-weight: 800;
        }

        .apply-progress {
          height: 5px;
          border-radius: 999px;
          overflow: hidden;
          background: #eef2f7;
          margin-bottom: 26px;
        }

        .apply-progress span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #ff9431, #10b981);
          transition: width .24s ease;
        }

        .apply-section-title {
          margin-bottom: 24px;
        }

        .apply-section-title div {
          width: 38px;
          height: 38px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          color: #ff9431;
          background: rgba(255,148,49,0.1);
          margin-bottom: 12px;
        }

        .apply-section-title span {
          display: block;
          color: #ff9431;
          font-size: 11px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .1em;
          margin-bottom: 6px;
        }

        .apply-section-title h3 {
          margin: 0;
          color: #111827;
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 950;
          letter-spacing: 0;
        }

        .apply-section-title p {
          margin-top: 7px;
          color: #64748b;
          font-size: 14px;
          font-weight: 650;
        }

        .apply-field-stack {
          display: grid;
          gap: 2px;
        }

        .apply-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .apply-choice-block {
          border: 1px solid #eef2f7;
          background: #fff;
          border-radius: 18px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .apply-choice-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .apply-choice-head strong {
          color: #111827;
          font-size: 13px;
          font-weight: 950;
        }

        .apply-choice-head span {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 900;
        }

        .apply-chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .apply-chip {
          min-height: 34px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #fff;
          color: #64748b;
          padding: 0 13px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: background .18s ease, color .18s ease, border-color .18s ease, transform .18s ease;
        }

        .apply-chip:hover {
          transform: translateY(-1px);
        }

        .apply-chip.active {
          border-color: rgba(255,148,49,0.36);
          background: #ff9431;
          color: #fff;
        }

        .apply-error {
          color: #ef4444;
          font-size: 12px;
          font-weight: 800;
          margin-top: 9px;
        }

        .apply-rate-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          border: 1px solid rgba(16,185,129,0.18);
          border-radius: 20px;
          background: linear-gradient(135deg, #f0fdf4, #fff7ed);
          padding: 18px;
          margin-bottom: 16px;
          color: #10b981;
        }

        .apply-rate-card span {
          display: block;
          color: #64748b;
          font-size: 11px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 5px;
        }

        .apply-rate-card strong {
          display: block;
          color: #111827;
          font-size: 22px;
          font-weight: 950;
          margin-bottom: 5px;
        }

        .apply-rate-card p {
          color: #64748b;
          font-size: 13px;
          line-height: 1.55;
          font-weight: 650;
          max-width: 420px;
        }

        .apply-review-grid {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 16px;
        }

        .apply-verified-card,
        .apply-profile-preview {
          border-radius: 22px;
          border: 1px solid #eef2f7;
          background: #fff;
          padding: 20px;
        }

        .apply-verified-card {
          text-align: center;
          background: rgba(255,148,49,0.045);
          border-color: rgba(255,148,49,0.18);
        }

        .apply-verified-icon {
          width: 68px;
          height: 68px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          color: #fff;
          background: #ff9431;
          margin: 0 auto 16px;
          box-shadow: 0 16px 34px rgba(255,148,49,0.24);
        }

        .apply-verified-card h4 {
          color: #111827;
          font-size: 18px;
          font-weight: 950;
          margin: 0 0 8px;
        }

        .apply-verified-card p {
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 650;
        }

        .apply-profile-preview {
          display: grid;
          grid-template-columns: auto 1fr;
          align-content: start;
          gap: 14px;
        }

        .apply-avatar {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          color: #fff;
          background: linear-gradient(135deg, #111827, #ff9431);
          font-size: 22px;
          font-weight: 950;
        }

        .apply-profile-preview strong,
        .apply-profile-preview span {
          display: block;
        }

        .apply-profile-preview strong {
          color: #111827;
          font-size: 18px;
          font-weight: 950;
          margin-top: 5px;
        }

        .apply-profile-preview span {
          color: #ff9431;
          font-size: 13px;
          font-weight: 850;
          margin-top: 3px;
        }

        .apply-preview-meta {
          grid-column: 1 / -1;
          display: grid;
          gap: 9px;
          margin-top: 8px;
        }

        .apply-preview-meta span {
          min-height: 36px;
          display: flex;
          align-items: center;
          color: #475569;
          background: #f8fafc;
          border-radius: 12px;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 850;
        }

        .apply-actions {
          display: flex;
          gap: 12px;
          margin-top: 30px;
        }

        .apply-login-link {
          width: 100%;
          margin-top: 22px;
          border: none;
          background: transparent;
          color: #64748b;
          font-family: inherit;
          font-size: 14px;
          font-weight: 750;
          cursor: pointer;
        }

        .apply-login-link span {
          color: #ff9431;
          font-weight: 950;
        }

        @media (max-width: 820px) {
          .apply-stepper {
            grid-template-columns: repeat(4, minmax(44px, 1fr));
          }

          .apply-step {
            min-height: 48px;
            justify-content: center;
            padding: 8px;
          }

          .apply-step > div:last-child {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .apply-two-col,
          .apply-review-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .apply-section-title h3 {
            font-size: 24px;
          }

          .apply-choice-block,
          .apply-rate-card {
            border-radius: 16px;
            padding: 14px;
          }

          .apply-actions {
            position: sticky;
            bottom: 0;
            z-index: 5;
            background: linear-gradient(to top, #fff 72%, rgba(255,255,255,0));
            padding-top: 18px;
            margin-left: -2px;
            margin-right: -2px;
          }
        }
      `}</style>
    </div>
  );
}

ApplyForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};
