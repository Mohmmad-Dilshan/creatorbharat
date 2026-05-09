import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Phone,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context';
import { LS } from '../../utils/helpers';
import { Btn, Fld, Logo } from '../Primitives';
import ApplyForm from '../apply/ApplyForm';
import { INDIAN_STATES, MAJOR_CITIES, STATE_CITY_MAP } from '../../utils/geo';

const VIEW_COPY = {
  gateway: {
    title: 'Choose your workspace',
    sub: 'One secure CreatorBharat account for creators, brands, campaigns, and deal tracking.'
  },
  login: {
    title: 'Sign in to CreatorBharat',
    sub: 'Access your creator portfolio or brand campaign console.'
  },
  register: {
    title: 'Create your creator profile',
    sub: 'Build a verified creator workspace brands can trust.'
  },
  'brand-register': {
    title: 'Create your brand console',
    sub: 'Launch campaigns, discover creators, and manage collaborations from one dashboard.'
  },
  forgot: {
    title: 'Recover your account',
    sub: 'Enter your email and we will simulate secure recovery instructions.'
  }
};

const AuthSidePanel = ({ role, view, mob }) => {
  const isBrand = role === 'brand' || view === 'brand-register';
  const accent = isBrand ? '#10B981' : '#FF9431';
  const stats = isBrand
    ? [['500+', 'brand-ready creators'], ['42', 'active city clusters'], ['0%', 'middleman commission']]
    : [['10k+', 'creator profiles'], ['4.8x', 'better discovery'], ['24h', 'profile launch']];

  if (mob) return null;

  return (
    <aside
      style={{
        minHeight: 0,
        height: '100%',
        padding: 32,
        background: '#0B1220',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(255,148,49,0.18), transparent 38%), linear-gradient(315deg, rgba(16,185,129,0.16), transparent 42%)'
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
          <Logo iconOnly sm />
          <div>
            <p style={{ fontSize: 16, fontWeight: 900, letterSpacing: 0 }}>CreatorBharat</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>SaaS workspace</p>
          </div>
        </div>

        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 38, lineHeight: 1.05, fontWeight: 900, letterSpacing: 0, marginBottom: 16 }}>
          {isBrand ? 'Find local influence without messy spreadsheets.' : 'Turn your creator identity into a real business.'}
        </h2>
        <p style={{ maxWidth: 360, color: 'rgba(255,255,255,0.64)', fontSize: 15, lineHeight: 1.7, fontWeight: 500 }}>
          {isBrand
            ? 'A focused console for campaign briefs, creator shortlists, deal status, and performance clarity.'
            : 'A polished profile, campaign applications, wallet, analytics, and brand discovery in one place.'}
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 24,
            padding: 18,
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {stats.map(([num, label]) => (
              <div key={label} style={{ padding: '14px 10px', borderRadius: 16, background: 'rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 19, fontWeight: 900, color: accent }}>{num}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.58)', fontWeight: 700, lineHeight: 1.35 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
            <ShieldCheck size={18} color={accent} />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.68)', fontWeight: 700 }}>
              Secure access with local discovery identity.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const ModeButton = ({ active, icon: Icon, title, sub, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      border: `1.5px solid ${active ? color : '#E5E7EB'}`,
      background: active ? `${color}0F` : '#fff',
      borderRadius: 18,
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
      minHeight: 82,
      transition: 'all .2s ease'
    }}
  >
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        background: active ? color : '#F8FAFC',
        color: active ? '#fff' : color,
        flex: '0 0 auto'
      }}
    >
      <Icon size={20} />
    </div>
    <div>
      <p style={{ fontSize: 14, fontWeight: 900, color: '#111827', marginBottom: 3 }}>{title}</p>
      <p style={{ fontSize: 12, lineHeight: 1.45, color: '#64748B', fontWeight: 600 }}>{sub}</p>
    </div>
  </button>
);

const ViewTabs = ({ view, setView }) => {
  const tabs = [
    ['login', 'Sign in'],
    ['register', 'Creator signup'],
    ['brand-register', 'Brand register']
  ];

  return (
    <div style={{ display: 'flex', gap: 6, padding: 5, borderRadius: 16, background: '#F8FAFC', border: '1px solid #EEF2F7', marginBottom: 26 }}>
      {tabs.map(([id, label]) => {
        const active = view === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            style={{
              flex: 1,
              border: 'none',
              background: active ? '#fff' : 'transparent',
              color: active ? '#111827' : '#64748B',
              boxShadow: active ? '0 8px 20px rgba(15,23,42,0.08)' : 'none',
              borderRadius: 12,
              minHeight: 42,
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const GatewayView = ({ setView, setRole }) => (
  <motion.div key="gateway" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
    <div style={{ display: 'grid', gap: 14 }}>
      <ModeButton
        active
        icon={User}
        title="Creator workspace"
        sub="Portfolio, Articles, Podcasts and local discovery identity."
        color="#FF9431"
        onClick={() => {
          setRole('creator');
          setView('register');
        }}
      />
      <ModeButton
        active
        icon={Briefcase}
        title="Brand workspace"
        sub="Register your brand and manage campaigns with verified ROI."
        color="#10B981"
        onClick={() => {
          setRole('brand');
          setView('brand-register');
        }}
      />
    </div>
    <div style={{ marginTop: 24, padding: 18, borderRadius: 18, background: '#F8FAFC', border: '1px solid #EEF2F7', display: 'flex', gap: 12, alignItems: 'center' }}>
      <Sparkles size={20} color="#FF9431" />
      <p style={{ fontSize: 13, lineHeight: 1.55, color: '#475569', fontWeight: 650 }}>
        Join Bharat's most transparent creator ecosystem. Every local creator, every verified brand.
      </p>
    </div>
  </motion.div>
);

const LoginView = ({ role, setRole, onLogin, loading, setView }) => {
  const isCreator = role === 'creator';
  const themeColor = isCreator ? '#FF9431' : '#10B981';

  return (
    <motion.div key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
        <ModeButton active={isCreator} icon={User} title="Creator" sub="Hub access" color="#FF9431" onClick={() => setRole('creator')} />
        <ModeButton active={!isCreator} icon={Briefcase} title="Brand" sub="Brand console" color="#10B981" onClick={() => setRole('brand')} />
      </div>

      <form onSubmit={onLogin}>
        <Fld label="Email address" type="email" icon={Mail} placeholder="name@domain.com" required />
        <Fld label="Password" type="password" icon={Lock} placeholder="Password" required />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: -2, marginBottom: 20, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#64748B', fontWeight: 700, cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: themeColor, width: 16, height: 16 }} /> Remember me
          </label>
          <button type="button" onClick={() => setView('forgot')} style={{ border: 'none', background: 'transparent', color: themeColor, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>
            Forgot password?
          </button>
        </div>

        <Btn full lg loading={loading} style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 900 }}>
          Sign in as {isCreator ? 'Creator' : 'Brand'} <ArrowRight size={18} />
        </Btn>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
           <div style={{ flex: 1, height: 1, background: '#EEF2F7' }} />
           <span style={{ fontSize: 12, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Or continue with</span>
           <div style={{ flex: 1, height: 1, background: '#EEF2F7' }} />
        </div>

        <button 
          type="button"
          style={{ 
            width: '100%', height: 56, borderRadius: 16, border: '1px solid #E5E7EB', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer',
            fontSize: 14, fontWeight: 800, color: '#1f2937', transition: 'all .2s'
          }}
          onClick={() => {}}
        >
           <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
           </svg>
           Continue with Google
        </button>

        <button 
          type="button"
          style={{ 
            width: '100%', height: 56, borderRadius: 16, border: '1px solid #E5E7EB', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer',
            fontSize: 14, fontWeight: 800, color: '#1f2937', marginTop: 12, transition: 'all .2s'
          }}
          onClick={() => {}}
        >
           <Phone size={18} color="#111827" />
           Continue with Mobile No
        </button>
      </form>
    </motion.div>
  );
};

const BrandStep1 = ({ form, up, errors, mob, otpSent, verified, loading, sendOTP, verifyOTP, next, blur }) => (
  <div style={{ display: 'grid', gap: 2 }}>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
      <Fld label="Company name" value={form.companyName} onChange={e => up('companyName', e.target.value)} onBlur={() => blur('companyName')} placeholder="e.g. Nykaa, boAt..." error={errors.companyName} required />
      <Fld label="Industry" value={form.industry} onChange={e => up('industry', e.target.value)} onBlur={() => blur('industry')} options={['', 'Beauty', 'Fashion', 'Tech', 'Food', 'Finance', 'Other']} error={errors.industry} required />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
      <Fld label="Contact person" value={form.contactName} onChange={e => up('contactName', e.target.value)} onBlur={() => blur('contactName')} placeholder="Aman Deep" error={errors.contactName} required />
      <Fld label="Official Work Email" type="email" icon={Mail} value={form.email} onChange={e => up('email', e.target.value)} onBlur={() => blur('email')} placeholder="partnerships@company.com" error={errors.email} required />
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 10, alignItems: 'flex-end' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 10, alignItems: 'flex-end', animation: 'fadeIn .3s ease', marginBottom: 10 }}>
        <Fld label="4-digit OTP" type="number" value={form.otp} onChange={e => up('otp', e.target.value)} onBlur={() => blur('otp')} placeholder="1234" error={errors.otp} />
        <Btn onClick={verifyOTP} loading={loading && otpSent} style={{ marginBottom: 18, height: 52, borderRadius: 12, background: '#10B981', color: '#fff', border: 'none' }}>
          Verify OTP
        </Btn>
      </div>
    )}

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

BrandStep1.propTypes = {
  form: PropTypes.shape({
    companyName: PropTypes.string,
    industry: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    otp: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    contactName: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string
  }).isRequired,
  up: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    companyName: PropTypes.string,
    industry: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    otp: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    contactName: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool,
  otpSent: PropTypes.bool,
  verified: PropTypes.bool,
  loading: PropTypes.bool,
  sendOTP: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

const BrandStep2 = ({ form, up, errors, loading, setStep, blur }) => (
  <div style={{ display: 'grid', gap: 2 }}>
    <div style={{ padding: '16px 20px', background: 'rgba(16,185,129,0.06)', borderRadius: 16, border: '1px solid rgba(16,185,129,0.1)', marginBottom: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 800, color: '#10B981', lineHeight: 1.5 }}>
        🛡️ <strong>Elite Verification:</strong> To maintain platform quality, we only onboard authentic brands.
      </p>
    </div>
    <Fld label="Company Website" value={form.website} onChange={e => up('website', e.target.value)} onBlur={() => blur('website')} placeholder="https://www.company.com" error={errors.website} required />
    <Fld label="Official LinkedIn Page" value={form.linkedin} onChange={e => up('linkedin', e.target.value)} onBlur={() => blur('linkedin')} placeholder="linkedin.com/company/..." error={errors.linkedin} required />
    <Fld label="GSTIN / Business Registration ID (Optional)" value={form.gstin} onChange={e => up('gstin', e.target.value)} placeholder="27AAACR1234A1Z1" helper="Speeds up verification" />
    
    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
      <Btn variant="ghost" onClick={() => setStep(1)} style={{ flex: 0.5, borderRadius: 16 }}>Back</Btn>
      <Btn full lg loading={loading} style={{ flex: 1.5, height: 56, borderRadius: 16, background: '#10B981', color: '#fff', border: 'none', fontWeight: 900 }}>
        Complete Registration <ShieldCheck size={18} />
      </Btn>
    </div>
  </div>
);

BrandStep2.propTypes = {
  form: PropTypes.shape({
    website: PropTypes.string,
    linkedin: PropTypes.string,
    gstin: PropTypes.string
  }).isRequired,
  up: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    website: PropTypes.string,
    linkedin: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool,
  setStep: PropTypes.func.isRequired,
};

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

const BrandRegisterView = ({ mob, onSuccess }) => {
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
    if (!form.companyName) errs.companyName = 'Company name is required';
    if (!form.industry) errs.industry = 'Select industry';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid work email required';
    if (!verified) errs.phone = 'Please verify your phone number';
    if (!form.password || form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    
    setErrors(errs);
    if (!Object.keys(errs).length) setStep(2);
  };

  const sendOTP = () => {
    if (!form.phone || form.phone.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Enter valid 10-digit number' }));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
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
      const user = { ...form, id: 'b-' + Date.now(), role: 'brand' };
      LS.set('cb_brands', [...LS.get('cb_brands', []), user]);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brand verification initiated' } });
      onSuccess(user);
      setLoading(false);
    }, 1100);
  };

  return (
    <motion.div key="brand-reg" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
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
          />
        ) : (
          <BrandStep2 
            form={form} up={up} blur={blur} errors={errors} 
            loading={loading} setStep={setStep} 
          />
        )}
      </form>
    </motion.div>
  );
};

const ForgotView = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 800);
  };

  return (
    <motion.div key="forgot" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {sent ? (
        <div style={{ padding: 24, borderRadius: 20, background: '#F0FDF4', border: '1px solid #BBF7D0', textAlign: 'center' }}>
          <CheckCircle2 size={42} color="#10B981" />
          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginTop: 14, marginBottom: 8 }}>Recovery link sent</h3>
          <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, fontWeight: 600 }}>
            We sent demo recovery instructions to {email || 'your email'}.
          </p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <Fld label="Registered email" type="email" icon={Mail} value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" required />
          <Btn full lg loading={loading} style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 900 }}>
            Send reset link <RefreshCw size={18} />
          </Btn>
        </form>
      )}
      <button type="button" onClick={() => setView('login')} style={{ marginTop: 22, border: 'none', background: 'transparent', color: '#FF9431', fontWeight: 900, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <ArrowLeft size={16} /> Back to sign in
      </button>
    </motion.div>
  );
};

export function AuthContent({ initialView, onClose, isPage }) {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState(initialView || st.ui.authView || 'gateway');
  const [role, setRole] = useState(initialView === 'brand-register' ? 'brand' : 'creator');
  const [loading, setLoading] = useState(false);
  const [mob, setMob] = useState(globalThis.innerWidth < 760);

  useEffect(() => {
    const onResize = () => setMob(globalThis.innerWidth < 760);
    globalThis.addEventListener('resize', onResize);
    return () => globalThis.removeEventListener('resize', onResize);
  }, []);

  const copy = VIEW_COPY[view] || VIEW_COPY.gateway;
  const isBrandContext = role === 'brand' || view === 'brand-register';
  const themeColor = isBrandContext ? '#10B981' : '#FF9431';

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dsp({ t: 'LOGIN', u: { name: role === 'brand' ? 'Brand Team' : 'Aman Creator', id: role === 'brand' ? 'brand-demo' : 'creator-demo' }, role });
      if (onClose) onClose();
      navigate(role === 'brand' ? '/brand-dashboard' : '/dashboard');
      setLoading(false);
    }, 900);
  };

  const handleCreatorSuccess = (user) => {
    dsp({ t: 'LOGIN', u: user, role: 'creator' });
    if (onClose) onClose();
    navigate('/dashboard');
  };

  const handleBrandSuccess = (user) => {
    dsp({ t: 'LOGIN', u: user, role: 'brand' });
    if (onClose) onClose();
    navigate('/brand-dashboard');
  };

  const content = useMemo(() => {
    switch (view) {
      case 'gateway': return <GatewayView setView={setView} setRole={setRole} />;
      case 'login': return <LoginView role={role} setRole={setRole} onLogin={handleLogin} loading={loading} setView={setView} />;
      case 'register': return <ApplyForm onSuccess={handleCreatorSuccess} onBackToLogin={() => setView('login')} />;
      case 'brand-register': return <BrandRegisterView mob={mob} onSuccess={handleBrandSuccess} />;
      case 'forgot': return <ForgotView setView={setView} />;
      default: return null;
    }
  }, [view, role, loading, mob]);

  const getContainerStyles = () => {
    let height = '86vh';
    if (mob) {
      height = 'auto';
    } else if (isPage) {
      height = 'clamp(640px, 86vh, 800px)';
    }

    return {
      display: 'grid',
      gridTemplateColumns: mob ? '1fr' : '0.9fr 1.1fr',
      height,
      maxHeight: mob ? 'none' : '86vh',
      background: '#fff',
      borderRadius: isPage ? 40 : 28,
      overflow: 'hidden',
      border: isPage ? '1px solid #e2e8f0' : 'none',
      boxShadow: isPage ? '0 40px 100px rgba(0,0,0,0.06)' : 'none'
    };
  };

  return (
    <div style={getContainerStyles()}>
      <AuthSidePanel role={role} view={view} mob={mob} />
      <main style={{ padding: mob ? '22px 18px 24px' : '24px 30px 24px', minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: mob ? 20 : 16, flex: '0 0 auto' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: themeColor, marginBottom: 10 }}>
              <ShieldCheck size={17} />
              <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2 }}>Secure access</span>
            </div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", color: '#111827', fontSize: mob ? 27 : 30, lineHeight: 1.08, fontWeight: 900, letterSpacing: 0, marginBottom: 6 }}>
              {copy.title}
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6, fontWeight: 600, maxWidth: 520 }}>{copy.sub}</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close auth"
              style={{ width: 40, height: 40, borderRadius: 14, border: '1px solid #E5E7EB', background: '#fff', color: '#64748B', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: '0 0 auto' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div style={{ flex: '0 0 auto' }}>
          {view !== 'gateway' && view !== 'forgot' && <ViewTabs view={view} setView={setView} />}
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: mob ? 0 : 6, height: '100%' }}>
          <AnimatePresence mode="wait">{content}</AnimatePresence>
        </div>

        <div style={{ marginTop: mob ? 22 : 14, paddingTop: mob ? 18 : 12, borderTop: '1px solid #EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', flex: '0 0 auto' }}>
          <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 800 }}>No credit card needed for demo access.</p>
          <button type="button" onClick={() => setView(view === 'login' ? 'gateway' : 'login')} style={{ border: 'none', background: 'transparent', color: themeColor, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>
            {view === 'login' ? 'Choose another role' : 'Already have an account? Sign in'}
          </button>
        </div>
      </main>
    </div>
  );
}

AuthSidePanel.propTypes = {
  role: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  mob: PropTypes.bool.isRequired
};

ModeButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

ViewTabs.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired
};

GatewayView.propTypes = {
  setView: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired
};

LoginView.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setView: PropTypes.func.isRequired
};

BrandRegisterView.propTypes = {
  mob: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired
};

ForgotView.propTypes = {
  setView: PropTypes.func.isRequired
};

AuthContent.propTypes = {
  initialView: PropTypes.string,
  onClose: PropTypes.func,
  isPage: PropTypes.bool
};
