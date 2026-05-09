import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Hash,
  Lock,
  Mail,
  MapPin,
  Sparkles,
  User,
  ChevronRight,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Btn, Fld } from '../Primitives';

import { INDIAN_STATES, MAJOR_CITIES, STATE_CITY_MAP } from '../../utils/geo';

// Simplified 1-step registration flow
export default function ApplyForm({ onSuccess, onBackToLogin }) {
  const [loading, setLoading] = useState(false);
  const [F, setF] = useState({
    name: '',
    handle: '',
    email: '',
    password: '',
    confirm: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const upF = (key, value) => {
    setF(prev => {
      const next = { ...prev, [key]: value };
      // If state changes, reset city to first available in map or empty
      if (key === 'state') {
        const availableCities = STATE_CITY_MAP[value] || MAJOR_CITIES;
        next.city = availableCities[0];
      }
      return next;
    });
  };

  const validate = () => {
    const errs = {};
    if (!F.name) errs.name = 'Full name is required';
    if (!F.email || !/^\S+@\S+\.\S+$/.test(F.email)) errs.email = 'Valid email required';
    if (!verified) errs.phone = 'Please verify your phone number';
    if (!F.password || F.password.length < 6) errs.password = 'Min 6 characters';
    if (F.password !== F.confirm) errs.confirm = 'Passwords mismatch';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const sendOTP = () => {
    if (!F.phone || F.phone.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Enter valid 10-digit number' }));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      setErrors(prev => ({ ...prev, phone: null }));
      // Simulation: Telling the user the OTP
      alert('Your demo OTP is 1234');
    }, 800);
  };

  const verifyOTP = () => {
    if (F.otp !== '1234') {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Try 1234 for demo.' }));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setLoading(false);
      setErrors(prev => ({ ...prev, otp: null }));
    }, 800);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onSuccess({ ...F, id: 'u-' + Date.now(), role: 'creator', handle: F.handle || F.name.toLowerCase().replaceAll(' ', '') });
      setLoading(false);
    }, 1100);
  };

  return (
    <div className="apply-form-shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div className="apply-section-title" style={{ marginBottom: 20 }}>
          <div><Sparkles size={19} /></div>
          <span>Fast Track Onboarding</span>
          <h3>Start your legacy.</h3>
          <p>Join Bharat&apos;s most trusted creator ecosystem in seconds.</p>
        </div>

        <div className="apply-field-stack">
          <div className="apply-two-col">
            <Fld label="Full name" value={F.name} icon={User} onChange={e => upF('name', e.target.value)} placeholder="Aman Deep" error={errors.name} required />
            <Fld label="Handle" value={F.handle} icon={Hash} onChange={e => upF('handle', e.target.value)} placeholder="amandeep" />
          </div>
          <Fld label="Email address" type="email" icon={Mail} value={F.email} onChange={e => upF('email', e.target.value)} placeholder="aman@creator.me" error={errors.email} required />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 10, alignItems: 'flex-end' }}>
            <Fld label="Mobile number" type="tel" icon={Phone} value={F.phone} onChange={e => upF('phone', e.target.value)} placeholder="9876543210" error={errors.phone} required readOnly={verified} />
            {!verified && (
              <Btn onClick={sendOTP} loading={loading && !otpSent} style={{ marginBottom: 18, height: 52, borderRadius: 12, background: otpSent ? '#F8FAFC' : '#111827', color: otpSent ? '#64748B' : '#fff', fontSize: 13, border: otpSent ? '1px solid #E2E8F0' : 'none' }}>
                {otpSent ? 'Resend' : 'Send OTP'}
              </Btn>
            )}
            {verified && (
              <div style={{ marginBottom: 18, height: 52, display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontWeight: 900, fontSize: 13 }}>
                <CheckCircle2 size={18} /> Verified
              </div>
            )}
          </div>

          {otpSent && !verified && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 10, alignItems: 'flex-end', animation: 'fadeIn .3s ease' }}>
              <Fld label="Enter 4-digit OTP" type="number" value={F.otp} onChange={e => upF('otp', e.target.value)} placeholder="1234" error={errors.otp} />
              <Btn onClick={verifyOTP} loading={loading && otpSent} style={{ marginBottom: 18, height: 52, borderRadius: 12, background: '#10B981', color: '#fff', border: 'none' }}>
                Verify OTP
              </Btn>
            </div>
          )}

          <div className="apply-two-col">
            <Fld label="Password" type="password" icon={Lock} value={F.password} onChange={e => upF('password', e.target.value)} placeholder="••••••" error={errors.password} required />
            <Fld label="Confirm" type="password" icon={Lock} value={F.confirm} onChange={e => upF('confirm', e.target.value)} placeholder="••••••" error={errors.confirm} required />
          </div>
          <div className="apply-two-col">
            <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} options={INDIAN_STATES} required />
            <Fld label="City / District" value={F.city} icon={MapPin} onChange={e => upF('city', e.target.value)} options={STATE_CITY_MAP[F.state] || MAJOR_CITIES} required />
          </div>
        </div>

        <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(255,148,49,0.05)', borderRadius: 16, border: '1px solid rgba(255,148,49,0.1)' }}>
           <p style={{ fontSize: 12, fontWeight: 700, color: '#FF9431', margin: 0 }}>
             ✨ You can build your full profile and add niches from your dashboard after signup.
           </p>
        </div>

        <Btn full lg loading={loading} style={{ marginTop: 24, borderRadius: 14, background: '#111827', color: '#fff', border: 'none', height: 56, fontWeight: 950 }}>
          Launch My Portfolio <ChevronRight size={18} />
        </Btn>

        <button type="button" onClick={onBackToLogin} className="apply-login-link">
          Already a member? <span>Sign in</span>
        </button>
      </form>

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
