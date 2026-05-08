import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApp } from '../../context';
import { fmt, LS } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Btn, SkeletonCard, Empty, Modal, Fld } from '../../components/Primitives';
import { CampCard } from '../../components/Cards';
import EliteHeader from '../../components/layout/EliteHeader';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { LayoutGrid, Smartphone, Zap, CheckCircle2, XCircle } from 'lucide-react';

const SwipeCard = ({ campaign: c, onSwipe, onApply }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const colorRight = useTransform(x, [50, 150], ['rgba(16, 185, 129, 0)', 'rgba(16, 185, 129, 1)']);
  const colorLeft = useTransform(x, [-150, -50], ['rgba(239, 68, 68, 1)', 'rgba(239, 68, 68, 0)']);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) onSwipe('right', c);
    else if (info.offset.x < -100) onSwipe('left', c);
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, position: 'absolute', width: '100%', height: '100%', cursor: 'grab' }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <CampCard campaign={c} onApply={() => onApply(c)} />
        
        {/* Swipe Feedback Overlays */}
        <motion.div style={{ position: 'absolute', inset: 0, background: colorRight, borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
           <CheckCircle2 size={100} color="#fff" />
        </motion.div>
        <motion.div style={{ position: 'absolute', inset: 0, background: colorLeft, borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
           <XCircle size={100} color="#fff" />
        </motion.div>
      </div>
    </motion.div>
  );
};

SwipeCard.propTypes = {
  campaign: PropTypes.object.isRequired,
  onSwipe: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired
};

export default function CampaignsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const { cpf: f } = st;
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState([]);
  const [modal, setModal] = useState(null);
  const [done, setDone] = useState(false);
  const [aF, setAF] = useState({ pitch: '', portfolio: '', rate: '' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'swipe'
  const [swipeIndex, setSwipeIndex] = useState(0);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    setLoading(true);
    apiCall('/campaigns?limit=100').then(d => {
      setAll(d.campaigns || d || []);
      setLoading(false);
    }).catch(() => {
       const seed = LS.get('cb_campaigns', []);
       setAll(seed);
       setLoading(false);
    });
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type: type || 'info', msg } });
  const filtered = all.filter(c => {
    const q = (f.q || '').toLowerCase();
    const title = (c.title || '').toLowerCase();
    const brand = (typeof c.brand === 'object' ? c.brand.companyName : (c.brand || '')).toLowerCase();
    if (q && !title.includes(q) && !brand.includes(q)) return false;
    if (f.niche && !ensureArray(c.niche).includes(f.niche)) return false;
    if (f.urgent && !c.urgent) return false;
    return true;
  });

  const ensureArray = val => {
    if (Array.isArray(val)) return val;
    return val ? [val] : [];
  };

  const submitApply = (overrideCamp) => {
    const target = overrideCamp || modal;
    if (!st.user) { dsp({ t: 'UI', v: { authModal: true, authTab: 'login' } }); return; }
    
    LS.push('cb_applications', { 
      id: 'app-' + Date.now(), 
      campaignId: target.id, 
      campaignTitle: target.title, 
      brand: target.brand, 
      applicantEmail: st.user?.email, 
      applicantName: st.user?.name, 
      pitch: aF.pitch || 'Quick Apply via Swipe', 
      portfolio: aF.portfolio, 
      rate: aF.rate, 
      status: 'applied', 
      date: new Date().toISOString() 
    });
    
    dsp({ t: 'APPLY', id: target.id }); 
    setDone(true);
    toast(`Application sent for "${target.title}"`, 'success');
  };

  const handleSwipe = (dir, camp) => {
    if (dir === 'right') {
      submitApply(camp);
    }
    setSwipeIndex(p => p + 1);
  };

  const clearFilters = () => dsp({ t: 'CPF', v: { q: '', niche: '', urgent: false } });

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh' }}>
      <EliteHeader 
        eyebrow="Marketplace"
        title="Opportunities for Bharat"
        sub="Connect with high-growth brands and scale your digital influence."
        light={true}
        compact={viewMode === 'swipe'}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%', maxWidth: '800px', justifyContent: 'center', marginBottom: '24px' }}>
           <div style={{ flex: 1, minWidth: mob ? '100%' : '400px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '100px', padding: '8px 8px 8px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                 <span style={{ fontSize: '18px', marginRight: '12px' }}>🔍</span>
                 <input 
                   value={f.q} 
                   onChange={e => dsp({ t: 'CPF', v: { q: e.target.value } })} 
                   placeholder="Search brands, products..." 
                   style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontWeight: 600, fontSize: '15px' }}
                 />
              </div>
           </div>
           
           <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '100px' }}>
                 <button onClick={() => setViewMode('grid')} style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', background: viewMode === 'grid' ? '#fff' : 'transparent', boxShadow: viewMode === 'grid' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: viewMode === 'grid' ? '#0f172a' : '#64748b' }}>
                    <LayoutGrid size={16} /> Grid
                 </button>
                 <button onClick={() => setViewMode('swipe')} style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', background: viewMode === 'swipe' ? '#fff' : 'transparent', boxShadow: viewMode === 'swipe' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: viewMode === 'swipe' ? '#0f172a' : '#64748b' }}>
                    <Smartphone size={16} /> Swipe
                 </button>
              </div>
           </div>
        </div>
      </EliteHeader>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: mob ? '0 20px 100px' : '0 40px 100px' }}>
        
        {viewMode === 'grid' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
               <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>
                  {filtered.length} Opportunities <span style={{ color: '#FF9431', marginLeft: '8px' }}>Live Now</span>
               </h2>
               {(f.q || f.niche || f.urgent) && <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Reset Filters</button>}
            </div>

            {(() => {
              if (loading) {
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                  </div>
                );
              }
              if (filtered.length === 0) {
                return <Empty icon="📦" title="No Deals Found" sub="Try adjusting your search or filters to find more deals." ctaLabel="Clear Filters" onCta={clearFilters} />;
              }
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
                  {filtered.map((c, i) => (
                    <motion.div 
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CampCard campaign={c} onApply={camp => { setModal(camp); setDone(false); setAF({ pitch: '', portfolio: '', rate: '' }); }} />
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '500px', position: 'relative' }}>
             <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '13px', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                   <Zap size={14} fill="#FF9431" /> QUICK DISCOVERY
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>Swipe Right to Apply instantly</h3>
             </div>

             <div style={{ position: 'relative', width: mob ? '100%' : '450px', height: '550px' }}>
                <AnimatePresence>
                  {filtered.slice(swipeIndex, swipeIndex + 2).reverse().map((c, i) => (
                    <SwipeCard 
                      key={c.id} 
                      campaign={c} 
                      onSwipe={handleSwipe} 
                      onApply={(camp) => { setModal(camp); setDone(false); }}
                    />
                  ))}
                </AnimatePresence>
                
                {swipeIndex >= filtered.length && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                     <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>🏁</div>
                     <h4 style={{ fontSize: '20px', fontWeight: 900 }}>All caught up!</h4>
                     <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>You've reviewed all active campaigns.</p>
                     <Btn style={{ marginTop: '24px' }} onClick={() => setSwipeIndex(0)}>Refresh List</Btn>
                  </div>
                )}
             </div>

             <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
                <button onClick={() => handleSwipe('left', filtered[swipeIndex])} style={{ width: '64px', height: '64px', borderRadius: '50%', border: 'none', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <XCircle size={32} />
                </button>
                <button onClick={() => handleSwipe('right', filtered[swipeIndex])} style={{ width: '64px', height: '64px', borderRadius: '50%', border: 'none', background: '#0f172a', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', cursor: 'pointer', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <CheckCircle2 size={32} />
                </button>
             </div>
          </div>
        )}
      </div>

      <Modal open={!!modal} title={'Deploy Application'} onClose={() => { setModal(null); setDone(false); }} width={600}>
         {done ? (
           <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                 <CheckCircle2 size={40} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>Application Sent!</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '32px' }}>The brand will review your profile and pitch. We'll notify you if you're shortlisted.</p>
              <Btn full lg onClick={() => setModal(null)}>Back to Discovery</Btn>
           </div>
         ) : (
           <div style={{ padding: '10px' }}>
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
                 <p style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>CAMPAIGN</p>
                 <h4 style={{ fontSize: '20px', fontWeight: 900 }}>{modal?.title}</h4>
                 <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: 900, color: '#10B981' }}>{fmt.inr(modal?.budgetMin)} - {fmt.inr(modal?.budgetMax)}</div>
              </div>
              
              <Fld 
                label="Your Pitch *" 
                value={aF.pitch} 
                onChange={e => setAF(p => ({ ...p, pitch: e.target.value }))} 
                rows={4} 
                placeholder="Why are you a great fit for this brand?"
              />
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '12px' }}>
                 <Fld label="Expected Rate (₹)" type="number" value={aF.rate} onChange={e => setAF(p => ({ ...p, rate: e.target.value }))} placeholder="15,000" />
                 <Fld label="Portfolio Link" value={aF.portfolio} onChange={e => setAF(p => ({ ...p, portfolio: e.target.value }))} placeholder="Instagram/Reel Link" />
              </div>
              <Btn full lg style={{ marginTop: '32px', borderRadius: '100px', height: '60px' }} onClick={() => submitApply()}>Submit Application 🚀</Btn>
           </div>
         )}
      </Modal>
    </div>
  );
}
