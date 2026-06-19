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
import { Btn, Fld } from '@/components/common/Primitives';

import { INDIAN_STATES, MAJOR_CITIES, STATE_CITY_MAP } from '../../utils/geo';

import { useApp } from '@/core/context';
import { useOtpTimer } from '../../hooks/useOtpTimer';
import { getDemoOtp, isUsingDemoAuth, registerCreator, sendOtp, verifyOtp } from '../../utils/authService';

// Simplified 1-step registration flow
export default function ApplyForm({ onSuccess, onBackToLogin, mob }) {
  const { dsp } = useApp();
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
    otp: '',
    bio: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const { timer, startTimer } = useOtpTimer(30);
  const [showAi, setShowAi] = useState(false);
  const [aiNiche, setAiNiche] = useState('');
  const [generatingAi, setGeneratingAi] = useState(false);

  const generateAiBio = () => {
    if (!aiNiche.trim()) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Please enter a niche (e.g. travel, food)' } });
      return;
    }
    setGeneratingAi(true);
    setTimeout(() => {
      const niche = aiNiche.toLowerCase();
      let gen = `Hey there! I'm ${F.name || 'a creator'}, passionate about creating content in the ${niche} space. Connect with me to launch authentic regional campaigns!`;
      if (niche.includes('travel')) {
        gen = `Namaste! I'm ${F.name || 'a vlogger'}, exploring Bharat's hidden gems. Specializing in offbeat travel stories, local culture, and high-impact regional tourism campaigns.`;
      } else if (niche.includes('food')) {
        gen = `Hey foodies! I'm ${F.name || 'a food explorer'}, uncovering the rich street food and culinary legacy of Bharat. Sharing raw, authentic taste reviews and local recipes.`;
      } else if (niche.includes('tech') || niche.includes('gadget')) {
        gen = `Tech explorer here! I'm ${F.name || 'a reviewer'}, breaking down gadgets, smartphones, and software hacks. Making tech simple and accessible in regional dialects.`;
      } else if (niche.includes('fashion') || niche.includes('beauty')) {
        gen = `Hi gorgeous! I'm ${F.name || 'a stylist'}, sharing realistic beauty tips, ethnic wear, and budget styling hacks. Connecting brands with authentic Tier-2 audiences.`;
      }
      upF('bio', gen);
      setGeneratingAi(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'AI Biography starter generated!' } });
    }, 800);
  };

  const upF = (key, value) => {
    setF(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'state') {
        const availableCities = STATE_CITY_MAP[value] || MAJOR_CITIES;
        next.city = availableCities[0];
      }
      return next;
    });
    // Clear error on change if any
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const blur = (key) => {
    const val = F[key];
    let err = null;
    if (key === 'name' && !val) err = 'Full name is required';
    if (key === 'email' && (!val || !/^\S+@\S+\.\S+$/.test(val))) err = 'Valid email required';
    if (key === 'password' && (!val || val.length < 6)) err = 'Min 6 characters';
    if (key === 'confirm' && val !== F.password) err = 'Passwords mismatch';
    if (key === 'phone' && (!val || val.length < 10)) err = 'Enter valid 10-digit number';
    
    if (err) setErrors(prev => ({ ...prev, [key]: err }));
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

  const sendOTP = async () => {
    if (!F.phone || F.phone.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Enter valid 10-digit number' }));
      return;
    }
    setLoading(true);
    try {
      await sendOtp(F.phone);
      setOtpSent(true);
      startTimer(30);
      setErrors(prev => ({ ...prev, phone: null }));
      dsp({ t: 'TOAST', d: { type: 'info', msg: isUsingDemoAuth() ? `Demo OTP is ${getDemoOtp()}` : 'OTP sent successfully.' } });
    } catch (err) {
      setErrors(prev => ({ ...prev, phone: err.message || 'Failed to send OTP' }));
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!F.otp) {
      setErrors(prev => ({ ...prev, otp: 'Please enter the OTP.' }));
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(F.phone, F.otp);
      setVerified(true);
      setErrors(prev => ({ ...prev, otp: null }));
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Phone verified successfully!' } });
    } catch (err) {
      setErrors(prev => ({ ...prev, otp: err.message || 'Invalid OTP' }));
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Invalid OTP' } });
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (F.bio) {
        localStorage.setItem('cb_pending_bio', F.bio);
      }
      const { user, token } = await registerCreator(F);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Welcome to CreatorBharat!' } });
      onSuccess(user, token, F.phone);
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Registration failed. Please try again.' } });
    } finally {
      setLoading(false);
    }
  };

  const isInactive = otpSent || timer > 0;
  const btnBackground = isInactive ? '#F8FAFC' : '#111827';
  const btnColor = isInactive ? '#64748B' : '#fff';
  const btnBorder = isInactive ? '1px solid #E2E8F0' : 'none';
  const btnCursor = timer > 0 ? 'not-allowed' : 'pointer';
  
  let btnLabel = 'Send OTP';
  if (timer > 0) btnLabel = `Resend in ${timer}s`;
  else if (otpSent) btnLabel = 'Resend';

  return (
    <div className="apply-form-shell" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <button 
        type="button"
        onClick={onBackToLogin}
        style={{ position: 'absolute', top: -10, right: 0, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: '#64748B', zIndex: 10 }}
      >
        ← BACK
      </button>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Step Indicator */}
        <div style={{ marginBottom: 24 }}>
          <div className="apply-stepper">
            {[
              { n: 1, label: 'Identity', done: !!(F.name && F.email) },
              { n: 2, label: 'Phone', done: verified },
              { n: 3, label: 'Password', done: !!(F.password && F.confirm && F.password === F.confirm) },
              { n: 4, label: 'Location', done: !!(F.state && F.city) },
            ].map((step) => {
              const isDone = step.done;
              const isActive = !isDone && (
                (step.n === 1 && !F.name) ||
                (step.n === 2 && F.name && F.email && !verified) ||
                (step.n === 3 && verified && !F.password) ||
                (step.n === 4 && F.password && F.confirm && !F.state)
              );
              return (
                <div 
                  key={step.n} 
                  className={`apply-step ${isDone ? 'done' : isActive ? 'active' : ''}`}
                >
                  <div className="apply-step-icon">
                    {isDone ? (
                      <CheckCircle2 size={15} color="#fff" />
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>{step.n}</span>
                    )}
                  </div>
                  <div>
                    <strong>{step.label}</strong>
                    <span>Step 0{step.n}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Progress bar */}
          <div className="apply-progress">
            <span style={{ width: `${([!!(F.name && F.email), verified, !!(F.password && F.confirm && F.password === F.confirm), !!(F.state && F.city)].filter(Boolean).length / 4) * 100}%` }} />
          </div>
        </div>
        <div className="apply-section-title" style={{ marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,148,49,0.12)', color: '#FF9431', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
            <Sparkles size={22} fill="currentColor" fillOpacity={0.2} />
          </div>
          <span style={{ color: '#FF9431', fontSize: 12, fontWeight: 950, letterSpacing: '1px', textTransform: 'uppercase' }}>Creator Elite Protocol</span>
          <h3 style={{ fontSize: mob ? 24 : 32, fontWeight: 950, color: '#111827', marginTop: 4, letterSpacing: '-0.5px' }}>Start your legacy.</h3>
          <p style={{ fontSize: 15, color: '#64748B', fontWeight: 650, marginTop: 4 }}>Join Bharat&apos;s most trusted creator ecosystem in seconds.</p>
        </div>

        <div className="apply-field-stack">
          <div className="apply-two-col">
            <Fld label="Full name" value={F.name} icon={User} onChange={e => upF('name', e.target.value)} onBlur={() => blur('name')} placeholder="Aman Deep" error={errors.name} required />
            <Fld label="Handle" value={F.handle} icon={Hash} onChange={e => upF('handle', e.target.value)} placeholder="amandeep" />
          </div>
          <Fld label="Email address" type="email" icon={Mail} value={F.email} onChange={e => upF('email', e.target.value)} onBlur={() => blur('email')} placeholder="aman@creator.me" error={errors.email} required />
          
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.4fr 0.6fr', gap: 10, alignItems: 'flex-end' }}>
            <Fld 
              label="Mobile number" 
              type="tel" 
              icon={Phone} 
              value={F.phone} 
              onChange={e => {
                const val = e.target.value.replaceAll(/\D/g, '');
                if (val.length <= 10) upF('phone', val);
              }} 
              onBlur={() => blur('phone')} 
              placeholder="9876543210" 
              error={errors.phone} 
              required 
              readOnly={verified} 
            />
            {!verified && (
              <Btn 
                onClick={sendOTP} 
                loading={loading && !otpSent} 
                disabled={timer > 0}
                style={{ 
                  marginBottom: 18, 
                  height: 52, 
                  borderRadius: 12, 
                  background: btnBackground, 
                  color: btnColor, 
                  fontSize: 13, 
                  border: btnBorder,
                  cursor: btnCursor
                }}
              >
                {btnLabel}
              </Btn>
            )}
            {verified && (
              <div style={{ marginBottom: 18, height: 52, display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontWeight: 900, fontSize: 13 }}>
                <CheckCircle2 size={18} /> Verified
              </div>
            )}
          </div>

          {otpSent && !verified && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 0.8fr', gap: 10, alignItems: 'flex-end', animation: 'fadeIn .3s ease' }}>
              <Fld label="Enter 4-digit OTP" type="number" value={F.otp} onChange={e => upF('otp', e.target.value)} placeholder="1234" error={errors.otp} />
              <Btn onClick={verifyOTP} loading={loading && otpSent} style={{ marginBottom: 18, height: 52, borderRadius: 12, background: '#10B981', color: '#fff', border: 'none' }}>
                Verify OTP
              </Btn>
            </div>
          )}

          <div className="apply-two-col">
            <Fld label="Password" type="password" icon={Lock} value={F.password} onChange={e => upF('password', e.target.value)} onBlur={() => blur('password')} placeholder="••••••" error={errors.password} required />
            <Fld label="Confirm" type="password" icon={Lock} value={F.confirm} onChange={e => upF('confirm', e.target.value)} onBlur={() => blur('confirm')} placeholder="••••••" error={errors.confirm} required />
          </div>
          <div className="apply-two-col">
            <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} options={INDIAN_STATES} required />
            <Fld label="City / District" value={F.city} icon={MapPin} onChange={e => upF('city', e.target.value)} options={STATE_CITY_MAP[F.state] || MAJOR_CITIES} required />
          </div>
        </div>

        {/* AI Bio Drawer */}
        <div style={{ marginTop: 12, border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
          <button
            type="button"
            onClick={() => setShowAi(!showAi)}
            style={{
              width: '100%', padding: '12px 16px', background: '#F8FAFC',
              border: 'none', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', cursor: 'pointer', fontSize: 13,
              fontWeight: 800, color: '#0F172A', outline: 'none'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} color="#FF9431" fill="#FF9431" fillOpacity={0.2} />
              AI Bio Assistant (Optional)
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>{showAi ? 'Collapse ▲' : 'Expand ▼'}</span>
          </button>
          
          {showAi && (
            <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>Your Niche / Content Vibe</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input 
                    type="text" 
                    placeholder="e.g. travel, street food, tech reviews" 
                    value={aiNiche} 
                    onChange={e => setAiNiche(e.target.value)}
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 13, fontWeight: 600, outline: 'none' }}
                  />
                  <Btn 
                    type="button" 
                    onClick={generateAiBio}
                    loading={generatingAi}
                    style={{ background: '#FF9431', color: '#fff', padding: '10px 14px', borderRadius: 10, fontSize: 12, fontWeight: 800, border: 'none' }}
                  >
                    Draft ⚡
                  </Btn>
                </div>
              </div>

              {F.bio && (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>Drafted Bio Preview</label>
                  <textarea 
                    value={F.bio} 
                    onChange={e => upF('bio', e.target.value)}
                    style={{ width: '100%', minHeight: 70, padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 13, fontWeight: 650, color: '#475569', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5, boxSizing: 'border-box' }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(255,148,49,0.05)', borderRadius: 16, border: '1px solid rgba(255,148,49,0.1)' }}>
           <p style={{ fontSize: 12, fontWeight: 700, color: '#FF9431', margin: 0 }}>
             ✨ You can build your full profile and add niches from your dashboard after signup.
           </p>
        </div>

        <Btn full lg type="submit" loading={loading} style={{ marginTop: 24, borderRadius: 14, background: '#111827', color: '#fff', border: 'none', height: 56, fontWeight: 950 }}>
          Launch My Portfolio <ChevronRight size={18} />
        </Btn>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#64748B', fontWeight: 650, margin: 0 }}>
            Already have an account?{' '}
            <button 
              type="button" 
              onClick={onBackToLogin}
              style={{ border: 'none', background: 'none', color: '#111827', fontWeight: 950, cursor: 'pointer', padding: '8px 4px', fontSize: 14 }}
            >
              Sign in
            </button>
          </p>
        </div>

        <div style={{ marginTop: 12, textAlign: 'center', paddingBottom: 20 }}>
          <button 
            type="button"
            onClick={() => window.location.href = '/'}
            style={{ border: 'none', background: 'none', color: '#64748B', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
          >
            ← Back to Homepage
          </button>
        </div>
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

        @media (max-width: 768px) {
          .apply-two-col,
          .apply-review-grid {
            grid-template-columns: 1fr;
            gap: 16px;
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
  mob: PropTypes.bool
};
