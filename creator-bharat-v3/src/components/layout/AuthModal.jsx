import React, { useEffect, useMemo, useState } from 'react';
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
  Users,
  X
} from 'lucide-react';
import { useApp } from '../../context';
import { LS } from '../../utils/helpers';
import { Modal, Btn, Fld } from '../Primitives';
import ApplyForm from '../apply/ApplyForm';

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

const CONTENT_MAX_HEIGHT = 'min(78vh, 760px)';

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
        minHeight: 620,
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
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #FF9431, #fff 48%, #128807)',
              display: 'grid',
              placeItems: 'center',
              color: '#0B1220',
              fontWeight: 900,
              fontSize: 13
            }}
          >
            CB
          </div>
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
              Secure demo access with role-aware dashboards.
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
        sub="Portfolio, applications, rates, wallet, and creator dashboard."
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
        sub="Register your brand and manage campaigns from a SaaS console."
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
        Already onboarded? Use the sign-in tab and choose Creator or Brand before login.
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
        <ModeButton active={isCreator} icon={User} title="Creator" sub="Dashboard, wallet, deals" color="#FF9431" onClick={() => setRole('creator')} />
        <ModeButton active={!isCreator} icon={Briefcase} title="Brand" sub="Campaign console" color="#10B981" onClick={() => setRole('brand')} />
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
      </form>
    </motion.div>
  );
};

const BrandRegisterView = ({ mob, onSuccess }) => {
  const { dsp } = useApp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    companyName: '',
    industry: '',
    email: '',
    contactName: '',
    password: '',
    about: ''
  });

  const up = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.companyName) nextErrors.companyName = 'Company name is required';
    if (!form.industry) nextErrors.industry = 'Industry is required';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Valid work email is required';
    if (!form.contactName) nextErrors.contactName = 'Contact name is required';
    if (!form.password || form.password.length < 6) nextErrors.password = 'Minimum 6 characters';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setTimeout(() => {
      const user = { ...form, id: 'b-' + Date.now(), role: 'brand' };
      LS.set('cb_brands', [...LS.get('cb_brands', []), user]);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brand console created' } });
      onSuccess(user);
      setLoading(false);
    }, 900);
  };

  return (
    <motion.form key="brand-register" onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
        <Fld label="Company name" value={form.companyName} onChange={e => up('companyName', e.target.value)} placeholder="Nykaa, boAt, local brand..." error={errors.companyName} required />
        <Fld label="Industry" value={form.industry} onChange={e => up('industry', e.target.value)} options={['', 'Beauty', 'Fashion', 'Tech', 'Food', 'Education', 'Finance', 'Real Estate']} error={errors.industry} required />
      </div>
      <Fld label="Work email" type="email" icon={Mail} value={form.email} onChange={e => up('email', e.target.value)} placeholder="team@company.com" error={errors.email} required />
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 0 : 14 }}>
        <Fld label="Contact person" value={form.contactName} onChange={e => up('contactName', e.target.value)} placeholder="Aman Deep" error={errors.contactName} required />
        <Fld label="Password" type="password" icon={Lock} value={form.password} onChange={e => up('password', e.target.value)} placeholder="Password" error={errors.password} required />
      </div>
      <Fld label="Campaign goal" rows={3} value={form.about} onChange={e => up('about', e.target.value)} placeholder="Tell us what kind of creators you want to work with." />
      <Btn full lg loading={loading} style={{ height: 56, borderRadius: 16, background: '#10B981', color: '#fff', border: 'none', fontWeight: 900 }}>
        Create Brand Console <ArrowRight size={18} />
      </Btn>
    </motion.form>
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

export default function AuthModal() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState(st.ui.authView || 'gateway');
  const [role, setRole] = useState(st.ui.authView === 'brand-register' ? 'brand' : 'creator');
  const [loading, setLoading] = useState(false);
  const [mob, setMob] = useState(globalThis.innerWidth < 760);

  useEffect(() => {
    const onResize = () => setMob(globalThis.innerWidth < 760);
    globalThis.addEventListener('resize', onResize);
    return () => globalThis.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (st.ui.authModal && st.ui.authView) {
      setView(st.ui.authView);
      if (st.ui.authView === 'brand-register') setRole('brand');
      if (st.ui.authView === 'register') setRole('creator');
    }
  }, [st.ui.authModal, st.ui.authView]);

  const copy = VIEW_COPY[view] || VIEW_COPY.gateway;
  const isBrandContext = role === 'brand' || view === 'brand-register';
  const themeColor = isBrandContext ? '#10B981' : '#FF9431';
  const modalWidth = view === 'register' || view === 'brand-register' ? 1060 : 980;

  const onClose = () => dsp({ t: 'UI', v: { authModal: false, authView: 'gateway' } });

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dsp({ t: 'LOGIN', u: { name: role === 'brand' ? 'Brand Team' : 'Aman Creator', id: role === 'brand' ? 'brand-demo' : 'creator-demo' }, role });
      onClose();
      navigate(role === 'brand' ? '/brand-dashboard' : '/dashboard');
      setLoading(false);
    }, 900);
  };

  const handleCreatorSuccess = (user) => {
    dsp({ t: 'LOGIN', u: user, role: 'creator' });
    onClose();
    navigate('/dashboard');
  };

  const handleBrandSuccess = (user) => {
    dsp({ t: 'LOGIN', u: user, role: 'brand' });
    onClose();
    navigate('/brand-dashboard');
  };

  const content = useMemo(() => {
    if (view === 'gateway') return <GatewayView setView={setView} setRole={setRole} />;
    if (view === 'login') return <LoginView role={role} setRole={setRole} onLogin={handleLogin} loading={loading} setView={setView} />;
    if (view === 'register') return <ApplyForm onSuccess={handleCreatorSuccess} onBackToLogin={() => setView('login')} />;
    if (view === 'brand-register') return <BrandRegisterView mob={mob} onSuccess={handleBrandSuccess} />;
    if (view === 'forgot') return <ForgotView setView={setView} />;
    return null;
  }, [view, role, loading, mob]);

  return (
    <Modal
      open
      onClose={onClose}
      hideHeader
      width={modalWidth}
      style={{ padding: 0 }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr' : '0.9fr 1.1fr',
          background: '#fff',
          borderRadius: 28,
          overflow: 'hidden',
          border: '1px solid rgba(226,232,240,0.9)'
        }}
      >
        <AuthSidePanel role={role} view={view} mob={mob} />
        <main style={{ padding: mob ? '22px 18px 24px' : '30px 34px 34px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 22 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: themeColor, marginBottom: 10 }}>
                <ShieldCheck size={17} />
                <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2 }}>Secure access</span>
              </div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", color: '#111827', fontSize: mob ? 27 : 34, lineHeight: 1.08, fontWeight: 900, letterSpacing: 0, marginBottom: 8 }}>
                {copy.title}
              </h1>
              <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6, fontWeight: 600, maxWidth: 520 }}>{copy.sub}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close auth"
              style={{ width: 40, height: 40, borderRadius: 14, border: '1px solid #E5E7EB', background: '#fff', color: '#64748B', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: '0 0 auto' }}
            >
              <X size={18} />
            </button>
          </div>

          {view !== 'gateway' && view !== 'forgot' && <ViewTabs view={view} setView={setView} />}

          <div style={{ maxHeight: mob ? 'none' : CONTENT_MAX_HEIGHT, overflowY: mob ? 'visible' : 'auto', paddingRight: mob ? 0 : 4 }}>
            <AnimatePresence mode="wait">{content}</AnimatePresence>
          </div>

          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 800 }}>No credit card needed for demo access.</p>
            <button type="button" onClick={() => setView(view === 'login' ? 'gateway' : 'login')} style={{ border: 'none', background: 'transparent', color: themeColor, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>
              {view === 'login' ? 'Choose another role' : 'Already have an account? Sign in'}
            </button>
          </div>
        </main>
      </div>
    </Modal>
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
