import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApp } from '@/core/context';
import { W, LS, fmt } from '../../utils/helpers';
import { Btn, Card, Fld, Empty, Bdg, Ring, Bar } from '@/components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Globe, 
  Wallet, 
  Shield, 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Zap
} from 'lucide-react';

const StepNavItem = ({ id, label, icon: Icon, active, completed, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '16px 20px',
      borderRadius: '16px',
      background: active ? '#0f172a' : 'transparent',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'left'
    }}
  >
    <div style={{ 
      width: '32px', 
      height: '32px', 
      borderRadius: '10px', 
      background: (() => {
        if (active) return 'rgba(255,255,255,0.1)';
        if (completed) return 'rgba(16, 185, 129, 0.1)';
        return '#f1f5f9';
      })(), 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: (() => {
        if (active) return '#fff';
        if (completed) return '#10B981';
        return '#64748b';
      })()
    }}>
       {completed && !active ? <CheckCircle2 size={18} /> : <Icon size={18} />}
    </div>
    <span style={{ 
      fontSize: '14px', 
      fontWeight: active ? 800 : 600, 
      color: active ? '#fff' : '#475569',
      flex: 1
    }}>
      {label}
    </span>
    {active && <ChevronRight size={16} color="#fff" style={{ opacity: 0.5 }} />}
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

  if (!st.user) return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
      <Empty icon="🔒" title="Identity Required" sub="Settings change karne ke liye login kerna zaroori hai." ctaLabel="Login Now" onCta={() => navigate('/login')} />
    </div>
  );

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
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: mob ? '100px 20px 100px' : '120px 40px 100px' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
           <Shield size={14} fill="#FF9431" /> SECURE CONSOLE
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>Profile Builder</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>Build your digital empire and unlock high-ticket brand deals.</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '300px 1fr', gap: '48px' }}>
         
         {/* Sidebar Progression */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Card style={{ padding: '32px', borderRadius: '32px', background: '#fff', border: '1px solid #f1f5f9' }}>
               <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Identity Strength</p>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                     <Ring score={score} size={140} strokeWidth={12} color="#FF9431" />
                  </div>
                  <Bdg color="saffron">Elite Creator</Bdg>
               </div>

               <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>Completion</span>
                     <span style={{ fontSize: '14px', fontWeight: 900, color: '#FF9431' }}>{comp.pct}%</span>
                  </div>
                  <Bar value={comp.pct} color="#FF9431" height={6} />
               </div>

               <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <StepNavItem id="identity" label="Basic Identity" icon={User} active={tab === 'identity'} completed={F.name && F.bio} onClick={() => setTab('identity')} />
                  <StepNavItem id="ecosystem" label="Social Ecosystem" icon={Globe} active={tab === 'ecosystem'} completed={F.instagram || F.youtube} onClick={() => setTab('ecosystem')} />
                  <StepNavItem id="monetize" label="Commercials" icon={Wallet} active={tab === 'monetize'} completed={F.rateMin} onClick={() => setTab('monetize')} />
                  <StepNavItem id="security" label="Account Security" icon={Shield} active={tab === 'security'} completed={true} onClick={() => setTab('security')} />
               </div>
            </Card>

            {!mob && (
               <Card style={{ padding: '32px', borderRadius: '32px', background: '#0f172a', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
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
         <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <AnimatePresence mode="wait">
               {tab === 'identity' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="identity">
                   <Card style={{ padding: '48px', borderRadius: '40px' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 1: Personal Identity</h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px', padding: '24px', background: '#f8fafc', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                         <div style={{ width: '80px', height: '80px', borderRadius: '24px', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                            <img src={c?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                         </div>
                         <div>
                            <button style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                               <Camera size={14} /> Update Visual
                            </button>
                            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 600 }}>JPEG/PNG up to 2MB allowed.</p>
                         </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                         <Fld label="Full Name" value={F.name} onChange={e => upF('name', e.target.value)} placeholder="Amit Sharma" />
                         <Fld label="Cinematic Bio" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="I create high-impact tech reviews for regional India..." />
                         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                            <Fld label="Base City" value={F.city} onChange={e => upF('city', e.target.value)} placeholder="Jaipur" />
                            <Fld label="State / Region" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
                         </div>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
                         <Btn lg style={{ borderRadius: '100px', padding: '16px 48px', fontSize: '15px' }} onClick={saveProfile}>Save Identity</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {tab === 'ecosystem' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="ecosystem">
                   <Card style={{ padding: '48px', borderRadius: '40px' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 2: Social Ecosystem</h3>
                      <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px', lineHeight: 1.6 }}>Link your active social channels. We use these to verify your audience reach and engagement metrics.</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                         <div style={{ position: 'relative' }}>
                            <Fld label="Instagram Profile" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@username" />
                            <div style={{ position: 'absolute', top: '48px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#10B981', fontWeight: 800 }}>
                               <CheckCircle2 size={14} /> Ready to Sync
                            </div>
                         </div>
                         <Fld label="YouTube Channel Link" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="https://youtube.com/c/..." />
                         <Fld label="Portfolio / Website" value={F.portfolio} onChange={e => upF('portfolio', e.target.value)} placeholder="https://mywork.com" />
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('identity')} style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>Previous Step</button>
                         <Btn lg style={{ borderRadius: '100px', padding: '16px 48px', fontSize: '15px' }} onClick={saveProfile}>Sync Ecosystem</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {tab === 'monetize' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="monetize">
                   <Card style={{ padding: '48px', borderRadius: '40px' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 3: Commercial Config</h3>
                      <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px', lineHeight: 1.6 }}>Define your standard rates. Brands will use this to match their campaign budgets with your profile.</p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                         <Fld label="Min. Rate per Reel (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="5,000" />
                         <Fld label="Max. Rate per Reel (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="25,000" />
                      </div>

                      <div style={{ padding: '24px', background: '#FFF9F2', borderRadius: '24px', border: '1px solid #FFEDD5', display: 'flex', gap: '16px' }}>
                         <Zap size={24} color="#FF9431" style={{ flexShrink: 0 }} />
                         <p style={{ fontSize: '14px', color: '#9A3412', fontWeight: 600, lineHeight: 1.5 }}>
                            <strong>Smart Pricing:</strong> We recommend keeping your minimum rate competitive to attract more startup brands from Tier 2 cities.
                         </p>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('ecosystem')} style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>Previous Step</button>
                         <Btn lg style={{ borderRadius: '100px', padding: '16px 48px', fontSize: '15px' }} onClick={saveProfile}>Save Commercials</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {tab === 'security' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="security">
                   <Card style={{ padding: '48px', borderRadius: '40px' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Account Security</h3>
                      
                      <div style={{ marginBottom: '40px' }}>
                         <p style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>Verified Credentials</p>
                         <div style={{ padding: '20px 24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                         <button style={{ background: '#EF4444', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
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
