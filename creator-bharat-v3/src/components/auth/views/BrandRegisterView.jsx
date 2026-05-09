import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Btn, Fld } from '../../Primitives.jsx';
import { useApp } from '../../../context.jsx';
import { LS } from '../../../utils/storage.js';
import { INDIAN_STATES, STATE_CITY_MAP, MAJOR_CITIES } from '../../../utils/geo.js';

const PhoneVerifySection = ({ form, up, blur, errors, mob, otpSent, verified, loading, sendOTP, verifyOTP, timer }) => {
  const isInactive = otpSent || timer > 0;
  const btnBackground = isInactive ? '#F8FAFC' : '#111827';
  const btnColor = isInactive ? '#64748B' : '#fff';
  const btnBorder = isInactive ? '1px solid #E2E8F0' : 'none';
  const btnCursor = timer > 0 ? 'not-allowed' : 'pointer';
  
  let btnLabel = 'Send OTP';
  if (timer > 0) btnLabel = `Resend in ${timer}s`;
  else if (otpSent) btnLabel = 'Resend';

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.4fr 0.6fr', gap: 10, alignItems: 'flex-end' }}>
        <Fld 
          label="Official Phone" 
          type="tel" 
          icon={Phone} 
          value={form.phone} 
          onChange={e => {
            const val = e.target.value.replaceAll(/\D/g, '');
            if (val.length <= 10) up('phone', val);
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
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 0.8fr', gap: 10, alignItems: 'flex-end', animation: 'fadeIn .3s ease', marginBottom: 10 }}>
          <Fld label="4-digit OTP" type="number" value={form.otp} onChange={e => up('otp', e.target.value)} onBlur={() => blur('otp')} placeholder="1234" error={errors.otp} />
          <Btn onClick={verifyOTP} loading={loading && otpSent} style={{ marginBottom: 18, height: 52, borderRadius: 12, background: '#10B981', color: '#fff', border: 'none' }}>
            Verify OTP
          </Btn>
        </div>
      )}
    </>
  );
};

const BrandStep1 = ({ form, up, errors, mob, otpSent, verified, loading, sendOTP, verifyOTP, next, blur, timer }) => (
  <div style={{ display: 'grid', gap: 2 }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
      <Fld label="Company name" value={form.companyName} onChange={e => up('companyName', e.target.value)} onBlur={() => blur('companyName')} placeholder="e.g. Nykaa, boAt..." error={errors.companyName} required />
      <Fld label="Industry" value={form.industry} onChange={e => up('industry', e.target.value)} onBlur={() => blur('industry')} options={['', 'Beauty', 'Fashion', 'Tech', 'Food', 'Finance', 'Other']} error={errors.industry} required />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
      <Fld label="Contact person" value={form.contactName} onChange={e => up('contactName', e.target.value)} onBlur={() => blur('contactName')} placeholder="Aman Deep" error={errors.contactName} required />
      <Fld label="Official Work Email" type="email" icon={Mail} value={form.email} onChange={e => up('email', e.target.value)} onBlur={() => blur('email')} placeholder="partnerships@company.com" error={errors.email} required />
    </div>
    
    <PhoneVerifySection 
      form={form} up={up} blur={blur} errors={errors} mob={mob}
      otpSent={otpSent} verified={verified} loading={loading}
      sendOTP={sendOTP} verifyOTP={verifyOTP} timer={timer}
    />

    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
      <Fld label="State" value={form.state} onChange={e => up('state', e.target.value)} options={INDIAN_STATES} required />
      <Fld label="City / District" value={form.city} icon={MapPin} onChange={e => up('city', e.target.value)} options={STATE_CITY_MAP[form.state] || MAJOR_CITIES} required />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
      <Fld label="Password" type="password" icon={Lock} value={form.password} onChange={e => up('password', e.target.value)} onBlur={() => blur('password')} placeholder="••••••" error={errors.password} required />
      <Fld label="Confirm Password" type="password" icon={Lock} value={form.confirmPassword} onChange={e => up('confirmPassword', e.target.value)} onBlur={() => blur('confirmPassword')} placeholder="••••••" error={errors.confirmPassword} required />
    </div>
    <Btn full lg onClick={next} type="button" style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 900, marginTop: 10 }}>
      Continue to Verification <ArrowRight size={18} />
    </Btn>
  </div>
);

const BrandStep2 = ({ form, up, errors, loading, setStep, blur, mob }) => (
  <div style={{ display: 'grid', gap: 2 }}>
    <div style={{ padding: '16px 20px', background: 'rgba(16,185,129,0.06)', borderRadius: 16, border: '1px solid rgba(16,185,129,0.1)', marginBottom: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 800, color: '#10B981', lineHeight: 1.5 }}>
        🛡️ <strong>Elite Verification:</strong> To maintain platform quality, we only onboard authentic brands.
      </p>
    </div>
    <Fld label="Company Website" value={form.website} onChange={e => up('website', e.target.value)} onBlur={() => blur('website')} placeholder="https://www.company.com" error={errors.website} required />
    <Fld label="Official LinkedIn Page" value={form.linkedin} onChange={e => up('linkedin', e.target.value)} onBlur={() => blur('linkedin')} placeholder="linkedin.com/company/..." error={errors.linkedin} required />
    <Fld label="GSTIN / Business Registration ID (Optional)" value={form.gstin} onChange={e => up('gstin', e.target.value)} placeholder="27AAACR1234A1Z1" helper="Speeds up verification" />
    
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
      <Btn variant="ghost" onClick={() => setStep(1)} style={{ flex: mob ? '1 1 100%' : 0.5, borderRadius: 16 }}>Back</Btn>
      <Btn full lg loading={loading} style={{ flex: mob ? '1 1 100%' : 1.5, height: 56, borderRadius: 16, background: '#10B981', color: '#fff', border: 'none', fontWeight: 900 }}>
        Complete Registration <ShieldCheck size={18} />
      </Btn>
    </div>
  </div>
);

const validateBrandField = (key, val, form) => {
  const rules = {
    companyName: v => v ? null : 'Company name is required',
    industry: v => v ? null : 'Select industry',
    email: v => /^\S+@\S+\.\S+$/.test(v || '') ? null : 'Valid work email required',
    password: v => (v?.length >= 6) ? null : 'Min 6 characters',
    confirmPassword: v => v === form?.password ? null : 'Passwords do not match',
    phone: v => (v?.length === 10) ? null : 'Enter valid 10-digit number',
    website: v => v?.includes('.') ? null : 'Valid website required',
    linkedin: v => v ? null : 'LinkedIn profile is required'
  };
  return rules[key]?.(val) ?? null;
};

const BrandRegisterView = ({ mob, setView, onSuccess }) => {
  const { dsp } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    companyName: '',
    industry: '',
    email: '',
    contactName: '',
    password: '',
    confirmPassword: '',
    phone: '',
    otp: '',
    website: '',
    linkedin: '',
    gstin: '',
    about: '',
    state: 'Maharashtra',
    city: 'Mumbai'
  });

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const up = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'state') {
        const availableCities = STATE_CITY_MAP[value] || MAJOR_CITIES;
        next.city = availableCities[0];
      }
      return next;
    });
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const blur = (key) => {
    const err = validateBrandField(key, form[key], form);
    if (err) setErrors(prev => ({ ...prev, [key]: err }));
  };

  const next = () => {
    const errs = {};
    Object.keys(form).forEach(k => {
      const e = validateBrandField(k, form[k], form);
      if (e) errs[k] = e;
    });
    if (!verified) errs.phone = 'Please verify your phone number';
    
    setErrors(errs);
    if (!Object.keys(errs).filter(k => !['website', 'linkedin'].includes(k)).length) setStep(2);
  };

  const sendOTP = () => {
    if (form.phone.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Enter valid 10-digit number' }));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setTimer(30);
      setLoading(false);
      setErrors(prev => ({ ...prev, phone: null }));
      dsp({ t: 'TOAST', d: { type: 'info', msg: 'Demo OTP is 1234' } });
    }, 800);
  };

  const verifyOTP = () => {
    if (form.otp !== '1234') {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Invalid OTP. Please use 1234' } });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setLoading(false);
      setErrors(prev => ({ ...prev, otp: null }));
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Phone verified successfully' } });
    }, 800);
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.website?.includes('.')) errs.website = 'Valid website required';
    if (!form.linkedin) errs.linkedin = 'LinkedIn profile is required for verification';
    
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulation: Already exists check
      if (form.email === 'exist@test.com') {
        dsp({ t: 'TOAST', d: { type: 'error', msg: 'Email already registered. Please login instead.' } });
        return;
      }

      const user = { ...form, id: 'b-' + Date.now(), role: 'brand' };
      LS.set('cb_brands', [...LS.get('cb_brands', []), user]);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brand verification initiated' } });
      onSuccess(user);
    }, 1100);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ position: 'relative' }}>
      <button 
        type="button"
        onClick={() => setView('gateway')}
        style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: '#64748B', zIndex: 10 }}
      >
        ← BACK
      </button>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 22 : 28, fontWeight: 950, color: '#111827', marginBottom: 6, letterSpacing: '-0.5px' }}>Brand Console</h2>
        <p style={{ color: '#64748B', fontSize: 14, fontWeight: 650 }}>Register your brand and start collaborating with creators.</p>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: 5, borderRadius: 16, background: '#F8FAFC', border: '1px solid #EEF2F7', marginBottom: 26 }}>
        {[1, 2].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? '#10B981' : '#E5E7EB', transition: 'all .3s' }} />
        ))}
      </div>

      <form onSubmit={submit}>
        {step === 1 ? (
          <BrandStep1 
            form={form} up={up} blur={blur} errors={errors} mob={mob} 
            otpSent={otpSent} verified={verified} loading={loading}
            sendOTP={sendOTP} verifyOTP={verifyOTP} next={next}
            timer={timer}
          />
        ) : (
          <BrandStep2 
            form={form} up={up} blur={blur} errors={errors} 
            loading={loading} setStep={setStep} mob={mob} 
          />
        )}
      </form>
      <div style={{ marginTop: 24, textAlign: 'center', paddingBottom: 20 }}>
        <p style={{ fontSize: 14, color: '#64748B', fontWeight: 650, margin: 0 }}>
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={() => setView('login')} 
            style={{ border: 'none', background: 'none', color: '#111827', fontWeight: 950, cursor: 'pointer', padding: '8px 4px', fontSize: 14 }}
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

BrandRegisterView.propTypes = {
  mob: PropTypes.bool,
  setView: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

BrandStep1.propTypes = {
  form: PropTypes.object.isRequired,
  up: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  otpSent: PropTypes.bool,
  verified: PropTypes.bool,
  loading: PropTypes.bool,
  sendOTP: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  timer: PropTypes.number
};

BrandStep2.propTypes = {
  form: PropTypes.object.isRequired,
  up: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setStep: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

PhoneVerifySection.propTypes = {
  form: PropTypes.object.isRequired,
  up: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  otpSent: PropTypes.bool,
  verified: PropTypes.bool,
  loading: PropTypes.bool,
  sendOTP: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func.isRequired,
  timer: PropTypes.number
};

export default BrandRegisterView;
