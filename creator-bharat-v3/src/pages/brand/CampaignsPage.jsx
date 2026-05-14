import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, CheckCircle2, Search, 
  Globe, Users, Calendar, MapPin, Layers
} from 'lucide-react';

// Custom Social Icons

import { useApp } from '@/core/context';
import { fmt, LS } from '../../utils/helpers';
import { fetchCampaigns } from '../../utils/platformService';
import { Btn, SkeletonCard, Empty, Modal, Fld } from '@/components/common/Primitives';
import EliteHeader from '../../components/layout/EliteHeader';

// ----------------------------------------------------------------------
// 1. BRAND TOKENS
// ----------------------------------------------------------------------

const THEME = {
  primary: '#FF9431',
  dark: '#0f172a',
  success: '#10B981',
  blue: '#3B82F6',
  pink: '#E1306C',
  radius: '32px',
  shadow: '0 40px 100px rgba(0,0,0,0.22)',
  border: '1px solid rgba(15, 23, 42, 0.08)'
};

const COVERS = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
];

// ----------------------------------------------------------------------
// 2. ELITE COMPONENTS
// ----------------------------------------------------------------------

const GuideLandingCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    style={{ background: `linear-gradient(135deg, ${THEME.dark} 0%, #1e293b 100%)`, borderRadius: THEME.radius, padding: isMob ? '32px' : '48px', color: '#fff', gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: isMob ? 'column' : 'row', alignItems: 'center', gap: '40px', boxShadow: THEME.shadow }}
  >
    <div style={{ position: 'absolute', right: '-5%', bottom: '-5%', opacity: 0.1 }}><Globe size={300} /></div>
    <div style={{ zIndex: 1, flex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 900, letterSpacing: '4px', fontSize: '12px', marginBottom: '24px' }}>DISCOVERY GUIDE</div>
       <h2 style={{ fontSize: isMob ? '28px' : '44px', fontWeight: 950, lineHeight: 1.1, marginBottom: '24px' }}>Earn from India's <br/> <span style={{ color: THEME.primary }}>Top Brands</span></h2>
       <p style={{ opacity: 0.7, fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>Browse deals, pitch your vision, and get paid. Join 10,000+ creators who are scaling their careers with CreatorBharat.</p>
       <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 950 }}>1</div><span style={{ fontSize: '13px', fontWeight: 800 }}>Explore</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 950 }}>2</div><span style={{ fontSize: '13px', fontWeight: 800 }}>Pitch</span></div>
       </div>
    </div>
    {!isMob && (
      <div style={{ flex: 0.8 }}>
         <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: THEME.success }} /> <span style={{ fontWeight: 800 }}>Marketplace Secure</span></div>
            <div style={{ fontSize: '13px', opacity: 0.6 }}>Every brand campaign is verified for budget and deliverables.</div>
         </div>
      </div>
    )}
  </motion.div>
);

const EliteDealCard = ({ campaign, index, onApply, isMob, onDetails, isGuest }) => {
  const cover = COVERS[index % COVERS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', borderRadius: THEME.radius, overflow: 'hidden', boxShadow: hovered ? THEME.shadow : '0 10px 40px rgba(0,0,0,0.05)', border: THEME.border, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
      onClick={() => onDetails(campaign)}
    >
      <div style={{ position: 'relative', height: isMob ? '220px' : '260px', overflow: 'hidden' }}>
        <motion.img src={cover} animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.8 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(15, 23, 42, 0.95) 100%)' }} />
        <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '10px' }}>
           <div style={{ background: THEME.primary, color: '#fff', padding: '8px 16px', borderRadius: '12px', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={14} fill='#fff' /> EXCLUSIVE</div>
        </div>
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: '24px', color: THEME.dark }}>{campaign.brand?.companyName?.[0] || 'B'}</div>
           <div><div style={{ fontSize: '16px', fontWeight: 950, color: '#fff' }}>{campaign.brand?.companyName || 'Elite Brand'}</div><div style={{ fontSize: '11px', color: THEME.success, fontWeight: 900 }}>VERIFIED</div></div>
        </div>
      </div>
      <div style={{ padding: isMob ? '24px' : '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: isMob ? '20px' : '24px', fontWeight: 950, color: THEME.dark, marginBottom: '20px', lineHeight: 1.2 }}>{campaign.title}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
           <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '16px' }}><div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 900 }}>REACH</div><div style={{ fontSize: '14px', fontWeight: 900 }}>50K+</div></div>
           <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '16px' }}><div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 900 }}>ROI</div><div style={{ fontSize: '14px', fontWeight: 900 }}>High</div></div>
        </div>
        <div style={{ background: hovered ? THEME.dark : '#f8fafc', borderRadius: '28px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', transition: '0.3s' }}>
           <div><div style={{ fontSize: '10px', color: hovered ? 'rgba(255,255,255,0.4)' : '#94a3b8', fontWeight: 900 }}>PAYOUT</div><div style={{ fontSize: '24px', fontWeight: 950, color: hovered ? '#fff' : THEME.dark }}>{fmt.inr(campaign.budgetMax)}</div></div>
           <Btn lg onClick={(e) => { e.stopPropagation(); onApply(campaign); }} style={{ background: hovered ? THEME.primary : THEME.dark, color: '#fff', border: 'none', fontWeight: 950 }}>{isGuest ? 'Unlock' : 'Apply Now'}</Btn>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 3. ELITE SUB-COMPONENTS
// ----------------------------------------------------------------------

const FilterBar = ({ mob, cpf, dsp, viewMode, setViewMode }) => (
  <div style={{ width: '100%', background: '#fff', borderBottom: '1px solid #f1f5f9', padding: mob ? '20px' : '48px 20px', position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={{ maxWidth: '1250px', margin: '0 auto', display: 'flex', gap: '20px', flexDirection: mob ? 'column' : 'row', alignItems: 'center' }}>
       <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '50px', padding: '14px 32px', border: '1px solid #f1f5f9' }}>
          <Search size={22} color={THEME.primary} style={{ marginRight: '16px' }} />
          <input value={cpf.q || ''} onChange={e => dsp({ t: 'CPF', v: { q: e.target.value } })} placeholder='Search elite campaigns...' style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontWeight: 700, fontSize: '18px' }} />
       </div>
       <div style={{ display: 'flex', background: 'rgba(15,23,42,0.04)', padding: '6px', borderRadius: '50px' }}>
          <button onClick={() => setViewMode('grid')} style={{ padding: '14px 40px', borderRadius: '44px', border: 'none', background: viewMode === 'grid' ? '#fff' : 'transparent', fontWeight: 950, color: viewMode === 'grid' ? THEME.dark : '#64748b' }}>Grid</button>
          <button onClick={() => setViewMode('swipe')} style={{ padding: '14px 40px', borderRadius: '44px', border: 'none', background: viewMode === 'swipe' ? '#fff' : 'transparent', fontWeight: 950, color: viewMode === 'swipe' ? THEME.dark : '#64748b' }}>Swipe</button>
       </div>
    </div>
  </div>
);

const CampaignDetailsModal = ({ open, campaign, onClose, onApply, isMob, isGuest }) => (
  <Modal open={open} title='Campaign Intelligence' onClose={onClose} width={800}>
    {campaign && (
      <div style={{ display: 'flex', flexDirection: isMob ? 'column' : 'row', gap: '40px', padding: '20px' }}>
        <div style={{ flex: 1 }}>
           <img src={COVERS[0]} alt="Campaign Cover" style={{ width: '100%', height: '200px', borderRadius: '24px', objectFit: 'cover', marginBottom: '24px' }} />
           <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><Users size={20} color={THEME.blue} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>TARGET</div><div style={{ fontWeight: 950 }}>18-35</div></div>
              <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><MapPin size={20} color={THEME.primary} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>REGION</div><div style={{ fontWeight: 950 }}>India</div></div>
              <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><Layers size={20} color={THEME.success} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>NICHE</div><div style={{ fontWeight: 950 }}>Tech</div></div>
           </div>
           <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '16px' }}>Campaign Brief</h3>
           <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '15px' }}>{campaign.title}. The brand is looking for authentic storytelling. Submission deadline is strict. Ensure high-quality lighting and clear audio for video deliverables.</p>
        </div>
        <div style={{ flex: 0.6, background: '#f8fafc', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9' }}>
           <h4 style={{ fontWeight: 950, fontSize: '18px', marginBottom: '24px' }}>Deliverables</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: THEME.primary, borderRadius: '50%' }} /> <div style={{ fontSize: '14px', fontWeight: 700 }}>1x Instagram Reel</div></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: THEME.primary, borderRadius: '50%' }} /> <div style={{ fontSize: '14px', fontWeight: 700 }}>2x Story Sets</div></div>
           </div>
           <div style={{ height: '1px', background: '#e2e8f0', margin: '32px 0' }} />
           <h4 style={{ fontWeight: 950, fontSize: '18px', marginBottom: '24px' }}>Timeline</h4>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Calendar size={16} color={THEME.primary} /> <span style={{ fontSize: '14px', fontWeight: 700 }}>Starts: Next Week</span></div>
           <Btn full lg style={{ marginTop: '40px' }} onClick={() => onApply(campaign)}>{isGuest ? 'Unlock to Apply' : 'Apply Now'}</Btn>
        </div>
      </div>
    )}
  </Modal>
);

const CampaignApplyModal = ({ open, isDone, onClose, form, setForm, onSubmit, mob }) => (
  <Modal open={open} title='Submit Pitch' onClose={onClose} width={650}>
    {isDone ? (
      <div style={{ textAlign: 'center', padding: '80px 40px' }}>
        <div style={{ width: '100px', height: '100px', background: 'rgba(16,185,129,0.1)', color: THEME.success, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}><CheckCircle2 size={48} /></div>
        <h3 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '16px' }}>Pitch Sent!</h3>
        <Btn full lg onClick={onClose}>Back to Discovery</Btn>
      </div>
    ) : (
      <div style={{ padding: '20px' }}>
         <Fld label='Elite Pitch Proposal *' value={form.pitch} onChange={e => setForm(p => ({ ...p, pitch: e.target.value }))} rows={5} placeholder='How will you add value?' />
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '32px', marginTop: '32px' }}>
            <Fld label='Proposed Rate (₹)' type='number' value={form.rate} onChange={e => setForm(p => ({ ...p, rate: e.target.value }))} />
            <Fld label='Portfolio' value={form.portfolio} onChange={e => setForm(p => ({ ...p, portfolio: e.target.value }))} />
         </div>
         <Btn full lg style={{ marginTop: '56px', height: '72px', borderRadius: '24px', fontSize: '18px' }} onClick={onSubmit}>Submit Pitch 🚀</Btn>
      </div>
    )}
  </Modal>
);

// ----------------------------------------------------------------------
// 4. PAGE MASTER
// ----------------------------------------------------------------------

export default function CampaignsPage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [viewMode, setViewMode] = useState('grid');
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(null);
  const [applyModal, setApplyModal] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [form, setForm] = useState({ pitch: '', portfolio: '', rate: '' });

  const { cpf, user } = st;
  const isGuest = !user;

  useEffect(() => {
    const handle = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', handle);
    setLoading(true);
    fetchCampaigns({ limit: 100 }).then(res => { setData(res); setLoading(false); }).catch(() => setLoading(false));
    return () => globalThis.removeEventListener('resize', handle);
  }, []);

  const filtered = useMemo(() => {
    return data.filter(it => {
      const q = (cpf.q || '').toLowerCase();
      if (q && !(it.title || '').toLowerCase().includes(q) && !(typeof it.brand === 'object' ? it.brand.companyName : (it.brand || '')).toLowerCase().includes(q)) return false;
      if (cpf.niche && !(Array.isArray(it.niche) ? it.niche : [it.niche]).includes(cpf.niche)) return false;
      return true;
    });
  }, [data, cpf.q, cpf.niche]);

  const onApply = (it) => {
    if (isGuest) return navigate('/login');
    setApplyModal(it); setDetailsModal(null); setIsDone(false); setForm({ pitch: '', portfolio: '', rate: '' });
  };

  const onSubmit = (target) => {
    if (!user) return navigate('/login');
    LS.push('cb_applications', { id: `app-${Date.now()}`, campaignId: target?.id, date: new Date().toISOString() });
    dsp({ t: 'APPLY', id: target?.id }); setIsDone(true);
    dsp({ t: 'TOAST', d: { type: 'success', msg: `Applied for ${target?.title}` } });
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <EliteHeader light compact={viewMode === 'swipe'} title={
        <div style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: mob ? '11px' : '14px', fontWeight: 900, color: THEME.primary, letterSpacing: '6px', marginBottom: '20px' }}>INDIA'S ELITE DEALS FLOW</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: mob ? '48px' : '100px', fontWeight: 950, color: THEME.dark, letterSpacing: '-0.06em', lineHeight: 0.85 }}>DISCOVERY</motion.h1>
        </div>
      } />

      <FilterBar mob={mob} cpf={cpf} dsp={dsp} viewMode={viewMode} setViewMode={setViewMode} />

      <div style={{ maxWidth: '1250px', margin: '0 auto', padding: mob ? '40px 20px 120px' : '80px 40px 120px' }}>
        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '50px' }}>
             {/* RESTORED GUIDE CARD */}
             <GuideLandingCard isMob={mob} />

             {loading ? [1, 2, 3].map(it => <SkeletonCard key={it} />) : 
              filtered.map((it, idx) => (
                <EliteDealCard key={it.id} campaign={it} index={idx} isGuest={isGuest} onApply={onApply} isMob={mob} onDetails={setDetailsModal} />
              ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0' }}>
             <div style={{ position: 'relative', width: mob ? '100%' : '480px', height: '660px' }}>
                <AnimatePresence>
                  {filtered.slice(swipeIdx, swipeIdx + 2).reverse().map((it, idx) => (
                    <motion.div key={it.id} style={{ position: 'absolute', width: '100%', height: '100%' }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                       <EliteDealCard campaign={it} index={idx} isGuest={isGuest} onApply={onApply} isMob={mob} onDetails={setDetailsModal} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {swipeIdx >= filtered.length && <div style={{ textAlign: 'center', padding: '100px 0' }}><Empty title='No more deals' onCta={() => setSwipeIdx(0)} /></div>}
             </div>
          </div>
        )}
      </div>

      <CampaignDetailsModal 
        open={!!detailsModal} 
        campaign={detailsModal} 
        onClose={() => setDetailsModal(null)} 
        onApply={onApply} 
        isMob={mob} 
        isGuest={isGuest} 
      />

      <CampaignApplyModal 
        open={!!applyModal} 
        isDone={isDone} 
        onClose={() => setApplyModal(null)} 
        form={form} 
        setForm={setForm} 
        onSubmit={() => onSubmit(applyModal)} 
        mob={mob} 
      />
    </div>
  );
}

EliteDealCard.propTypes = { campaign: PropTypes.object, index: PropTypes.number, onApply: PropTypes.func, isMob: PropTypes.bool, onDetails: PropTypes.func, isGuest: PropTypes.bool };
GuideLandingCard.propTypes = { isMob: PropTypes.bool };
FilterBar.propTypes = { mob: PropTypes.bool, cpf: PropTypes.object, dsp: PropTypes.func, viewMode: PropTypes.string, setViewMode: PropTypes.func };
CampaignDetailsModal.propTypes = { open: PropTypes.bool, campaign: PropTypes.object, onClose: PropTypes.func, onApply: PropTypes.func, isMob: PropTypes.bool, isGuest: PropTypes.bool };
CampaignApplyModal.propTypes = { open: PropTypes.bool, isDone: PropTypes.bool, onClose: PropTypes.func, form: PropTypes.object, setForm: PropTypes.func, onSubmit: PropTypes.func, mob: PropTypes.bool };
