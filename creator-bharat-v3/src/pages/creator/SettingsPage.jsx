import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApp } from '@/core/context';
import { W, LS, fmt } from '../../utils/helpers';
import { Btn, Card, Fld, Empty, Bdg, Ring, Bar } from '@/components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Globe, 
  Wallet, 
  Shield, 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Zap,
  Lock
} from 'lucide-react';
import AuthGatekeeper from '@/components/auth/AuthGatekeeper';

const StepNavItem = ({ id, label, icon: Icon, active, completed, onClick }) => (
  <button
    onClick={onClick}
    className={`step-nav-item ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
  >
    <div className="step-nav-icon-box">
       {completed && !active ? <CheckCircle2 size={18} /> : <Icon size={18} />}
    </div>
    <span className="step-nav-label">
      {label}
    </span>
    {active && <ChevronRight size={16} className="active-chevron" style={{ opacity: 0.5, color: '#FFF' }} />}
  </button>
);

StepNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default function SettingsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [tab, setTab] = useState('identity');
  const c = st.creatorProfile;
  const [F, setF] = useState({ 
    name: c?.name || '', 
    bio: c?.bio || '', 
    city: c?.city || '', 
    state: c?.state || '', 
    instagram: c?.instagram || '', 
    youtube: c?.youtube || '', 
    rateMin: c?.rateMin || '', 
    rateMax: c?.rateMax || '',
    portfolio: c?.portfolio || ''
  });

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  // Auth Gatekeeper
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} />;
  }

  const saveProfile = () => {
    if (st.role === 'creator' && c) {
      dsp({ t: 'UPD_CP', id: c.id, patch: F });
      const allC = LS.get('cb_creators', []);
      const updated = allC.map(cr => cr.id === c.id ? { ...cr, ...F } : cr);
      LS.set('cb_creators', updated);
      toast('Profile synchronized with Bharat Cloud!', 'success');
    }
  };

  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };
  const score = c?.score || 85;

  return (
    <div className="dashboard-page-container">
      
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron">
           <Shield size={14} fill="#FF9431" /> SECURE CONSOLE
        </div>
        <h1 className="page-title">Profile Builder</h1>
        <p className="db-sub-text">Build your digital empire and unlock high-ticket brand deals.</p>
      </div>

      <div className="db-main-grid">
         
         {/* Sidebar Progression */}
         <div className="db-col-left">
            <Card className="settings-sidebar-card">
               <div className="card-header-center">
                  <p className="db-sidebar-label">Identity Strength</p>
                  <div className="ring-container">
                     <Ring score={score} size={140} strokeWidth={12} color="#FF9431" />
                  </div>
                  <Bdg color="saffron" lg>Elite Creator</Bdg>
               </div>

               <div className="progress-box">
                  <div className="progress-labels">
                     <span className="label">Completion</span>
                     <span className="value">{comp.pct}%</span>
                  </div>
                  <Bar value={comp.pct} color="#FF9431" height={6} />
               </div>

               <div className="tasks-box" style={{ marginTop: 32 }}>
                  <StepNavItem id="identity" label="Basic Identity" icon={User} active={tab === 'identity'} completed={!!(F.name && F.bio)} onClick={() => setTab('identity')} />
                  <StepNavItem id="ecosystem" label="Social Ecosystem" icon={Globe} active={tab === 'ecosystem'} completed={!!(F.instagram || F.youtube)} onClick={() => setTab('ecosystem')} />
                  <StepNavItem id="monetize" label="Commercials" icon={Wallet} active={tab === 'monetize'} completed={!!F.rateMin} onClick={() => setTab('monetize')} />
                  <StepNavItem id="security" label="Account Security" icon={Lock} active={tab === 'security'} completed={true} onClick={() => setTab('security')} />
               </div>
            </Card>

            {!mob && (
               <Card className="promo-card-dark" style={{ marginTop: 24, padding: 32, background: '#0F172A', color: '#FFF', borderRadius: 32 }}>
                  <div className="promo-header" style={{ marginBottom: 16 }}>
                     <Sparkles size={18} color="#FF9431" fill="#FF9431" />
                     <span style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase' }}>Pro Tip</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    Profiles with 90%+ completion are 5x more likely to be shortlisted by premium brands.
                  </p>
               </Card>
            )}
         </div>

         {/* Form Area */}
         <div className="db-col-right">
            <AnimatePresence mode="wait">
               {tab === 'identity' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="identity">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 1: Personal Identity</h3>
                      
                      <div className="profile-visual-box">
                         <div className="avatar-preview-wrap">
                            <img src={c?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}`} alt="" />
                         </div>
                         <div className="visual-actions">
                            <button className="btn-primary-pill">
                               <Camera size={14} /> Update Visual
                            </button>
                            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 600 }}>JPEG/PNG up to 2MB allowed.</p>
                         </div>
                      </div>

                      <div className="form-stack">
                         <Fld label="Full Name" value={F.name} onChange={e => upF('name', e.target.value)} placeholder="Amit Sharma" />
                         <Fld label="Cinematic Bio" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="I create high-impact tech reviews for regional India..." />
                         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                            <Fld label="Base City" value={F.city} onChange={e => upF('city', e.target.value)} placeholder="Jaipur" />
                            <Fld label="State / Region" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
                         </div>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Save Identity</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {tab === 'ecosystem' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="ecosystem">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 2: Social Ecosystem</h3>
                      <p className="db-sub-text" style={{ marginBottom: 40 }}>Link your active social channels. We use these to verify your audience reach and engagement metrics.</p>
                      
                      <div className="form-stack">
                         <div style={{ position: 'relative' }}>
                            <Fld label="Instagram Profile" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@username" />
                            {F.instagram && (
                               <div style={{ position: 'absolute', top: '48px', right: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#10B981', fontWeight: 800 }}>
                                  <CheckCircle2 size={14} /> Ready
                               </div>
                            )}
                         </div>
                         <Fld label="YouTube Channel Link" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="https://youtube.com/c/..." />
                         <Fld label="Portfolio / Website" value={F.portfolio} onChange={e => upF('portfolio', e.target.value)} placeholder="https://mywork.com" />
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('identity')} className="btn-text-slate">Previous Step</button>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Ecosystem</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {tab === 'monetize' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="monetize">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 3: Commercial Config</h3>
                      <p className="db-sub-text" style={{ marginBottom: 40 }}>Define your standard rates. Brands will use this to match their campaign budgets with your profile.</p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                         <Fld label="Min. Rate per Reel (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="5,000" />
                         <Fld label="Max. Rate per Reel (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="25,000" />
                      </div>

                      <div className="promo-box-saffron" style={{ padding: '24px', background: '#FFF9F2', borderRadius: '24px', border: '1px solid #FFEDD5', display: 'flex', gap: '16px' }}>
                         <Zap size={24} color="#FF9431" style={{ flexShrink: 0 }} />
                         <p style={{ fontSize: '14px', color: '#9A3412', fontWeight: 600, lineHeight: 1.5 }}>
                            <strong>Smart Pricing:</strong> We recommend keeping your minimum rate competitive to attract more startup brands from Tier 2 cities.
                         </p>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('ecosystem')} className="btn-text-slate">Previous Step</button>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Save Commercials</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {tab === 'security' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="security">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Account Security</h3>
                      
                      <div style={{ marginBottom: '40px' }}>
                         <p className="db-sidebar-label" style={{ marginBottom: 12 }}>Verified Credentials</p>
                         <div className="activity-item" style={{ padding: '20px 24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                               <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{st.user.email}</div>
                               <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 800, marginTop: '4px' }}>Primary Verification Email</div>
                            </div>
                            <CheckCircle2 size={24} color="#10B981" />
                         </div>
                      </div>

                      <div style={{ padding: '32px', background: '#FEF2F2', borderRadius: '32px', border: '1px solid #FECACA' }}>
                         <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#991B1B', marginBottom: '8px' }}>Danger Zone</h4>
                         <p style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '24px', lineHeight: 1.5 }}>
                            Permanently delete your identity, media kit, and application history from CreatorBharat. This action is irreversible.
                         </p>
                         <button className="btn-danger-lite">
                            TERMINATE IDENTITY
                         </button>
                      </div>
                   </Card>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>

      </div>
    </div>
  );
}
